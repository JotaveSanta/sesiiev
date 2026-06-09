import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-volleyball.png.asset.json";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-28 md:py-40"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage.url})` }}
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-5 tracking-tight">
          Aprenda Vôlei de Forma Interativa
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 font-medium">
          Uma plataforma educacional para você dominar os fundamentos do voleibol com exercícios práticos, vídeos e desafios.
        </p>
        <Button
          onClick={onStart}
          size="lg"
          className="bg-card text-foreground hover:bg-card/90 text-base font-bold px-8 py-6 rounded-xl card-shadow btn-bounce gap-2"
        >
          Começar agora <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
