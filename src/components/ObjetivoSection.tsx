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

export function ObjetivoSection() {
  return (
    <section id="objetivo" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Objetivo do Projeto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O projeto IEV — Treinamento de Voleibol tem como objetivo principal promover o
            aprendizado do voleibol de forma interativa e acessível, utilizando tecnologia
            para tornar o ensino esportivo mais envolvente e eficaz.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-extrabold text-foreground mb-6 text-center">
            A Importância do Esporte na Vida dos Jovens
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-6 card-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground">{b.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-foreground mb-6 text-center">
            Benefícios Específicos do Voleibol
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {volleyBenefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-6 card-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-3">
                  <b.icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">{b.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
