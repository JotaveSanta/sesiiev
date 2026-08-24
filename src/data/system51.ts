/**
 * ============================================================
 *  SISTEMA 5x1 — DADOS DA SIMULAÇÃO
 * ============================================================
 *  Toda a geometria da quadra, as posições táticas, as
 *  trajetórias (keyframes) dos jogadores e da bola e os textos
 *  explicativos ficam neste arquivo.
 *
 *  Para ajustar a animação, altere apenas os valores abaixo —
 *  o componente da quadra apenas interpola estes dados.
 * ============================================================
 */

/* ---------------- GEOMETRIA DA QUADRA ---------------- */
// Espaço de coordenadas do SVG: 100 (largura) x 120 (altura)
export const COURT = {
  left: 8,
  right: 92,
  net: 60, // linha central / rede
  ourEnd: 108, // fundo da nossa quadra
  oppEnd: 12, // fundo da quadra adversária
  ourAttackLine: 76, // linha de 3m do nosso lado
  oppAttackLine: 44, // linha de 3m do lado adversário
};

/** Posições oficiais do rodízio no NOSSO lado (visão de cima) */
export const ROTATION_SPOTS: Record<number, { x: number; y: number }> = {
  4: { x: 25, y: 72 }, // frente esquerda
  3: { x: 50, y: 72 }, // frente meio
  2: { x: 75, y: 72 }, // frente direita
  5: { x: 25, y: 99 }, // fundo esquerda
  6: { x: 50, y: 99 }, // fundo meio
  1: { x: 75, y: 99 }, // fundo direita (saque)
};

/* ---------------- FUNÇÕES / CORES ---------------- */
export type RoleKind = "S" | "OH" | "MB" | "OPP" | "LIB";

export const ROLE_INFO: Record<RoleKind, { label: string; name: string; color: string }> = {
  S: { label: "Lv", name: "Levantador", color: "secondary" }, // azul
  OH: { label: "P", name: "Ponteiro", color: "primary" }, // verde
  MB: { label: "C", name: "Central", color: "warning" }, // laranja
  OPP: { label: "O", name: "Oposto", color: "accent" }, // roxo (distinto do levantador)
  LIB: { label: "Lb", name: "Líbero", color: "warning" }, // laranja com anel diferenciado
};

/* ---------------- TIPOS DA TIMELINE ---------------- */
export interface PlayerKey {
  t: number;
  x: number;
  y: number;
  /** ponto de controle opcional (curva) */
  cx?: number;
  cy?: number;
}

export interface BallKey {
  t: number;
  x: number;
  y: number;
  /** altura da bola no trecho (efeito de arco/sombra) */
  arc?: number;
}

export interface SimPlayer {
  id: string;
  kind: RoleKind;
  label: string;
  role: string;
  color: string;
  isLibero: boolean;
  startPos: number; // posição de rodízio (1..6)
  keys: PlayerKey[];
}

export interface Phase {
  t: number;
  label: string;
}

export interface Scenario {
  duration: number;
  players: SimPlayer[];
  ball: BallKey[];
  phases: Phase[];
  /** marcador de onde a bola vai cair (aparece durante o saque) */
  landing?: { x: number; y: number; from: number; to: number };
  /** sacador adversário (apenas no modo recepção) */
  opponentServer?: { x: number; y: number };
}

export type Mode = "receber" | "sacar";

/* ---------------- ORDEM DE RODÍZIO 5x1 ---------------- */
// Um jogador percorre as posições nesta sequência: 1 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1
const SEQ = [1, 6, 5, 4, 3, 2];
// Ordem de saque padrão do 5x1 (o Oposto sempre 3 posições atrás do Levantador)
const ORDER: RoleKind[] = ["S", "MB", "OH", "OPP", "MB", "OH"];

function isBackRow(pos: number) {
  return pos === 1 || pos === 5 || pos === 6;
}

