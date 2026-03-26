import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (question: string) => void;
  exerciseTitle: string;
}

export function QuestionDialog({ open, onOpenChange, onSubmit, exerciseTitle }: QuestionDialogProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (!question.trim()) return;
    onSubmit(question.trim());
    setQuestion("");
    onOpenChange(false);
    toast.success("Pergunta enviada com sucesso! 📩");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-extrabold text-xl">Enviar Pergunta</DialogTitle>
          <DialogDescription>
            Exercício: <strong>{exerciseTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Digite sua dúvida aqui..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[120px] rounded-xl"
          maxLength={500}
        />
        <Button onClick={handleSubmit} disabled={!question.trim()} className="rounded-2xl h-12 font-bold btn-bounce card-shadow-primary">
          <Send className="w-4 h-4 mr-2" />
          Enviar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
