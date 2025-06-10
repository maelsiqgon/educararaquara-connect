
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReportData } from '@/types/reports';

export { ReportData } from '@/types/reports';

export const useReports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      const { data: schoolsData, error: schoolsError } = await supabase
        .from('schools')
        .select('*');

      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('*');

      // Criar dados do relatório
      const reportData: ReportData = {
        id: '1',
        title: 'Relatório Geral',
        type: 'general',
        data: {},
        created_at: new Date().toISOString(),
        totalUsers: profilesData?.length || 0,
        totalSchools: schoolsData?.length || 0,
        totalStudents: 0,
        totalNews: newsData?.length || 0,
        schoolsByType: [
          { type: 'Infantil', count: schoolsData?.filter(s => s.type === 'infantil').length || 0 },
          { type: 'Fundamental', count: schoolsData?.filter(s => s.type === 'fundamental').length || 0 },
          { type: 'Médio', count: schoolsData?.filter(s => s.type === 'medio').length || 0 }
        ],
        usersByRole: [
          { role: 'super_admin', count: profilesData?.filter(p => p.role === 'super_admin').length || 0 },
          { role: 'admin', count: profilesData?.filter(p => p.role === 'admin').length || 0 },
          { role: 'user', count: profilesData?.filter(p => p.role === 'user').length || 0 }
        ],
        newsStatus: [
          { status: 'published', count: newsData?.filter(n => n.status === 'published').length || 0 },
          { status: 'draft', count: newsData?.filter(n => n.status === 'draft').length || 0 },
          { status: 'archived', count: newsData?.filter(n => n.status === 'archived').length || 0 }
        ],
        monthlyNewsViews: [
          { month: 'Jan', views: 100 },
          { month: 'Fev', views: 150 },
          { month: 'Mar', views: 200 },
          { month: 'Abr', views: 180 },
          { month: 'Mai', views: 220 },
          { month: 'Jun', views: 250 }
        ]
      };

      setReports([reportData]);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao gerar relatórios:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: string = 'general', params?: any): Promise<ReportData | null> => {
    try {
      await fetchReports();
      return reports[0] || null;
    } catch (err: any) {
      toast.error('Erro ao gerar relatório: ' + err.message);
      throw err;
    }
  };

  const exportReport = async (reportData: ReportData, format: string = 'json') => {
    try {
      const dataStr = format === 'json' ? 
        JSON.stringify(reportData, null, 2) : 
        Object.entries(reportData).map(([key, value]) => `${key},${value}`).join('\n');
      
      const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio.${format}`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success(`Relatório exportado em ${format.toUpperCase()}`);
      return true;
    } catch (err: any) {
      toast.error('Erro ao exportar relatório: ' + err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    generateReport,
    exportReport
  };
};
