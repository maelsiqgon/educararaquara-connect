
import React from "react";
import { School, ListCheck, Trophy } from "lucide-react";
import EducationCardFeature from "./EducationCardFeature";

const FundamentalEducationTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <EducationCardFeature
        icon={School}
        iconColor="text-blue-500"
        title="Trilhas de Aprendizagem"
        description="Percursos pedagógicos personalizados"
        content="Sistema de trilhas de aprendizagem que permite ao professor criar percursos 
                personalizados por disciplina, com atividades sequenciais e adaptadas 
                ao ritmo de cada aluno."
        features={[
          "Editor de trilhas de conteúdo",
          "Atividades sequenciais com pré-requisitos",
          "Conteúdo adaptativo por nível de desempenho",
          "Relatórios de progresso por aluno e turma",
        ]}
      />
      
      <EducationCardFeature
        icon={ListCheck}
        iconColor="text-green-500"
        title="Feedback Contínuo"
        description="Devolutivas personalizadas para cada atividade"
        content="Sistema de feedback que permite ao professor retornar comentários detalhados 
                sobre as atividades realizadas, com indicação de pontos fortes e aspectos a melhorar."
        features={[
          "Comentários textuais e por áudio",
          "Rubrica de avaliação personalizável",
          "Marcações em documentos e trabalhos",
          "Histórico de feedback por aluno",
        ]}
      />
      
      <EducationCardFeature
        icon={Trophy}
        iconColor="text-amber-500"
        title="Quiz Interativos"
        description="Atividades gamificadas por disciplina"
        content="Plataforma para criação e aplicação de quizzes interativos por disciplina, 
                com feedback imediato, pontuação gamificada e possibilidade de competições entre turmas."
        features={[
          "Editor de questões com diferentes formatos",
          "Sistema de pontuação e ranking",
          "Feedback imediato com explicações",
          "Relatórios de desempenho por habilidade",
        ]}
      />
    </div>
  );
};

export default FundamentalEducationTab;
