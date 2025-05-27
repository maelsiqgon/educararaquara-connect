
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
    const schoolId = pathSegments[pathSegments.length - 1];

    switch (req.method) {
      case 'GET':
        if (schoolId && schoolId !== 'schools-api') {
          // Get single school
          const { data, error } = await supabaseClient
            .from('schools')
            .select(`
              *,
              contacts:school_contacts(*)
            `)
            .eq('id', schoolId)
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all schools
          const { data, error } = await supabaseClient
            .from('schools')
            .select(`
              *,
              contacts:school_contacts(*)
            `)
            .eq('active', true)
            .order('name');

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        const schoolData = await req.json();
        const { data: newSchool, error: createError } = await supabaseClient
          .from('schools')
          .insert([schoolData])
          .select()
          .single();

        if (createError) throw createError;

        return new Response(JSON.stringify(newSchool), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'PUT':
        const updateData = await req.json();
        const { data: updatedSchool, error: updateError } = await supabaseClient
          .from('schools')
          .update(updateData)
          .eq('id', schoolId)
          .select()
          .single();

        if (updateError) throw updateError;

        return new Response(JSON.stringify(updatedSchool), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        const { error: deleteError } = await supabaseClient
          .from('schools')
          .update({ active: false })
          .eq('id', schoolId);

        if (deleteError) throw deleteError;

        return new Response(JSON.stringify({ message: 'School deleted successfully' }), {
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
