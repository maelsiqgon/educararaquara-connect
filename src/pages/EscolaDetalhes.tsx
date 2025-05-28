
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchoolImage from '@/components/school/SchoolImage';
import SchoolInfo from '@/components/school/SchoolInfo';
import SchoolStats from '@/components/school/SchoolStats';
import SchoolContact from '@/components/school/SchoolContact';
import { useSchools } from '@/hooks/useSchools';

const EscolaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSchoolById } = useSchools();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const schoolData = await getSchoolById(id);
        setSchool(schoolData);
      } catch (error) {
        console.error('Erro ao carregar escola:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id, getSchoolById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-education-light">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-education-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-education-light">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Escola não encontrada</h1>
            <Button onClick={() => navigate('/escolas')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Escolas
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-education-light">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate('/escolas')}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Escolas
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-education-primary">
                  {school.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <SchoolImage 
                  image_url={school.image_url} 
                  name={school.name} 
                />
                
                <SchoolInfo 
                  address={school.address}
                  director={school.director}
                  description={school.description}
                />
                
                <SchoolStats 
                  students={school.students || 0}
                  teachers={school.teachers || 0}
                  classes={school.classes || 0}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <SchoolContact contacts={school.contacts || []} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EscolaDetalhes;
