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