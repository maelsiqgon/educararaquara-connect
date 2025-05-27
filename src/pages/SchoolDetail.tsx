
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSchools, School } from '@/hooks/useSchools';
import SchoolInfo from '@/components/school/SchoolInfo';
import SchoolStats from '@/components/school/SchoolStats';
import SchoolContact from '@/components/school/SchoolContact';
import { Loader2 } from 'lucide-react';

const SchoolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getSchoolBySlug } = useSchools();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      if (!slug) return;
      
      try {
        const schoolData = await getSchoolBySlug(slug);
        setSchool(schoolData);
      } catch (error) {
        console.error('Error loading school:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [slug, getSchoolBySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-education-primary" />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Escola não encontrada</h1>
          <p className="text-gray-600">A escola solicitada não foi encontrada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-education-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
            {school.image_url && (
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden bg-white">
                <img
                  src={school.image_url}
                  alt={school.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{school.name}</h1>
              <p className="text-xl opacity-90">{school.type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <SchoolInfo 
              address={school.address}
              director={school.director}
              description={school.description}
            />
            
            <SchoolStats 
              students={school.students}
              teachers={school.teachers}
              classes={school.classes}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <SchoolContact contacts={school.contacts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
