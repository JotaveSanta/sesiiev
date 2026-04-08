import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background:
          "linear-gradient(135deg, hsl(145 63% 42%) 0%, hsl(220 70% 55%) 50%, hsl(270 60% 58%) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="text-6xl md:text-8xl block mb-6 animate-bounce-subtle">🏐</span>
        <h2 className="text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-4">
          Aprenda Vôlei de Forma Interativa
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Uma plataforma gamificada para você dominar os fundamentos do voleibol com exercícios práticos, vídeos e desafios.
        </p>
        <Button
          onClick={onStart}
          size="lg"
          className="bg-card text-foreground hover:bg-card/90 text-base font-black px-8 py-6 rounded-2xl card-shadow btn-bounce gap-2"
        >
          Começar agora <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
