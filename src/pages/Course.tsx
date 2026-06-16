import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { LandingHeader } from "@/components/LandingHeader";
import { LevelCard } from "@/components/LevelCard";
import { ExerciseView } from "@/components/ExerciseView";
import { AchievementsPanel } from "@/components/AchievementsPanel";
import { Footer } from "@/components/Footer";
import { ArrowLeft, LogIn, Trophy, Target, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type View =
  | { type: "path" }
  | { type: "level"; levelId: number }
  | { type: "exercise"; levelId: number; exerciseIndex: number };

const Course = () => {
  const [view, setView] = useState<View>({ type: "path" });
  const progress = useProgress();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <LandingHeader onStart={() => {}} />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md text-center bg-card card-shadow rounded-3xl p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-foreground mb-2">Faça login para treinar</h1>
            <p className="text-muted-foreground mb-6">Seu progresso será salvo automaticamente em todos os dispositivos.</p>
            <Button onClick={() => navigate("/auth")} className="btn-bounce card-shadow-primary gap-2 h-12 px-6">
              <LogIn className="w-4 h-4" /> Entrar ou Criar Conta
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderContent = () => {
    if (view.type === "exercise") {
      const level = levels.find((l) => l.id === view.levelId)!;
      const exercise = level.exercises[view.exerciseIndex];
      const regularExercises = level.exercises.filter((e) => e.type === "exercise");
      const exerciseNumber = exercise.type === "challenge"
        ? regularExercises.length + 1
        : regularExercises.indexOf(exercise) + 1;

      return (
        <ExerciseView
          exercise={exercise}
          isCompleted={progress.isExerciseCompleted(exercise.id)}
          onComplete={() => progress.completeExercise(exercise.id)}
          onSubmitQuestion={(q) => progress.submitQuestion(exercise.id, q)}
          onBack={() => setView({ type: "level", levelId: view.levelId })}
          exerciseNumber={exerciseNumber}
          totalExercises={level.exercises.length}
        />
      );
    }

    if (view.type === "level") {
      const level = levels.find((l) => l.id === view.levelId)!;
      return (
        <div className="animate-pop-in">
          <button
            onClick={() => setView({ type: "path" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 btn-bounce font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar à trilha
          </button>

          <div className="bg-card card-shadow rounded-3xl p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                {level.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Nível {level.id}
                </span>
                <h2 className="text-2xl font-extrabold text-foreground">{level.title}</h2>
                <p className="text-muted-foreground text-sm">{level.description}</p>
              </div>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress.getLevelProgress(level.id)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-semibold text-muted-foreground">Progresso do nível</span>
              <span className="text-xs font-bold text-primary">{progress.getLevelProgress(level.id)}%</span>
            </div>
          </div>

          <div className="space-y-3">
            {level.exercises.map((exercise, idx) => {
              const completed = progress.isExerciseCompleted(exercise.id);
              const prevCompleted = idx === 0 || progress.isExerciseCompleted(level.exercises[idx - 1].id);
              const unlocked = prevCompleted || completed;
              const isChallenge = exercise.type === "challenge";

              return (
                <button
                  key={exercise.id}
                  disabled={!unlocked}
                  onClick={() => setView({ type: "exercise", levelId: level.id, exerciseIndex: idx })}
                  className={`w-full text-left rounded-2xl p-4 transition-all btn-bounce ${
                    unlocked
                      ? "bg-card card-shadow hover:translate-y-[-2px] cursor-pointer"
                      : "bg-muted opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 ${
                        completed
                          ? "bg-primary text-primary-foreground"
                          : isChallenge
                          ? "bg-gold text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completed ? "✓" : isChallenge ? <Trophy className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {isChallenge ? "Desafio Final" : `Exercício ${idx + 1}`}
                        </span>
                        {completed && (
                          <span className="text-[10px] font-bold text-primary bg-primary/15 px-1.5 py-0.5 rounded-full">
                            Concluído
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-card-foreground truncate">{exercise.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{exercise.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Learning path view
    const completedLevels = levels.filter((l) => progress.isLevelCompleted(l.id)).length;

    return (
      <div className="space-y-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-6 sm:p-8 text-primary-foreground card-shadow-primary">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-3 py-1 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Trilha Interativa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-2 leading-tight">
              Olá! Pronto para o próximo treino?
            </h2>
            <p className="text-primary-foreground/90 text-sm mb-5 max-w-md">
              Avance pelos níveis, conclua desafios e domine os fundamentos do voleibol.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <StatChip icon={<Flame className="w-4 h-4" />} label="XP" value={progress.totalCompleted} />
              <StatChip icon={<Target className="w-4 h-4" />} label="Progresso" value={`${progress.overallProgress}%`} />
              <StatChip icon={<Trophy className="w-4 h-4" />} label="Níveis" value={`${completedLevels}/${levels.length}`} />
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="bg-card card-shadow rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">Progresso geral</span>
            <span className="text-sm font-black text-primary">{progress.overallProgress}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
              style={{ width: `${progress.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Levels */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-foreground">Trilha de Aprendizado</h3>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-semibold btn-bounce"
            >
              <ArrowLeft className="w-4 h-4" /> Início
            </button>
          </div>
          <div className="space-y-4">
            {levels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                unlocked={progress.isLevelUnlocked(level.id)}
                completed={progress.isLevelCompleted(level.id)}
                progress={progress.getLevelProgress(level.id)}
                onClick={() => {
                  if (progress.isLevelUnlocked(level.id)) {
                    setView({ type: "level", levelId: level.id });
                  }
                }}
              />
            ))}
          </div>
        </div>

        <AchievementsPanel unlockedIds={progress.unlockedAchievements} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingHeader onStart={() => {}} />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">{renderContent()}</main>
      <Footer />
    </div>
  );
};

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl px-3 py-2.5 border border-white/20">
      <div className="flex items-center gap-1.5 text-primary-foreground/80 text-[10px] font-bold uppercase tracking-wider">
        {icon} {label}
      </div>
      <div className="text-lg sm:text-xl font-black mt-0.5">{value}</div>
    </div>
  );
}

export default Course;
