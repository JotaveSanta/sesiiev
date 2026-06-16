import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

interface Rule {
  id: string;
  title: string;
  ref: string;
  summary: string;
  official: string;
}

const rules: Rule[] = [
  {
    id: "dois-toques",
    title: "Dois toques",
    ref: "Regra 9.3.4",
    summary:
      "Um mesmo jogador não pode encostar na bola duas vezes seguidas. Se isso acontecer (ou se a bola tocar várias partes do corpo em contatos separados), a equipe perde o ponto. A única exceção é no bloqueio e no primeiro toque da equipe, quando o contato pode ocorrer em mais de uma parte do corpo na mesma ação.",
    official:
      "DOIS TOQUES: um jogador toca a bola duas vezes consecutivamente ou a bola toca várias partes de seu corpo consecutivamente. (9.2.3)",
  },
  {
    id: "quatro-toques",
    title: "Quatro toques",
    ref: "Regra 9.1 / 9.3.1",
    summary:
      "Cada equipe pode dar no máximo três toques na bola antes de enviá-la para o lado adversário (o bloqueio não conta como toque). Se houver um quarto toque, é falta e o ponto vai para o time adversário.",
    official:
      "A equipe tem o direito a, no máximo, três toques (além do bloqueio) para enviar a bola de volta para o adversário. Se mais toques são utilizados, a equipe comete a falta de 'QUATRO TOQUES'. (9.1) — QUATRO TOQUES: uma equipe toca a bola quatro vezes antes de enviá-la ao adversário. (9.3.1)",
  },
  {
    id: "conducao",
    title: "Condução",
    ref: "Regra 9.3.3",
    summary:
      "A bola precisa ser rebatida com um toque claro. Se o jogador segura, carrega ou lança a bola em vez de tocá-la, é considerado condução e o ponto vai para o adversário.",
    official:
      "CONDUÇÃO: a bola é retida e/ou lançada; ela não é rebatida com o toque do jogador. (9.2.2)",
  },
  {
    id: "saque",
    title: "Saque",
    ref: "Regra 12",
    summary:
      "O saque é o ato que coloca a bola em jogo. Quem saca é sempre o jogador da posição 1 (traseiro-direito), que deve estar dentro da zona de saque no momento em que golpeia a bola.",
    official:
      "Saque é o ato de colocar a bola em jogo, pelo jogador traseiro-direito, posicionado na zona de saque. (12)",
  },
  {
    id: "rotacao",
    title: "Rotação",
    ref: "Regra 7.6",
    summary:
      "Sempre que a equipe que estava recebendo conquista o direito de sacar, todos os jogadores giram uma posição no sentido horário. Isso garante que todos passem por todas as posições durante o set.",
    official:
      "Quando a equipe receptora ganha o direito de sacar, os jogadores avançam uma posição no sentido dos ponteiros do relógio: jogador da posição 2 avança para a posição 1 para sacar, o jogador da posição 1 avança para a posição 6, e assim por diante. (7.6.2)",
  },
  {
    id: "posicoes",
    title: "Posições em quadra",
    ref: "Regra 7.4",
    summary:
      "No momento do saque, cada jogador precisa estar na sua posição correta. São três jogadores na linha de frente (posições 4, 3 e 2) e três na linha de trás (posições 5, 6 e 1). Estar fora do lugar gera falta de posição.",
    official:
      "No momento em que a bola é golpeada pelo sacador, cada equipe deverá estar posicionada dentro de sua própria quadra (exceto o sacador). Os jogadores da equipe receptora devem estar na ordem de rotação no momento do golpe do saque. (7.4)",
  },
  {
    id: "toque-rede",
    title: "Toque na rede",
    ref: "Regra 11.3.1 / 11.4.4",
    summary:
      "Encostar na rede entre as antenas durante a ação de jogar a bola é falta. Isso inclui o salto, a rebatida (ou tentativa) e a aterrissagem. Tocar a rede fora das antenas, ou quando a bola é jogada contra você e causa o contato, não é falta.",
    official:
      "O contato de um jogador com a rede, entre as antenas, durante a ação de jogar a bola, é uma falta. Uma ação de jogar a bola compreende (entre outras) o saltar, o golpear (ou a tentativa de golpear) e o aterrissar de maneira segura, pronto para uma nova ação. (11.3.1)",
  },
  {
    id: "invasao",
    title: "Invasão da quadra adversária",
    ref: "Regra 11.2.2",
    summary:
      "É permitido pisar na quadra do adversário com o pé desde que parte dele continue tocando a linha central. Outras partes do corpo podem encostar na quadra adversária, contanto que não atrapalhem o jogo do outro time.",
    official:
      "É permitido tocar a quadra adversária com o(s) pé(s), desde que alguma parte dele(s) permaneça(m) em contato com a linha central, ou diretamente acima dela, e esta ação não interfira no jogo do adversário. (11.2.2.1)",
  },
  {
    id: "libero",
    title: "Líbero",
    ref: "Capítulo 6 — Regra 19",
    summary:
      "O Líbero é um jogador defensivo especialista, com uniforme de cor diferente. Ele atua apenas nas posições de fundo, não pode sacar (em regras gerais), não pode bloquear (nem tentar) e não pode atacar a bola que esteja totalmente acima da borda superior da rede.",
    official:
      "Um Líbero tenta um bloqueio individual ou coletivo. (14.6.6 — listada como ação proibida ao Líbero, junto com as demais restrições do Capítulo 6.)",
  },
];

export function RulesSection() {
  return (
    <section id="regras" className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" />
            Regulamento
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Regras do Voleibol
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Principais regras do voleibol explicadas em linguagem facilitada, acompanhadas
            do texto oficial conforme as Regras Oficiais de Voleibol 2025-2028 (FIVB / CBV).
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {rules.map((rule) => (
            <AccordionItem
              key={rule.id}
              value={rule.id}
              className="border border-border rounded-2xl bg-background px-5 shadow-sm data-[state=open]:card-shadow-primary transition-shadow"
            >
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex flex-col items-start text-left">
                  <span className="text-lg font-black text-foreground">{rule.title}</span>
                  <span className="text-xs font-bold text-primary mt-0.5">{rule.ref}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5 space-y-4">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-primary mb-2">
                    Resumo
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{rule.summary}</p>
                </div>
                <div className="border-l-4 border-primary/40 bg-muted/40 rounded-r-lg p-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2">
                    Texto oficial
                  </h4>
                  <p className="text-sm text-foreground/90 italic leading-relaxed">
                    “{rule.official}”
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Fonte: Regras Oficiais de Voleibol 2025-2028 — FIVB / CBV.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
