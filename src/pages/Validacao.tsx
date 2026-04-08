import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import { Footer } from "@/components/Footer";
import { GraduationCap, Award, BookOpen, CheckCircle } from "lucide-react";

const Validacao = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader onStart={() => navigate("/curso")} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-5xl block mb-4">🎓</span>
          <h1 className="text-4xl font-black text-foreground mb-4">Validação da Professora</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Este projeto foi desenvolvido sob orientação e validação de uma profissional
            qualificada na área de Educação Física.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 card-shadow mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">
                Professora [Nome da Professora]
              </h2>
              <p className="text-muted-foreground text-sm">Orientadora do Projeto</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-foreground text-sm">Formação Acadêmica</h3>
                <p className="text-muted-foreground text-sm">
                  Curso: Educação Física<br />
                  Instituição: [Nome da Instituição]
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-foreground text-sm">Sobre o Acompanhamento</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  O projeto IEV — Treinamento de Voleibol foi desenvolvido com o acompanhamento
                  e a validação de uma profissional de Educação Física, garantindo que todos os
                  exercícios e métodos de ensino sigam padrões pedagógicos adequados para a faixa
                  etária dos alunos. A orientação da professora assegurou que os conteúdos
                  respeitam os princípios da Educação Física escolar e promovem o desenvolvimento
                  integral dos estudantes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 card-shadow animate-fade-in">
          <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Justificativa dos Métodos Utilizados
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Os métodos utilizados nesta plataforma baseiam-se em princípios pedagógicos da
              Educação Física escolar, combinando abordagens teóricas e práticas para o ensino
              do voleibol. A progressão dos exercícios segue uma ordem didática que respeita o
              desenvolvimento motor dos alunos, partindo de fundamentos básicos até situações
              mais complexas de jogo.
            </p>
            <p>
              A gamificação foi incorporada como estratégia motivacional, inspirada em
              metodologias ativas de aprendizagem. O sistema de níveis e conquistas estimula
              o engajamento contínuo e a prática regular, elementos fundamentais para o
              desenvolvimento das habilidades esportivas.
            </p>
            <p>
              A utilização de vídeos demonstrativos permite que os alunos visualizem a
              execução correta dos movimentos, complementando a prática presencial com
              referências visuais que podem ser consultadas a qualquer momento. Esta
              abordagem multimídia está alinhada com as diretrizes da Base Nacional Comum
              Curricular (BNCC) para a Educação Física.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Validacao;