/** Distribui as funções pelas 6 posições a partir da posição do Levantador */
export function buildLineup(setterPos: number) {
  const i = SEQ.indexOf(setterPos);
  return SEQ.map((_, k) => {
    const pos = SEQ[(i + k) % 6];
    const kind = ORDER[k];
    const libero = kind === "MB" && isBackRow(pos);
    return { pos, kind, libero, seat: k };
  });
}

/* ---------------- POSIÇÕES TÁTICAS ---------------- */
// Recepção (sistema de 3 passadores): esquerda / meio / direita
const RECEIVE_SPOTS = [
  { x: 24, y: 91 },
  { x: 50, y: 100 },
  { x: 76, y: 91 },
];

const SETTER_TARGET = { x: 66, y: 66 }; // infiltração: entre as posições 2 e 3
const MB_QUICK = { x: 44, y: 65 }; // bola rápida pelo meio
const OH_FRONT_ATTACK = { x: 19, y: 70 }; // ataque de ponta (posição 4)
const OH_PIPE = { x: 50, y: 82 }; // pipe pela posição 6
const OPP_FRONT_ATTACK = { x: 83, y: 70 }; // ataque do oposto (posição 2)
const OPP_BACK_ATTACK = { x: 85, y: 84 }; // ataque de fundo pela posição 1
const LIB_BASE = { x: 48, y: 100 };

// Defesa (bloqueio + fundo)
const BLOCK_SPOTS = [
  { x: 25, y: 64 },
  { x: 50, y: 63 },
  { x: 75, y: 64 },
];
const DEF_5 = { x: 20, y: 95 };
const DEF_6 = { x: 50, y: 101 };
const DEF_1 = { x: 82, y: 95 };

