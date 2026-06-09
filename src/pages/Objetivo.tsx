import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";
import { Heart, Brain, Users, Activity, Target, MessageCircle } from "lucide-react";

const benefits = [
  { icon: Heart, title: "Saúde Física", text: "A prática regular de esportes fortalece o sistema cardiovascular, melhora a resistência muscular e contribui para o desenvolvimento físico saudável dos jovens." },
  { icon: Brain, title: "Saúde Mental", text: "O esporte ajuda a combater a ansiedade e o estresse, promovendo bem-estar emocional e melhorando a autoestima dos praticantes." },
  { icon: Target, title: "Disciplina", text: "Os treinos regulares ensinam responsabilidade, comprometimento e a importância de manter uma rotina organizada." },
  { icon: Users, title: "Trabalho em Equipe", text: "Esportes coletivos desenvolvem habilidades sociais essenciais como comunicação, cooperação e respeito mútuo." },
];

const volleyBenefits = [
  { icon: Activity, title: "Coordenação Motora", text: "O voleibol exige movimentos precisos e coordenados, desenvolvendo a agilidade e o controle corporal de forma excepcional." },
  { icon: Target, title: "Reflexo e Agilidade", text: "As jogadas rápidas do vôlei treinam o tempo de reação e a capacidade de tomar decisões sob pressão." },
  { icon: MessageCircle, title: "Comunicação em Equipe", text: "No vôlei, a comunicação constante entre os jogadores é fundamental, ensinando os jovens a se expressar e ouvir." },
];

const Objetivo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={() => navigate("/curso")} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-5xl block mb-4">🎯</span>
          <h1 className="text-4xl font-black text-foreground mb-4">Objetivo do Projeto</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O projeto IEV — Treinamento de Voleibol tem como objetivo principal promover o
            aprendizado do voleibol de forma interativa e acessível, utilizando tecnologia
            para tornar o ensino esportivo mais envolvente e eficaz.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
            🏃 A Importância do Esporte na Vida dos Jovens
          </h2>
          <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            O esporte desempenha um papel fundamental no desenvolvimento integral dos jovens,
            proporcionando benefícios que vão muito além do condicionamento físico.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-6 card-shadow animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
            Benefícios Específicos do Voleibol
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {volleyBenefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-6 card-shadow animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-3">
                  <b.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 text-center">
          <p className="text-foreground font-bold text-lg mb-2">
            "O esporte é a ferramenta mais poderosa para transformar vidas."
          </p>
          <p className="text-muted-foreground text-sm">
            Acreditamos que o voleibol pode ser o caminho para desenvolver não apenas atletas,
            mas cidadãos mais completos e preparados para a vida.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Objetivo;
