import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";
import { levels } from "@/data/levels";
import { logAudit } from "@/lib/audit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, Circle, ShieldCheck, ShieldOff } from "lucide-react";

interface QuestionRow {
  id: string;
  user_id: string;
  exercise_id: string;
  question_text: string;
  answered: boolean;
  created_at: string;
  display_name?: string | null;
}

interface MemberRow {
  user_id: string;
  display_name: string | null;
  isAdmin: boolean;
}

interface AuditRow {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  target_type: string | null;
  target_id: string | null;
  details: unknown;
  created_at: string;
}

interface FeedbackRow {
  id: string;
  type: string;
  name: string;
  email: string;
  message: string;
  synced_to_sheet: boolean;
  created_at: string;
}


function getExerciseTitle(exerciseId: string): string {
  for (const level of levels) {
    const ex = level.exercises.find((e) => e.id === exerciseId);
    if (ex) return `${level.title} → ${ex.title}`;
  }
  return exerciseId;
}

const ACTION_LABELS: Record<string, string> = {
  "admin.panel.viewed": "Acessou o painel administrativo",
  "admin.questions.viewed": "Visualizou a lista de dúvidas",
  "admin.roles.viewed": "Visualizou a gestão de papéis",
  "admin.audit.viewed": "Visualizou o log de auditoria",
  "admin.feedback.viewed": "Visualizou os envios de dúvidas e vídeos",

  "question.marked_answered": "Marcou dúvida como respondida",
  "question.marked_unanswered": "Marcou dúvida como não respondida",
  "role.granted": "Concedeu papel",
  "role.revoked": "Removeu papel",
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditRow[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    let active = true;
    const init = async () => {
     try {
      // Acesso de professor é validado no banco (tabela de papéis) — aqui só ajustamos a UI
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      const admin = !!roles?.length;
      setIsAdmin(admin);

      if (!admin) {
        return;
      }

      await logAudit("admin.panel.viewed");

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (questionsData) {
        const userIds = [...new Set(questionsData.map((q) => q.user_id))];
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("user_id, display_name")
          .in("user_id", userIds);

        const nameMap = new Map(profilesData?.map((p) => [p.user_id, p.display_name]) ?? []);
        setQuestions(questionsData.map((q) => ({ ...q, display_name: nameMap.get(q.user_id) })));

        await logAudit("admin.questions.viewed", {
          targetType: "questions",
          details: { count: questionsData.length },
        });
      }

     } catch (e) {
        console.error("Falha ao carregar o painel:", e);
        toast.error("Não foi possível carregar os dados do painel.");
      } finally {
        if (active) setLoading(false);
      }
    };
    init();
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  const loadMembers = useCallback(async () => {
    const [{ data: profilesData }, { data: rolesData }] = await Promise.all([
      supabase.from("profiles").select("user_id, display_name").order("display_name"),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);
    const adminIds = new Set(rolesData?.map((r) => r.user_id) ?? []);
    setMembers(
      (profilesData ?? []).map((p) => ({
        user_id: p.user_id,
        display_name: p.display_name,
        isAdmin: adminIds.has(p.user_id),
      }))
    );
    await logAudit("admin.roles.viewed");
  }, []);

  const loadAuditLogs = useCallback(async () => {
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    setAuditLogs((data ?? []) as AuditRow[]);
    await logAudit("admin.audit.viewed");
  }, []);

  const loadFeedback = useCallback(async () => {
    const { data } = await supabase
      .from("feedback_submissions")
      .select("id, type, name, email, message, synced_to_sheet, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    setFeedback((data ?? []) as FeedbackRow[]);
    await logAudit("admin.feedback.viewed");
  }, []);



  const toggleAnswered = async (id: string, current: boolean) => {
    const { error } = await supabase.from("questions").update({ answered: !current }).eq("id", id);
    if (error) {
      toast.error("Não foi possível atualizar a dúvida.");
      return;
    }
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, answered: !current } : q)));
    await logAudit(current ? "question.marked_unanswered" : "question.marked_answered", {
      targetType: "question",
      targetId: id,
    });
  };

  const toggleAdminRole = async (member: MemberRow) => {
    if (member.isAdmin) {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", member.user_id)
        .eq("role", "admin");
      if (error) {
        toast.error("Não foi possível remover o papel.");
        return;
      }
      toast.success("Papel de professor removido.");
    } else {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: member.user_id, role: "admin" });
      if (error) {
        toast.error("Não foi possível conceder o papel.");
        return;
      }
      toast.success("Papel de professor concedido.");
    }
    setMembers((prev) =>
      prev.map((m) => (m.user_id === member.user_id ? { ...m, isAdmin: !m.isAdmin } : m))
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Faça login para acessar o painel.</p>
          <button onClick={() => navigate("/auth")} className="text-primary font-bold hover:underline">
            Fazer login
          </button>
        </div>
      </div>
    );
  }

  if (!loading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-black text-foreground mb-2">Acesso restrito</h1>
          <p className="text-muted-foreground">
            Este painel é exclusivo para professores. Solicite a liberação do seu acesso à coordenação.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={() => navigate("/curso")} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground">Painel do Professor</h1>
          <p className="text-muted-foreground mt-2">
            Dúvidas dos alunos, papéis de acesso e registro de auditoria
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Carregando...</p>
        ) : (
          <Tabs
            defaultValue="duvidas"
            onValueChange={(v) => {
              if (v === "papeis") loadMembers();
              if (v === "auditoria") loadAuditLogs();
              if (v === "envios") loadFeedback();
            }}
          >
            <TabsList className="w-full grid grid-cols-4 rounded-2xl h-auto p-1">
              <TabsTrigger value="duvidas" className="rounded-xl py-2 font-bold">
                Dúvidas
              </TabsTrigger>
              <TabsTrigger value="envios" className="rounded-xl py-2 font-bold">
                Envios
              </TabsTrigger>
              <TabsTrigger value="papeis" className="rounded-xl py-2 font-bold">
                Papéis
              </TabsTrigger>
              <TabsTrigger value="auditoria" className="rounded-xl py-2 font-bold">
                Auditoria
              </TabsTrigger>
            </TabsList>

            <TabsContent value="envios" className="mt-6">
              {feedback.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum envio do formulário de Dúvidas & Feedback ainda.
                </p>
              ) : (
                <div className="space-y-3">
                  {feedback.map((f) => (
                    <div key={f.id} className="bg-card rounded-2xl p-5 card-shadow">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-primary">
                          {f.type === "video" ? "Vídeo (link)" : "Dúvida"}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{f.name}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground break-all">{f.email}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(f.created_at).toLocaleString("pt-BR")}
                        </span>
                        {!f.synced_to_sheet && (
                          <span className="text-xs font-bold text-destructive">
                            (não sincronizado com a planilha)
                          </span>
                        )}
                      </div>
                      <p className="text-foreground text-sm break-words">{f.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>


            <TabsContent value="duvidas" className="mt-6">
              {questions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhuma pergunta enviada ainda.</p>
              ) : (
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className={`bg-card rounded-2xl p-5 card-shadow ${q.answered ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-bold text-primary">
                              {q.display_name ?? "Anônimo"}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {getExerciseTitle(q.exercise_id)}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(q.created_at).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <p className="text-foreground text-sm">{q.question_text}</p>
                        </div>
                        <button
                          onClick={() => toggleAnswered(q.id, q.answered)}
                          className="shrink-0 btn-bounce"
                          title={q.answered ? "Marcar como não respondida" : "Marcar como respondida"}
                        >
                          {q.answered ? (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="papeis" className="mt-6">
              <div className="space-y-3">
                {members.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhum usuário cadastrado.</p>
                ) : (
                  members.map((m) => (
                    <div
                      key={m.user_id}
                      className="bg-card rounded-2xl p-4 card-shadow flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">
                          {m.display_name ?? "Sem nome"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {m.isAdmin ? "Professor (administrador)" : "Aluno"}
                        </p>
                      </div>
                      <Button
                        variant={m.isAdmin ? "outline" : "default"}
                        size="sm"
                        className="rounded-xl font-bold shrink-0"
                        onClick={() => toggleAdminRole(m)}
                      >
                        {m.isAdmin ? (
                          <>
                            <ShieldOff className="w-4 h-4 mr-1" /> Remover acesso
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 mr-1" /> Tornar professor
                          </>
                        )}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="auditoria" className="mt-6">
              {auditLogs.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhum registro de auditoria.</p>
              ) : (
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="bg-card rounded-xl p-4 card-shadow">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-primary">
                          {ACTION_LABELS[log.action] ?? log.action}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.created_at).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground break-all">
                        {log.actor_email ?? log.actor_id ?? "sistema"}
                        {log.target_type ? ` • ${log.target_type}` : ""}
                        {log.target_id ? ` #${log.target_id}` : ""}
                        {log.details && Object.keys(log.details as object).length > 0
                          ? ` • ${JSON.stringify(log.details)}`
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
