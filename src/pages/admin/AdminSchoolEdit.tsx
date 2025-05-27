
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import SchoolForm from '@/components/admin/schools/SchoolForm';
import { useSchools, School } from '@/hooks/useSchools';
import { Loader2 } from 'lucide-react';

const AdminSchoolEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const handleSuccess = () => {
    navigate('/admin/escolas');
  };

  const handleCancel = () => {
    navigate('/admin/escolas');
  };

  if (loading) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="container mx-auto px-4 py-8 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </AdminProtected>
    );
  }

  if (!school) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500">Escola não encontrada</h1>
              <p className="text-gray-600 mt-2">A escola solicitada não foi encontrada.</p>
            </div>
          </div>
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-education-primary">Editar Escola</h1>
            <p className="text-gray-600">Edite as informações da escola {school.name}</p>
          </div>
          
          <SchoolForm
            school={school}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminSchoolEdit;
