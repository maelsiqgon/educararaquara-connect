
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
      { auth: { persistSession: false } }
    );

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const action = pathSegments[pathSegments.length - 1];

    if (action === 'login') {
      const { email, password } = await req.json();
      
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Update last access time
      await supabaseClient.from('profiles')
        .update({ last_access: new Date().toISOString() })
        .eq('id', data.user.id);
      
      // Log activity
      await supabaseClient.from('activity_logs').insert([{
        user_id: data.user.id,
        action: 'login',
        user_agent: req.headers.get('User-Agent'),
        ip_address: req.headers.get('X-Forwarded-For') || req.headers.get('CF-Connecting-IP'),
      }]);

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (action === 'logout') {
      const { error } = await supabaseClient.auth.signOut();
      
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (action === 'reset-password') {
      const { email } = await req.json();
      
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${req.headers.get('Origin')}/auth/reset-password`,
      });
      
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (action === 'update-password') {
      const { newPassword } = await req.json();
      
      const { error } = await supabaseClient.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
