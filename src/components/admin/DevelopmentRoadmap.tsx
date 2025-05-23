
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface RoadmapItemProps {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  targetDate?: string;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({
  title,
  description,
  status,
  targetDate
}) => {
  return (
    <div className="flex items-start space-x-4 py-4 border-b last:border-0">
      <div className="mt-1">
        {status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
        {status === 'in-progress' && <Clock className="h-5 w-5 text-yellow-500" />}
        {status === 'planned' && <Circle className="h-5 w-5 text-gray-300" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <Badge variant={status === 'completed' ? "default" : status === 'in-progress' ? "outline" : "secondary"}>
            {status === 'completed' ? "Concluído" : status === 'in-progress' ? "Em Desenvolvimento" : "Planejado"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        {targetDate && <p className="text-xs text-gray-500 mt-2">Previsão: {targetDate}</p>}
      </div>
    </div>
  );
};

const DevelopmentRoadmap: React.FC = () => {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Roteiro de Desenvolvimento do Sistema</CardTitle>
        <CardDescription>
          Planejamento, status atual e próximos passos do desenvolvimento da plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Funcionalidades Principais</h3>
            
            <RoadmapItem 
              title="Painel Administrativo" 
              description="Desenvolvimento completo do dashboard admin com estatísticas e controles principais."
              status="completed"
            />
            
            <RoadmapItem 
              title="Autenticação e Gestão de Usuários" 
              description="Sistema de login, recuperação de senha e gestão de perfis de usuário."
              status="completed"
            />
            
            <RoadmapItem 
              title="Editor de Conteúdo WYSIWYG" 
              description="Editor visual para criação e edição de conteúdos sem necessidade de conhecimento técnico."
              status="completed"
            />
            
            <RoadmapItem 
              title="Gerenciador de Seções e Menus" 
              description="Sistema para adicionar, editar, reordenar e gerenciar seções do portal e estrutura de navegação."
              status="completed"
            />
            
            <RoadmapItem 
              title="Biblioteca de Mídias" 
              description="Sistema para upload, organização e gerenciamento de imagens e outros arquivos de mídia."
              status="completed"
            />
            
            <RoadmapItem 
              title="Módulo de Gestão de Eventos" 
              description="Sistema para criação, edição, agendamento e gerenciamento de eventos escolares e institucionais."
              status="in-progress"
              targetDate="Junho/2025"
            />
            
            <RoadmapItem 
              title="Mural Digital" 
              description="Sistema de comunicados para diferentes perfis de usuário com notificações e estatísticas."
              status="in-progress"
              targetDate="Junho/2025"
            />
            
            <RoadmapItem 
              title="Chat Inteligente com IA" 
              description="Sistema de atendimento baseado em IA com encaminhamento para suporte humano quando necessário."
              status="in-progress"
              targetDate="Julho/2025"
            />
            
            <RoadmapItem 
              title="Integração com Microsoft Teams" 
              description="Sincronização automática de turmas, canais, aulas online e materiais didáticos."
              status="in-progress"
              targetDate="Julho/2025"
            />
            
            <RoadmapItem 
              title="Sistema de Relatórios" 
              description="Geração de relatórios personalizados sobre desempenho, frequência e demais métricas educacionais."
              status="in-progress"
              targetDate="Agosto/2025"
            />
            
            <RoadmapItem 
              title="Sistema de Avaliação Digital" 
              description="Criação, aplicação e correção de avaliações com feedback automático e estatísticas."
              status="planned"
              targetDate="Setembro/2025"
            />
            
            <RoadmapItem 
              title="Gamificação e Trilhas de Aprendizagem" 
              description="Sistema de pontuação, conquistas e progressão para motivar alunos e professores."
              status="planned"
              targetDate="Outubro/2025"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Integrações Técnicas</h3>
            
            <RoadmapItem 
              title="Integração com Redes Sociais" 
              description="Gerenciamento centralizado de redes sociais da secretaria e escolas com agendamento de posts."
              status="in-progress"
              targetDate="Junho/2025"
            />
            
            <RoadmapItem 
              title="Sistema de Chamados/Tickets" 
              description="Suporte técnico integrado com IA para atendimento mais eficiente e tracking de problemas."
              status="planned"
              targetDate="Agosto/2025"
            />
            
            <RoadmapItem 
              title="Modo Offline (PWA)" 
              description="Funcionalidade para usar o sistema sem conexão com sincronização posterior."
              status="planned"
              targetDate="Setembro/2025"
            />
            
            <RoadmapItem 
              title="API Aberta para Integrações" 
              description="API pública documentada para integração com sistemas de terceiros."
              status="planned"
              targetDate="Novembro/2025"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Funcionalidades Específicas por Nível de Ensino</h3>
            
            <RoadmapItem 
              title="Módulos da Educação Infantil" 
              description="Diário de alimentação, álbum digital e relatórios de desenvolvimento por faixa etária."
              status="planned"
              targetDate="Setembro/2025"
            />
            
            <RoadmapItem 
              title="Módulos do Ensino Fundamental" 
              description="Trilhas de aprendizagem, feedback contínuo de tarefas e quizzes interativos."
              status="planned"
              targetDate="Outubro/2025"
            />
            
            <RoadmapItem 
              title="Módulos de Projetos Contraturno" 
              description="Matrículas online, controle de vagas, frequência e avaliações de atividades complementares."
              status="planned"
              targetDate="Novembro/2025"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Acessibilidade e Usabilidade</h3>
            
            <RoadmapItem 
              title="Suporte a WCAG 2.1" 
              description="Conformidade com diretrizes de acessibilidade para permitir uso por pessoas com diferentes necessidades."
              status="in-progress"
              targetDate="Agosto/2025"
            />
            
            <RoadmapItem 
              title="Design Responsivo Otimizado" 
              description="Aprimoramento da experiência em dispositivos móveis e tablets."
              status="in-progress"
              targetDate="Julho/2025"
            />
            
            <RoadmapItem 
              title="Suporte Multilíngue" 
              description="Tradução do sistema para outros idiomas para atender comunidades imigrantes."
              status="planned"
              targetDate="Dezembro/2025"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Sugestões de Melhorias Futuras</h3>
            
            <RoadmapItem 
              title="Central de Dados Educacionais" 
              description="Dashboard centralizado com analytics avançados para tomada de decisões baseada em dados."
              status="planned"
              targetDate="2026"
            />
            
            <RoadmapItem 
              title="Plataforma de Tutoria Online" 
              description="Sistema para aulas particulares de reforço e mentoria entre alunos mais avançados e iniciantes."
              status="planned"
              targetDate="2026"
            />
            
            <RoadmapItem 
              title="Marketplace de Aulas e Oficinas" 
              description="Plataforma para oferta de cursos extras, oficinas e atividades complementares."
              status="planned"
              targetDate="2026"
            />
            
            <RoadmapItem 
              title="Integração com Realidade Aumentada" 
              description="Recursos de RA para enriquecimento de materiais didáticos físicos com conteúdo digital."
              status="planned"
              targetDate="2026"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentRoadmap;
