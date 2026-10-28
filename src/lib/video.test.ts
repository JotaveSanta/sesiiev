import { describe, expect, it } from "vitest";
import { isPlayableVideoUrl } from "./video";

describe("isPlayableVideoUrl", () => {
  it("accepts a YouTube embed lesson link", () => {
    expect(isPlayableVideoUrl("https://www.youtube.com/embed/LObT56HrKLU")).toBe(true);
  });

  it("does not try to play a pending lesson placeholder", () => {
    expect(isPlayableVideoUrl("COLE_AQUI_O_LINK_DO_VIDEO_2_4")).toBe(false);
  });
});