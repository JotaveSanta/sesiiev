import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";
import { levels } from "@/data/levels";
import { CheckCircle, Circle } from "lucide-react";

interface QuestionRow {
  id: string;
  user_id: string;
  exercise_id: string;
  question_text: string;
  answered: boolean;
  created_at: string;
  profiles: { display_name: string | null } | null;
}

function getExerciseTitle(exerciseId: string): string {
  for (const level of levels) {
    const ex = level.exercises.find((e) => e.id === exerciseId);
    if (ex) return `${level.title} → ${ex.title}`;
  }
  return exerciseId;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchQuestions = async () => {
      const { data } = await supabase
        .from("questions")
        .select("*, profiles(display_name)")
        .order("created_at", { ascending: false });
      setQuestions((data as QuestionRow[]) ?? []);
      setLoading(false);
    };
    fetchQuestions();
  }, [user]);

  const toggleAnswered = async (id: string, current: boolean) => {
    await supabase.from("questions").update({ answered: !current }).eq("id", id);
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answered: !current } : q))
    );
  };

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

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={() => navigate("/curso")} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">📬</span>
          <h1 className="text-3xl font-black text-foreground">Painel de Perguntas</h1>
          <p className="text-muted-foreground mt-2">Visualize e gerencie as dúvidas dos alunos</p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Carregando...</p>
        ) : questions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhuma pergunta enviada ainda.</p>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => (
              <div key={q.id} className={`bg-card rounded-2xl p-5 card-shadow ${q.answered ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-primary">{q.profiles?.display_name ?? "Anônimo"}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{getExerciseTitle(q.exercise_id)}</span>
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
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
