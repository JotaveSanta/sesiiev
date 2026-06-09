import { GraduationCap, Award, BookOpen, CheckCircle } from "lucide-react";

export function ValidacaoSection() {
  return (
    <section id="validacao" className="py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Validação da Professora</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Este projeto foi desenvolvido sob orientação e validação de uma profissional
            qualificada na área de Educação Física.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 card-shadow mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-foreground">
                Professora Juliane Colombo Tidra
              </h3>
              <p className="text-muted-foreground text-sm">Orientadora do Projeto</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-foreground text-sm">Formação Acadêmica</h4>
                <p className="text-muted-foreground text-sm">
                  Graduada em Educação Física — UNISINOS<br />
                  Especialista em Ciência do Esporte — UNISINOS
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-foreground text-sm">Sobre o Acompanhamento</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  O projeto IEV — Treinamento de Voleibol foi desenvolvido com o acompanhamento
                  e a validação de uma profissional de Educação Física, garantindo que todos os
                  exercícios e métodos de ensino sigam padrões pedagógicos adequados.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 card-shadow">
          <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Justificativa dos Métodos Utilizados
          </h3>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Os métodos baseiam-se em princípios pedagógicos da Educação Física escolar,
              combinando abordagens teóricas e práticas. A progressão dos exercícios segue
              uma ordem didática que respeita o desenvolvimento motor dos alunos.
            </p>
            <p>
              A gamificação foi incorporada como estratégia motivacional, inspirada em
              metodologias ativas de aprendizagem. O sistema de níveis e conquistas estimula
              o engajamento contínuo e a prática regular.
            </p>
            <p>
              A utilização de vídeos demonstrativos permite que os alunos visualizem a
              execução correta dos movimentos, em alinhamento com as diretrizes da Base
              Nacional Comum Curricular (BNCC) para a Educação Física.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
