import { useEffect, useMemo, useRef, useState } from "react";
import {
  BallKey,
  COURT,
  Mode,
  PlayerKey,
  Scenario,
  buildScenario,
} from "@/data/system51";

/* ---------- interpolação ---------- */
const easeInOut = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

function segment<T extends { t: number }>(keys: T[], t: number) {
  if (t <= keys[0].t) return { a: keys[0], b: keys[0], u: 0 };
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (t <= b.t) {
      const span = b.t - a.t;
      return { a, b, u: span <= 0 ? 1 : (t - a.t) / span };
    }
  }
  const last = keys[keys.length - 1];
  return { a: last, b: last, u: 1 };
}

function playerAt(keys: PlayerKey[], t: number) {
  const { a, b, u } = segment(keys, t);
  const e = easeInOut(u);
  if (b.cx !== undefined && b.cy !== undefined) {
    // curva quadrática (infiltrações e trocas em diagonal)
    const m = 1 - e;
    return {
      x: m * m * a.x + 2 * m * e * b.cx + e * e * b.x,
      y: m * m * a.y + 2 * m * e * b.cy + e * e * b.y,
    };
  }
  return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e };
}

function ballAt(keys: BallKey[], t: number) {
  const { a, b, u } = segment(keys, t);
  // a bola viaja em velocidade quase constante (mais realista que easing forte)
  const e = u < 0.15 ? u * 0.9 : u;
  const arc = b.arc ?? 0;
  const h = Math.sin(Math.PI * Math.min(1, Math.max(0, u))) * arc;
  return {
    x: a.x + (b.x - a.x) * e,
    y: a.y + (b.y - a.y) * e,
    h,
  };
}

interface Props {
  rotation: number;
  mode: Mode;
}

