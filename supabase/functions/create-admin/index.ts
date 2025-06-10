
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
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    console.log('🚀 Creating admin user...');

    // Criar usuário admin usando service role
    const { data: adminUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@araraquara.sp.gov.br',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: {
        name: 'Administrador do Sistema'
      }
    });

    if (createError) {
      console.error('❌ Error creating admin user:', createError);
      
      if (createError.message.includes('already registered')) {
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Admin user already exists',
          user: null
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw createError;
    }

    console.log('✅ Admin user created successfully:', adminUser.user?.email);

    // O perfil será criado automaticamente pelo trigger
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Admin user created successfully',
      user: {
        id: adminUser.user?.id,
        email: adminUser.user?.email
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Create admin error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to create admin user'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
