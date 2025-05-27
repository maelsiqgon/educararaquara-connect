
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const userId = pathSegments[pathSegments.length - 1];

    // Check if this is a school-specific user query
    const isSchoolUsers = pathSegments.length >= 3 && pathSegments[pathSegments.length - 3] === 'schools';
    const schoolId = isSchoolUsers ? pathSegments[pathSegments.length - 2] : null;

    switch (req.method) {
      case 'GET':
        if (userId && !isSchoolUsers && userId !== 'users-api') {
          // Get single user
          const { data, error } = await supabaseClient
            .from('profiles')
            .select(`
              *,
              roles:user_school_roles(id, school_id, role, active)
            `)
            .eq('id', userId)
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isSchoolUsers && schoolId) {
          // Get users for a specific school
          const { data, error } = await supabaseClient
            .from('user_school_roles')
            .select(`
              *,
              user:profiles(*)
            `)
            .eq('school_id', schoolId);

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all users
          const { data, error } = await supabaseClient
            .from('profiles')
            .select(`
              *,
              roles:user_school_roles(id, school_id, role, active)
            `);

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        if (isSchoolUsers && schoolId) {
          // Add user to a school
          const userData = await req.json();
          const { data: newRoleAssignment, error: assignError } = await supabaseClient
            .from('user_school_roles')
            .insert([{
              user_id: userData.user_id,
              school_id: schoolId,
              role: userData.role
            }])
            .select()
            .single();

          if (assignError) throw assignError;

          return new Response(JSON.stringify(newRoleAssignment), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Create new user
          const userData = await req.json();
          
          // First create auth user
          const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
            email: userData.email,
            password: userData.password,
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
              role: role.role
            }));

            await supabaseClient
              .from('user_school_roles')
              .insert(roleInserts);
          }

          return new Response(JSON.stringify(profileData), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'PUT':
        const updateData = await req.json();
        
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

        return new Response(JSON.stringify(updatedUser), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        // Soft delete - deactivate user
        const { data: deactivatedUser, error: deactivateError } = await supabaseClient
          .from('profiles')
          .update({ active: false })
          .eq('id', userId)
          .select()
          .single();

        if (deactivateError) throw deactivateError;

        return new Response(JSON.stringify({ message: 'User deactivated successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
