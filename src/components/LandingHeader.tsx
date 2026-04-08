import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingHeaderProps {
  onStart: () => void;
}

export function LandingHeader({ onStart }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-black text-lg text-foreground tracking-tight">
          🏐 Treinamento de Voleibol IEV
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollTo("hero")} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            Início
          </button>
          <button onClick={() => scrollTo("equipe")} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            Equipe
          </button>
          <button onClick={() => scrollTo("sobre")} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </button>
          <Button onClick={onStart} size="sm" className="btn-bounce card-shadow-primary">
            Começar Treinamento
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3 animate-fade-in">
          <button onClick={() => scrollTo("hero")} className="block w-full text-left text-sm font-bold text-muted-foreground hover:text-foreground">
            Início
          </button>
          <button onClick={() => scrollTo("equipe")} className="block w-full text-left text-sm font-bold text-muted-foreground hover:text-foreground">
            Equipe
          </button>
          <button onClick={() => scrollTo("sobre")} className="block w-full text-left text-sm font-bold text-muted-foreground hover:text-foreground">
            Sobre
          </button>
          <Button onClick={onStart} className="w-full btn-bounce card-shadow-primary">
            Começar Treinamento
          </Button>
        </div>
      )}
    </header>
  );
}
