
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReports, ReportData } from '@/hooks/useReports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, TrendingUp, Users, School, BookOpen } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const ReportsModule = () => {
  const { loading, generateReport, exportReport } = useReports();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const data = await generateReport('general');
    setReportData(data);
  };

  const handleExport = () => {
    if (reportData) {
      exportReport(reportData, exportFormat);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading && !reportData) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-education-primary">Relatórios e Estatísticas</h2>
        <div className="flex items-center space-x-2">
          <Select value={exportFormat} onValueChange={(value) => setExportFormat(value as 'json' | 'csv')}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} disabled={!reportData}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={loadReport} disabled={loading}>
            <FileText className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {reportData && (
        <>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Escolas</p>
                    <p className="text-3xl font-bold text-education-primary">{reportData.totalSchools}</p>
                  </div>
                  <School className="h-8 w-8 text-education-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                    <p className="text-3xl font-bold text-education-primary">{reportData.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-education-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Notícias</p>
                    <p className="text-3xl font-bold text-education-primary">{reportData.totalNews}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-education-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Estudantes</p>
                    <p className="text-3xl font-bold text-education-primary">{reportData.totalStudents}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-education-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Escolas por Tipo */}
            <Card>
              <CardHeader>
                <CardTitle>Escolas por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.schoolsByType}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status das Notícias */}
            <Card>
              <CardHeader>
                <CardTitle>Status das Notícias</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.newsStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {reportData.newsStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Usuários por Função */}
            <Card>
              <CardHeader>
                <CardTitle>Usuários por Função</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.usersByRole} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="role" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Views Mensais */}
            <Card>
              <CardHeader>
                <CardTitle>Visualizações Mensais de Notícias</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportData.monthlyNewsViews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsModule;