/* ---------------- CENÁRIO: RECEBENDO O SAQUE ---------------- */
function buildReceive(setterPos: number): Scenario {
  const lineup = buildLineup(setterPos);

  // Quem recebe: os dois ponteiros + o líbero
  const receivers = lineup.filter((p) => p.kind === "OH" || p.libero);
  // evita cruzamentos: ordena por x inicial e distribui nos pontos de recepção
  const sortedReceivers = [...receivers].sort(
    (a, b) => ROTATION_SPOTS[a.pos].x - ROTATION_SPOTS[b.pos].x,
  );
  const spotOf = new Map<number, { x: number; y: number }>();
  sortedReceivers.forEach((p, idx) => spotOf.set(p.pos, RECEIVE_SPOTS[idx] ?? RECEIVE_SPOTS[1]));

  // alvo do saque adversário (varia por rotação para não ficar repetitivo)
  const targetIdx = setterPos % sortedReceivers.length;
  const passer = sortedReceivers[targetIdx];
  const landing = spotOf.get(passer.pos)!;

  const players: SimPlayer[] = lineup.map((p) => {
    const start = ROTATION_SPOTS[p.pos];
    const kind: RoleKind = p.libero ? "LIB" : p.kind;
    const info = ROLE_INFO[kind];
    const keys: PlayerKey[] = [
      { t: 0, ...start },
      { t: 1.15, ...start }, // REGRA: ninguém sai do rodízio antes do saque
    ];

    if (p.kind === "S") {
      // Infiltração do Levantador — trajetória curva até a rede
      const curveX = isBackRow(p.pos) ? (start.x + SETTER_TARGET.x) / 2 + (p.pos === 5 ? -16 : 14) : start.x;
      const curveY = isBackRow(p.pos) ? start.y - 6 : (start.y + SETTER_TARGET.y) / 2;
      keys.push({ t: 1.3, ...start });
      keys.push({ t: 2.95, ...SETTER_TARGET, cx: curveX, cy: curveY });
      keys.push({ t: 5.8, ...SETTER_TARGET });
    } else if (spotOf.has(p.pos)) {
      // Passadores: abrem para a formação de recepção e depois vão para a função
      const spot = spotOf.get(p.pos)!;
      const final =
        kind === "LIB" ? LIB_BASE : isBackRow(p.pos) ? OH_PIPE : OH_FRONT_ATTACK;
      keys.push({ t: 1.25, ...start });
      keys.push({ t: 2.3, ...spot });
      keys.push({ t: 2.75, ...spot });
      keys.push({ t: 4.05, ...final, cx: (spot.x + final.x) / 2, cy: spot.y - 4 });
      keys.push({ t: 5.8, ...final });
    } else if (p.kind === "MB") {
      // Central de rede: ajusta e entra para a bola rápida
      const wait = { x: 44, y: 71 };
      keys.push({ t: 1.45, ...start });
      keys.push({ t: 2.2, ...wait });
      keys.push({ t: 2.95, ...wait });
      keys.push({ t: 4.0, ...MB_QUICK });
      keys.push({ t: 5.8, ...MB_QUICK });
    } else {
      // Oposto: não participa da recepção
      const back = isBackRow(p.pos);
      const wait = back ? { x: 86, y: 92 } : { x: 80, y: 74 };
      const final = back ? OPP_BACK_ATTACK : OPP_FRONT_ATTACK;
      keys.push({ t: 1.4, ...start });
      keys.push({ t: 2.5, ...wait });
      keys.push({ t: 3.05, ...wait });
      keys.push({ t: 4.05, ...final });
      keys.push({ t: 5.8, ...final });
    }

    return {
      id: `${p.kind}-${p.seat}`,
      kind,
      label: info.label,
      role: info.name,
      color: info.color,
      isLibero: p.libero,
      startPos: p.pos,
      keys,
    };
  });

  const server = { x: 24, y: 16 };
  const attacker = OH_FRONT_ATTACK;

  const ball: BallKey[] = [
    { t: 0, x: server.x, y: server.y + 4 },
    { t: 0.95, x: server.x, y: server.y + 4 },
    { t: 1.15, x: server.x, y: server.y - 3, arc: 6 }, // lançamento
    { t: 2.45, x: landing.x, y: landing.y, arc: 30 }, // saque cruza a rede
    { t: 2.62, x: landing.x, y: landing.y - 2, arc: 3 }, // contato da recepção
    { t: 3.3, x: SETTER_TARGET.x, y: SETTER_TARGET.y + 2, arc: 22 }, // passe ao levantador
    { t: 3.45, x: SETTER_TARGET.x, y: SETTER_TARGET.y, arc: 4 },
    { t: 4.15, x: attacker.x + 5, y: attacker.y - 3, arc: 16 }, // levantamento
    { t: 5.8, x: attacker.x + 5, y: attacker.y - 3 },
  ];

  return {
    duration: 5.8,
    players,
    ball,
    phases: [
      { t: 0, label: "FORMAÇÃO DE RODÍZIO" },
      { t: 1.15, label: "SAQUE ADVERSÁRIO" },
      { t: 2.45, label: "RECEPÇÃO" },
      { t: 2.7, label: "INFILTRAÇÃO" },
      { t: 3.45, label: "LEVANTAMENTO" },
      { t: 4.15, label: "ATAQUE" },
      { t: 5.0, label: "FORMAÇÃO OFENSIVA FINAL" },
    ],
    landing: { ...landing, from: 1.15, to: 2.5 },
    opponentServer: server,
  };
}

