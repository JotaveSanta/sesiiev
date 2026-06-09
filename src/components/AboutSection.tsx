import { Instagram, School, Target } from "lucide-react";

export function AboutSection() {
  return (
    <section id="sobre" className="py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          Sobre o Projeto
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
          O IEV Volleyball Training é uma plataforma interativa criada para ensinar os fundamentos do voleibol de forma gamificada. Com exercícios práticos, vídeos e desafios, nosso objetivo é tornar o aprendizado mais divertido e acessível.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 card-shadow">
            <School className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-extrabold text-foreground mb-1">Escola</h3>
            <p className="text-sm text-muted-foreground">SESI Albino Marques Gomes</p>
          </div>

          <div className="bg-card rounded-2xl p-6 card-shadow">
            <Target className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-extrabold text-foreground mb-1">Objetivo</h3>
            <p className="text-sm text-muted-foreground">Ensinar vôlei de forma interativa e gamificada</p>
          </div>

          <div className="bg-card rounded-2xl p-6 card-shadow">
            <Instagram className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-extrabold text-foreground mb-1">Instagram</h3>
            <a
              href="https://instagram.com/iev_sesi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline"
            >
              @iev_sesi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
