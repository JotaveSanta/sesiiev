import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import levantador from "@/assets/atleta-levantador.jpg";
import oposto from "@/assets/atleta-oposto.jpg";
import ponteiro from "@/assets/atleta-ponteiro.jpg";
import central from "@/assets/atleta-central.jpg";
import libero from "@/assets/atleta-libero.jpg";
import tecnico from "@/assets/atleta-tecnico.jpg";

const athletes = [
  {
    name: "Bruno Rezende (Bruninho)",
    position: "Levantador",
    image: levantador,
    bio: "Capitão da seleção brasileira e considerado um dos melhores levantadores do mundo. Bicampeão olímpico (Rio 2016 e Paris 2024 como atleta de referência).",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    name: "Wallace de Souza",
    position: "Oposto",
    image: oposto,
    bio: "Conhecido por sua potência no ataque, foi campeão olímpico no Rio 2016 e um dos maiores pontuadores da história da seleção.",
    accent: "from-yellow-500 to-orange-500",
  },
  {
    name: "Ricardo Lucarelli",
    position: "Ponteiro",
    image: ponteiro,
    bio: "Ponteiro versátil, campeão olímpico no Rio 2016. Referência em recepção e ataque, tornou-se ídolo da nova geração.",
    accent: "from-green-500 to-emerald-500",
  },
  {
    name: "Lucão (Lucas Saatkamp)",
    position: "Central",
    image: central,
    bio: "Gigante de 2,07m, um dos melhores bloqueadores do mundo. Medalhista olímpico e referência defensiva da seleção brasileira.",
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    name: "Sérgio Santos (Serginho)",
    position: "Líbero",
    image: libero,
    bio: "Considerado o melhor líbero da história do vôlei mundial. Bicampeão olímpico (Atenas 2004 e Rio 2016) e símbolo da defesa brasileira.",
    accent: "from-red-500 to-pink-500",
  },
  {
    name: "Bernardo Rezende (Bernardinho)",
    position: "Técnico",
    image: tecnico,
    bio: "O treinador mais vitorioso do vôlei brasileiro. Conquistou ouro olímpico em Atenas 2004 e diversos títulos mundiais à frente da seleção.",
    accent: "from-teal-500 to-cyan-600",
  },
];

export function AthletesSection() {
  return (
    <section id="atletas" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-3 font-bold">⭐ Inspiração</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">
            Atletas que Inspiram
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça grandes nomes do vôlei brasileiro — uma referência para cada posição em quadra.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {athletes.map((a, i) => (
            <Card
              key={a.name}
              className="overflow-hidden border-2 hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`relative aspect-square bg-gradient-to-br ${a.accent}`}>
                <img
                  src={a.image}
                  alt={`Foto de ${a.name}, ${a.position} da seleção brasileira`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-background/90 text-foreground font-bold backdrop-blur-sm">
                  {a.position}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-black text-lg text-foreground mb-2">{a.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
