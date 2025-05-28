
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReports, ReportData } from '@/hooks/useReports';
import { DateRange } from 'react-day-picker';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  Download, FileSpreadsheet, FileText, TrendingUp, Users, 
  School, BookOpen, Eye, Calendar, RefreshCw 
} from 'lucide-react';
import { toast } from 'sonner';

const ConnectedReportsSystem = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [reportType, setReportType] = useState<string>('general');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { loading, generateReport, exportReport } = useReports();

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    setIsGenerating(true);
    try {
      const data = await generateReport();
      if (data) {
        setReportData(data);
      }
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format: 'json' | 'csv') => {
    if (!reportData) return;
    
    try {
      await exportReport(reportData, format);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (isGenerating || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Gerando relatórios...</span>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Erro ao carregar dados dos relatórios</p>
        <Button onClick={loadReportData}>Tentar Novamente</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Relatórios</h1>
          <p className="text-gray-600">Análise completa dos dados do sistema</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={loadReportData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => handleExport('csv')} variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={() => handleExport('json')} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Exportar JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Período</label>
              <DatePickerWithRange
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Geral</SelectItem>
                  <SelectItem value="schools">Escolas</SelectItem>
                  <SelectItem value="users">Usuários</SelectItem>
                  <SelectItem value="news">Notícias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Escolas</p>
                <p className="text-3xl font-bold text-blue-600">{reportData.totalSchools}</p>
              </div>
              <School className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-3xl font-bold text-green-600">{reportData.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Estudantes</p>
                <p className="text-3xl font-bold text-purple-600">{reportData.totalStudents}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Notícias</p>
                <p className="text-3xl font-bold text-orange-600">{reportData.totalNews}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schools by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Escolas por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.schoolsByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ type, count }) => `${type}: ${count}`}
                >
                  {reportData.schoolsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários por Função</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.usersByRole}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* News Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Notícias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.newsStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly News Views */}
        <Card>
          <CardHeader>
            <CardTitle>Visualizações de Notícias (Mensal)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.monthlyNewsViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo por Escola</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reportData.schoolsByType.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">{item.type}</span>
                  <Badge variant="outline">{item.count} escolas</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo por Função</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reportData.usersByRole.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium capitalize">{item.role}</span>
                  <Badge variant="outline">{item.count} usuários</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-sm text-gray-600">
            <p>Relatório gerado em {new Date().toLocaleString('pt-BR')}</p>
            <p className="mt-1">Sistema de Gestão Educacional - Dados em tempo real</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedReportsSystem;
