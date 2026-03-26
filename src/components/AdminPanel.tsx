import { levels } from "@/data/levels";

interface AdminPanelProps {
  questions: { exerciseId: string; question: string; timestamp: number }[];
  onClose: () => void;
}

function getExerciseTitle(exerciseId: string): string {
  for (const level of levels) {
    const ex = level.exercises.find((e) => e.id === exerciseId);
    if (ex) return `${level.title} → ${ex.title}`;
  }
  return exerciseId;
}

export function AdminPanel({ questions, onClose }: AdminPanelProps) {
  return (
    <div className="animate-pop-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-extrabold text-xl text-foreground">📬 Perguntas dos Alunos</h2>
        <button onClick={onClose} className="text-sm font-bold text-primary btn-bounce">
          Voltar
        </button>
      </div>
      {questions.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Nenhuma pergunta enviada ainda.</p>
      ) : (
        <div className="space-y-3">
          {[...questions].reverse().map((q, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 card-shadow">
              <div className="text-xs font-bold text-muted-foreground mb-1">
                {getExerciseTitle(q.exerciseId)} • {new Date(q.timestamp).toLocaleDateString("pt-BR")}
              </div>
              <p className="text-foreground">{q.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
