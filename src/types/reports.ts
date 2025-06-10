
export interface ReportData {
  id: string;
  title: string;
  type: string;
  data: any;
  created_at: string;
  totalSchools: number;
  totalUsers: number;
  totalStudents: number;
  totalNews: number;
  schoolsByType: Array<{
    type: string;
    count: number;
  }>;
  usersByRole: Array<{
    role: string;
    count: number;
  }>;
  newsStatus: Array<{
    status: string;
    count: number;
  }>;
  monthlyNewsViews: Array<{
    month: string;
    views: number;
  }>;
}
