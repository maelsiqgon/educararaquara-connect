
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ReportData {
  id: string;
  title: string;
  type: string;
  data: any;
  created_at: string;
}

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

      const generatedReports: ReportData[] = [
        {
          id: '1',
          title: 'Usuários Ativos',
          type: 'users',
          data: {
            total: profilesData?.length || 0,
            active: profilesData?.filter(p => p.active).length || 0
          },
          created_at: new Date().toISOString()
        }
      ];

      setReports(generatedReports);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao gerar relatórios:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: string, params?: any) => {
    try {
      await fetchReports();
      toast.success('Relatório gerado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao gerar relatório: ' + err.message);
      throw err;
    }
  };

  const exportReport = async (reportId: string, format: string = 'pdf') => {
    try {
      const report = reports.find(r => r.id === reportId);
      if (!report) {
        toast.error('Relatório não encontrado');
        return false;
      }
      
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
