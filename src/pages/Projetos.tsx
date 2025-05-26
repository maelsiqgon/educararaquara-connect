
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Projetos = () => {
  const projects = [
    {
      id: 1,
      title: "Escolas Conectadas",
      description: "Implementação de internet de alta velocidade em todas as escolas municipais",
      status: "Em andamento",
      progress: 85
    },
    {
      id: 2,
      title: "Inclusão Digital",
      description: "Distribuição de tablets para alunos do Ensino Fundamental",
      status: "Em andamento",
      progress: 70
    },
    {
      id: 3,
      title: "Alimentação Saudável",
      description: "Revisão do cardápio escolar com alimentos orgânicos e da agricultura familiar",
      status: "Concluído",
      progress: 100
    },
    {
      id: 4,
      title: "Capacitação em Tecnologia",
      description: "Programa de capacitação em tecnologia educacional para professores",
      status: "Em andamento",
      progress: 45
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <h1 className="text-4xl font-bold mb-4">Projetos Educacionais</h1>
            <p className="text-xl">Iniciativas que transformam a educação em Araraquara</p>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-education-primary">{project.title}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === "Concluído" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${project.status === "Concluído" ? "bg-green-600" : "bg-blue-600"}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projetos;
