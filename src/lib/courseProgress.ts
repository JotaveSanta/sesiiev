import { levels } from "@/data/levels";

export function getPreviousLevel(levelId: number) {
  const index = levels.findIndex((level) => level.id === levelId);
  return index > 0 ? levels[index - 1] : undefined;
}

export function getActiveCompletedExercises(completedExercises: string[]) {
  const activeIds = new Set(levels.flatMap((level) => level.exercises.map((exercise) => exercise.id)));
  return [...new Set(completedExercises)].filter((id) => activeIds.has(id));
}

export function getUnlockedAchievements(totalCompleted: number, completedLevels: number, completedExercises: string[]) {
  const allExercises = levels.flatMap((level) => level.exercises);
  const unlocked: string[] = [];
  if (totalCompleted >= 1) unlocked.push("first-exercise");
  if (totalCompleted >= 5) unlocked.push("five-exercises");
  if (totalCompleted >= 10) unlocked.push("ten-exercises");
  if (totalCompleted >= 20) unlocked.push("twenty-exercises");
  if (totalCompleted >= 30) unlocked.push("half-way");
  if (totalCompleted >= allExercises.length) unlocked.push("all-done");
  if (allExercises.some((exercise) => exercise.type === "challenge" && completedExercises.includes(exercise.id))) unlocked.push("first-challenge");
  if (completedLevels >= 5) unlocked.push("five-levels");
  return unlocked;
}