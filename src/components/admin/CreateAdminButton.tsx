
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CreateAdminButton = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createAdminUser = async () => {
    setIsCreating(true);
    try {
      console.log('🚀 Creating admin user via edge function...');
      
      const response = await fetch('https://epxmtbwmmptaricbiyjw.supabase.co/functions/v1/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVweG10YndtbXB0YXJpY2JpeWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTY2MjUsImV4cCI6MjA2MzkzMjYyNX0.4JmK9z74mE0LtE9SgpMv55SazN4M4MdxbWu_r2SvPrA`
        },
        body: JSON.stringify({})
      });

      console.log('📡 Edge function response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Admin user created successfully:', data);
        toast.success('Usuário admin criado com sucesso! Use: admin@araraquara.sp.gov.br / admin123456');
      } else {
        const errorText = await response.text();
        console.error('❌ Edge function error response:', errorText);
        
        if (errorText.includes('already exists')) {
          toast.info('Usuário admin já existe. Use: admin@araraquara.sp.gov.br / admin123456');
        } else {
          toast.error('Erro ao criar usuário admin.');
        }
      }
    } catch (error) {
      console.error('❌ Error creating admin user:', error);
      toast.error('Erro ao criar usuário admin.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={createAdminUser}
      disabled={isCreating}
      variant="outline"
      className="mb-4"
    >
      {isCreating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Criando Admin...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Criar Usuário Admin
        </>
      )}
    </Button>
  );
};

export default CreateAdminButton;