export function CourtSimulator({ rotation, mode }: Props) {
  const scenario: Scenario = useMemo(() => buildScenario(rotation, mode), [rotation, mode]);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const raf = useRef<number>();
  const last = useRef<number>();

  // troca de rotação/situação reinicia a jogada automaticamente
  useEffect(() => {
    setTime(0);
    setPlaying(true);
  }, [rotation, mode]);

  useEffect(() => {
    if (!playing) return;
    const loop = (now: number) => {
      if (last.current === undefined) last.current = now;
      const dt = (now - last.current) / 1000;
      last.current = now;
      setTime((prev) => {
        const next = prev + dt;
        if (next >= scenario.duration) {
          setPlaying(false);
          return scenario.duration;
        }
        return next;
      });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = undefined;
    };
  }, [playing, scenario.duration]);

  const handlePlay = () => {
    if (time >= scenario.duration) setTime(0);
    setPlaying(true);
  };
  const handleReset = () => {
    setTime(0);
    setPlaying(false);
  };

  const ball = ballAt(scenario.ball, time);
  const trail = [0.08, 0.16, 0.24, 0.32, 0.4]
    .map((d) => time - d)
    .filter((tt) => tt > 0)
    .map((tt) => ballAt(scenario.ball, tt));

  const phase = [...scenario.phases].reverse().find((p) => time >= p.t)?.label ?? "";
  const showLanding =
    scenario.landing && time >= scenario.landing.from && time <= scenario.landing.to;
  const progress = (time / scenario.duration) * 100;

  return (
    <div className="space-y-4">
      <div className="relative rounded-3xl overflow-hidden bg-card card-shadow border border-border">
        <svg viewBox="0 0 100 124" className="w-full h-auto block" role="img" aria-label="Simulação tática da quadra de vôlei">
          <defs>
            <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--secondary) / 0.16)" />
              <stop offset="100%" stopColor="hsl(var(--secondary) / 0.26)" />
            </linearGradient>
            <linearGradient id="inside" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(25 85% 58% / 0.75)" />
              <stop offset="100%" stopColor="hsl(25 85% 52% / 0.85)" />
            </linearGradient>
            <pattern id="netPattern" width="2" height="2" patternUnits="userSpaceOnUse">
              <path d="M0 0 L2 2 M2 0 L0 2" stroke="hsl(var(--foreground) / 0.35)" strokeWidth="0.25" />
            </pattern>
          </defs>

          {/* zona livre */}
          <rect x="0" y="0" width="100" height="124" fill="url(#floor)" />

          {/* quadra */}
          <rect
            x={COURT.left}
            y={COURT.oppEnd}
            width={COURT.right - COURT.left}
            height={COURT.ourEnd - COURT.oppEnd}
            fill="url(#inside)"
            stroke="hsl(0 0% 100% / 0.9)"
            strokeWidth="0.7"
          />

          {/* linhas de 3 metros */}
          {[COURT.oppAttackLine, COURT.ourAttackLine].map((y) => (
            <line
              key={y}
              x1={COURT.left}
              x2={COURT.right}
              y1={y}
              y2={y}
              stroke="hsl(0 0% 100% / 0.8)"
              strokeWidth="0.5"
            />
          ))}

          {/* rede / linha central */}
          <rect
            x={COURT.left - 3}
            y={COURT.net - 1.6}
            width={COURT.right - COURT.left + 6}
            height="3.2"
            fill="url(#netPattern)"
            stroke="hsl(var(--foreground) / 0.55)"
            strokeWidth="0.4"
          />

          {/* rótulos dos lados */}
          <text x="50" y={COURT.oppEnd - 3} textAnchor="middle" fontSize="3.4" fontWeight="800" fill="hsl(var(--muted-foreground))">
            ADVERSÁRIO
          </text>
          <text x="50" y={COURT.ourEnd + 6} textAnchor="middle" fontSize="3.4" fontWeight="800" fill="hsl(var(--muted-foreground))">
            NOSSA EQUIPE
          </text>

          {/* numeração das posições do nosso lado */}
          {[
            { n: 4, x: 25, y: 72 },
            { n: 3, x: 50, y: 72 },
            { n: 2, x: 75, y: 72 },
            { n: 5, x: 25, y: 99 },
            { n: 6, x: 50, y: 99 },
            { n: 1, x: 75, y: 99 },
          ].map((p) => (
            <text
              key={p.n}
              x={p.x + 9}
              y={p.y - 7}
              textAnchor="middle"
              fontSize="4"
              fontWeight="900"
              fill="hsl(0 0% 100% / 0.55)"
            >
              {p.n}
            </text>
          ))}

          {/* sacador adversário */}
          {scenario.opponentServer && (
            <g>
              <circle
                cx={scenario.opponentServer.x}
                cy={scenario.opponentServer.y}
                r="3.4"
                fill="hsl(var(--muted-foreground) / 0.5)"
                stroke="hsl(var(--foreground) / 0.4)"
                strokeWidth="0.4"
              />
              <text
                x={scenario.opponentServer.x}
                y={scenario.opponentServer.y + 1.3}
                textAnchor="middle"
                fontSize="3"
                fontWeight="900"
                fill="hsl(var(--background))"
              >
                S
              </text>
            </g>
          )}

          {/* marcador de onde a bola vai cair */}
          {showLanding && scenario.landing && (
            <g>
              <circle
                cx={scenario.landing.x}
                cy={scenario.landing.y}
                r="5"
                fill="none"
                stroke="hsl(0 0% 100% / 0.85)"
                strokeWidth="0.5"
                strokeDasharray="1.5 1.5"
                className="animate-pulse"
              />
            </g>
          )}

          {/* jogadores */}
          {scenario.players.map((p) => {
            const pos = playerAt(p.keys, time);
            const fill = `hsl(var(--${p.color}))`;
            return (
              <g key={p.id}>
                <ellipse cx={pos.x} cy={pos.y + 3.6} rx="3.4" ry="1.1" fill="hsl(0 0% 0% / 0.18)" />
                {p.isLibero && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    fill="none"
                    stroke={fill}
                    strokeWidth="0.7"
                    strokeDasharray="1.4 1.2"
                  />
                )}
                <circle cx={pos.x} cy={pos.y} r="3.7" fill={fill} stroke="hsl(0 0% 100% / 0.9)" strokeWidth="0.6" />
                <text
                  x={pos.x}
                  y={pos.y + 1.4}
                  textAnchor="middle"
                  fontSize="3.4"
                  fontWeight="900"
                  fill="hsl(0 0% 100%)"
                >
                  {p.label}
                </text>
              </g>
            );
          })}

          {/* rastro da bola */}
          {trail.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y - pt.h * 0.18}
              r={1.4 - i * 0.2}
              fill="hsl(var(--foreground) / 0.18)"
            />
          ))}

          {/* sombra da bola + bola */}
          <ellipse cx={ball.x} cy={ball.y} rx={1.6 + ball.h * 0.03} ry={0.7} fill="hsl(0 0% 0% / 0.25)" />
          <circle
            cx={ball.x}
            cy={ball.y - ball.h * 0.18}
            r={2.4 + ball.h * 0.03}
            fill="hsl(48 100% 60%)"
            stroke="hsl(220 20% 15%)"
            strokeWidth="0.5"
          />

          {/* indicador de etapa */}
          <g>
            <rect x="26" y="116" width="48" height="7" rx="3.5" fill="hsl(var(--foreground) / 0.85)" />
            <text x="50" y="120.8" textAnchor="middle" fontSize="3.4" fontWeight="900" fill="hsl(var(--background))">
              {phase}
            </text>
          </g>
        </svg>
      </div>

      {/* controles */}
      <div className="flex flex-wrap items-center gap-3">
        {playing ? (
          <button
            onClick={() => setPlaying(false)}
            className="h-11 px-5 rounded-2xl bg-secondary text-secondary-foreground font-bold btn-bounce card-shadow-secondary"
          >
            ⏸ Pausar
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="h-11 px-5 rounded-2xl bg-primary text-primary-foreground font-bold btn-bounce card-shadow-primary"
          >
            ▶ Iniciar
          </button>
        )}
        <button
          onClick={handleReset}
          className="h-11 px-5 rounded-2xl bg-card text-card-foreground font-bold btn-bounce card-shadow border border-border"
        >
          ↻ Reiniciar
        </button>

        <div className="flex-1 min-w-[160px]">
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs font-bold text-muted-foreground mt-1">
            {time.toFixed(1)}s / {scenario.duration.toFixed(1)}s
          </p>
        </div>
      </div>

      {/* legenda */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-muted-foreground">
        {[
          { c: "secondary", t: "Lv — Levantador" },
          { c: "primary", t: "P — Ponteiro" },
          { c: "warning", t: "C — Central" },
          { c: "warning", t: "Lb — Líbero (anel tracejado)" },
          { c: "accent", t: "O — Oposto" },
        ].map((l) => (
          <span key={l.t} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: `hsl(var(--${l.c}))` }} />
            {l.t}
          </span>
        ))}
      </div>
    </div>
  );
}