/* ---------------- CENÁRIO: SACANDO / DEFESA ---------------- */
function buildServe(setterPos: number): Scenario {
  const lineup = buildLineup(setterPos);
  const serverEntry = lineup.find((p) => p.pos === 1)!;
  // O líbero não pode sacar: na posição 1 quem saca é o Central
  const serverIsLibero = serverEntry.libero;

  const frontRow = lineup.filter((p) => !isBackRow(p.pos));
  const sortedFront = [...frontRow].sort((a, b) => ROTATION_SPOTS[a.pos].x - ROTATION_SPOTS[b.pos].x);
  const blockOf = new Map<number, { x: number; y: number }>();
  sortedFront.forEach((p, idx) => blockOf.set(p.pos, BLOCK_SPOTS[idx] ?? BLOCK_SPOTS[1]));

  // Fundo: líbero na 5, ponteiro na 6, sacador/restante na 1
  const backRow = lineup.filter((p) => isBackRow(p.pos));
  const defOf = new Map<number, { x: number; y: number }>();
  const remaining = [DEF_5, DEF_6, DEF_1];
  const lib = backRow.find((p) => p.libero);
  if (lib) defOf.set(lib.pos, DEF_5);
  const backOH = backRow.find((p) => p.kind === "OH" && !defOf.has(p.pos));
  if (backOH) defOf.set(backOH.pos, DEF_6);
  backRow
    .filter((p) => !defOf.has(p.pos))
    .forEach((p) => {
      const spot = remaining.find((s) => ![...defOf.values()].includes(s));
      defOf.set(p.pos, p.pos === 1 ? DEF_1 : spot ?? DEF_1);
    });

  const serveStart = { x: 75, y: 112 };

  const players: SimPlayer[] = lineup.map((p) => {
    const isServer = p.pos === 1;
    const kind: RoleKind = p.libero && !(isServer && serverIsLibero) ? "LIB" : p.libero ? "MB" : p.kind;
    const info = ROLE_INFO[kind];
    const start = isServer ? serveStart : ROTATION_SPOTS[p.pos];
    const target = blockOf.get(p.pos) ?? defOf.get(p.pos) ?? ROTATION_SPOTS[p.pos];

    const keys: PlayerKey[] = [
      { t: 0, ...start },
      { t: 1.2, ...start },
    ];
    if (isServer) {
      keys.push({ t: 1.4, ...start });
      keys.push({ t: 2.8, ...target, cx: (start.x + target.x) / 2 + 8, cy: start.y - 4 });
    } else {
      const delay = isBackRow(p.pos) ? 1.35 : 1.5;
      keys.push({ t: delay, ...start });
      keys.push({ t: delay + 1.1, ...target });
    }
    keys.push({ t: 6.2, ...target });

    return {
      id: `${p.kind}-${p.seat}`,
      kind,
      label: info.label,
      role: info.name,
      color: info.color,
      isLibero: kind === "LIB",
      startPos: p.pos,
      keys,
    };
  });

  const oppSetter = { x: 36, y: 50 };
  const oppHitter = { x: 70, y: 49 };
  const digTarget = { x: 52, y: 82 };

  const ball: BallKey[] = [
    { t: 0, x: serveStart.x, y: serveStart.y - 3 },
    { t: 1.0, x: serveStart.x, y: serveStart.y - 3 },
    { t: 1.2, x: serveStart.x, y: serveStart.y - 9, arc: 6 },
    { t: 2.6, x: 50, y: 26, arc: 30 }, // saque na quadra adversária
    { t: 3.3, x: oppSetter.x, y: oppSetter.y, arc: 18 }, // recepção adversária
    { t: 4.2, x: oppHitter.x, y: oppHitter.y, arc: 14 }, // levantamento adversário
    { t: 5.3, x: digTarget.x, y: digTarget.y, arc: 20 }, // ataque adversário
    { t: 6.2, x: digTarget.x, y: digTarget.y - 2, arc: 4 },
  ];

  return {
    duration: 6.2,
    players,
    ball,
    phases: [
      { t: 0, label: "FORMAÇÃO DE RODÍZIO" },
      { t: 1.2, label: "SAQUE" },
      { t: 2.5, label: "TROCA DEFENSIVA" },
      { t: 3.3, label: "CONSTRUÇÃO ADVERSÁRIA" },
      { t: 4.2, label: "BLOQUEIO" },
      { t: 5.3, label: "DEFESA" },
      { t: 5.8, label: "FORMAÇÃO DEFENSIVA FINAL" },
    ],
  };
}

export function buildScenario(setterPos: number, mode: Mode): Scenario {
  return mode === "receber" ? buildReceive(setterPos) : buildServe(setterPos);
}

/* ---------------- EXPLICAÇÕES TÁTICAS ---------------- */
export interface Explanation {
  inicial: string;
  movimentacao: string;
  funcoes: string[];
  final: string;
  opcoes: string[];
  destaque?: string;
}

