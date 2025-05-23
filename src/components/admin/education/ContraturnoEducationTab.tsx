
import React from "react";
import { Calendar, ListCheck, School } from "lucide-react";
import EducationCardFeature from "./EducationCardFeature";

const ContraturnoEducationTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <EducationCardFeature
        icon={Calendar}
        iconColor="text-indigo-500"
        title="Matrículas Online"
        description="Sistema de inscrição com controle de vagas"
        content="Plataforma para inscrição online em atividades de contraturno, 
                com controle de vagas disponíveis, lista de espera automatizada e 
                confirmação via e-mail ou SMS."
        features={[
          "Catálogo de atividades disponíveis",
          "Controle em tempo real de vagas",
          "Lista de espera com notificação automática",
          "Autorização digital dos responsáveis",
        ]}
      />
      
      <EducationCardFeature
        icon={ListCheck}
        iconColor="text-orange-500"
        title="Frequência e Desempenho"
        description="Acompanhamento por atividade/oficina"
        content="Sistema de registro de frequência e avaliação de desempenho dos alunos 
                em atividades de contraturno, com indicadores personalizados por tipo de projeto."
        features={[
          "Controle de presença por atividade",
          "Avaliação por objetivos específicos",
          "Registro de ocorrências e observações",
          "Notificações automáticas de ausência",
        ]}
      />
      
      <EducationCardFeature
        icon={School}
        iconColor="text-teal-500"
        title="Relatórios para Gestão"
        description="Indicadores e métricas dos projetos"
        content="Dashboard com relatórios e métricas sobre os projetos de contraturno, 
                incluindo índices de frequência, desempenho, impacto no rendimento escolar 
                e feedbacks dos participantes."
        features={[
          "Dashboard com KPIs dos projetos",
          "Análise de correlação com desempenho escolar",
          "Pesquisas de satisfação com participantes",
          "Relatórios exportáveis para prestação de contas",
        ]}
      />
    </div>
  );
};

export default ContraturnoEducationTab;
