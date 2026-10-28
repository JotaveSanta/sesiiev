import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Video, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  message: z.string().trim().min(1, "Escreva uma mensagem").max(2000),
});

type Tab = "duvida" | "video";

const Feedback = () => {
  const navigate = useNavigate();
  const { user, displayName } = useAuth();
  const [tab, setTab] = useState<Tab>("duvida");
  const [name, setName] = useState(displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const parsed = schema.safeParse({ name, email, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-feedback", {
        body: { type: tab, ...parsed.data },
      });
      if (error) throw error;
      toast.success(
        tab === "duvida"
          ? "Dúvida enviada com sucesso!"
          : "Link de vídeo enviado para feedback!",
      );
      setMessage("");
    } catch (e) {
      toast.error("Não foi possível enviar. Tente novamente.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingHeader onStart={() => navigate("/curso")} />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground">Dúvidas & Feedback</h1>
          <p className="text-muted-foreground mt-2">
            Envie sua dúvida ou um link de vídeo do seu treino para receber feedback dos professores.
          </p>
        </div>

        <div className="flex gap-2 p-1 bg-muted rounded-2xl mb-6">
          <button
            onClick={() => setTab("duvida")}
            className={`flex-1 h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              tab === "duvida" ? "bg-card text-foreground card-shadow" : "text-muted-foreground"
            }`}
          >
            <MessageCircle className="w-4 h-4" /> Dúvida
          </button>
          <button
            onClick={() => setTab("video")}
            className={`flex-1 h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              tab === "video" ? "bg-card text-foreground card-shadow" : "text-muted-foreground"
            }`}
          >
            <Video className="w-4 h-4" /> Vídeo
          </button>
        </div>

        <div className="bg-card rounded-3xl p-6 card-shadow space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="mt-1 rounded-xl"
              maxLength={100}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              className="mt-1 rounded-xl"
              maxLength={255}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {tab === "duvida" ? "Sua dúvida" : "Link do vídeo (YouTube, Drive, etc.)"}
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                tab === "duvida"
                  ? "Descreva sua dúvida sobre os exercícios ou técnicas..."
                  : "Cole o link do seu vídeo e descreva o que gostaria de receber como feedback..."
              }
              className="mt-1 rounded-xl min-h-[140px]"
              maxLength={2000}
            />
          </div>

          <Button
            onClick={submit}
            disabled={loading}
            className="w-full h-12 rounded-2xl font-bold btn-bounce card-shadow-primary"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Enviando..." : "Enviar"}
          </Button>

          {tab === "video" && (
            <p className="text-xs text-muted-foreground text-center">
              Dica: faça upload no YouTube (não listado) ou Google Drive e cole o link aqui.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
