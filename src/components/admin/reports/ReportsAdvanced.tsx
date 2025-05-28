
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { FileDown, BarChart3, PieChart, TrendingUp, Users, GraduationCap } from 'lucide-react';
import BarChartVisits from '../charts/BarChartVisits';
import PieChartViews from '../charts/PieChartViews';
import LineChartTrends from '../charts/LineChartTrends';
import { useSchools } from '@/hooks/useSchools';
import { useUsers } from '@/hooks/useUsers';
import { DateRange } from 'react-day-picker';

const ReportsAdvanced = () => {
  const { schools } = useSchools();
  const { users } = useUsers();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [reportType, setReportType] = useState<string>('overview');

  // Dados simulados - em produção viria da API
  const [chartData, setChartData] = useState({
    schoolVisits: [] as any[],
    userRoles: [] as any[],
    enrollmentTrends: [] as any[]
  });

  useEffect(() => {
    generateChartData();
  }, [schools, users, selectedSchool]);

  const generateChartData = () => {
    // Dados de visitas por escola
    const schoolVisits = schools.slice(0, 6).map(school => ({
      name: school.name.substring(0, 15) + '...',
      visitas: Math.floor(Math.random() * 100) + 20
    }));

    // Distribuição de roles
    const roleCount = users.reduce((acc, user) => {
      user.roles.forEach(role => {
        acc[role.role] = (acc[role.role] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const userRoles = Object.entries(roleCount).map(([role, count]) => ({
      name: role === 'teacher' ? 'Professores' :
            role === 'admin' ? 'Administradores' :
            role === 'director' ? 'Diretores' :
            role === 'student' ? 'Alunos' : role,
      value: count
    }));

    // Tendências de matrícula (dados simulados)
    const enrollmentTrends = [
      { name: 'Jan', estudantes: 2400, professores: 120 },
      { name: 'Fev', estudantes: 2450, professores: 125 },
      { name: 'Mar', estudantes: 2600, professores: 130 },
      { name: 'Abr', estudantes: 2580, professores: 128 },
      { name: 'Mai', estudantes: 2700, professores: 135 },
      { name: 'Jun', estudantes: 2750, professores: 140 }
    ];

    setChartData({
      schoolVisits,
      userRoles,
      enrollmentTrends
    });
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simular exportação
    const data = {
      schools: schools.length,
      users: users.length,
      activeUsers: users.filter(u => u.active).length,
      dateRange,
      selectedSchool,
      reportType
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: format === 'csv' ? 'text/csv' : 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${reportType}-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const colors = ['#4C51BF', '#38B2AC', '#F56565', '#ED8936', '#48BB78', '#9F7AEA'];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Relatórios Avançados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Visão Geral</SelectItem>
                <SelectItem value="schools">Escolas</SelectItem>
                <SelectItem value="users">Usuários</SelectItem>
                <SelectItem value="enrollment">Matrículas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger>
                <SelectValue placeholder="Escola" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Escolas</SelectItem>
                {schools.map(school => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DatePickerWithRange
              date={dateRange}
              onDateChange={setDateRange}
            />

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportReport('pdf')}
              >
                <FileDown className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportReport('excel')}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportReport('csv')}
              >
                <FileDown className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Escolas</p>
                <p className="text-2xl font-bold text-education-primary">{schools.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-education-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold text-education-primary">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-education-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.active).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Ativação</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.length > 0 ? Math.round((users.filter(u => u.active).length / users.length) * 100) : 0}%
                </p>
              </div>
              <PieChart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartVisits
          data={chartData.schoolVisits}
          title="Visitas por Escola"
          description="Número de visitas recebidas por cada escola"
        />

        <PieChartViews
          data={chartData.userRoles}
          title="Distribuição de Funções"
          description="Distribuição de usuários por função no sistema"
          colors={colors}
        />
      </div>

      <div className="w-full">
        <LineChartTrends
          data={chartData.enrollmentTrends}
          title="Tendências de Crescimento"
          description="Evolução do número de estudantes e professores ao longo do tempo"
        />
      </div>
    </div>
  );
};

export default ReportsAdvanced;
