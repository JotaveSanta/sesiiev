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

export const levels: Level[] = [
  {
    id: 1,
    title: "Fundamentos do Toque",
    description: "Aprenda a base do toque por cima",
    icon: "🏐",
    color: "primary",
    exercises: [
      { id: "1-1", title: "Posição das Mãos", description: "Aprenda a posicionar as mãos corretamente para o toque por cima. Dedos abertos, formando um triângulo.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "1-2", title: "Toque Parado", description: "Pratique o toque sem deslocamento, focando na técnica dos dedos e extensão dos braços.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "1-3", title: "Toque contra a Parede", description: "Execute toques contínuos contra a parede para desenvolver controle e consistência.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "1-4", title: "Toque em Dupla", description: "Troque toques com um parceiro a curta distância, mantendo a bola alta e controlada.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "1-5", title: "Toque com Deslocamento", description: "Pratique o toque se movimentando lateralmente na quadra.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "1-6", title: "Desafio: 20 Toques Seguidos", description: "Complete 20 toques consecutivos sem deixar a bola cair!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 2,
    title: "Manchete",
    description: "Domine a recepção com manchete",
    icon: "💪",
    color: "secondary",
    exercises: [
      { id: "2-1", title: "Posição dos Braços", description: "Aprenda a posição correta dos braços para a manchete: braços estendidos e juntos.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "2-2", title: "Manchete Parada", description: "Pratique a manchete sem se mover, focando no ângulo dos braços.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "2-3", title: "Recepção de Saque", description: "Receba saques leves usando a manchete, direcionando a bola para o levantador.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "2-4", title: "Manchete Lateral", description: "Pratique manchetes com deslocamento lateral para melhorar sua cobertura de quadra.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "2-5", title: "Manchete de Defesa", description: "Simule situações de defesa recebendo bolas mais fortes com manchete.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "2-6", title: "Desafio: Rally de Manchete", description: "Mantenha um rally de 15 manchetes com um parceiro!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 3,
    title: "Saque por Baixo",
    description: "Aprenda o saque básico do vôlei",
    icon: "🎯",
    color: "accent",
    exercises: [
      { id: "3-1", title: "Posição Inicial", description: "Aprenda a postura e o posicionamento dos pés para o saque por baixo.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "3-2", title: "Movimento do Braço", description: "Pratique o balanço do braço sem bola, criando o ritmo correto.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "3-3", title: "Saque na Parede", description: "Execute saques contra a parede para desenvolver precisão.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "3-4", title: "Saque por Cima da Rede", description: "Pratique sacando por cima da rede de diferentes distâncias.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "3-5", title: "Saque Direcionado", description: "Tente acertar alvos específicos na quadra adversária.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "3-6", title: "Desafio: 5 Saques Certeiros", description: "Acerte 5 saques em zonas marcadas da quadra!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 4,
    title: "Saque por Cima",
    description: "Evolua para o saque viagem",
    icon: "🚀",
    color: "gold",
    exercises: [
      { id: "4-1", title: "Lançamento da Bola", description: "Pratique lançar a bola na altura e posição corretas para o saque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "4-2", title: "Movimento Completo", description: "Combine o lançamento com o movimento do braço em câmera lenta.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "4-3", title: "Saque sem Rede", description: "Execute o saque completo focando na técnica, sem se preocupar com a rede.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "4-4", title: "Saque com Rede", description: "Pratique o saque por cima passando a bola por cima da rede.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "4-5", title: "Potência e Controle", description: "Trabalhe o equilíbrio entre potência e direção no saque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "4-6", title: "Desafio: Saque Ace", description: "Marque 3 aces em 10 tentativas de saque!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 5,
    title: "Levantamento",
    description: "Aprenda a levantar a bola para o ataque",
    icon: "⬆️",
    color: "primary",
    exercises: [
      { id: "5-1", title: "Toque de Levantamento", description: "Pratique o toque alto e preciso para posicionar a bola no ataque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "5-2", title: "Levantamento Frontal", description: "Levante a bola para frente com controle de altura e direção.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "5-3", title: "Levantamento de Costas", description: "Aprenda a levantar a bola para trás, surpreendendo o bloqueio.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "5-4", title: "Levantamento em Movimento", description: "Pratique o levantamento se deslocando para a posição correta.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "5-5", title: "Levantamento de Manchete", description: "Use a manchete para levantar em situações de emergência.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "5-6", title: "Desafio: Levantamento Preciso", description: "Levante 10 bolas acertando a zona de ataque marcada!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 6,
    title: "Cortada",
    description: "Aprenda o ataque mais poderoso do vôlei",
    icon: "⚡",
    color: "secondary",
    exercises: [
      { id: "6-1", title: "Passada de Ataque", description: "Aprenda as 3 passadas da aproximação para a cortada.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "6-2", title: "Salto e Alcance", description: "Pratique o salto vertical e o ponto mais alto de contato.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "6-3", title: "Cortada sem Bola", description: "Execute o movimento completo da cortada sem bola para fixar a técnica.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "6-4", title: "Cortada com Levantamento", description: "Pratique a cortada com um levantador, focando no timing.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "6-5", title: "Cortada Diagonal e Paralela", description: "Aprenda a direcionar a cortada para diferentes zonas da quadra.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "6-6", title: "Desafio: 5 Cortadas Vencedoras", description: "Acerte 5 cortadas que toquem o chão da quadra adversária!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 7,
    title: "Bloqueio",
    description: "Aprenda a bloquear ataques adversários",
    icon: "🛡️",
    color: "accent",
    exercises: [
      { id: "7-1", title: "Posição de Bloqueio", description: "Aprenda a posição básica junto à rede para o bloqueio.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "7-2", title: "Salto de Bloqueio", description: "Pratique o salto vertical com as mãos acima da rede.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "7-3", title: "Deslocamento Lateral", description: "Treine o deslocamento lateral rápido para cobrir a rede.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "7-4", title: "Bloqueio Individual", description: "Pratique o bloqueio 1x1 contra um atacante.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "7-5", title: "Bloqueio Duplo", description: "Aprenda a sincronizar o bloqueio com outro jogador.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "7-6", title: "Desafio: Muro de Ferro", description: "Bloqueie 5 ataques consecutivos com sucesso!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 8,
    title: "Defesa",
    description: "Melhore suas habilidades defensivas",
    icon: "🏊",
    color: "gold",
    exercises: [
      { id: "8-1", title: "Posição Defensiva", description: "Aprenda a postura baixa e preparada para a defesa.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "8-2", title: "Defesa de Manchete", description: "Pratique defender bolas fortes usando a manchete.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "8-3", title: "Mergulho (Peixinho)", description: "Aprenda a técnica do mergulho para alcançar bolas distantes.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "8-4", title: "Rolamento", description: "Pratique o rolamento lateral para se recuperar após uma defesa.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "8-5", title: "Defesa em Situação de Jogo", description: "Simule situações reais de defesa com ataques variados.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "8-6", title: "Desafio: Defesa Impossível", description: "Defenda 8 de 10 ataques em sequência!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 9,
    title: "Sistemas de Jogo",
    description: "Entenda as formações e rotações",
    icon: "📋",
    color: "primary",
    exercises: [
      { id: "9-1", title: "Posições na Quadra", description: "Aprenda as 6 posições e suas responsabilidades no vôlei.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "9-2", title: "Sistema 6x0", description: "Entenda o sistema básico onde todos levantam.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "9-3", title: "Sistema 4x2", description: "Aprenda o sistema com 2 levantadores opostos.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "9-4", title: "Sistema 5x1", description: "Domine o sistema mais usado no vôlei moderno.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "9-5", title: "Rotação e Troca", description: "Pratique as rotações e trocas de posição após o saque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "9-6", title: "Desafio: Monte sua Formação", description: "Organize uma formação 5x1 completa com rotações!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
    ],
  },
  {
    id: 10,
    title: "Jogo Completo",
    description: "Coloque tudo em prática!",
    icon: "🏆",
    color: "gold",
    exercises: [
      { id: "10-1", title: "Aquecimento Completo", description: "Execute uma rotina de aquecimento para vôlei com todos os fundamentos.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "10-2", title: "Sequência Saque-Recepção", description: "Pratique a sequência completa de saque e recepção com parceiros.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "10-3", title: "Rally Completo", description: "Execute rallies com todas as fases: recepção, levantamento e ataque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "10-4", title: "Situações Especiais", description: "Pratique bolas de segunda, largadas e ataques de fundo.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "10-5", title: "Mini Jogo", description: "Jogue um set até 15 pontos aplicando todos os fundamentos.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "exercise" },
      { id: "10-6", title: "Desafio Final: Partida Completa", description: "Jogue uma partida completa de 3 sets aplicando tudo que aprendeu!", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "challenge" },
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
