
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Institucional = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <h1 className="text-4xl font-bold mb-4">Secretaria de Educação</h1>
            <p className="text-xl">Compromisso com a educação de qualidade em Araraquara</p>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Nossa Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Promover uma educação de qualidade, inclusiva e transformadora, garantindo o desenvolvimento integral dos estudantes da rede municipal de Araraquara.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nossa Visão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Ser referência em educação municipal, oferecendo ensino inovador e formação cidadã para todos os estudantes.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nossos Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Inclusão e diversidade</li>
                    <li>Excelência educacional</li>
                    <li>Transparência e ética</li>
                    <li>Inovação pedagógica</li>
                    <li>Participação comunitária</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Estrutura Organizacional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>A Secretaria de Educação está organizada em departamentos especializados para atender todas as necessidades da rede municipal de ensino.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Institucional;
