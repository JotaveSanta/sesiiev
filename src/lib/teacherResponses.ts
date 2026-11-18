import { z } from "zod";
import { levels } from "@/data/levels";

export const VIDEO_BUCKET = "teacher-reply-videos";
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
export const replySchema = z.object({
  message: z.string().trim().min(1, "Escreva uma resposta.").max(4000),
  videoUrl: z.string().trim().refine((value) => {
    if (!value) return true;
    try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
  }, "Use um link de vídeo que comece com https://.").refine((value) => value.length <= 2000),
  lessonId: z.string().refine((value) => !value || levels.some((level) => level.exercises.some((e) => e.id === value)), "Selecione uma aula disponível."),
});

export function videoExtension(file: { type: string; size: number }) {
  if (file.size <= 0 || file.size > MAX_VIDEO_BYTES) throw new Error("O vídeo deve ter até 50 MB.");
  const extensions: Record<string, string> = { "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov" };
  const extension = extensions[file.type];
  if (!extension) throw new Error("Selecione um vídeo MP4, WebM ou MOV.");
  return extension;
}

export function lessonLabel(id: string) {
  for (const level of levels) {
    const exercise = level.exercises.find((e) => e.id === id);
    if (exercise) return `${level.title} → ${exercise.title}`;
  }
  return "Aula indisponível";
}

export function lessonAddress(id: string) {
  return `/curso?aula=${encodeURIComponent(id)}`;
}