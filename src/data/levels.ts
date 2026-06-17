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
      NÍVEL-EXERCÍCIO. O último de cada nível (X-6) é sempre o DESAFIO.
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
      // >>> AULA 1-1: Posição das Mãos
      { id: "1-1", title: "Posição das Mãos", description: "Aprenda a posicionar as mãos corretamente para o toque por cima. Dedos abertos, formando um triângulo.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_1_1", type: "exercise" },
      // >>> AULA 1-2: Toque Parado
      { id: "1-2", title: "Toque Parado", description: "Pratique o toque sem deslocamento, focando na técnica dos dedos e extensão dos braços.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_1_2", type: "exercise" },
      // >>> AULA 1-3: Toque contra a Parede
      { id: "1-3", title: "Toque contra a Parede", description: "Execute toques contínuos contra a parede para desenvolver controle e consistência.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_1_3", type: "exercise" },
      // >>> AULA 1-4: Toque em Dupla
      { id: "1-4", title: "Toque em Dupla", description: "Troque toques com um parceiro a curta distância, mantendo a bola alta e controlada.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_1_4", type: "exercise" },
      // >>> AULA 1-5: Toque com Deslocamento
      { id: "1-5", title: "Toque com Deslocamento", description: "Pratique o toque se movimentando lateralmente na quadra.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_1_5", type: "exercise" },
      // >>> DESAFIO 1-6: 20 Toques Seguidos
      { id: "1-6", title: "Desafio: 20 Toques Seguidos", description: "Complete 20 toques consecutivos sem deixar a bola cair!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_1_6", type: "challenge" },
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
      { id: "2-1", title: "Posição dos Braços", description: "Aprenda a posição correta dos braços para a manchete: braços estendidos e juntos.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_2_1", type: "exercise" },
      // >>> AULA 2-2: Manchete Parada
      { id: "2-2", title: "Manchete Parada", description: "Pratique a manchete sem se mover, focando no ângulo dos braços.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_2_2", type: "exercise" },
      // >>> AULA 2-3: Recepção de Saque
      { id: "2-3", title: "Recepção de Saque", description: "Receba saques leves usando a manchete, direcionando a bola para o levantador.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_2_3", type: "exercise" },
      // >>> AULA 2-4: Manchete Lateral
      { id: "2-4", title: "Manchete Lateral", description: "Pratique manchetes com deslocamento lateral para melhorar sua cobertura de quadra.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_2_4", type: "exercise" },
      // >>> AULA 2-5: Manchete de Defesa
      { id: "2-5", title: "Manchete de Defesa", description: "Simule situações de defesa recebendo bolas mais fortes com manchete.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_2_5", type: "exercise" },
      // >>> DESAFIO 2-6: Rally de Manchete
      { id: "2-6", title: "Desafio: Rally de Manchete", description: "Mantenha um rally de 15 manchetes com um parceiro!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_2_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 3 — Saque por Baixo
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 3,
    title: "Saque por Baixo",
    description: "Aprenda o saque básico do vôlei",
    icon: "🎯",
    color: "accent",
    exercises: [
      // >>> AULA 3-1: Posição Inicial
      { id: "3-1", title: "Posição Inicial", description: "Aprenda a postura e o posicionamento dos pés para o saque por baixo.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_3_1", type: "exercise" },
      // >>> AULA 3-2: Movimento do Braço
      { id: "3-2", title: "Movimento do Braço", description: "Pratique o balanço do braço sem bola, criando o ritmo correto.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_3_2", type: "exercise" },
      // >>> AULA 3-3: Saque na Parede
      { id: "3-3", title: "Saque na Parede", description: "Execute saques contra a parede para desenvolver precisão.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_3_3", type: "exercise" },
      // >>> AULA 3-4: Saque por Cima da Rede
      { id: "3-4", title: "Saque por Cima da Rede", description: "Pratique sacando por cima da rede de diferentes distâncias.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_3_4", type: "exercise" },
      // >>> AULA 3-5: Saque Direcionado
      { id: "3-5", title: "Saque Direcionado", description: "Tente acertar alvos específicos na quadra adversária.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_3_5", type: "exercise" },
      // >>> DESAFIO 3-6: 5 Saques Certeiros
      { id: "3-6", title: "Desafio: 5 Saques Certeiros", description: "Acerte 5 saques em zonas marcadas da quadra!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_3_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 4 — Saque por Cima
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    title: "Saque por Cima",
    description: "Evolua para o saque viagem",
    icon: "🚀",
    color: "gold",
    exercises: [
      // >>> AULA 4-1: Lançamento da Bola
      { id: "4-1", title: "Lançamento da Bola", description: "Pratique lançar a bola na altura e posição corretas para o saque.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_4_1", type: "exercise" },
      // >>> AULA 4-2: Movimento Completo
      { id: "4-2", title: "Movimento Completo", description: "Combine o lançamento com o movimento do braço em câmera lenta.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_4_2", type: "exercise" },
      // >>> AULA 4-3: Saque sem Rede
      { id: "4-3", title: "Saque sem Rede", description: "Execute o saque completo focando na técnica, sem se preocupar com a rede.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_4_3", type: "exercise" },
      // >>> AULA 4-4: Saque com Rede
      { id: "4-4", title: "Saque com Rede", description: "Pratique o saque por cima passando a bola por cima da rede.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_4_4", type: "exercise" },
      // >>> AULA 4-5: Potência e Controle
      { id: "4-5", title: "Potência e Controle", description: "Trabalhe o equilíbrio entre potência e direção no saque.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_4_5", type: "exercise" },
      // >>> DESAFIO 4-6: Saque Ace
      { id: "4-6", title: "Desafio: Saque Ace", description: "Marque 3 aces em 10 tentativas de saque!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_4_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 5 — Levantamento
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 5,
    title: "Levantamento",
    description: "Aprenda a levantar a bola para o ataque",
    icon: "⬆️",
    color: "primary",
    exercises: [
      // >>> AULA 5-1: Toque de Levantamento
      { id: "5-1", title: "Toque de Levantamento", description: "Pratique o toque alto e preciso para posicionar a bola no ataque.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_5_1", type: "exercise" },
      // >>> AULA 5-2: Levantamento Frontal
      { id: "5-2", title: "Levantamento Frontal", description: "Levante a bola para frente com controle de altura e direção.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_5_2", type: "exercise" },
      // >>> AULA 5-3: Levantamento de Costas
      { id: "5-3", title: "Levantamento de Costas", description: "Aprenda a levantar a bola para trás, surpreendendo o bloqueio.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_5_3", type: "exercise" },
      // >>> AULA 5-4: Levantamento em Movimento
      { id: "5-4", title: "Levantamento em Movimento", description: "Pratique o levantamento se deslocando para a posição correta.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_5_4", type: "exercise" },
      // >>> AULA 5-5: Levantamento de Manchete
      { id: "5-5", title: "Levantamento de Manchete", description: "Use a manchete para levantar em situações de emergência.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_5_5", type: "exercise" },
      // >>> DESAFIO 5-6: Levantamento Preciso
      { id: "5-6", title: "Desafio: Levantamento Preciso", description: "Levante 10 bolas acertando a zona de ataque marcada!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_5_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 6 — Cortada
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 6,
    title: "Cortada",
    description: "Aprenda o ataque mais poderoso do vôlei",
    icon: "⚡",
    color: "secondary",
    exercises: [
      // >>> AULA 6-1: Passada de Ataque
      { id: "6-1", title: "Passada de Ataque", description: "Aprenda as 3 passadas da aproximação para a cortada.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_6_1", type: "exercise" },
      // >>> AULA 6-2: Salto e Alcance
      { id: "6-2", title: "Salto e Alcance", description: "Pratique o salto vertical e o ponto mais alto de contato.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_6_2", type: "exercise" },
      // >>> AULA 6-3: Cortada sem Bola
      { id: "6-3", title: "Cortada sem Bola", description: "Execute o movimento completo da cortada sem bola para fixar a técnica.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_6_3", type: "exercise" },
      // >>> AULA 6-4: Cortada com Levantamento
      { id: "6-4", title: "Cortada com Levantamento", description: "Pratique a cortada com um levantador, focando no timing.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_6_4", type: "exercise" },
      // >>> AULA 6-5: Cortada Diagonal e Paralela
      { id: "6-5", title: "Cortada Diagonal e Paralela", description: "Aprenda a direcionar a cortada para diferentes zonas da quadra.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_6_5", type: "exercise" },
      // >>> DESAFIO 6-6: 5 Cortadas Vencedoras
      { id: "6-6", title: "Desafio: 5 Cortadas Vencedoras", description: "Acerte 5 cortadas que toquem o chão da quadra adversária!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_6_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 7 — Bloqueio
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 7,
    title: "Bloqueio",
    description: "Aprenda a bloquear ataques adversários",
    icon: "🛡️",
    color: "accent",
    exercises: [
      // >>> AULA 7-1: Posição de Bloqueio
      { id: "7-1", title: "Posição de Bloqueio", description: "Aprenda a posição básica junto à rede para o bloqueio.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_7_1", type: "exercise" },
      // >>> AULA 7-2: Salto de Bloqueio
      { id: "7-2", title: "Salto de Bloqueio", description: "Pratique o salto vertical com as mãos acima da rede.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_7_2", type: "exercise" },
      // >>> AULA 7-3: Deslocamento Lateral
      { id: "7-3", title: "Deslocamento Lateral", description: "Treine o deslocamento lateral rápido para cobrir a rede.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_7_3", type: "exercise" },
      // >>> AULA 7-4: Bloqueio Individual
      { id: "7-4", title: "Bloqueio Individual", description: "Pratique o bloqueio 1x1 contra um atacante.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_7_4", type: "exercise" },
      // >>> AULA 7-5: Bloqueio Duplo
      { id: "7-5", title: "Bloqueio Duplo", description: "Aprenda a sincronizar o bloqueio com outro jogador.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_7_5", type: "exercise" },
      // >>> DESAFIO 7-6: Muro de Ferro
      { id: "7-6", title: "Desafio: Muro de Ferro", description: "Bloqueie 5 ataques consecutivos com sucesso!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_7_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 8 — Defesa
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 8,
    title: "Defesa",
    description: "Melhore suas habilidades defensivas",
    icon: "🏊",
    color: "gold",
    exercises: [
      // >>> AULA 8-1: Posição Defensiva
      { id: "8-1", title: "Posição Defensiva", description: "Aprenda a postura baixa e preparada para a defesa.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_8_1", type: "exercise" },
      // >>> AULA 8-2: Defesa de Manchete
      { id: "8-2", title: "Defesa de Manchete", description: "Pratique defender bolas fortes usando a manchete.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_8_2", type: "exercise" },
      // >>> AULA 8-3: Mergulho (Peixinho)
      { id: "8-3", title: "Mergulho (Peixinho)", description: "Aprenda a técnica do mergulho para alcançar bolas distantes.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_8_3", type: "exercise" },
      // >>> AULA 8-4: Rolamento
      { id: "8-4", title: "Rolamento", description: "Pratique o rolamento lateral para se recuperar após uma defesa.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_8_4", type: "exercise" },
      // >>> AULA 8-5: Defesa em Situação de Jogo
      { id: "8-5", title: "Defesa em Situação de Jogo", description: "Simule situações reais de defesa com ataques variados.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_8_5", type: "exercise" },
      // >>> DESAFIO 8-6: Defesa Impossível
      { id: "8-6", title: "Desafio: Defesa Impossível", description: "Defenda 8 de 10 ataques em sequência!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_8_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 9 — Sistemas de Jogo
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 9,
    title: "Sistemas de Jogo",
    description: "Entenda as formações e rotações",
    icon: "📋",
    color: "primary",
    exercises: [
      // >>> AULA 9-1: Posições na Quadra
      { id: "9-1", title: "Posições na Quadra", description: "Aprenda as 6 posições e suas responsabilidades no vôlei.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_9_1", type: "exercise" },
      // >>> AULA 9-2: Sistema 6x0
      { id: "9-2", title: "Sistema 6x0", description: "Entenda o sistema básico onde todos levantam.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_9_2", type: "exercise" },
      // >>> AULA 9-3: Sistema 4x2
      { id: "9-3", title: "Sistema 4x2", description: "Aprenda o sistema com 2 levantadores opostos.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_9_3", type: "exercise" },
      // >>> AULA 9-4: Sistema 5x1
      { id: "9-4", title: "Sistema 5x1", description: "Domine o sistema mais usado no vôlei moderno.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_9_4", type: "exercise" },
      // >>> AULA 9-5: Rotação e Troca
      { id: "9-5", title: "Rotação e Troca", description: "Pratique as rotações e trocas de posição após o saque.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_9_5", type: "exercise" },
      // >>> DESAFIO 9-6: Monte sua Formação
      { id: "9-6", title: "Desafio: Monte sua Formação", description: "Organize uma formação 5x1 completa com rotações!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_9_6", type: "challenge" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NÍVEL 10 — Jogo Completo
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 10,
    title: "Jogo Completo",
    description: "Coloque tudo em prática!",
    icon: "🏆",
    color: "gold",
    exercises: [
      // >>> AULA 10-1: Aquecimento Completo
      { id: "10-1", title: "Aquecimento Completo", description: "Execute uma rotina de aquecimento para vôlei com todos os fundamentos.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_10_1", type: "exercise" },
      // >>> AULA 10-2: Sequência Saque-Recepção
      { id: "10-2", title: "Sequência Saque-Recepção", description: "Pratique a sequência completa de saque e recepção com parceiros.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_10_2", type: "exercise" },
      // >>> AULA 10-3: Rally Completo
      { id: "10-3", title: "Rally Completo", description: "Execute rallies com todas as fases: recepção, levantamento e ataque.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_10_3", type: "exercise" },
      // >>> AULA 10-4: Situações Especiais
      { id: "10-4", title: "Situações Especiais", description: "Pratique bolas de segunda, largadas e ataques de fundo.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_10_4", type: "exercise" },
      // >>> AULA 10-5: Mini Jogo
      { id: "10-5", title: "Mini Jogo", description: "Jogue um set até 15 pontos aplicando todos os fundamentos.", videoUrl: "COLE_AQUI_O_LINK_DO_VIDEO_10_5", type: "exercise" },
      // >>> DESAFIO FINAL 10-6: Partida Completa
      { id: "10-6", title: "Desafio Final: Partida Completa", description: "Jogue uma partida completa de 3 sets aplicando tudo que aprendeu!", videoUrl: "COLE_AQUI_O_LINK_DO_DESAFIO_10_6", type: "challenge" },
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
  { id: "all-done", title: "Mestre do Vôlei", description: "Complete todos os exercícios", icon: "🏆", requirement: 60 },
];
