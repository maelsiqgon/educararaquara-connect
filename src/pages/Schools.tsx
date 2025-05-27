
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSchools } from '@/hooks/useSchools';

const Schools = () => {
  const { schools, loading } = useSchools();

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-education-primary mb-8">Nossas Escolas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {school.image_url && (
                <img 
                  src={school.image_url} 
                  alt={school.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
                <p className="text-gray-600 mb-2">{school.type}</p>
                <p className="text-gray-600 mb-4">{school.address}</p>
                <Link 
                  to={`/escolas/${school.id}`}
                  className="bg-education-primary text-white px-4 py-2 rounded hover:bg-education-dark transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Schools;
