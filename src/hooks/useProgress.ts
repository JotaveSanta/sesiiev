import { useState, useCallback, useEffect } from "react";
import { levels } from "@/data/levels";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProgressState {
  completedExercises: string[];
}

export function useProgress() {
  const { user } = useAuth();
  const [state, setState] = useState<ProgressState>({ completedExercises: [] });
  const [loading, setLoading] = useState(true);

  // Load progress from DB
  useEffect(() => {
    if (!user) {
      setState({ completedExercises: [] });
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("exercise_id")
        .eq("user_id", user.id);

      setState({ completedExercises: data?.map((d) => d.exercise_id) ?? [] });
      setLoading(false);
    };
    fetchProgress();
  }, [user]);

  const completeExercise = useCallback(
    async (exerciseId: string) => {
      if (!user) return;
      setState((prev) => {
        if (prev.completedExercises.includes(exerciseId)) return prev;
        return { completedExercises: [...prev.completedExercises, exerciseId] };
      });
      await supabase.from("user_progress").insert({
        user_id: user.id,
        exercise_id: exerciseId,
      });
    },
    [user]
  );

  const submitQuestion = useCallback(
    async (exerciseId: string, question: string) => {
      if (!user) return;
      await supabase.from("questions").insert({
        user_id: user.id,
        exercise_id: exerciseId,
        question_text: question,
      });
    },
    [user]
  );

  const isExerciseCompleted = useCallback(
    (exerciseId: string) => state.completedExercises.includes(exerciseId),
    [state.completedExercises]
  );

  const isLevelUnlocked = useCallback(
    (levelId: number) => {
      if (levelId === 1) return true;
      const prevLevel = levels.find((l) => l.id === levelId - 1);
      if (!prevLevel) return false;
      return prevLevel.exercises.every((e) => state.completedExercises.includes(e.id));
    },
    [state.completedExercises]
  );

  const isLevelCompleted = useCallback(
    (levelId: number) => {
      const level = levels.find((l) => l.id === levelId);
      if (!level) return false;
      return level.exercises.every((e) => state.completedExercises.includes(e.id));
    },
    [state.completedExercises]
  );

  const getLevelProgress = useCallback(
    (levelId: number) => {
      const level = levels.find((l) => l.id === levelId);
      if (!level) return 0;
      const completed = level.exercises.filter((e) => state.completedExercises.includes(e.id)).length;
      return Math.round((completed / level.exercises.length) * 100);
    },
    [state.completedExercises]
  );

  const totalExercises = levels.reduce((acc, l) => acc + l.exercises.length, 0);
  const totalCompleted = state.completedExercises.length;
  const overallProgress = Math.round((totalCompleted / totalExercises) * 100);
  const completedLevels = levels.filter((l) => isLevelCompleted(l.id)).length;

  const unlockedAchievements = getUnlockedAchievements(totalCompleted, completedLevels, state.completedExercises);

  return {
    completedExercises: state.completedExercises,
    completeExercise,
    submitQuestion,
    isExerciseCompleted,
    isLevelUnlocked,
    isLevelCompleted,
    getLevelProgress,
    overallProgress,
    totalCompleted,
    totalExercises,
    completedLevels,
    unlockedAchievements,
    loading,
  };
}

function getUnlockedAchievements(totalCompleted: number, completedLevels: number, completedExercises: string[]) {
  const unlocked: string[] = [];
  if (totalCompleted >= 1) unlocked.push("first-exercise");
  if (totalCompleted >= 5) unlocked.push("five-exercises");
  if (totalCompleted >= 10) unlocked.push("ten-exercises");
  if (totalCompleted >= 20) unlocked.push("twenty-exercises");
  if (totalCompleted >= 30) unlocked.push("half-way");
  if (totalCompleted >= 60) unlocked.push("all-done");
  if (completedExercises.some((id) => id.endsWith("-6"))) unlocked.push("first-challenge");
  if (completedLevels >= 5) unlocked.push("five-levels");
  return unlocked;
}
