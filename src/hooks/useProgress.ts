import { useState, useCallback, useEffect } from "react";
import { levels } from "@/data/levels";

interface ProgressState {
  completedExercises: string[];
  questions: { exerciseId: string; question: string; timestamp: number }[];
}

const STORAGE_KEY = "iev-volleyball-progress";

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedExercises: [], questions: [] };
}

function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const completeExercise = useCallback((exerciseId: string) => {
    setState((prev) => {
      if (prev.completedExercises.includes(exerciseId)) return prev;
      return { ...prev, completedExercises: [...prev.completedExercises, exerciseId] };
    });
  }, []);

  const submitQuestion = useCallback((exerciseId: string, question: string) => {
    setState((prev) => ({
      ...prev,
      questions: [...prev.questions, { exerciseId, question, timestamp: Date.now() }],
    }));
  }, []);

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

  const resetProgress = useCallback(() => {
    setState({ completedExercises: [], questions: [] });
  }, []);

  return {
    completedExercises: state.completedExercises,
    questions: state.questions,
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
    resetProgress,
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
