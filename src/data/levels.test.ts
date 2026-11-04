import { describe, expect, it } from "vitest";
import { levels } from "./levels";
import { getActiveCompletedExercises, getPreviousLevel, getUnlockedAchievements } from "@/lib/courseProgress";

describe("curriculum updates", () => {
  it("removes Manchete de Defesa without renaming existing progress IDs", () => {
    const manchete = levels.find((level) => level.id === 2);
    expect(manchete?.exercises.map((exercise) => exercise.id)).toEqual(["2-1", "2-2", "2-3", "2-4", "2-6"]);
  });

  it("uses the supplied lateral lesson video", () => {
    expect(levels.find((level) => level.id === 2)?.exercises.find((exercise) => exercise.id === "2-4")?.videoUrl).toBe("https://www.youtube.com/embed/2va9RNc6Rt8");
  });

  it("uses the supplied Manchete challenge video", () => {
    expect(levels.find((level) => level.id === 2)?.exercises.find((exercise) => exercise.type === "challenge")?.videoUrl).toBe("https://www.youtube.com/embed/kxAn8GCnzEw");
  });

  it("combines the serve modules into one module with the two supplied lessons", () => {
    const serveModules = levels.filter((level) => level.title.startsWith("Saque"));
    expect(serveModules).toHaveLength(1);
    expect(serveModules[0]?.title).toBe("Saque");
    expect(serveModules[0]?.exercises.map((exercise) => exercise.videoUrl)).toEqual([
      "https://www.youtube.com/embed/J-kV_wa69Hw",
      "https://www.youtube.com/embed/zNbTDXDsP-c",
    ]);
  });

  it("keeps Levantamento reachable after completing the combined serve module", () => {
    expect(getPreviousLevel(5)?.id).toBe(3);
  });

  it("excludes removed lessons from totals while preserving active progress", () => {
    expect(getActiveCompletedExercises(["2-4", "2-5", "4-1", "3-1", "2-4"])).toEqual(["2-4", "3-1"]);
  });

  it("awards course completion at the new total instead of 60", () => {
    const completedIds = levels.flatMap((level) => level.exercises.map((exercise) => exercise.id));
    expect(completedIds).toHaveLength(49);
    expect(getUnlockedAchievements(48, 8, completedIds.slice(0, -1))).not.toContain("all-done");
    expect(getUnlockedAchievements(49, 9, completedIds)).toContain("all-done");
  });
});