
import React from "react";
import { Users, FileText, School, Calendar } from "lucide-react";
import StatCard from "./StatCard";
import BarChartVisits from "./charts/BarChartVisits";
import PieChartViews from "./charts/PieChartViews";
import LineChartTrends from "./charts/LineChartTrends";

// Mock data for visualizations
const visitData = [
  { name: "Segunda", visitas: 1200 },
  { name: "Terça", visitas: 1900 },
  { name: "Quarta", visitas: 2000 },
  { name: "Quinta", visitas: 2780 },
  { name: "Sexta", visitas: 1890 },
  { name: "Sábado", visitas: 1390 },
  { name: "Domingo", visitas: 890 },
];

const pageViewsData = [
  { name: "Home", value: 4000 },
  { name: "Notícias", value: 3000 },
  { name: "Sobre", value: 2000 },
  { name: "Alunos", value: 2780 },
  { name: "Professores", value: 1890 },
  { name: "Contato", value: 1290 },
];

const monthlyTrendsData = [
  { name: "Jan", estudantes: 4000, professores: 2400 },
  { name: "Fev", estudantes: 3000, professores: 1398 },
  { name: "Mar", estudantes: 2000, professores: 1800 },
  { name: "Abr", estudantes: 2780, professores: 3908 },
  { name: "Mai", estudantes: 1890, professores: 4800 },
  { name: "Jun", estudantes: 2390, professores: 3800 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6E6E'];

const DashboardStats = () => {
  // Estatísticas gerais
  const stats = [
    {
      title: "Usuários Ativos",
      value: "24,567",
      change: "+12%",
      positive: true,
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Notícias Publicadas",
      value: "285",
      change: "+5%",
      positive: true,
      icon: <FileText className="h-5 w-5 text-green-500" />
    },
    {
      title: "Escolas Integradas",
      value: "72",
      change: "+3",
      positive: true,
      icon: <School className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Eventos Próximos",
      value: "18",
      change: "+2",
      positive: true,
      icon: <Calendar className="h-5 w-5 text-orange-500" />
    },
  ];

  return (
    <div className="space-y-6">
      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            title={stat.title}
            value={stat.value}
            change={stat.change}
            positive={stat.positive}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visitas Diárias */}
        <BarChartVisits 
          data={visitData} 
          title="Visitas Diárias" 
          description="Visitas ao portal na última semana" 
        />

        {/* Visualizações por página */}
        <PieChartViews 
          data={pageViewsData} 
          title="Visualizações por Página" 
          description="Páginas mais acessadas" 
          colors={COLORS}
        />
      </div>

      {/* Tendências Mensais */}
      <LineChartTrends 
        data={monthlyTrendsData} 
        title="Tendências Mensais" 
        description="Acompanhamento de estudantes e professores ativos" 
      />
    </div>
  );
};

export default DashboardStats;
