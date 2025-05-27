
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const getSchoolUsers = async (supabaseClient: SupabaseClient, schoolId: string) => {
  const { data, error } = await supabaseClient
    .from('user_school_roles')
    .select(`
      *,
      user:profiles(*)
    `)
    .eq('school_id', schoolId);

  if (error) throw error;
  return data;
};

export const addUserToSchool = async (supabaseClient: SupabaseClient, schoolId: string, userData: any) => {
  const { data: newRoleAssignment, error: assignError } = await supabaseClient
    .from('user_school_roles')
    .insert([{
      user_id: userData.user_id,
      school_id: schoolId,
      role: userData.role,
      active: true
    }])
    .select()
    .single();

  if (assignError) throw assignError;
  return newRoleAssignment;
};