export const EXPLANATIONS: Record<number, Record<Mode, Explanation>> = {
  1: {
    receber: {
      inicial:
        "O Levantador começa na posição 1, no fundo à direita. Os dois ponteiros e o líbero formam a meia-lua de recepção; o oposto e o central de rede ficam fora do passe.",
      movimentacao:
        "No instante do contato do saque adversário, o Levantador infiltra do fundo para a rede em trajetória curva, terminando entre as posições 2 e 3. Os passadores ajustam para a trajetória da bola e o central entra para a bola rápida.",
      funcoes: [
        "Levantador (Lv): infiltra da posição 1 e organiza o jogo junto à rede.",
        "Ponteiros (P): recebem o saque e viram opções de ataque na ponta e no pipe.",
        "Líbero (Lb): responsável pelo centro da recepção.",
        "Central (C): não recebe, entra para a bola rápida.",
        "Oposto (O): fica livre do passe, preparado para atacar pela direita.",
      ],
      final:
        "Levantador infiltra para a rede → Líbero assume o centro da recepção → Ponteiro ocupa a posição 6 (pipe) → equipe forma a estrutura ofensiva com três opções de ataque.",
      opcoes: ["Ataque de ponta (posição 4)", "Bola rápida pelo meio", "Ataque do oposto pela direita", "Pipe pela posição 6"],
      destaque: "Rotação mais confortável: o Levantador começa no fundo e tem tempo para infiltrar sem atravessar ninguém.",
    },
    sacar: {
      inicial: "O Levantador está na posição 1 e é ele quem executa o saque, atrás da linha de fundo.",
      movimentacao:
        "Após o contato do saque, o Levantador entra na quadra e assume a posição 1 de defesa. O líbero desloca-se para a posição 5 e o ponteiro de fundo para a posição 6. Os três jogadores de rede sobem para o bloqueio.",
      funcoes: [
        "Levantador (Lv): saca e defende na posição 1.",
        "Líbero (Lb): defesa na posição 5.",
        "Ponteiro (P): defesa na posição 6.",
        "Central e rede: formam o bloqueio.",
      ],
      final: "Saque → jogadores de rede sobem para o bloqueio → líbero na 5, ponteiro na 6, levantador na 1 → estrutura defensiva completa.",
      opcoes: ["Bloqueio duplo na diagonal", "Defesa alta atrás do bloqueio", "Contra-ataque pela ponta"],
    },
  },
  2: {
    receber: {
      inicial:
        "O Levantador está na posição 2, já na rede. A recepção é feita pelos ponteiros e pelo líbero, com o oposto no fundo à direita.",
      movimentacao:
        "Somente depois do saque os jogadores trocam: o Levantador ajusta-se um pouco para o centro para levantar, o central assume sua posição de rede e o oposto sai para o ataque de fundo pela posição 1.",
      funcoes: [
        "Levantador (Lv): já na rede, organiza o levantamento sem infiltração longa.",
        "Central (C): assume a posição de rede para a bola rápida.",
        "Oposto (O): ataca de fundo pela posição 1.",
        "Ponteiros e Líbero: garantem a recepção antes de qualquer troca.",
      ],
      final: "Recepção acontece primeiro → Levantador se organiza na rede → Central entra no meio → Oposto ataca da posição 1 → formação ofensiva final.",
      opcoes: ["Bola rápida pelo meio", "Ataque de ponta", "Ataque de fundo do oposto (posição 1)"],
      destaque: "Exige atenção na organização defensiva: com o levantador na rede, sobra menos gente atrás na transição.",
    },
    sacar: {
      inicial: "Levantador na posição 2 (rede). Quem saca é o jogador da posição 1.",
      movimentacao: "Depois do saque a rede sobe para o bloqueio com o Levantador na ponta direita, e o fundo se organiza com líbero, ponteiro e o sacador.",
      funcoes: [
        "Levantador (Lv): bloqueia na posição 2.",
        "Central (C): bloqueio central.",
        "Líbero (Lb): defesa na posição 5.",
        "Ponteiro (P): defesa na posição 6.",
      ],
      final: "Saque → bloqueio formado → fundo distribuído em 5, 6 e 1 → equipe pronta para o contra-ataque.",
      opcoes: ["Bloqueio pela paralela", "Defesa do líbero na 5", "Contra-ataque do oposto"],
    },
  },
  3: {
    receber: {
      inicial: "O Levantador começa na posição 3, no meio da rede, entre os dois atacantes de rede.",
      movimentacao:
        "Após o saque, o Levantador desloca-se lateralmente para a direita, entre as posições 2 e 3, deixando o espaço central livre para o Central atacar a bola rápida. Os passadores realizam a recepção e os atacantes fazem as aproximações.",
      funcoes: [
        "Levantador (Lv): desloca-se da 3 para a direita da rede.",
        "Central (C): principal opção, entra forte na bola rápida pelo meio.",
        "Ponteiros (P): recebem e depois atacam na ponta e no pipe.",
        "Oposto (O): opção pela direita.",
      ],
      final: "Recepção → Levantador abre para a direita → Central ocupa o meio → ponta e pipe prontos → formação ofensiva com forte utilização do meio.",
      opcoes: ["Bola rápida pelo meio (prioridade)", "Combinação meio + pipe", "Ataque de ponta", "Ataque do oposto"],
      destaque: "Rotação ideal para explorar o jogo pelo meio, com o Central bem próximo do levantador.",
    },
    sacar: {
      inicial: "Levantador na posição 3. O saque sai da posição 1.",
      movimentacao: "Depois do saque, o Levantador assume o bloqueio central junto ao Central e o fundo se reorganiza.",
      funcoes: ["Levantador (Lv): bloqueio no meio.", "Central (C): bloqueio e leitura do ataque rápido.", "Líbero (Lb): defesa na 5.", "Ponteiro (P): defesa na 6."],
      final: "Saque → bloqueio central reforçado → fundo em 5, 6 e 1 → transição para o contra-ataque.",
      opcoes: ["Bloqueio no meio", "Defesa de fundo compacta", "Contra-ataque pela ponta"],
    },
  },
  4: {
    receber: {
      inicial:
        "O Levantador está na posição 4, na rede à esquerda. Esta é a rotação mais delicada: a equipe fica inicialmente com apenas dois atacantes efetivos na rede, salvo inversões do 5x1.",
      movimentacao:
        "Depois do saque, o Levantador desloca-se ao longo da rede até a direita para levantar. O Oposto sobe do fundo e ataca vindo da posição 1, compensando a falta de atacante na ponta esquerda. O Central entra pelo meio.",
      funcoes: [
        "Levantador (Lv): sai da ponta esquerda e atravessa a rede para a direita.",
        "Oposto (O): principal saída ofensiva, atacando de fundo pela posição 1.",
        "Central (C): bola rápida pelo meio.",
        "Ponteiro e Líbero: sustentam a recepção.",
      ],
      final: "Recepção → Levantador reposiciona-se na rede → Oposto ataca da posição 1 → Central no meio → formação ofensiva diferente das outras rotações.",
      opcoes: ["Ataque de fundo do oposto (posição 1)", "Bola rápida pelo meio", "Pipe pela posição 6"],
      destaque: "Configuração ofensiva reduzida na rede — a equipe depende mais do ataque de fundo e da bola de meio.",
    },
    sacar: {
      inicial: "Levantador na posição 4. O saque sai da posição 1.",
      movimentacao: "Após o saque, o Levantador bloqueia na ponta esquerda e a equipe fecha a defesa com líbero na 5 e ponteiro na 6.",
      funcoes: ["Levantador (Lv): bloqueio na posição 4.", "Central (C): bloqueio no meio.", "Líbero (Lb): defesa na 5.", "Ponteiro (P): defesa na 6."],
      final: "Saque → bloqueio na esquerda e no meio → fundo organizado → contra-ataque preferencialmente pelo oposto.",
      opcoes: ["Bloqueio na paralela esquerda", "Defesa diagonal", "Contra-ataque do oposto"],
    },
  },
  5: {
    receber: {
      inicial: "O Levantador começa no fundo, na posição 5, à esquerda. Os passadores formam a meia-lua e o Levantador fica fora da recepção.",
      movimentacao:
        "No momento do saque, o Levantador infiltra pela esquerda, percorrendo uma trajetória longa e curva até a rede, terminando entre as posições 2 e 3. Os passadores ajustam a meia-lua para cobrir o espaço deixado por ele.",
      funcoes: [
        "Levantador (Lv): infiltração longa pela esquerda até a rede.",
        "Ponteiros (P) e Líbero (Lb): recepção com ajuste de espaços.",
        "Central (C): entra para a bola rápida.",
        "Oposto (O): pronto para atacar pela direita.",
      ],
      final: "Saque → recepção ajustada → Levantador conclui a infiltração pela esquerda → atacantes assumem posições → formação ofensiva completa.",
      opcoes: ["Ataque de ponta", "Bola rápida pelo meio", "Ataque do oposto", "Pipe pela posição 6"],
      destaque: "Atenção à trajetória do Levantador: é a infiltração mais longa das seis rotações.",
    },
    sacar: {
      inicial: "Levantador na posição 5. Normalmente é o Central, na posição 1, quem executa o saque — o líbero fica fora deste momento.",
      movimentacao: "Após o saque, o Central entra na quadra e ocupa a defesa; o Levantador assume a posição 5 no fundo e a rede sobe para o bloqueio.",
      funcoes: [
        "Central (C): saca e depois ocupa a defesa no fundo.",
        "Levantador (Lv): defende no fundo à esquerda.",
        "Ponteiro (P): defesa na posição 6.",
        "Rede: bloqueio formado pelos jogadores de frente.",
      ],
      final: "Saque do Central → entrada na quadra → Levantador na 5, ponteiro na 6 → bloqueio formado → estrutura defensiva final.",
      opcoes: ["Bloqueio duplo", "Defesa de fundo pelo centro", "Contra-ataque pela ponta"],
    },
  },
  6: {
    receber: {
      inicial:
        "O Levantador começa na posição 6, no meio do fundo, escondido atrás de um Ponteiro para não participar da recepção.",
      movimentacao:
        "Assim que o saque é executado, o Levantador infiltra rapidamente pelo meio até a rede. O Oposto e o Central realizam a troca necessária na rede enquanto os passadores fazem a recepção.",
      funcoes: [
        "Levantador (Lv): NÃO recebe — infiltra imediatamente pelo meio.",
        "Ponteiro (P): cobre a frente do Levantador na recepção.",
        "Líbero (Lb): centro da recepção.",
        "Oposto (O) e Central (C): trocam posições na rede para as posições de ataque.",
      ],
      final: "Levantador esconde-se atrás do Ponteiro → infiltra pelo meio → Oposto e Central trocam na rede → formação ofensiva final com três opções.",
      opcoes: ["Bola rápida pelo meio", "Ataque de ponta", "Ataque do oposto", "Pipe pela posição 6"],
      destaque: "O Levantador precisa ficar isolado do passe: fica atrás do Ponteiro e sai antes da bola chegar.",
    },
    sacar: {
      inicial: "Levantador na posição 6. O saque sai da posição 1.",
      movimentacao: "Depois do saque, o sacador entra para a posição 1 de defesa, o líbero vai à 5 e o Levantador se mantém no centro do fundo.",
      funcoes: ["Levantador (Lv): defesa no meio do fundo.", "Líbero (Lb): defesa na 5.", "Rede: bloqueio triplo posicionado.", "Sacador: entra para a defesa na 1."],
      final: "Saque → bloqueio formado → fundo com levantador no centro → equipe pronta para a transição ofensiva.",
      opcoes: ["Bloqueio central", "Defesa no fundo do meio", "Contra-ataque do oposto"],
    },
  },
};
