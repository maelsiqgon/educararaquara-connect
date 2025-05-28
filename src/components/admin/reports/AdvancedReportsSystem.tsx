
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, BarChart3, PieChart, TrendingUp, FileText, Calendar, Users } from "lucide-react";
import { DateRange } from "react-day-picker";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";

interface ReportData {
  users: Array<{
    month: string;
    total: number;
    active: number;
    new: number;
  }>;
  schools: Array<{
    name: string;
    students: number;
    teachers: number;
    classes: number;
  }>;
  access: Array<{
    date: string;
    visits: number;
    pages: number;
    time: number;
  }>;
  content: Array<{
    type: string;
    count: number;
    color: string;
  }>;
}

const mockData: ReportData = {
  users: [
    { month: 'Jan', total: 1200, active: 980, new: 120 },
    { month: 'Fev', total: 1350, active: 1100, new: 150 },
    { month: 'Mar', total: 1480, active: 1250, new: 130 },
    { month: 'Abr', total: 1620, active: 1380, new: 140 },
    { month: 'Mai', total: 1750, active: 1500, new: 130 },
    { month: 'Jun', total: 1890, active: 1620, new: 140 }
  ],
  schools: [
    { name: 'Escola Municipal A', students: 320, teachers: 18, classes: 12 },
    { name: 'Escola Municipal B', students: 280, teachers: 15, classes: 10 },
    { name: 'Escola Municipal C', students: 450, teachers: 22, classes: 16 },
    { name: 'Escola Municipal D', students: 380, teachers: 20, classes: 14 }
  ],
  access: [
    { date: '2025-01-01', visits: 450, pages: 1200, time: 180 },
    { date: '2025-01-02', visits: 520, pages: 1450, time: 195 },
    { date: '2025-01-03', visits: 480, pages: 1300, time: 170 },
    { date: '2025-01-04', visits: 680, pages: 1800, time: 210 },
    { date: '2025-01-05', visits: 720, pages: 1950, time: 225 }
  ],
  content: [
    { type: 'Notícias', count: 145, color: '#3B82F6' },
    { type: 'Documentos', count: 89, color: '#10B981' },
    { type: 'Eventos', count: 67, color: '#F59E0B' },
    { type: 'Atas', count: 34, color: '#EF4444' },
    { type: 'Outros', count: 23, color: '#8B5CF6' }
  ]
};

const AdvancedReportsSystem: React.FC = () => {
  const [reportType, setReportType] = useState<string>('users');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    
    // Simular exportação
    setTimeout(() => {
      toast.success(`Relatório exportado em ${exportFormat.toUpperCase()} com sucesso!`);
      setLoading(false);
    }, 2000);
  };

  const renderChart = () => {
    switch (reportType) {
      case 'users':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockData.users}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} name="Total de Usuários" />
              <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} name="Usuários Ativos" />
              <Line type="monotone" dataKey="new" stroke="#F59E0B" strokeWidth={2} name="Novos Usuários" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'schools':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={mockData.schools}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#3B82F6" name="Estudantes" />
              <Bar dataKey="teachers" fill="#10B981" name="Professores" />
              <Bar dataKey="classes" fill="#F59E0B" name="Turmas" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'access':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockData.access}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={2} name="Visitas" />
              <Line type="monotone" dataKey="pages" stroke="#10B981" strokeWidth={2} name="Páginas Vistas" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'content':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Tooltip />
              <Legend />
              <RechartsPieChart data={mockData.content}>
                {mockData.content.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="text-center py-8 text-gray-500">Selecione um tipo de relatório</div>;
    }
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'users': return 'Relatório de Usuários';
      case 'schools': return 'Relatório de Escolas';
      case 'access': return 'Relatório de Acesso';
      case 'content': return 'Relatório de Conteúdo';
      default: return 'Relatório';
    }
  };

  const getMetrics = () => {
    switch (reportType) {
      case 'users':
        return [
          { label: 'Total de Usuários', value: '1,890', change: '+12%', color: 'text-blue-600' },
          { label: 'Usuários Ativos', value: '1,620', change: '+8%', color: 'text-green-600' },
          { label: 'Novos este Mês', value: '140', change: '+2%', color: 'text-orange-600' },
          { label: 'Taxa de Retenção', value: '86%', change: '+3%', color: 'text-purple-600' }
        ];
      case 'schools':
        return [
          { label: 'Total de Escolas', value: '4', change: '0%', color: 'text-blue-600' },
          { label: 'Total de Estudantes', value: '1,430', change: '+5%', color: 'text-green-600' },
          { label: 'Total de Professores', value: '75', change: '+2%', color: 'text-orange-600' },
          { label: 'Total de Turmas', value: '52', change: '+1%', color: 'text-purple-600' }
        ];
      case 'access':
        return [
          { label: 'Visitas Diárias', value: '650', change: '+15%', color: 'text-blue-600' },
          { label: 'Páginas Vistas', value: '1,750', change: '+12%', color: 'text-green-600' },
          { label: 'Tempo Médio', value: '3m 30s', change: '+8%', color: 'text-orange-600' },
          { label: 'Taxa de Rejeição', value: '24%', change: '-5%', color: 'text-purple-600' }
        ];
      case 'content':
        return [
          { label: 'Total de Conteúdo', value: '358', change: '+18%', color: 'text-blue-600' },
          { label: 'Publicações/Mês', value: '45', change: '+12%', color: 'text-green-600' },
          { label: 'Visualizações', value: '12,450', change: '+25%', color: 'text-orange-600' },
          { label: 'Engajamento', value: '4.2', change: '+8%', color: 'text-purple-600' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Sistema de Relatórios Avançados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Selecionar relatório" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Usuários
                    </div>
                  </SelectItem>
                  <SelectItem value="schools">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Escolas
                    </div>
                  </SelectItem>
                  <SelectItem value="access">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Acesso
                    </div>
                  </SelectItem>
                  <SelectItem value="content">
                    <div className="flex items-center">
                      <PieChart className="h-4 w-4 mr-2" />
                      Conteúdo
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <DatePickerWithRange
                date={dateRange}
                onDateChange={setDateRange}
                className="w-72"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Formato</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleExport} disabled={loading}>
              {loading ? (
                <>Exportando...</>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getMetrics().map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Badge variant={metric.change.startsWith('+') ? 'default' : 'destructive'}>
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <CardTitle>{getReportTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Tabela de Dados */}
      {reportType === 'users' && (
        <Card>
          <CardHeader>
            <CardTitle>Dados Detalhados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Mês</th>
                    <th className="border border-gray-200 p-2 text-left">Total</th>
                    <th className="border border-gray-200 p-2 text-left">Ativos</th>
                    <th className="border border-gray-200 p-2 text-left">Novos</th>
                    <th className="border border-gray-200 p-2 text-left">Taxa de Ativação</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.users.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2">{item.month}</td>
                      <td className="border border-gray-200 p-2">{item.total.toLocaleString()}</td>
                      <td className="border border-gray-200 p-2">{item.active.toLocaleString()}</td>
                      <td className="border border-gray-200 p-2">{item.new.toLocaleString()}</td>
                      <td className="border border-gray-200 p-2">
                        {((item.active / item.total) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedReportsSystem;
