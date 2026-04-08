import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { LevelCard } from "@/components/LevelCard";
import { ExerciseView } from "@/components/ExerciseView";
import { AchievementsPanel } from "@/components/AchievementsPanel";
import { Footer } from "@/components/Footer";
import { ArrowLeft, LogIn } from "lucide-react";
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
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-6xl block mb-4">🏐</span>
          <h1 className="text-2xl font-black text-foreground mb-2">Faça login para treinar</h1>
          <p className="text-muted-foreground mb-6">Seu progresso será salvo automaticamente.</p>
          <Button onClick={() => navigate("/auth")} className="btn-bounce card-shadow-primary gap-2">
            <LogIn className="w-4 h-4" /> Entrar ou Criar Conta
          </Button>
        </div>
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
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 btn-bounce font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <div className="mb-6">
            <span className="text-4xl mb-2 block">{level.icon}</span>
            <h2 className="text-2xl font-extrabold text-foreground">{level.title}</h2>
            <p className="text-muted-foreground">{level.description}</p>
            <div className="mt-3 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress.getLevelProgress(level.id)}%` }}
              />
            </div>
          </div>
          <div className="space-y-3">
            {level.exercises.map((exercise, idx) => {
              const completed = progress.isExerciseCompleted(exercise.id);
              const prevCompleted = idx === 0 || progress.isExerciseCompleted(level.exercises[idx - 1].id);
              const unlocked = prevCompleted || completed;

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
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                        completed
                          ? "bg-primary text-primary-foreground"
                          : exercise.type === "challenge"
                          ? "bg-gold text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completed ? "✓" : exercise.type === "challenge" ? "🏆" : idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-card-foreground truncate">{exercise.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{exercise.description}</p>
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
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between py-4">
          <div>
            <h2 className="text-2xl font-black text-foreground">Trilha de Aprendizado</h2>
            <p className="text-muted-foreground text-sm mt-1">Complete os níveis para dominar o vôlei! 🏐</p>
          </div>
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

        <AchievementsPanel unlockedIds={progress.unlockedAchievements} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        overallProgress={progress.overallProgress}
        totalCompleted={progress.totalCompleted}
        totalExercises={progress.totalExercises}
      />
      <main className="max-w-lg mx-auto px-4 py-6">{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default Course;
