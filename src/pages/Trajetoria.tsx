import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";

const timelineEvents = [
  {
    year: "2024",
    title: "O Início da Jornada",
    text: "Tudo começou quando o grupo se reuniu pela primeira vez no colégio SESI Albino Marques Gomes. Compartilhando o amor pelo voleibol e pela tecnologia, surgiu a ideia de criar algo que unisse essas duas paixões.",
  },
  {
    year: "2024",
    title: "A Ideia do Projeto",
    text: "Durante as aulas, percebemos que muitos colegas tinham dificuldade em aprender os fundamentos do vôlei de forma teórica. Foi então que nasceu a ideia de uma plataforma interativa que ensinasse voleibol de maneira gamificada e visual.",
  },
  {
    year: "2024",
    title: "Pesquisa e Planejamento",
    text: "Dedicamos semanas pesquisando metodologias de ensino esportivo, analisando plataformas como o Duolingo, e planejando cada detalhe da nossa plataforma — desde os exercícios até a gamificação.",
  },
  {
    year: "2025",
    title: "Desenvolvimento da Plataforma",
    text: "Com muito esforço e trabalho em equipe, começamos a desenvolver a plataforma. Cada integrante contribuiu com suas habilidades únicas para criar uma experiência de aprendizado completa e envolvente.",
  },
  {
    year: "2025",
    title: "O Resultado Final",
    text: "Hoje, o IEV — Treinamento de Voleibol é uma plataforma completa com sistema de trilhas, exercícios práticos, vídeos educativos e gamificação. Um projeto que representa não apenas nosso aprendizado técnico, mas também nosso crescimento como equipe.",
  },
];

const Trajetoria = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={() => navigate("/curso")} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-5xl block mb-4">📖</span>
          <h1 className="text-4xl font-black text-foreground mb-4">Nossa Trajetória</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A história de como cinco estudantes transformaram uma paixão pelo vôlei
            em uma plataforma educacional inovadora.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {timelineEvents.map((event, i) => (
              <div key={i} className="relative pl-16 animate-fade-in">
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

        <div className="mt-12 bg-card rounded-2xl p-8 card-shadow text-center">
          <p className="text-foreground font-bold text-lg mb-2">
            "Cada passo dessa jornada nos ensinou algo valioso."
          </p>
          <p className="text-muted-foreground text-sm">
            Agradecemos à escola SESI Albino Marques Gomes, nossos professores e todos que apoiaram este projeto.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trajetoria;
