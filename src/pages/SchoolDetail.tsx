
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSchools } from '@/hooks/useSchools';

const SchoolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { schools, loading } = useSchools();
  
  const school = schools.find(s => s.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-education-primary mx-auto"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-600">Escola não encontrada</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {school.image_url && (
            <img 
              src={school.image_url} 
              alt={school.name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-education-primary mb-4">{school.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informações Gerais</h3>
                <p><strong>Tipo:</strong> {school.type}</p>
                <p><strong>Diretor:</strong> {school.director}</p>
                <p><strong>Endereço:</strong> {school.address}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Estatísticas</h3>
                <p><strong>Estudantes:</strong> {school.students}</p>
                <p><strong>Professores:</strong> {school.teachers}</p>
                <p><strong>Turmas:</strong> {school.classes}</p>
              </div>
            </div>
            {school.description && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700">{school.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolDetail;
