import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lessonLabel } from "@/lib/teacherResponses";
import { Button } from "@/components/ui/button";
import { TeacherConversation } from "@/components/TeacherConversation";

export function StudentConversations({ exerciseId, refresh = 0 }: { exerciseId?: string; refresh?: number }) {
  const { user } = useAuth();
  const query = useQuery({
    queryKey: ["student-conversations", user?.id, exerciseId, refresh],
    enabled: !!user,
    refetchInterval: 30000,
    queryFn: async () => {
      if (!user) return [];
      let questionsQuery = supabase.from("questions").select("id, exercise_id, question_text, created_at").eq("user_id", user.id).order("created_at", { ascending: false });
      if (exerciseId) questionsQuery = questionsQuery.eq("exercise_id", exerciseId);
      const questions = await questionsQuery;
      if (questions.error) throw questions.error;
      const conversations = questions.data.map((q) => ({ id: q.id, kind: "question" as const, text: q.question_text, title: lessonLabel(q.exercise_id), date: q.created_at }));
      if (!exerciseId) {
        const feedback = await supabase.from("feedback_submissions").select("id, message, type, created_at").eq("user_id", user.id).order("created_at", { ascending: false });
        if (feedback.error) throw feedback.error;
        return [...conversations, ...feedback.data.map((f) => ({ id: f.id, kind: "feedback" as const, text: f.message, title: f.type === "video" ? "Vídeo do treino" : "Dúvida e feedback", date: f.created_at }))].sort((a, b) => b.date.localeCompare(a.date));
      }
      return conversations;
    },
  });
  return <section className="mt-10 border-t border-border pt-6">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-extrabold text-foreground">{exerciseId ? "Dúvidas desta aula" : "Minhas dúvidas e respostas"}</h2>
      {user && <Button variant="ghost" size="icon" onClick={() => query.refetch()} aria-label="Atualizar respostas" title="Atualizar respostas"><RefreshCw className={query.isFetching ? "animate-spin" : ""} /></Button>}
    </div>
    {!user ? <Button asChild variant="outline"><Link to="/auth">Entrar para consultar respostas</Link></Button> :
      query.isLoading ? <p className="text-sm text-muted-foreground">Carregando suas dúvidas…</p> :
      query.isError ? <div><p className="mb-2 text-sm text-destructive">Não foi possível carregar suas dúvidas.</p><Button variant="outline" onClick={() => query.refetch()}>Tentar novamente</Button></div> :
      !query.data?.length ? <p className="text-sm text-muted-foreground">Você ainda não enviou dúvidas{exerciseId ? " nesta aula" : ""}.</p> :
      <div className="space-y-6">{query.data.map((item) => <article key={`${item.kind}-${item.id}`} className="rounded-lg border border-border bg-card p-5">
        <p className="text-xs font-bold text-primary">{item.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">Você · {new Date(item.date).toLocaleString("pt-BR")}</p>
        <p className="mt-3 whitespace-pre-wrap break-words text-sm text-foreground">{item.text}</p>
        <TeacherConversation kind={item.kind} id={item.id} />
      </article>)}</div>}
  </section>;
}