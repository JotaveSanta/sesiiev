export interface Exercise {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  type: "exercise" | "challenge";
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: "primary" | "secondary" | "accent" | "gold";
  exercises: Exercise[];
}

/* ============================================================================
   COMO TROCAR OS VÍDEOS DAS AULAS
   ----------------------------------------------------------------------------
   1) Para cada exercício abaixo você vai ver uma linha assim:
        videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_1_1",
   2) Substitua APENAS o texto entre aspas pelo link de incorporação (embed)
      do seu vídeo do YouTube.
   3) IMPORTANTE: use o link no formato EMBED, não o link normal do navegador.
        - Link normal (NÃO usar):   https://www.youtube.com/watch?v=ABC123
        - Link embed (USAR ESTE):   https://www.youtube.com/embed/ABC123
      Basta trocar "watch?v=" por "embed/".
   4) Mantenha as aspas " " ao redor do link e a vírgula no final da linha.
   5) Cada exercício tem um código (ex: 1-1, 1-2 ... 10-6) que indica
      Os códigos são identificadores estáveis do progresso; não renumere ao retirar aulas.
      O campo type identifica exercícios e desafios. Cada módulo pode ter quantidade diferente de aulas.
   ============================================================================ */

export const levels: Level[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 1 — Fundamentos do Toque
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    title: "Fundamentos do Toque",
    description: "Aprenda a base do toque por cima",
    icon: "🏐",
    color: "primary",
    exercises: [
      // >>> AULA 1-1: Posição das Mãos (vídeo: Aula 1 do Módulo de Toque)
      { id: "1-1", title: "Posição das Mãos", description: "Aprenda a posicionar as mãos corretamente para o toque por cima. Dedos abertos, formando um triângulo.", videoUrl: "https://www.youtube.com/embed/LObT56HrKLU", type: "exercise" },
      // >>> AULA 1-2: Toque Parado (vídeo: Aula 2 do Módulo de Toque)
      { id: "1-2", title: "Toque Parado", description: "Pratique o toque sem deslocamento, focando na técnica dos dedos e extensão dos braços.", videoUrl: "https://www.youtube.com/embed/iJ7fOnegCLY", type: "exercise" },
      // >>> AULA 1-3: Toque contra a Parede (vídeo: Aula 3 do Módulo de Toque)
      { id: "1-3", title: "Toque contra a Parede", description: "Execute toques contínuos contra a parede para desenvolver controle e consistência.", videoUrl: "https://www.youtube.com/embed/PZ3tc0JiNaU", type: "exercise" },
      // >>> AULA 1-4: Toque em Dupla (vídeo: Aula 4 do Módulo de Toque)
      { id: "1-4", title: "Toque em Dupla", description: "Troque toques com um parceiro a curta distância, mantendo a bola alta e controlada.", videoUrl: "https://www.youtube.com/embed/xcEc2Zp5heA", type: "exercise" },
      // >>> AULA 1-5: Toque com Deslocamento (vídeo: Aula 5 do Módulo de Toque)
      { id: "1-5", title: "Toque com Deslocamento", description: "Pratique o toque se movimentando lateralmente na quadra.", videoUrl: "https://www.youtube.com/embed/G7XKuh5_h_s", type: "exercise" },
      // >>> DESAFIO 1-6: Toque no Alvo (no vídeo, o desafio é acertar a bola dentro de um alvo a 8 passos)
      { id: "1-6", title: "Desafio: Toque no Alvo", description: "Acerte a bola dentro de um alvo posicionado a 8 passos de distância usando o toque!", videoUrl: "https://www.youtube.com/embed/U5-A-mLm1vE", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 2 — Manchete
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 2,
    title: "Manchete",
    description: "Domine a recepção com manchete",
    icon: "💪",
    color: "secondary",
    exercises: [
      // >>> AULA 2-1: Posição dos Braços
      { id: "2-1", title: "Posição dos Braços", description: "Aprenda a posição correta dos braços para a manchete: braços estendidos e juntos.", videoUrl: "https://www.youtube.com/embed/5UVjmV2kK9o", type: "exercise" },
      // >>> AULA 2-2: Manchete Parada
      { id: "2-2", title: "Manchete Parada", description: "Pratique a manchete sem se mover, focando no ângulo dos braços.", videoUrl: "https://www.youtube.com/embed/WuXPYHbo0c0", type: "exercise" },
      // >>> AULA 2-3: Recepção de Saque
      { id: "2-3", title: "Recepção de Saque", description: "Receba saques leves usando a manchete, direcionando a bola para o levantador.", videoUrl: "https://www.youtube.com/embed/JMwglOaBvnI", type: "exercise" },
      // >>> AULA 2-4: Manchete Lateral
      { id: "2-4", title: "Manchete Lateral", description: "Pratique manchetes com deslocamento lateral para melhorar sua cobertura de quadra.", videoUrl: "https://www.youtube.com/embed/2va9RNc6Rt8", type: "exercise" },
      // >>> DESAFIO 2-6: Rally de Manchete
      { id: "2-6", title: "Desafio: Rally de Manchete", description: "Mantenha um rally de 15 manchetes com um parceiro!", videoUrl: "https://www.youtube.com/embed/kxAn8GCnzEw", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 3 — Saque (módulos de saque unificados)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 3,
    title: "Saque",
    description: "Aprenda o posicionamento e pratique o saque para o jogo",
    icon: "🎯",
    color: "accent",
    exercises: [
      // >>> AULA 3-1: Posicionamento — Saque por Baixo
      { id: "3-1", title: "Posicionamento — Saque por Baixo", description: "Aprenda o posicionamento e o movimento do saque por baixo.", videoUrl: "https://www.youtube.com/embed/J-kV_wa69Hw", type: "exercise" },
      // >>> AULA 3-2: Saque por Baixo para Jogo
      { id: "3-2", title: "Saque por Baixo para Jogo", description: "Saque a bola e faça ela percorrer uma distância de 9 passos.", videoUrl: "https://www.youtube.com/embed/zNbTDXDsP-c", type: "exercise" },
      // >>> AULA 3-3: Posicionamento — Saque por Cima
      { id: "3-3", title: "Posicionamento — Saque por Cima", description: "Aprenda o movimento e o posicionamento do saque por cima.", videoUrl: "https://www.youtube.com/embed/OBHs5I7u4AQ", type: "exercise" },
      // >>> AULA 3-4: Saque por Cima para Jogo
      { id: "3-4", title: "Saque por Cima para Jogo", description: "Saque a bola e faça ela percorrer uma distância de 9 metros.", videoUrl: "https://www.youtube.com/embed/Mn9Uv-RdyUc", type: "exercise" },
      // >>> DESAFIO 3-5: Saque na Parede
      { id: "3-5", title: "Desafio: Saque na Parede", description: "Saque acertando um ponto na altura de 2,43 m na parede, a uma distância de 9 metros (9 passos).", videoUrl: "https://www.youtube.com/embed/OcJkD8xJqFE", type: "challenge" },
    ],
  },

  // IDs dos módulos preservados para manter o progresso salvo.
  {
    id: 6,
    title: "Ataque",
    description: "Treine o encaixe da bola e a passada de ataque",
    icon: "⚡",
    color: "secondary",
    exercises: [
      // >>> AULA 6-1: Encaixe com Bolinha
      { id: "6-1", title: "Encaixe com Bolinha", description: "Jogue a bolinha para cima e encaixe na mão, treinando o contato para o ataque.", videoUrl: "https://www.youtube.com/embed/qCeoatuJE3Y", type: "exercise" },
      // >>> AULA 6-2: Encaixe na Parede
      { id: "6-2", title: "Encaixe na Parede", description: "Encaixe a bola de vôlei na parede repetidamente para treinar o encaixe e o movimento de ataque.", videoUrl: "https://www.youtube.com/embed/sU11fUWpb8A", type: "exercise" },
      // >>> AULA 6-3: Passada sem a Bola
      { id: "6-3", title: "Passada sem a Bola", description: "Aprenda a passada de ataque, coordenando braços e pernas para potencializar o salto e obter o melhor resultado possível.", videoUrl: "https://www.youtube.com/embed/QA0DscPC4rA", type: "exercise" },
    ],
  },
  {
    id: 7,
    title: "Bloqueio",
    description: "Treine o bloqueio nas pontas e no meio da rede",
    icon: "🛡️",
    color: "accent",
    exercises: [
      // >>> AULA 7-1: Bloqueio das Pontas
      { id: "7-1", title: "Bloqueio das Pontas", description: "Pratique o bloqueio nas pontas da rede.", videoUrl: "https://www.youtube.com/embed/AHHhCZ8rbVk", type: "exercise" },
      // >>> AULA 7-2: Bloqueio do Meio
      { id: "7-2", title: "Bloqueio do Meio", description: "Pratique o bloqueio no meio da rede.", videoUrl: "https://www.youtube.com/embed/Kifc2uVDLx8", type: "exercise" },
    ],
  },
];

export const achievements = [
  { id: "first-exercise", title: "Primeiro Passo", description: "Complete seu primeiro exercício", icon: "🌟", requirement: 1 },
  { id: "five-exercises", title: "Esquentando", description: "Complete 5 exercícios", icon: "🔥", requirement: 5 },
  { id: "first-challenge", title: "Desafiante", description: "Complete seu primeiro desafio", icon: "⚔️", requirement: "first-challenge" },
  { id: "ten-exercises", title: "Dedicado", description: "Complete 10 exercícios", icon: "💎", requirement: 10 },
  { id: "twenty-exercises", title: "Atleta", description: "Complete 20 exercícios", icon: "🏅", requirement: 20 },
  { id: "half-way", title: "Meio Caminho", description: "Complete 30 exercícios", icon: "🎯", requirement: 30 },
  { id: "five-levels", title: "Veterano", description: "Complete 5 níveis", icon: "👑", requirement: "five-levels" },
  { id: "all-done", title: "Mestre do Vôlei", description: "Complete todos os exercícios", icon: "🏆", requirement: levels.reduce((total, level) => total + level.exercises.length, 0) },
];
