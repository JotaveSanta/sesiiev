import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ExternalLink, MessageCircle, Paperclip, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { levels } from "@/data/levels";
import type { Tables } from "@/integrations/supabase/types";
import { VIDEO_BUCKET, replySchema, videoExtension, lessonLabel, lessonAddress } from "@/lib/teacherResponses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Parent = { kind: "question" | "feedback"; id: string };

function ReplyVideo({ path }: { path: string }) {
  const [url, setUrl] = useState("");
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase.storage.from(VIDEO_BUCKET).createSignedUrl(path, 3600);
      if (active) { setUrl(data?.signedUrl ?? ""); setFailed(!!error); }
    };
    load();
    const timer = window.setInterval(load, 45 * 60 * 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, [path, retry]);
  if (failed) return <Button variant="outline" size="sm" onClick={() => { setFailed(false); setRetry((v) => v + 1); }}><RefreshCw /> Carregar vídeo novamente</Button>;
  if (!url) return <p className="text-sm text-muted-foreground">Carregando vídeo…</p>;
  return <video controls preload="metadata" src={url} className="mt-3 max-h-80 w-full rounded-lg bg-muted" onError={() => setFailed(true)} aria-label="Vídeo enviado pelo professor" />;
}

function Reply({ reply }: { reply: Tables<"teacher_responses"> }) {
  const safeUrl = reply.video_url && replySchema.shape.videoUrl.safeParse(reply.video_url).success ? reply.video_url : null;
  return <div className="border-l-2 border-primary pl-4 py-1">
    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <span className="font-bold text-primary">Professor</span>
      <time>{new Date(reply.created_at).toLocaleString("pt-BR")}</time>
    </div>
    <p className="whitespace-pre-wrap break-words text-sm text-foreground">{reply.message}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {safeUrl && <Button asChild variant="outline" size="sm"><a href={safeUrl} target="_blank" rel="noopener noreferrer"><ExternalLink /> Vídeo do professor</a></Button>}
      {reply.lesson_id && <Button asChild variant="outline" size="sm" className="h-auto max-w-full whitespace-normal py-2 text-left"><Link to={lessonAddress(reply.lesson_id)}><ExternalLink /> {lessonLabel(reply.lesson_id)}</Link></Button>}
    </div>
    {reply.video_path && <ReplyVideo path={reply.video_path} />}
  </div>;
}

export function TeacherConversation({ kind, id, canReply = false }: Parent & { canReply?: boolean }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const query = useQuery({
    queryKey: ["teacher-responses", user?.id, kind, id],
    enabled: !!user,
    refetchInterval: 30000,
    queryFn: async () => {
      const { data, error } = await supabase.from("teacher_responses").select("*").eq(kind === "question" ? "question_id" : "feedback_id", id).order("created_at");
      if (error) throw error;
      return data;
    },
  });
  return <div className="mt-4 space-y-4 border-t border-border pt-4">
    {query.isLoading ? <p className="text-sm text-muted-foreground">Carregando respostas…</p> : query.isError ?
      <Button variant="outline" size="sm" onClick={() => query.refetch()}><RefreshCw /> Tentar carregar respostas</Button> :
      query.data?.length ? query.data.map((reply) => <Reply key={reply.id} reply={reply} />) :
      <p className="text-xs text-muted-foreground">Aguardando resposta do professor.</p>}
    {canReply && <Button variant="outline" size="sm" onClick={() => setOpen(true)}><MessageCircle /> Responder</Button>}
    {open && <ReplyComposer kind={kind} id={id} onClose={() => setOpen(false)} />}
  </div>;
}

function ReplyComposer({ kind, id, onClose }: Parent & { onClose: () => void }) {
  const { user } = useAuth();
  const cache = useQueryClient();
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const send = async () => {
    if (!user || sending) return;
    const parsed = replySchema.safeParse({ message, videoUrl, lessonId });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Confira a resposta."); return; }
    if (file && videoUrl.trim()) { toast.error("Escolha um arquivo ou um link de vídeo, não os dois."); return; }
    const responseId = crypto.randomUUID();
    let videoPath: string | null = null;
    let saved = false;
    setSending(true);
    try {
      if (file) {
        videoPath = `${user.id}/${responseId}/video.${videoExtension(file)}`;
        const { error } = await supabase.storage.from(VIDEO_BUCKET).upload(videoPath, file, { contentType: file.type });
        if (error) throw error;
      }
      const { error } = await supabase.from("teacher_responses").insert({
        id: responseId, author_id: user.id, message: parsed.data.message,
        question_id: kind === "question" ? id : null, feedback_id: kind === "feedback" ? id : null,
        video_url: parsed.data.videoUrl || null, video_path: videoPath, lesson_id: parsed.data.lessonId || null,
      });
      if (error) throw error;
      saved = true;
      cache.invalidateQueries({ queryKey: ["teacher-responses"] });
      cache.invalidateQueries({ queryKey: ["student-conversations"] });
      toast.success("Resposta enviada ao aluno.");
      onClose();
    } catch {
      if (videoPath && !saved) await supabase.storage.from(VIDEO_BUCKET).remove([videoPath]);
      toast.error("Não foi possível enviar a resposta. Seu texto foi mantido; tente novamente.");
    } finally { setSending(false); }
  };
  return <Dialog open onOpenChange={(open) => { if (!open && !sending) onClose(); }}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
      <DialogHeader><DialogTitle>Responder ao aluno</DialogTitle><DialogDescription>Resposta do professor</DialogDescription></DialogHeader>
      <div className="space-y-2"><Label htmlFor="reply-message">Mensagem</Label><Textarea id="reply-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={4000} disabled={sending} className="min-h-32" /></div>
      <div className="space-y-2"><Label htmlFor="reply-video-url">Link de vídeo (opcional)</Label><Input id="reply-video-url" type="url" placeholder="https://youtu.be/…" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} maxLength={2000} disabled={sending || !!file} /></div>
      <div className="space-y-2"><Label htmlFor="reply-file" className="flex items-center gap-2"><Paperclip className="h-4 w-4" /> Anexar vídeo (opcional)</Label>
        <Input id="reply-file" type="file" accept="video/mp4,video/webm,video/quicktime" disabled={sending || !!videoUrl.trim()} onChange={(e) => {
          const next = e.target.files?.[0];
          if (!next) { setFile(null); return; }
          try { videoExtension(next); setFile(next); } catch (error) { toast.error(error instanceof Error ? error.message : "Vídeo inválido."); e.target.value = ""; setFile(null); }
        }} /><p className="text-xs text-muted-foreground">MP4, WebM ou MOV · até 50 MB</p></div>
      <div className="space-y-2"><Label htmlFor="reply-lesson">Indicar uma aula (opcional)</Label>
        <Select value={lessonId || "none"} onValueChange={(value) => setLessonId(value === "none" ? "" : value)} disabled={sending}>
          <SelectTrigger id="reply-lesson" className="h-auto min-h-10 text-left [&>span]:whitespace-normal"><SelectValue placeholder="Selecionar aula" /></SelectTrigger>
          <SelectContent><SelectItem value="none">Sem indicação</SelectItem>{levels.flatMap((level) => level.exercises.map((exercise) => <SelectItem key={exercise.id} value={exercise.id}>{level.title} → {exercise.title}</SelectItem>))}</SelectContent>
        </Select>
      </div>
      <Button onClick={send} disabled={sending || !message.trim()}><Send /> {sending ? "Enviando resposta…" : "Enviar resposta"}</Button>
    </DialogContent>
  </Dialog>;
}