import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LandingHeaderProps {
  onStart: () => void;
}

// Navegação principal — mantida enxuta para um visual profissional.
// "Sobre o projeto" agrupa as páginas institucionais (Objetivo, Trajetória, Equipe, Validação)
// em um único menu dropdown, evitando poluição na barra superior.
const primaryLinks = [
  { label: "Início", href: "/#hero" },
  { label: "Regras", href: "/#regras" },
  { label: "Sistema 5x1", href: "/sistema-5x1" },
  { label: "Atletas", href: "/#atletas" },
  { label: "Curso", href: "/curso" },
  { label: "Feedback", href: "/feedback" },
];

const aboutLinks = [
  { label: "Objetivo", href: "/#objetivo" },
  { label: "Trajetória", href: "/#trajetoria" },
  { label: "Equipe", href: "/#equipe" },
  { label: "Validação", href: "/#validacao" },
];

export function LandingHeader({ onStart }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, displayName, signOut } = useAuth();

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-black text-lg text-foreground tracking-tight">
          IEV Voleibol
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {primaryLinks.slice(0, 1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors outline-none">
              Sobre <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-card">
              {aboutLinks.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="font-semibold cursor-pointer"
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {primaryLinks.slice(1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}

          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {displayName}
              </span>
              <Button onClick={signOut} variant="outline" size="sm" className="btn-bounce gap-1">
                <LogOut className="w-3.5 h-3.5" /> Sair
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth")} size="sm" className="btn-bounce card-shadow-primary gap-1">
              <LogIn className="w-3.5 h-3.5" /> Entrar
            </Button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 space-y-3 animate-fade-in">
          {primaryLinks.slice(0, 1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="block w-full text-left text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Sobre</p>
            <div className="space-y-2 pl-2 border-l-2 border-border">
              {aboutLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {primaryLinks.slice(1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="block w-full text-left text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </button>
          ))}

          {user ? (
            <>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {displayName}
              </p>
              <Button onClick={signOut} variant="outline" className="w-full btn-bounce gap-1">
                <LogOut className="w-3.5 h-3.5" /> Sair
              </Button>
            </>
          ) : (
            <Button onClick={() => { setMenuOpen(false); navigate("/auth"); }} className="w-full btn-bounce card-shadow-primary gap-1">
              <LogIn className="w-3.5 h-3.5" /> Entrar
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
