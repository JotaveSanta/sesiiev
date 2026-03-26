import { achievements } from "@/data/levels";

interface AchievementsPanelProps {
  unlockedIds: string[];
}

export function AchievementsPanel({ unlockedIds }: AchievementsPanelProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-extrabold text-lg text-foreground">🏅 Conquistas</h3>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => {
          const unlocked = unlockedIds.includes(a.id);
          return (
            <div
              key={a.id}
              className={`rounded-2xl p-3 text-center transition-all ${
                unlocked ? "bg-card card-shadow animate-pop-in" : "bg-muted opacity-50"
              }`}
            >
              <div className="text-3xl mb-1">{unlocked ? a.icon : "🔒"}</div>
              <div className="font-bold text-sm text-card-foreground">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
