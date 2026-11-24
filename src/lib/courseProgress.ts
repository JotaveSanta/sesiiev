import { achievements, levels } from "@/data/levels";

export function getPreviousLevel(levelId: number) {
  const index = levels.findIndex((level) => level.id === levelId);
  return index > 0 ? levels[index - 1] : undefined;
}

export function getActiveCompletedExercises(completedExercises: string[]) {
  const activeIds = new Set(levels.flatMap((level) => level.exercises.map((exercise) => exercise.id)));
  return [...new Set(completedExercises)].filter((id) => activeIds.has(id));
}

export function getUnlockedAchievements(totalCompleted: number, completedLevels: number, completedExercises: string[]) {
  const activeIds = new Set(getActiveCompletedExercises(completedExercises));
  const metrics = {
    exercises: Math.min(totalCompleted, activeIds.size),
    levels: Math.min(completedLevels, levels.filter((level) => level.exercises.every((exercise) => activeIds.has(exercise.id))).length),
    challenges: levels.flatMap((level) => level.exercises).filter((exercise) => exercise.type === "challenge" && activeIds.has(exercise.id)).length,
  };
  return achievements.filter((achievement) => metrics[achievement.metric] >= achievement.requirement).map((achievement) => achievement.id);
}