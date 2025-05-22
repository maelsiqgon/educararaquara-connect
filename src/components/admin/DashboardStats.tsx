
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, FileText, School, Calendar } from "lucide-react";

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
          <Card key={index} className="shadow-sm border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`ml-2 text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="rounded-full bg-gray-100 p-3">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visitas Diárias */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Visitas Diárias</CardTitle>
            <CardDescription>Visitas ao portal na última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="visitas" fill="#4C51BF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Visualizações por página */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Visualizações por Página</CardTitle>
            <CardDescription>Páginas mais acessadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pageViewsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pageViewsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tendências Mensais */}
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tendências Mensais</CardTitle>
          <CardDescription>Acompanhamento de estudantes e professores ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="estudantes" stroke="#4C51BF" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="professores" stroke="#38B2AC" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
