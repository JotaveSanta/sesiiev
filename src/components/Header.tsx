import { Instagram } from "lucide-react";

interface HeaderProps {
  overallProgress: number;
  totalCompleted: number;
  totalExercises: number;
}

export function Header({ overallProgress, totalCompleted, totalExercises }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-black text-xl text-foreground tracking-tight">IEV Volleyball</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-xp-blue">⚡ {totalCompleted} XP</span>
            <a
              href="https://instagram.com/iev_sesi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs font-semibold text-muted-foreground">Progresso geral</span>
          <span className="text-xs font-bold text-primary">{overallProgress}%</span>
        </div>
      </div>
    </header>
  );
}
