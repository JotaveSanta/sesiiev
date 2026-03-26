import { useState } from "react";
import { Exercise } from "@/data/levels";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, ArrowLeft, Trophy } from "lucide-react";
import { QuestionDialog } from "@/components/QuestionDialog";

interface ExerciseViewProps {
  exercise: Exercise;
  isCompleted: boolean;
  onComplete: () => void;
  onSubmitQuestion: (question: string) => void;
  onBack: () => void;
  exerciseNumber: number;
  totalExercises: number;
}

export function ExerciseView({
  exercise,
  isCompleted,
  onComplete,
  onSubmitQuestion,
  onBack,
  exerciseNumber,
  totalExercises,
}: ExerciseViewProps) {
  const [showComplete, setShowComplete] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);

  const handleComplete = () => {
    if (!isCompleted) {
      onComplete();
      setShowComplete(true);
      setTimeout(() => setShowComplete(false), 2000);
    }
  };

  return (
    <div className="animate-pop-in">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 btn-bounce font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {exercise.type === "challenge" ? "🏆 Desafio Final" : `Exercício ${exerciseNumber}/${totalExercises}`}
        </span>
        {isCompleted && (
          <span className="text-xs font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> Concluído
          </span>
        )}
      </div>

      <h2 className="text-2xl font-extrabold text-foreground mb-2">{exercise.title}</h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">{exercise.description}</p>

      <div className="rounded-2xl overflow-hidden card-shadow mb-6 aspect-video bg-foreground/5">
        <iframe
          src={exercise.videoUrl}
          title={exercise.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleComplete}
          disabled={isCompleted}
          variant={isCompleted ? "secondary" : "default"}
          className="flex-1 h-14 text-base font-bold rounded-2xl btn-bounce card-shadow-primary"
        >
          {isCompleted ? (
            <>
              <Check className="w-5 h-5 mr-2" /> Concluído!
            </>
          ) : (
            <>
              {exercise.type === "challenge" ? <Trophy className="w-5 h-5 mr-2" /> : <Check className="w-5 h-5 mr-2" />}
              Marcar como concluído
            </>
          )}
        </Button>

        <Button
          onClick={() => setQuestionOpen(true)}
          variant="outline"
          className="flex-1 h-14 text-base font-bold rounded-2xl btn-bounce card-shadow"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Enviar pergunta
        </Button>
      </div>

      {showComplete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-confetti">🎉</div>
        </div>
      )}

      <QuestionDialog
        open={questionOpen}
        onOpenChange={setQuestionOpen}
        onSubmit={onSubmitQuestion}
        exerciseTitle={exercise.title}
      />
    </div>
  );
}
