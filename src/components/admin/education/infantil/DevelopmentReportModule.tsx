
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListCheck, User, PieChart, FileText, Send } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockStudents = [
  { id: 1, name: "Ana Clara Silva", age: "3 anos", class: "Maternal I" },
  { id: 2, name: "Miguel Santos", age: "4 anos", class: "Maternal II" },
  { id: 3, name: "Laura Oliveira", age: "3 anos", class: "Maternal I" },
  { id: 4, name: "Pedro Henrique", age: "4 anos", class: "Maternal II" },
  { id: 5, name: "Sophia Martins", age: "3 anos", class: "Maternal I" },
];

const competencyAreas = [
  { 
    id: "cognitive", 
    name: "Desenvolvimento Cognitivo",
    competencies: [
      "Identifica cores primárias",
      "Reconhece formas geométricas básicas",
      "Demonstra lógica simples na resolução de problemas",
      "Compreende conceitos de tamanho e quantidade",
      "Mantém atenção em atividades por tempo adequado à idade"
    ]
  },
  { 
    id: "motor", 
    name: "Desenvolvimento Motor",
    competencies: [
      "Coordenação motora fina adequada à idade",
      "Coordenação motora ampla adequada à idade",
      "Utiliza tesoura com supervisão",
      "Segura lápis corretamente",
      "Demonstra noções de lateralidade"
    ]
  },
  { 
    id: "social", 
    name: "Desenvolvimento Socioemocional",
    competencies: [
      "Interage adequadamente com colegas",
      "Demonstra empatia com os outros",
      "Expressa sentimentos apropriadamente",
      "Participa de atividades em grupo",
      "Respeita regras de convivência"
    ]
  },
  { 
    id: "language", 
    name: "Desenvolvimento da Linguagem",
    competencies: [
      "Expressa-se verbalmente de forma clara",
      "Compreende instruções simples",
      "Participa de rodas de conversas",
      "Demonstra interesse por histórias",
      "Amplia gradativamente o vocabulário"
    ]
  }
];

