
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchoolImage from '@/components/school/SchoolImage';
import SchoolInfo from '@/components/school/SchoolInfo';
import SchoolStats from '@/components/school/SchoolStats';
import SchoolContact from '@/components/school/SchoolContact';
import { useSchools, School } from '@/hooks/useSchools';
import { Loader2, MapPin, User, Building } from 'lucide-react';

const SchoolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getSchoolById } = useSchools();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      if (!id) return;
      
      try {
        const schoolData = await getSchoolById(id);
        setSchool(schoolData);
      } catch (error) {
        console.error('Error loading school:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [id, getSchoolById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-education-primary" />
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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Escola não encontrada</h1>
            <p className="text-gray-600 mt-2">A escola solicitada não foi encontrada.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Escolas</span>
            <span>/</span>
            <span className="text-education-primary">{school.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-education-primary mb-2">{school.name}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              <span>{school.type}</span>
            </div>
            {school.director && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Dir.: {school.director}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-8">
            <SchoolImage image_url={school.image_url} name={school.name} />
            
            <SchoolInfo
              description={school.description}
              address={school.address}
            />
            
            <SchoolStats
              students={school.students}
              teachers={school.teachers}
              classes={school.classes}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SchoolContact contacts={school.contacts || []} />
            
            {school.address && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-education-primary" />
                  Localização
                </h3>
                <p className="text-gray-600">{school.address}</p>
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
