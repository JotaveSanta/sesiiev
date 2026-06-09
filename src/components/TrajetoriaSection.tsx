const timelineEvents = [
  { year: "2024", title: "O Início da Jornada", text: "Tudo começou quando o grupo se reuniu pela primeira vez no colégio SESI Albino Marques Gomes. Compartilhando o amor pelo voleibol e pela tecnologia, surgiu a ideia de criar algo que unisse essas duas paixões." },
  { year: "2024", title: "A Ideia do Projeto", text: "Durante as aulas, percebemos que muitos colegas tinham dificuldade em aprender os fundamentos do vôlei de forma teórica. Foi então que nasceu a ideia de uma plataforma interativa que ensinasse voleibol de maneira gamificada e visual." },
  { year: "2024", title: "Pesquisa e Planejamento", text: "Dedicamos semanas pesquisando metodologias de ensino esportivo, analisando plataformas como o Duolingo, e planejando cada detalhe da nossa plataforma — desde os exercícios até a gamificação." },
  { year: "2025", title: "Desenvolvimento da Plataforma", text: "Com muito esforço e trabalho em equipe, começamos a desenvolver a plataforma. Cada integrante contribuiu com suas habilidades únicas para criar uma experiência de aprendizado completa e envolvente." },
  { year: "2025", title: "O Resultado Final", text: "Hoje, o IEV — Treinamento de Voleibol é uma plataforma completa com sistema de trilhas, exercícios práticos, vídeos educativos e gamificação. Um projeto que representa não apenas nosso aprendizado técnico, mas também nosso crescimento como equipe." },
];

export function TrajetoriaSection() {
  return (
    <section id="trajetoria" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Nossa Trajetória</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A história de como cinco estudantes transformaram uma paixão pelo vôlei
            em uma plataforma educacional inovadora.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-8">
            {timelineEvents.map((event, i) => (
              <div key={i} className="relative pl-16">
                <div className="absolute left-3.5 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                <span className="text-xs font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                  {event.year}
                </span>
                <h3 className="text-lg font-extrabold text-foreground mt-2 mb-1">{event.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{event.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
