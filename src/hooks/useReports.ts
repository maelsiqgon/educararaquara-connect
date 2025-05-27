
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ReportData {
  totalSchools: number;
  totalUsers: number;
  totalNews: number;
  totalStudents: number;
  schoolsByType: { type: string; count: number }[];
  usersByRole: { role: string; count: number }[];
  newsStatus: { status: string; count: number }[];
  monthlyNewsViews: { month: string; views: number }[];
}

export const useReports = () => {
  const [loading, setLoading] = useState(false);

  const generateReport = async (): Promise<ReportData | null> => {
    try {
      setLoading(true);

      // Buscar estatísticas das escolas
      const { data: schools, error: schoolsError } = await supabase
        .from('schools')
        .select('type, students')
        .eq('active', true);

      if (schoolsError) throw schoolsError;

      // Buscar usuários
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select(`
          id,
          roles:user_school_roles(role)
        `)
        .eq('active', true);

      if (usersError) throw usersError;

      // Buscar notícias
      const { data: news, error: newsError } = await supabase
        .from('news')
        .select('status, views, created_at');

      if (newsError) throw newsError;

      // Processar dados
      const totalSchools = schools?.length || 0;
      const totalUsers = users?.length || 0;
      const totalNews = news?.length || 0;
      const totalStudents = schools?.reduce((sum, school) => sum + (school.students || 0), 0) || 0;

      // Escolas por tipo
      const schoolsByType = schools?.reduce((acc: any[], school) => {
        const existing = acc.find(item => item.type === school.type);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ type: school.type, count: 1 });
        }
        return acc;
      }, []) || [];

      // Usuários por role
      const usersByRole = users?.reduce((acc: any[], user) => {
        user.roles?.forEach((roleObj: any) => {
          const existing = acc.find(item => item.role === roleObj.role);
          if (existing) {
            existing.count++;
          } else {
            acc.push({ role: roleObj.role, count: 1 });
          }
        });
        return acc;
      }, []) || [];

      // Status das notícias
      const newsStatus = news?.reduce((acc: any[], newsItem) => {
        const existing = acc.find(item => item.status === newsItem.status);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ status: newsItem.status, count: 1 });
        }
        return acc;
      }, []) || [];

      // Views mensais (últimos 6 meses)
      const monthlyNewsViews = news?.reduce((acc: any[], newsItem) => {
        const month = new Date(newsItem.created_at).toLocaleDateString('pt-BR', { 
          year: 'numeric', 
          month: 'short' 
        });
        const existing = acc.find(item => item.month === month);
        if (existing) {
          existing.views += newsItem.views || 0;
        } else {
          acc.push({ month, views: newsItem.views || 0 });
        }
        return acc;
      }, []) || [];

      const reportData: ReportData = {
        totalSchools,
        totalUsers,
        totalNews,
        totalStudents,
        schoolsByType,
        usersByRole,
        newsStatus,
        monthlyNewsViews
      };

      return reportData;
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Erro ao gerar relatório');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (data: ReportData, format: 'json' | 'csv' = 'json') => {
    try {
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (format === 'csv') {
        // Converter para CSV básico
        const csvData = [
          ['Métricas Gerais'],
          ['Total de Escolas', data.totalSchools],
          ['Total de Usuários', data.totalUsers],
          ['Total de Notícias', data.totalNews],
          ['Total de Estudantes', data.totalStudents],
          [''],
          ['Escolas por Tipo'],
          ...data.schoolsByType.map(item => [item.type, item.count]),
          [''],
          ['Usuários por Função'],
          ...data.usersByRole.map(item => [item.role, item.count])
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
      
      toast.success(`Relatório exportado em ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting report:', error);
      toast.error('Erro ao exportar relatório');
    }
  };

  return {
    loading,
    generateReport,
    exportReport
  };
};
