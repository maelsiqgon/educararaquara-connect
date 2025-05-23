
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Calendar,
  Download,
  FileText,
  BarChart3,
  FileBarChart
} from "lucide-react";

// Mock data for reports
const attendanceData = [
  { name: 'Jan', attendance: 92 },
  { name: 'Feb', attendance: 88 },
  { name: 'Mar', attendance: 94 },
  { name: 'Apr', attendance: 91 },
  { name: 'May', attendance: 87 },
  { name: 'Jun', attendance: 85 },
];

const performanceData = [
  { name: 'Português', average: 7.8 },
  { name: 'Matemática', average: 6.9 },
  { name: 'Ciências', average: 8.2 },
  { name: 'História', average: 7.5 },
  { name: 'Geografia', average: 7.4 },
  { name: 'Artes', average: 8.7 },
];

const progressionData = [
  { name: '1º Bimestre', average: 7.2 },
  { name: '2º Bimestre', average: 7.5 },
  { name: '3º Bimestre', average: 7.9 },
  { name: '4º Bimestre', average: 8.2 },
];

const participationData = [
  { name: 'Participantes', value: 72 },
  { name: 'Não Participantes', value: 28 },
];

const COLORS = ['#4C51BF', '#CBD5E0'];

const mockSchools = [
  { id: 1, name: "E.M. Paulo Freire" },
  { id: 2, name: "E.M. Anísio Teixeira" },
  { id: 3, name: "E.M. Maria Montessori" },
  { id: 4, name: "E.M. Jean Piaget" }
];

const mockClasses = [
  { id: 1, name: "1º Ano A" },
  { id: 2, name: "2º Ano B" },
  { id: 3, name: "3º Ano C" },
  { id: 4, name: "4º Ano A" },
  { id: 5, name: "5º Ano B" }
];

const ReportsModule: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>("attendance");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [dateRange, setDateRange] = useState<{start?: string, end?: string}>({
    start: undefined,
    end: undefined
  });
  
  const generateReport = () => {
    // This would be an API call to generate the report
    console.log("Generating report with:", {
      type: selectedReportType,
      school: selectedSchool,
      class: selectedClass,
      dateRange
    });
  };
  
  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Módulo de Relatórios</CardTitle>
        <CardDescription>
          Gere relatórios detalhados sobre desempenho escolar, frequência e engajamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="generate">Gerar Relatórios</TabsTrigger>
            <TabsTrigger value="saved">Relatórios Salvos</TabsTrigger>
            <TabsTrigger value="scheduled">Agendados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Relatório</Label>
                  <Select 
                    value={selectedReportType} 
                    onValueChange={setSelectedReportType}
                  >
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Selecione o tipo de relatório" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">Frequência</SelectItem>
                      <SelectItem value="performance">Desempenho</SelectItem>
                      <SelectItem value="progression">Progressão</SelectItem>
                      <SelectItem value="participation">Participação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="school">Escola</Label>
                  <Select 
                    value={selectedSchool} 
                    onValueChange={setSelectedSchool}
                  >
                    <SelectTrigger id="school">
                      <SelectValue placeholder="Selecione a escola" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSchools.map(school => (
                        <SelectItem key={school.id} value={school.id.toString()}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Turma</Label>
                  <Select 
                    value={selectedClass} 
                    onValueChange={setSelectedClass}
                    disabled={!selectedSchool}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClasses.map(cls => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Data Inicial</Label>
                    <div className="relative">
                      <input 
                        id="start-date"
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Data Final</Label>
                    <div className="relative">
                      <input 
                        id="end-date"
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={generateReport}
                    className="w-full"
                    disabled={!selectedReportType || !selectedSchool}
                  >
                    Gerar Relatório
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Pré-visualização</h3>
                
                {selectedReportType === 'attendance' && (
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attendance" fill="#4C51BF" name="% Frequência" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {selectedReportType === 'performance' && (
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#4C51BF" name="Média" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {selectedReportType === 'progression' && (
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="average" 
                          stroke="#4C51BF" 
                          name="Média" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {selectedReportType === 'participation' && (
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={participationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {participationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4 border-b bg-muted/40">
                <h3 className="text-sm font-medium">Relatórios Salvos</h3>
              </div>
              <div className="divide-y">
                {[
                  {
                    id: 1,
                    name: "Frequência - E.M. Paulo Freire - 1º Trimestre",
                    date: "20/04/2025",
                    type: "Frequência",
                    format: "PDF"
                  },
                  {
                    id: 2,
                    name: "Desempenho - E.M. Anísio Teixeira - 4º Ano A",
                    date: "15/04/2025",
                    type: "Desempenho",
                    format: "XLSX"
                  },
                  {
                    id: 3,
                    name: "Progressão Anual - E.M. Maria Montessori",
                    date: "10/04/2025",
                    type: "Progressão",
                    format: "PDF"
                  }
                ].map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        {report.type === "Frequência" && <BarChart3 className="h-8 w-8 text-gray-400" />}
                        {report.type === "Desempenho" && <FileBarChart className="h-8 w-8 text-gray-400" />}
                        {report.type === "Progressão" && <FileText className="h-8 w-8 text-gray-400" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{report.name}</h4>
                        <p className="text-xs text-gray-500">Gerado em {report.date} • {report.format}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4 border-b bg-muted/40">
                <h3 className="text-sm font-medium">Relatórios Agendados</h3>
              </div>
              <div className="divide-y">
                {[
                  {
                    id: 1,
                    name: "Frequência Mensal - Todas as Escolas",
                    frequency: "Mensal",
                    nextDate: "01/06/2025",
                    recipients: 5
                  },
                  {
                    id: 2,
                    name: "Progresso Bimestral - Ensino Fundamental",
                    frequency: "Bimestral",
                    nextDate: "30/06/2025",
                    recipients: 12
                  }
                ].map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="text-sm font-medium">{report.name}</h4>
                      <p className="text-xs text-gray-500">
                        Frequência: {report.frequency} • Próximo: {report.nextDate} • 
                        {report.recipients} destinatários
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Cancelar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsModule;
