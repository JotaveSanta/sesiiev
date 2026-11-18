import { describe, expect, it } from "vitest";
import { replySchema, videoExtension, lessonAddress } from "./teacherResponses";

describe("teacher replies", () => {
  it("accepts a text-only reply with optional video and lesson omitted", () => {
    expect(replySchema.parse({ message: "Estenda os braços ao tocar a bola.", videoUrl: "", lessonId: "" }).message).toBe("Estenda os braços ao tocar a bola.");
  });
  it("accepts an optional HTTPS video link", () => {
    expect(replySchema.safeParse({ message: "Veja a demonstração.", videoUrl: "https://youtu.be/LObT56HrKLU", lessonId: "1-1" }).success).toBe(true);
    expect(replySchema.safeParse({ message: "Veja a demonstração.", videoUrl: "javascript:alert(1)", lessonId: "" }).success).toBe(false);
  });
  it("points to the specific active lesson", () => {
    expect(lessonAddress("1-1")).toBe("/curso?aula=1-1");
    expect(replySchema.safeParse({ message: "Veja esta aula.", videoUrl: "", lessonId: "5-1" }).success).toBe(false);
  });
  it("allows a supported video file, rejects unsupported or oversized files", () => {
    expect(videoExtension({ type: "video/mp4", size: 1024 })).toBe("mp4");
    expect(() => videoExtension({ type: "text/html", size: 1024 })).toThrow();
    expect(() => videoExtension({ type: "video/mp4", size: 50 * 1024 * 1024 + 1 })).toThrow();
  });
});