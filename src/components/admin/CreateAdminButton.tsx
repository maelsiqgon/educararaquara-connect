
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus, Loader2 } from 'lucide-react';

const CreateAdminButton = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createAdminUser = async () => {
    setIsCreating(true);
    try {
      const response = await fetch('/functions/v1/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Admin user ready! Email: ${data.email} | Password: ${data.password}`);
      } else {
        if (data.error?.includes('already registered')) {
          toast.info('Admin user already exists. Use: admin@araraquara.sp.gov.br / admin123456');
        } else {
          toast.error('Error: ' + (data.error || 'Failed to create admin user'));
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
