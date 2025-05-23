
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Coffee, Moon, BookOpen, MessageSquare, Info } from "lucide-react";
import { toast } from "sonner";

const mockStudents = [
  { id: 1, name: "Ana Clara Silva", age: "3 anos", allergies: "Nenhuma" },
  { id: 2, name: "Miguel Santos", age: "4 anos", allergies: "Amendoim" },
  { id: 3, name: "Laura Oliveira", age: "3 anos", allergies: "Glúten" },
  { id: 4, name: "Pedro Henrique", age: "4 anos", allergies: "Nenhuma" },
  { id: 5, name: "Sophia Martins", age: "3 anos", allergies: "Leite" },
];

const DailyActivitiesModule = () => {
  const [selectedTab, setSelectedTab] = useState("meals");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealConsumption, setMealConsumption] = useState("");
  const [mealNotes, setMealNotes] = useState("");
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [sleepNotes, setSleepNotes] = useState("");
  const [activityParticipation, setActivityParticipation] = useState("");
  const [activityNotes, setActivityNotes] = useState("");
  const [communicationTitle, setCommunicationTitle] = useState("");
  const [communicationContent, setCommunicationContent] = useState("");
  const [communicationUrgent, setCommunicationUrgent] = useState(false);

  const handleSaveMeal = () => {
    if (!selectedStudent || !mealType || !mealConsumption) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Registro de alimentação salvo com sucesso!");
    // Reset form
    setMealType("");
    setMealConsumption("");
    setMealNotes("");
  };

  const handleSaveSleep = () => {
    if (!selectedStudent || !sleepStart || !sleepEnd || !sleepQuality) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Registro de repouso salvo com sucesso!");
    // Reset form
    setSleepStart("");
    setSleepEnd("");
    setSleepQuality("");
    setSleepNotes("");
  };

  const handleSaveActivity = () => {
    if (!selectedStudent || !activityParticipation) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Registro de atividade salvo com sucesso!");
    // Reset form
    setActivityParticipation("");
    setActivityNotes("");
  };

  const handleSendCommunication = () => {
    if (!selectedStudent || !communicationTitle || !communicationContent) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Comunicado enviado com sucesso aos responsáveis!");
    // Reset form
    setCommunicationTitle("");
    setCommunicationContent("");
    setCommunicationUrgent(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-pink-500" />
          Diário de Atividades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <Label htmlFor="student-select">Selecione o Aluno</Label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger id="student-select" className="mt-1">
              <SelectValue placeholder="Selecionar aluno" />
            </SelectTrigger>
            <SelectContent>
              {mockStudents.map(student => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name} ({student.age})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedStudent && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex items-center">
                <Info className="h-4 w-4 text-blue-500 mr-1" />
                <p className="text-xs text-blue-700">
                  {mockStudents.find(s => s.id.toString() === selectedStudent)?.allergies === "Nenhuma" 
                    ? "Sem alergias registradas"
                    : `Alergias: ${mockStudents.find(s => s.id.toString() === selectedStudent)?.allergies}`}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 bg-gray-50">
            <TabsTrigger value="meals" className="flex items-center">
              <Coffee className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Refeições</span>
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center">
              <Moon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Repouso</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Atividades</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Comunicados</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meals">
            <div className="space-y-4">
              <div>
                <Label htmlFor="meal-type">Tipo de Refeição</Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger id="meal-type" className="mt-1">
                    <SelectValue placeholder="Selecione o tipo de refeição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Café da Manhã</SelectItem>
                    <SelectItem value="snack1">Lanche da Manhã</SelectItem>
                    <SelectItem value="lunch">Almoço</SelectItem>
                    <SelectItem value="snack2">Lanche da Tarde</SelectItem>
                    <SelectItem value="dinner">Jantar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="meal-consumption">Consumo</Label>
                <Select value={mealConsumption} onValueChange={setMealConsumption}>
                  <SelectTrigger id="meal-consumption" className="mt-1">
                    <SelectValue placeholder="Quanto consumiu?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tudo</SelectItem>
                    <SelectItem value="most">Maior parte</SelectItem>
                    <SelectItem value="half">Metade</SelectItem>
                    <SelectItem value="little">Pouco</SelectItem>
                    <SelectItem value="nothing">Nada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="meal-notes">Observações</Label>
                <Textarea 
                  id="meal-notes" 
                  value={mealNotes} 
                  onChange={(e) => setMealNotes(e.target.value)}
                  placeholder="Observações sobre a alimentação" 
                  className="mt-1"
                />
              </div>
              
              <Button onClick={handleSaveMeal} className="w-full">Registrar Alimentação</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sleep-start">Horário de Início</Label>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <Input 
                    id="sleep-start" 
                    type="time" 
                    value={sleepStart} 
                    onChange={(e) => setSleepStart(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="sleep-end">Horário de Término</Label>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <Input 
                    id="sleep-end" 
                    type="time" 
                    value={sleepEnd} 
                    onChange={(e) => setSleepEnd(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="sleep-quality">Qualidade do Sono</Label>
                <Select value={sleepQuality} onValueChange={setSleepQuality}>
                  <SelectTrigger id="sleep-quality" className="mt-1">
                    <SelectValue placeholder="Qualidade do sono" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excelente</SelectItem>
                    <SelectItem value="good">Bom</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="restless">Agitado</SelectItem>
                    <SelectItem value="poor">Não dormiu bem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sleep-notes">Observações</Label>
                <Textarea 
                  id="sleep-notes" 
                  value={sleepNotes} 
                  onChange={(e) => setSleepNotes(e.target.value)}
                  placeholder="Observações sobre o repouso" 
                  className="mt-1"
                />
              </div>
              
              <Button onClick={handleSaveSleep} className="w-full">Registrar Repouso</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <div className="space-y-4">
              <div>
                <Label htmlFor="activity-participation">Participação nas Atividades</Label>
                <Select value={activityParticipation} onValueChange={setActivityParticipation}>
                  <SelectTrigger id="activity-participation" className="mt-1">
                    <SelectValue placeholder="Nível de participação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excelente</SelectItem>
                    <SelectItem value="good">Boa</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="little">Pouca</SelectItem>
                    <SelectItem value="none">Não participou</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="activity-notes">Observações Pedagógicas</Label>
                <Textarea 
                  id="activity-notes" 
                  value={activityNotes} 
                  onChange={(e) => setActivityNotes(e.target.value)}
                  placeholder="Observações sobre as atividades realizadas" 
                  className="mt-1"
                />
              </div>
              
              <Button onClick={handleSaveActivity} className="w-full">Registrar Atividades</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="communication">
            <div className="space-y-4">
              <div>
                <Label htmlFor="communication-title">Título do Comunicado</Label>
                <Input 
                  id="communication-title" 
                  value={communicationTitle} 
                  onChange={(e) => setCommunicationTitle(e.target.value)}
                  placeholder="Ex: Informação sobre lição de casa" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="communication-content">Conteúdo</Label>
                <Textarea 
                  id="communication-content" 
                  value={communicationContent} 
                  onChange={(e) => setCommunicationContent(e.target.value)}
                  placeholder="Escreva o comunicado para os responsáveis" 
                  className="mt-1"
                  rows={5}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  id="communication-urgent" 
                  type="checkbox" 
                  checked={communicationUrgent} 
                  onChange={(e) => setCommunicationUrgent(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-education-primary focus:ring-education-primary"
                />
                <Label htmlFor="communication-urgent" className="text-sm font-normal">Marcar como urgente</Label>
              </div>
              
              <Button onClick={handleSendCommunication} className="w-full">Enviar Comunicado</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DailyActivitiesModule;
