import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";
import { CourtSimulator } from "@/components/CourtSimulator";
import { EXPLANATIONS, Mode } from "@/data/system51";

const ROTATIONS = [1, 2, 3, 4, 5, 6];

const Sistema51 = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(1);
  const [mode, setMode] = useState<Mode>("receber");

  useEffect(() => {
    document.title = "Sistema 5x1 no Voleibol | Simulador de Rotações";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Simulador interativo do Sistema 5x1 do voleibol: veja a animação das 6 rotações, infiltração do levantador, recepção e formação ofensiva.",
      );
  }, []);

  const info = EXPLANATIONS[rotation][mode];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={() => navigate("/curso")} />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <header className="max-w-3xl">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Tática</span>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mt-2">Sistema 5x1</h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            No sistema 5x1 a equipe joga com <strong>um único levantador</strong> e cinco atacantes. O levantador
            organiza todas as bolas, e por isso precisa <strong>infiltrar</strong> para a rede sempre que estiver no
            fundo da quadra. A cada ponto do adversário no saque a equipe gira uma posição, gerando seis rotações
            diferentes (P1 a P6) — cada uma com movimentações e opções de ataque próprias.
          </p>
        </header>

        {/* seletores */}
        <div className="mt-8 space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Rotação</p>
            <div className="flex flex-wrap gap-2">
              {ROTATIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRotation(r)}
                  className={`h-11 min-w-[64px] px-4 rounded-2xl font-black btn-bounce transition-colors border ${
                    rotation === r
                      ? "bg-primary text-primary-foreground border-transparent card-shadow-primary"
                      : "bg-card text-card-foreground border-border card-shadow hover:bg-muted"
                  }`}
                  aria-pressed={rotation === r}
                >
                  P{r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Situação</p>
            <div className="inline-flex p-1 rounded-2xl bg-muted">
              {([
                { id: "receber", label: "Recebendo o Saque" },
                { id: "sacar", label: "Sacando / Defesa" },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`h-10 px-4 rounded-xl text-sm font-bold btn-bounce transition-colors ${
                    mode === m.id ? "bg-card text-card-foreground card-shadow" : "text-muted-foreground"
                  }`}
                  aria-pressed={mode === m.id}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* quadra + explicação */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start">
          <CourtSimulator rotation={rotation} mode={mode} />

          <aside className="space-y-4">
            <div className="rounded-3xl bg-card border border-border card-shadow p-5">
              <h2 className="text-xl font-black text-foreground">
                P{rotation} — {mode === "receber" ? "Recebendo o saque" : "Sacando / Defesa"}
              </h2>
              {info.destaque && (
                <p className="mt-3 text-sm font-bold text-primary bg-primary/10 rounded-xl p-3 leading-relaxed">
                  {info.destaque}
                </p>
              )}

              <section className="mt-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Posição inicial</h3>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{info.inicial}</p>
              </section>

              <section className="mt-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Movimentação após o saque
                </h3>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{info.movimentacao}</p>
              </section>

              <section className="mt-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Função de cada jogador
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {info.funcoes.map((f) => (
                    <li key={f} className="text-sm text-foreground/90 flex gap-2 leading-relaxed">
                      <span className="text-primary font-black">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Formação final</h3>
                <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{info.final}</p>
              </section>
            </div>

            <div className="rounded-3xl bg-card border border-border card-shadow p-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {mode === "receber" ? "Opções ofensivas" : "Opções defensivas"}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {info.opcoes.map((o) => (
                  <span
                    key={o}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-muted text-foreground/80"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-muted/60 border border-border p-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Regra de posicionamento
              </h3>
              <p className="text-sm text-foreground/90 mt-2 leading-relaxed">
                Até o momento do contato do saque, nenhum jogador pode ultrapassar o companheiro ao lado nem a relação
                frente/fundo. Só <strong>depois do saque</strong> as trocas e a infiltração acontecem — repare na
                animação que todos ficam parados na formação de rodízio no primeiro segundo.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sistema51;
