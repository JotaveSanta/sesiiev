import { describe, expect, it } from "vitest";
import { achievements, levels } from "./levels";
import { getActiveCompletedExercises, getPreviousLevel, getUnlockedAchievements } from "@/lib/courseProgress";

describe("curriculum updates", () => {
  it("awards halfway at 11 of the 21 active exercises, not 30", () => {
    const ids = levels.flatMap((level) => level.exercises.map((exercise) => exercise.id));
    expect(achievements.find((achievement) => achievement.id === "half-way")?.requirement).toBe(11);
    expect(getUnlockedAchievements(10, 1, ids.slice(0, 10))).not.toContain("half-way");
    expect(getUnlockedAchievements(11, 2, ids.slice(0, 11))).toContain("half-way");
  });

  it("keeps every achievement attainable and awards all of them on course completion", () => {
    const ids = levels.flatMap((level) => level.exercises.map((exercise) => exercise.id));
    const totals = { exercises: 21, levels: 5, challenges: 3 };
    for (const achievement of achievements) {
      expect(achievement.requirement).toBeGreaterThan(0);
      expect(achievement.requirement).toBeLessThanOrEqual(totals[achievement.metric]);
    }
    expect(getUnlockedAchievements(21, 5, ids).sort()).toEqual(achievements.map((achievement) => achievement.id).sort());
  });

  it("does not award milestones from removed lessons or inflated totals", () => {
    expect(getUnlockedAchievements(30, 5, ["2-5", "4-1", "5-1", "8-1", "9-1", "10-1"])).toEqual([]);
  });

  it("awards the levels milestone only after all five current levels", () => {
    const ids = levels.flatMap((level) => level.exercises.map((exercise) => exercise.id));
    expect(achievements.find((achievement) => achievement.id === "five-levels")?.requirement).toBe(5);
    expect(getUnlockedAchievements(20, 4, ids.slice(0, -1))).not.toContain("five-levels");
    expect(getUnlockedAchievements(21, 5, ids)).toContain("five-levels");
  });

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

  it("combines the serve modules into one module with the five supplied lessons", () => {
    const serveModules = levels.filter((level) => level.title.startsWith("Saque"));
    expect(serveModules).toHaveLength(1);
    expect(serveModules[0]?.title).toBe("Saque");
    expect(serveModules[0]?.exercises.map((exercise) => exercise.videoUrl)).toEqual([
      "https://www.youtube.com/embed/J-kV_wa69Hw",
      "https://www.youtube.com/embed/zNbTDXDsP-c",
      "https://www.youtube.com/embed/OBHs5I7u4AQ",
      "https://www.youtube.com/embed/Mn9Uv-RdyUc",
      "https://www.youtube.com/embed/OcJkD8xJqFE",
    ]);
  });

  it("keeps Ataque reachable after completing the serve module", () => {
    expect(getPreviousLevel(6)?.id).toBe(3);
  });

  it("excludes removed lessons from totals while preserving active progress", () => {
    expect(getActiveCompletedExercises(["2-4", "2-5", "4-1", "5-1", "8-1", "9-1", "10-1", "6-4", "7-3", "3-1", "2-4"])).toEqual(["2-4", "3-1"]);
  });

  it("awards course completion at the new total instead of 60", () => {
    const completedIds = levels.flatMap((level) => level.exercises.map((exercise) => exercise.id));
    expect(completedIds).toHaveLength(21);
    expect(getUnlockedAchievements(20, 4, completedIds.slice(0, -1))).not.toContain("all-done");
    expect(getUnlockedAchievements(21, 5, completedIds)).toContain("all-done");
  });
  it("removes Sistemas de Jogo and Jogo Completo while keeping module IDs stable", () => {
    expect(levels.map((level) => level.id)).toEqual([1, 2, 3, 6, 7]);
    expect(getPreviousLevel(7)?.id).toBe(6);
  });
  it("uses the three supplied Ataque lessons in order", () => {
    expect(levels.find((level) => level.id === 6)?.exercises.map((e) => [e.id, e.videoUrl])).toEqual([
      ["6-1", "https://www.youtube.com/embed/qCeoatuJE3Y"],
      ["6-2", "https://www.youtube.com/embed/sU11fUWpb8A"],
      ["6-3", "https://www.youtube.com/embed/QA0DscPC4rA"],
    ]);
  });
  it("uses the two supplied Bloqueio lessons in order", () => {
    expect(levels.find((level) => level.id === 7)?.exercises.map((e) => [e.id, e.videoUrl])).toEqual([
      ["7-1", "https://www.youtube.com/embed/AHHhCZ8rbVk"],
      ["7-2", "https://www.youtube.com/embed/Kifc2uVDLx8"],
    ]);
  });
});