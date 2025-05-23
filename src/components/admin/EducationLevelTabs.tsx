
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Calendar, ListChecked, Trophy } from "lucide-react";

const EducationLevelTabs = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-education-primary mb-6">Funcionalidades por Nível de Ensino</h2>
      
      <Tabs defaultValue="infantil" className="space-y-6">
        <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
          <TabsTrigger value="infantil" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Educação Infantil
          </TabsTrigger>
          <TabsTrigger value="fundamental" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Ensino Fundamental
          </TabsTrigger>
          <TabsTrigger value="contraturno" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Projetos de Contraturno
          </TabsTrigger>
        </TabsList>

        <TabsContent value="infantil" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                  Diário de Atividades
                </CardTitle>
                <CardDescription>
                  Registro diário de alimentação, repouso e atividades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Controle completo do dia a dia da criança, com registros de alimentação, 
                  duração e qualidade do repouso, participação em atividades pedagógicas e 
                  observações importantes para comunicação com os responsáveis.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Registro de refeições com opções personalizáveis
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Controle de horário e qualidade do sono
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Participação em atividades pedagógicas
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Comunicados personalizados aos responsáveis
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <School className="h-5 w-5 mr-2 text-purple-500" />
                  Álbum Digital
                </CardTitle>
                <CardDescription>
                  Compartilhamento de momentos com consentimento dos pais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Galeria digital para registrar momentos importantes do desenvolvimento da criança, 
                  compartilhando com os responsáveis de forma segura e com controle de privacidade.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Upload de fotos com descrição
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Gestão de termos de consentimento
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Álbuns personalizados por turma ou evento
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Notificações para os responsáveis
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ListChecked className="h-5 w-5 mr-2 text-cyan-500" />
                  Relatórios de Desenvolvimento
                </CardTitle>
                <CardDescription>
                  Avaliações por faixa etária e competências
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sistema de relatórios personalizados para acompanhar o desenvolvimento da criança 
                  nas diferentes áreas (cognitiva, motora, social, linguagem), com métricas 
                  apropriadas para cada faixa etária.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Modelos de relatório por faixa etária
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Avaliação por competências adequadas à idade
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Gráficos de evolução trimestral
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Compartilhamento com responsáveis
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="fundamental" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <School className="h-5 w-5 mr-2 text-blue-500" />
                  Trilhas de Aprendizagem
                </CardTitle>
                <CardDescription>
                  Percursos pedagógicos personalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sistema de trilhas de aprendizagem que permite ao professor criar percursos 
                  personalizados por disciplina, com atividades sequenciais e adaptadas 
                  ao ritmo de cada aluno.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Editor de trilhas de conteúdo
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Atividades sequenciais com pré-requisitos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Conteúdo adaptativo por nível de desempenho
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Relatórios de progresso por aluno e turma
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ListChecked className="h-5 w-5 mr-2 text-green-500" />
                  Feedback Contínuo
                </CardTitle>
                <CardDescription>
                  Devolutivas personalizadas para cada atividade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sistema de feedback que permite ao professor retornar comentários detalhados 
                  sobre as atividades realizadas, com indicação de pontos fortes e aspectos a melhorar.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Comentários textuais e por áudio
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Rubrica de avaliação personalizável
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Marcações em documentos e trabalhos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Histórico de feedback por aluno
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                  Quiz Interativos
                </CardTitle>
                <CardDescription>
                  Atividades gamificadas por disciplina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Plataforma para criação e aplicação de quizzes interativos por disciplina, 
                  com feedback imediato, pontuação gamificada e possibilidade de competições entre turmas.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Editor de questões com diferentes formatos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Sistema de pontuação e ranking
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Feedback imediato com explicações
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Relatórios de desempenho por habilidade
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contraturno" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                  Matrículas Online
                </CardTitle>
                <CardDescription>
                  Sistema de inscrição com controle de vagas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Plataforma para inscrição online em atividades de contraturno, 
                  com controle de vagas disponíveis, lista de espera automatizada e 
                  confirmação via e-mail ou SMS.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Catálogo de atividades disponíveis
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Controle em tempo real de vagas
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Lista de espera com notificação automática
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Autorização digital dos responsáveis
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ListChecked className="h-5 w-5 mr-2 text-orange-500" />
                  Frequência e Desempenho
                </CardTitle>
                <CardDescription>
                  Acompanhamento por atividade/oficina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sistema de registro de frequência e avaliação de desempenho dos alunos 
                  em atividades de contraturno, com indicadores personalizados por tipo de projeto.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Controle de presença por atividade
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Avaliação por objetivos específicos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Registro de ocorrências e observações
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Notificações automáticas de ausência
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <School className="h-5 w-5 mr-2 text-teal-500" />
                  Relatórios para Gestão
                </CardTitle>
                <CardDescription>
                  Indicadores e métricas dos projetos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Dashboard com relatórios e métricas sobre os projetos de contraturno, 
                  incluindo índices de frequência, desempenho, impacto no rendimento escolar 
                  e feedbacks dos participantes.
                </p>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Funcionalidades</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Dashboard com KPIs dos projetos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Análise de correlação com desempenho escolar
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Pesquisas de satisfação com participantes
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      Relatórios exportáveis para prestação de contas
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationLevelTabs;
