import { User } from "lucide-react";

const teamMembers = [
  {
    name: "João Vitor Santanna",
    role: "Desenvolvedor & Jogador",
    emoji: "🏐",
    color: "from-primary to-primary/70",
    shadow: "card-shadow-primary",
    delay: "0s",
  },
  {
    name: "Thomaz Porfirio de Oliveira",
    role: "Criador de Conteúdo",
    emoji: "📋",
    color: "from-secondary to-secondary/70",
    shadow: "card-shadow-secondary",
    delay: "0.3s",
  },
  {
    name: "Lucca Stuart Zanotto",
    role: "Designer & Estrategista",
    emoji: "🎨",
    color: "from-accent to-accent/70",
    shadow: "card-shadow-accent",
    delay: "0.6s",
  },
  {
    name: "Ricardo da Silva Bittencourt",
    role: "Pesquisador & Analista",
    emoji: "📊",
    color: "from-primary to-secondary",
    shadow: "card-shadow-primary",
    delay: "0.9s",
  },
  {
    name: "Membro da Equipe",
    role: "Colaborador",
    emoji: "⭐",
    color: "from-gold/80 to-gold/50",
    shadow: "card-shadow-gold",
    delay: "1.2s",
  },
];

export function TeamSection() {
  return (
    <section id="equipe" className="py-20 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">
            Nossa Equipe 🌴
          </h2>
          <p className="text-muted-foreground">
            Conheça os criadores por trás do projeto
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center animate-pop-in"
              style={{ animationDelay: member.delay }}
            >
              {/* Floating island */}
              <div
                className={`relative group`}
                style={{ animation: `float 4s ease-in-out infinite`, animationDelay: member.delay }}
              >
                {/* Island platform */}
                <div
                  className={`w-36 h-36 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br ${member.color} ${member.shadow} flex items-center justify-center transition-transform group-hover:scale-105`}
                >
                  {/* Avatar circle */}
                  <div className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center border-4 border-primary-foreground/30">
                    <User className="w-10 h-10 text-primary-foreground/80" />
                  </div>
                </div>

                {/* Emoji badge */}
                <span className="absolute -top-2 -right-2 text-2xl animate-bounce-subtle">
                  {member.emoji}
                </span>

                {/* Island shadow on "ground" */}
                <div className="mx-auto mt-3 w-24 h-3 bg-foreground/5 rounded-full blur-sm" />
              </div>

              {/* Info below island */}
              <h3 className="mt-4 font-extrabold text-foreground text-center text-sm leading-tight">
                {member.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
