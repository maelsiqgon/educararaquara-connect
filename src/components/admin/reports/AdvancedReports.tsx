
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, TrendingUp, Users, School, Calendar, MessageCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface ReportData {
  schools: {
    total: number;
    byType: { type: string; count: number }[];
    students: number;
    teachers: number;
  };
  news: {
    total: number;
    published: number;
    views: number;
    byCategory: { category: string; count: number }[];
  };
  agenda: {
    totalEvents: number;
    byType: { type: string; count: number }[];
    thisMonth: number;
  };
  chatbot: {
    totalQueries: number;
    knowledgeEntries: number;
    tickets: number;
  };
}

const AdvancedReports = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      // Fetch schools data
      const { data: schools } = await supabase
        .from('schools')
        .select('type, students, teachers, active')
        .eq('active', true);

      // Fetch news data
      const { data: news } = await supabase
        .from('news')
        .select('status, views, category_id, categories:news_categories(name)');

      // Fetch agenda data
      const { data: agenda } = await supabase
        .from('agenda_events')
        .select('event_type, start_datetime');

      // Fetch chatbot data
      const { data: knowledge } = await supabase
        .from('chatbot_knowledge')
        .select('usage_count');

      const { data: tickets } = await supabase
        .from('support_tickets')
        .select('id');

      // Process data
      const schoolsByType = schools?.reduce((acc: any[], school) => {
        const existing = acc.find(item => item.type === school.type);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ type: school.type, count: 1 });
        }
        return acc;
      }, []) || [];

      const newsByCategory = news?.reduce((acc: any[], article) => {
        const categoryName = article.categories?.name || 'Sem categoria';
        const existing = acc.find(item => item.category === categoryName);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ category: categoryName, count: 1 });
        }
        return acc;
      }, []) || [];

      const agendaByType = agenda?.reduce((acc: any[], event) => {
        const existing = acc.find(item => item.type === event.event_type);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ type: event.event_type, count: 1 });
        }
        return acc;
      }, []) || [];

      const thisMonth = agenda?.filter(event => {
        const eventDate = new Date(event.start_datetime);
        const now = new Date();
        return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
      }).length || 0;

      setReportData({
        schools: {
          total: schools?.length || 0,
          byType: schoolsByType,
          students: schools?.reduce((sum, school) => sum + (school.students || 0), 0) || 0,
          teachers: schools?.reduce((sum, school) => sum + (school.teachers || 0), 0) || 0
        },
        news: {
          total: news?.length || 0,
          published: news?.filter(n => n.status === 'published').length || 0,
          views: news?.reduce((sum, n) => sum + (n.views || 0), 0) || 0,
          byCategory: newsByCategory
        },
        agenda: {
          totalEvents: agenda?.length || 0,
          byType: agendaByType,
          thisMonth
        },
        chatbot: {
          totalQueries: knowledge?.reduce((sum, k) => sum + (k.usage_count || 0), 0) || 0,
          knowledgeEntries: knowledge?.length || 0,
          tickets: tickets?.length || 0
        }
      });

    } catch (error) {
      console.error('Error fetching report data:', error);
      toast.error('Erro ao carregar dados dos relatórios');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (type: string) => {
    try {
      const dataToExport = {
        period: selectedPeriod,
        generatedAt: new Date().toISOString(),
        data: reportData
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_${type}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Relatório exportado com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar relatório');
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-soft">
        <CardContent className="pt-6">
          <div className="text-center py-8">Carregando relatórios...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Relatórios Avançados
        </CardTitle>
        <CardDescription>
          Estatísticas detalhadas e análises do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última Semana</SelectItem>
                <SelectItem value="month">Último Mês</SelectItem>
                <SelectItem value="quarter">Último Trimestre</SelectItem>
                <SelectItem value="year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => exportReport('completo')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="schools">Escolas</TabsTrigger>
              <TabsTrigger value="news">Notícias</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total de Escolas</p>
                        <p className="text-2xl font-bold text-education-primary">{reportData?.schools.total}</p>
                      </div>
                      <School className="h-8 w-8 text-education-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                        <p className="text-2xl font-bold text-green-600">{reportData?.schools.students}</p>
                      </div>
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Notícias Publicadas</p>
                        <p className="text-2xl font-bold text-blue-600">{reportData?.news.published}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Eventos Este Mês</p>
                        <p className="text-2xl font-bold text-purple-600">{reportData?.agenda.thisMonth}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schools" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Escolas por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={reportData?.schools.byType}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, count }) => `${type}: ${count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {reportData?.schools.byType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total de Escolas:</span>
                      <Badge>{reportData?.schools.total}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total de Alunos:</span>
                      <Badge className="bg-green-100 text-green-800">{reportData?.schools.students}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total de Professores:</span>
                      <Badge className="bg-blue-100 text-blue-800">{reportData?.schools.teachers}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Média Alunos/Escola:</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {reportData?.schools.total ? Math.round(reportData.schools.students / reportData.schools.total) : 0}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notícias por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={reportData?.news.byCategory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Engajamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total de Notícias:</span>
                      <Badge>{reportData?.news.total}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Notícias Publicadas:</span>
                      <Badge className="bg-green-100 text-green-800">{reportData?.news.published}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total de Visualizações:</span>
                      <Badge className="bg-blue-100 text-blue-800">{reportData?.news.views}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Média Visualizações/Notícia:</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {reportData?.news.published ? Math.round(reportData.news.views / reportData.news.published) : 0}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="agenda" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={reportData?.agenda.byType}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas da Agenda</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total de Eventos:</span>
                      <Badge>{reportData?.agenda.totalEvents}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Eventos Este Mês:</span>
                      <Badge className="bg-green-100 text-green-800">{reportData?.agenda.thisMonth}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Média por Mês:</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {Math.round((reportData?.agenda.totalEvents || 0) / 12)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Consultas Totais</p>
                        <p className="text-2xl font-bold text-blue-600">{reportData?.chatbot.totalQueries}</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Base de Conhecimento</p>
                        <p className="text-2xl font-bold text-green-600">{reportData?.chatbot.knowledgeEntries}</p>
                      </div>
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tickets Criados</p>
                        <p className="text-2xl font-bold text-orange-600">{reportData?.chatbot.tickets}</p>
                      </div>
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedReports;
