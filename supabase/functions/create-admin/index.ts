
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    console.log('Creating admin user...');

    // Create admin user
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email: 'admin@araraquara.sp.gov.br',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: { 
        name: 'Administrador do Sistema'
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        return new Response(JSON.stringify({ 
          message: 'Admin user already exists',
          user: authData?.user || null
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw authError;
    }

    if (!authData.user) {
      throw new Error('Failed to create user');
    }

    console.log('Admin user created:', authData.user.email);

    // Update profile with admin data
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .update({
        name: 'Administrador do Sistema',
        cpf: '000.000.000-00',
        phone: '(16) 99999-9999',
        address: 'Secretaria Municipal de Educação - Araraquara/SP',
        registration: 'ADM001',
        active: true
      })
      .eq('id', authData.user.id);

    if (profileError) {
      console.error('Profile update error:', profileError);
      // Don't throw error here, user was created successfully
    }

    // Create super admin role
    const { error: roleError } = await supabaseClient
      .from('user_school_roles')
      .insert([{
        user_id: authData.user.id,
        school_id: null,
        role: 'super_admin',
        active: true
      }]);

    if (roleError) {
      console.error('Role creation error:', roleError);
      // Don't throw error here, user was created successfully
    }

    return new Response(JSON.stringify({ 
      message: 'Admin user created successfully',
      user: authData.user,
      email: 'admin@araraquara.sp.gov.br',
      password: 'admin123456'
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Create admin error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to create admin user'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
