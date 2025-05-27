
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSchools, School } from '@/hooks/useSchools';
import { ArrowLeft, School as SchoolIcon } from 'lucide-react';
import { toast } from 'sonner';
import SchoolInfo from '@/components/school/SchoolInfo';
import SchoolStats from '@/components/school/SchoolStats';
import SchoolImage from '@/components/school/SchoolImage';
import SchoolContact from '@/components/school/SchoolContact';

const EscolaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { getSchoolById } = useSchools();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const schoolData = await getSchoolById(id);
        setSchool(schoolData);
      } catch (error) {
        toast.error('Escola não encontrada');
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id, getSchoolById]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-education-primary text-white py-16">
            <div className="araraquara-container">
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded w-64 mb-4"></div>
                <div className="h-6 bg-white/20 rounded w-96"></div>
              </div>
            </div>
          </div>
          
          <div className="py-16">
            <div className="araraquara-container">
              <div className="animate-pulse space-y-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-education-primary text-white py-16">
            <div className="araraquara-container">
              <Link to="/escolas" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar às escolas
              </Link>
              <h1 className="text-4xl font-bold mb-4">Escola não encontrada</h1>
            </div>
          </div>
          
          <div className="py-16">
            <div className="araraquara-container text-center">
              <SchoolIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Escola não encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                A escola solicitada não foi encontrada ou não existe.
              </p>
              <Button asChild>
                <Link to="/escolas">
                  Ver todas as escolas
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <Link to="/escolas" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às escolas
            </Link>
            <h1 className="text-4xl font-bold mb-4">{school.name}</h1>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {school.description && <SchoolInfo school={school} />}
                <SchoolImage school={school} />
                <SchoolStats school={school} />
              </div>

              <div className="space-y-6">
                <SchoolContact school={school} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EscolaDetalhes;
