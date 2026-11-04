import { useState, useCallback, useEffect } from "react";
import { levels } from "@/data/levels";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getPreviousLevel, getActiveCompletedExercises, getUnlockedAchievements } from "@/lib/courseProgress";

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
      const { error } = await supabase.from("user_progress").insert({
        user_id: user.id,
        exercise_id: exerciseId,
      });
      if (error && error.code !== "23505") {
        setState((prev) => ({ completedExercises: prev.completedExercises.filter((id) => id !== exerciseId) }));
      }
    },
    [user]
  );

  const submitQuestion = useCallback(
    async (exerciseId: string, question: string) => {
      if (!user) return false;
      const { error } = await supabase.from("questions").insert({
        user_id: user.id,
        exercise_id: exerciseId,
        question_text: question,
      });
      return !error;
    },
    [user]
  );

  const isExerciseCompleted = useCallback(
    (exerciseId: string) => state.completedExercises.includes(exerciseId),
    [state.completedExercises]
  );

  const isLevelUnlocked = useCallback(
    (levelId: number) => {
      if (levelId === levels[0]?.id) return true;
      const prevLevel = getPreviousLevel(levelId);
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
  const activeCompletedExercises = getActiveCompletedExercises(state.completedExercises);
  const totalCompleted = activeCompletedExercises.length;
  const overallProgress = Math.round((totalCompleted / totalExercises) * 100);
  const completedLevels = levels.filter((l) => isLevelCompleted(l.id)).length;

  const unlockedAchievements = getUnlockedAchievements(totalCompleted, completedLevels, activeCompletedExercises);

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

