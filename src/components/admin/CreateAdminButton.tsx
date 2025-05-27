
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
      console.log('🚀 Creating admin user...');
      
      // First check if admin already exists by checking auth.users
      const { data: existingUsers, error: usersError } = await supabase.auth.admin.listUsers();
      
      let adminExists = false;
      let adminUserId = null;
      
      if (!usersError && existingUsers?.users) {
        const adminUser = existingUsers.users.find(u => u.email === 'admin@araraquara.sp.gov.br');
        if (adminUser) {
          adminExists = true;
          adminUserId = adminUser.id;
          console.log('👤 Admin user already exists:', adminUser.id);
        }
      }

      if (adminExists && adminUserId) {
        // Check if super_admin role exists
        const { data: adminRole } = await supabase
          .from('user_school_roles')
          .select('*')
          .eq('user_id', adminUserId)
          .eq('role', 'super_admin')
          .single();

        if (!adminRole) {
          console.log('➕ Adding super_admin role to existing user...');
          const { error: roleError } = await supabase
            .from('user_school_roles')
            .insert([{
              user_id: adminUserId,
              school_id: null,
              role: 'super_admin',
              active: true
            }]);

          if (roleError) {
            console.error('❌ Error adding super_admin role:', roleError);
            toast.error('Erro ao adicionar role de super admin');
          } else {
            console.log('✅ Super admin role added successfully');
            toast.success('Role de super admin adicionada ao usuário existente!');
          }
        } else {
          console.log('✅ Admin user already has super_admin role');
          toast.info('Usuário admin já existe com role de super_admin. Use: admin@araraquara.sp.gov.br / admin123456');
        }
        return;
      }

      // Create new admin user via edge function
      console.log('🔧 Creating admin via edge function...');
      const response = await fetch('https://epxmtbwmmptaricbiyjw.supabase.co/functions/v1/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVweG10YndtbXB0YXJpY2JpeWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTY2MjUsImV4cCI6MjA2MzkzMjYyNX0.4JmK9z74mE0LtE9SgpMv55SazN4M4MdxbWu_r2SvPrA'}`
        },
        body: JSON.stringify({})
      });

      console.log('📡 Edge function response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Admin user created successfully:', data);
        toast.success(`Usuário admin criado! Email: ${data.email} | Senha: ${data.password}`);
      } else {
        const errorText = await response.text();
        console.error('❌ Edge function error response:', errorText);
        
        if (errorText.includes('already registered') || errorText.includes('already exists')) {
          toast.info('Usuário admin já existe. Use: admin@araraquara.sp.gov.br / admin123456');
        } else {
          toast.error('Erro ao criar usuário admin. Verifique o console para detalhes.');
        }
      }
    } catch (error) {
      console.error('❌ Error creating admin user:', error);
      toast.error('Erro ao criar usuário admin. Verifique o console para detalhes.');
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
