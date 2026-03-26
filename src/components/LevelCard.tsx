import { Lock, Check, ChevronRight } from "lucide-react";
import { Level } from "@/data/levels";

interface LevelCardProps {
  level: Level;
  unlocked: boolean;
  completed: boolean;
  progress: number;
  onClick: () => void;
}

const colorClasses = {
  primary: "bg-primary card-shadow-primary",
  secondary: "bg-secondary card-shadow-secondary",
  accent: "bg-accent card-shadow-accent",
  gold: "bg-gold card-shadow-gold",
};

const bgLight = {
  primary: "bg-primary/10",
  secondary: "bg-secondary/10",
  accent: "bg-accent/10",
  gold: "bg-gold/10",
};

export function LevelCard({ level, unlocked, completed, progress, onClick }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={!unlocked}
      className={`w-full text-left rounded-2xl p-4 transition-all btn-bounce ${
        unlocked
          ? "bg-card card-shadow hover:translate-y-[-2px] cursor-pointer"
          : "bg-muted opacity-60 cursor-not-allowed"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
            unlocked ? colorClasses[level.color] : "bg-muted-foreground/20"
          }`}
        >
          {unlocked ? (
            completed ? <Check className="w-7 h-7 text-primary-foreground" /> : <span>{level.icon}</span>
          ) : (
            <Lock className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Nível {level.id}
            </span>
            {completed && (
              <span className="text-xs font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                Completo
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-card-foreground text-lg truncate">{level.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{level.description}</p>

          {unlocked && (
            <div className="mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    completed ? "bg-primary" : "bg-primary/70"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-muted-foreground mt-1 block">{progress}%</span>
            </div>
          )}
        </div>

        {unlocked && <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />}
      </div>
    </button>
  );
}
