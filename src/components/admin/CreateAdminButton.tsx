
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus, Loader2 } from 'lucide-react';

const CreateAdminButton = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createAdminUser = async () => {
    setIsCreating(true);
    try {
      // Use the correct Supabase edge function URL
      const response = await fetch('https://epxmtbwmmptaricbiyjw.supabase.co/functions/v1/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVweG10YndtbXB0YXJpY2JpeWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTY2MjUsImV4cCI6MjA2MzkzMjYyNX0.4JmK9z74mE0LtE9SgpMv55SazN4M4MdxbWu_r2SvPrA`
        },
        body: JSON.stringify({})
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Admin user ready! Email: ${data.email} | Password: ${data.password}`);
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        
        if (errorData.includes('already registered') || errorData.includes('already exists')) {
          toast.info('Admin user already exists. Use: admin@araraquara.sp.gov.br / admin123456');
        } else {
          toast.error('Error creating admin user. Check console for details.');
        }
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
      toast.error('Error creating admin user. Check console for details.');
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
          Creating Admin...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Create Admin User
        </>
      )}
    </Button>
  );
};

export default CreateAdminButton;
