
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

    const { user_uuid } = await req.json();
    
    console.log('Getting user roles for:', user_uuid);

    const { data, error } = await supabaseClient
      .from('user_school_roles')
      .select(`
        *,
        school:schools(id, name)
      `)
      .eq('user_id', user_uuid)
      .eq('active', true);

    if (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }

    console.log('User roles found:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Get user roles error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to get user roles'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
