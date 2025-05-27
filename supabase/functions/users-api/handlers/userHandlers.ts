
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const getUserById = async (supabaseClient: SupabaseClient, userId: string) => {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select(`
      *,
      roles:user_school_roles(
        id,
        school_id,
        role,
        active,
        created_at,
        school:schools(id, name)
      )
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getAllUsers = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select(`
      *,
      roles:user_school_roles(
        id,
        school_id,
        role,
        active,
        created_at,
        school:schools(id, name)
      )
    `)
    .order('name');

  if (error) throw error;
  return data;
};

export const createUser = async (supabaseClient: SupabaseClient, userData: any) => {
  // First create auth user
  const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
    email: userData.email,
    password: userData.password || 'temppass123',
    email_confirm: true,
    user_metadata: { name: userData.name }
  });

  if (authError) throw authError;

  // Update profile with additional data
  const { data: profileData, error: profileError } = await supabaseClient
    .from('profiles')
    .update({
      name: userData.name,
      cpf: userData.cpf,
      phone: userData.phone,
      address: userData.address,
      registration: userData.registration,
      active: true
    })
    .eq('id', authData.user.id)
    .select()
    .single();

  if (profileError) throw profileError;

  // Add role assignments if provided
  if (userData.roles && userData.roles.length > 0) {
    const roleInserts = userData.roles.map((role: any) => ({
      user_id: authData.user.id,
      school_id: role.school_id,
      role: role.role,
      active: true
    }));

    await supabaseClient
      .from('user_school_roles')
      .insert(roleInserts);
  }

  return profileData;
};

export const updateUser = async (supabaseClient: SupabaseClient, userId: string, updateData: any) => {
  if (updateData.password) {
    // Update password if provided
    const { error: passwordError } = await supabaseClient.auth.admin.updateUserById(
      userId,
      { password: updateData.password }
    );
    
    if (passwordError) throw passwordError;
    
    // Remove password from profile update
    delete updateData.password;
  }
  
  // Update profile data
  const { data: updatedUser, error: updateError } = await supabaseClient
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (updateError) throw updateError;
  return updatedUser;
};

export const deactivateUser = async (supabaseClient: SupabaseClient, userId: string) => {
  const { data: deactivatedUser, error: deactivateError } = await supabaseClient
    .from('profiles')
    .update({ active: false })
    .eq('id', userId)
    .select()
    .single();

  if (deactivateError) throw deactivateError;
  return { message: 'User deactivated successfully' };
};
