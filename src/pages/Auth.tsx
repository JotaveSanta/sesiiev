import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

/** Traduz e simplifica as mensagens de erro do serviço de autenticação. */
function traduzErro(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou senha incorretos.";
  if (m.includes("email not confirmed"))
    return "Confirme seu email pelo link que enviamos antes de entrar.";
  if (m.includes("user already registered") || m.includes("already been registered"))
    return "Este email já tem conta. Use a opção Entrar.";
  if (m.includes("weak") || m.includes("known to be weak") || m.includes("pwned"))
    return "Essa senha é muito comum e insegura. Escolha outra, com letras e números.";
  if (m.includes("password should be at least"))
    return "A senha precisa ter no mínimo 8 caracteres.";
  if (m.includes("unable to validate email") || m.includes("invalid email"))
    return "Email inválido. Confira o endereço digitado.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Muitas tentativas em pouco tempo. Aguarde um minuto e tente novamente.";
  if (m.includes("failed to fetch") || m.includes("network"))
    return "Sem conexão com o servidor. Verifique sua internet e tente de novo.";
  return message;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Se já estiver logado, não faz sentido ficar nesta tela.
  useEffect(() => {
    if (!authLoading && user) navigate("/curso", { replace: true });
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const mail = email.trim().toLowerCase();
    if (!mail || !password) {
      toast.error("Preencha email e senha.");
      return;
    }
    if (!isLogin && password.length < 8) {
      toast.error("A senha precisa ter no mínimo 8 caracteres.");
      return;
    }
    if (!isLogin && !displayName.trim()) {
      toast.error("Informe seu nome.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
        if (error) {
          toast.error(traduzErro(error.message));
          return;
        }
        toast.success("Login realizado com sucesso!");
        navigate("/curso", { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: mail,
          password,
          options: {
            data: { display_name: displayName.trim() },
            emailRedirectTo: `${window.location.origin}/auth`,
          },
        });
        if (error) {
          toast.error(traduzErro(error.message));
          return;
        }
        if (data.session) {
          toast.success("Conta criada! Bons treinos.");
          navigate("/curso", { replace: true });
          return;
        }
        setEmailEnviado(true);
        toast.success("Conta criada! Verifique seu email para confirmar o acesso.");
      }
    } catch (err) {
      toast.error(traduzErro(err instanceof Error ? err.message : "Erro inesperado."));
    } finally {
      setLoading(false);
    }
  };

  const recuperarSenha = async () => {
    const mail = email.trim().toLowerCase();
    if (!mail) {
      toast.error("Digite seu email para receber o link de redefinição.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(mail, {
      redirectTo: `${window.location.origin}/auth`,
    });
    if (error) toast.error(traduzErro(error.message));
    else toast.success("Enviamos um link de redefinição para seu email.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground">
            {isLogin ? "Entrar" : "Criar Conta"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin
              ? "Acesse sua conta para continuar treinando"
              : "Crie sua conta e comece a treinar vôlei"}
          </p>
        </div>

        {emailEnviado && !isLogin ? (
          <div className="bg-card rounded-2xl p-6 card-shadow text-center space-y-4">
            <h2 className="font-black text-lg text-foreground">Confirme seu email</h2>
            <p className="text-sm text-muted-foreground">
              Enviamos um link de confirmação para <strong className="break-all">{email}</strong>.
              Abra o link e depois volte para entrar.
            </p>
            <Button
              onClick={() => {
                setEmailEnviado(false);
                setIsLogin(true);
              }}
              className="w-full h-12 rounded-2xl font-bold btn-bounce"
            >
              Ir para o login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 card-shadow space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-bold text-foreground block mb-1">Nome</label>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoComplete="name"
                  className="rounded-xl"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-foreground block mb-1">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-foreground block mb-1">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                minLength={isLogin ? 6 : 8}
                className="rounded-xl"
              />
              {!isLogin && (
                <p className="text-xs text-muted-foreground mt-1">
                  Mínimo de 8 caracteres. Evite senhas óbvias como "123456" ou "senha123".
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-bold rounded-2xl btn-bounce card-shadow-primary"
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary font-bold hover:underline block w-full"
              >
                {isLogin ? "Não tem conta? Criar agora" : "Já tem conta? Entrar"}
              </button>
              {isLogin && (
                <button
                  type="button"
                  onClick={recuperarSenha}
                  className="text-xs text-muted-foreground hover:text-foreground font-semibold"
                >
                  Esqueci minha senha
                </button>
              )}
            </div>
          </form>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground font-semibold"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
