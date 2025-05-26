
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSchools } from "@/components/admin/mockData";

const Escolas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <h1 className="text-4xl font-bold mb-4">Nossas Escolas</h1>
            <p className="text-xl">Conheça as unidades educacionais da rede municipal</p>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSchools.map((school) => (
                <Card key={school.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-education-primary">{school.name}</CardTitle>
                    <CardDescription>{school.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Diretor(a):</strong> {school.director}</p>
                      <p><strong>Endereço:</strong> {school.address}</p>
                      <p><strong>Telefone:</strong> {school.phone}</p>
                      <p><strong>Alunos:</strong> {school.students}</p>
                      <p><strong>Turmas:</strong> {school.classes}</p>
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

export default Escolas;