const DevelopmentReportModule = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("q1");
  const [activeArea, setActiveArea] = useState("cognitive");
  const [evaluations, setEvaluations] = useState<{[key: string]: {[key: string]: string}}>({});
  const [generalObservations, setGeneralObservations] = useState("");

  const handleEvaluationChange = (competency: string, value: string) => {
    setEvaluations(prev => ({
      ...prev,
      [activeArea]: {
        ...(prev[activeArea] || {}),
        [competency]: value
      }
    }));
  };

  const getEvaluationValue = (competency: string) => {
    if (!evaluations[activeArea]) return "";
    return evaluations[activeArea][competency] || "";
  };

  const calculateCompletion = () => {
    let total = 0;
    let completed = 0;
    
    competencyAreas.forEach(area => {
      area.competencies.forEach(() => {
        total++;
        if (evaluations[area.id] && Object.keys(evaluations[area.id]).length > 0) {
          completed++;
        }
      });
    });
    
    return Math.round((completed / total) * 100);
  };

  const handleSaveReport = () => {
    if (!selectedStudent) {
      toast.error("Por favor, selecione um aluno.");
      return;
    }
    
    const completion = calculateCompletion();
    if (completion < 80) {
      toast.warning("Relatório salvo como rascunho. Complete pelo menos 80% das avaliações antes de finalizar.");
      return;
    }
    
    toast.success("Relatório salvo com sucesso!");
  };

  const handleSendReport = () => {
    if (!selectedStudent) {
      toast.error("Por favor, selecione um aluno.");
      return;
    }
    
    const completion = calculateCompletion();
    if (completion < 100) {
      toast.error("Complete todas as avaliações antes de enviar o relatório.");
      return;
    }
    
    toast.success("Relatório enviado aos responsáveis com sucesso!");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <ListCheck className="h-5 w-5 mr-2 text-cyan-500" />
          Relatório de Desenvolvimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="student-select">Aluno</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student-select" className="mt-1">
                    <SelectValue placeholder="Selecionar aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map(student => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name} ({student.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label htmlFor="period-select">Período</Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger id="period-select" className="mt-1">
                    <SelectValue placeholder="Selecionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">1° Trimestre - 2024</SelectItem>
                    <SelectItem value="q2">2° Trimestre - 2024</SelectItem>
                    <SelectItem value="q3">3° Trimestre - 2024</SelectItem>
                    <SelectItem value="q4">4° Trimestre - 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedStudent && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Tabs value={activeArea} onValueChange={setActiveArea}>
                    <TabsList className="grid grid-cols-4 mb-4">
                      {competencyAreas.map(area => (
                        <TabsTrigger key={area.id} value={area.id} className="text-xs">
                          {area.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {competencyAreas.map(area => (
                      <TabsContent key={area.id} value={area.id}>
                        <h3 className="font-medium mb-3">{area.name}</h3>
                        <div className="space-y-4">
                          {area.competencies.map((competency, index) => (
                            <div key={index} className="bg-white p-3 rounded-md border">
                              <Label className="text-sm">{competency}</Label>
                              <div className="mt-2 grid grid-cols-5 gap-1">
                                {["Não Avaliado", "Inicial", "Em Desenvolvimento", "Satisfatório", "Excelente"].map((level, levelIndex) => (
                                  <div key={levelIndex} className="flex items-center">
                                    <input 
                                      type="radio" 
                                      id={`${area.id}-${index}-${levelIndex}`}
                                      name={`${area.id}-${competency}`}
                                      value={level}
                                      checked={getEvaluationValue(competency) === level}
                                      onChange={() => handleEvaluationChange(competency, level)}
                                      className="h-4 w-4 border-gray-300 text-education-primary focus:ring-education-primary"
                                    />
                                    <label 
                                      htmlFor={`${area.id}-${index}-${levelIndex}`}
                                      className="ml-1 text-xs text-gray-600"
                                    >
                                      {level}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
                
                <div>
                  <Label htmlFor="general-observations">Observações Gerais</Label>
                  <Textarea 
                    id="general-observations" 
                    value={generalObservations} 
                    onChange={(e) => setGeneralObservations(e.target.value)}
                    placeholder="Registre observações gerais sobre o desenvolvimento da criança neste período" 
                    className="mt-1"
                    rows={5}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleSaveReport} className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Salvar Relatório
                  </Button>
                  <Button onClick={handleSendReport} className="flex-1" variant="secondary">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar aos Responsáveis
                  </Button>
                </div>
              </>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Informações</h3>
            
            {selectedStudent ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start space-x-3">
                    <User className="h-8 w-8 text-education-primary bg-education-light p-1 rounded-full" />
                    <div>
                      <h4 className="font-medium">
                        {mockStudents.find(s => s.id.toString() === selectedStudent)?.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {mockStudents.find(s => s.id.toString() === selectedStudent)?.age} • 
                        {mockStudents.find(s => s.id.toString() === selectedStudent)?.class}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <PieChart className="h-4 w-4 mr-1" />
                    Progresso da Avaliação
                  </h4>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        calculateCompletion() < 50 ? 'bg-red-500' : 
                        calculateCompletion() < 80 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${calculateCompletion()}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-right text-gray-500">{calculateCompletion()}% completo</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Histórico de Relatórios</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between">
                      <span>4° Trimestre - 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">Ver</Button>
                    </li>
                    <li className="flex justify-between">
                      <span>3° Trimestre - 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">Ver</Button>
                    </li>
                    <li className="flex justify-between">
                      <span>2° Trimestre - 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">Ver</Button>
                    </li>
                    <li className="flex justify-between">
                      <span>1° Trimestre - 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">Ver</Button>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700">
                    <strong>Lembrete:</strong> Os responsáveis receberão uma notificação quando o relatório for compartilhado.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <User className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">Selecione um aluno para iniciar o relatório</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentReportModule;
