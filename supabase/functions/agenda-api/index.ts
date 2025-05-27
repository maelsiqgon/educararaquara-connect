
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
    const eventId = pathSegments[pathSegments.length - 1];

    switch (req.method) {
      case 'GET':
        if (eventId && eventId !== 'agenda-api') {
          // Get single event
          const { data, error } = await supabaseClient
            .from('agenda_events')
            .select(`
              *,
              creator:profiles!created_by(id, name, email),
              school:schools(id, name)
            `)
            .eq('id', eventId)
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all events
          const { data, error } = await supabaseClient
            .from('agenda_events')
            .select(`
              *,
              creator:profiles!created_by(id, name, email),
              school:schools(id, name)
            `)
            .order('start_datetime', { ascending: true });

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        const eventData = await req.json();
        
        // Get user ID from auth context
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
        if (authError) throw authError;
        
        const { data: newEvent, error: createError } = await supabaseClient
          .from('agenda_events')
          .insert([{
            ...eventData,
            created_by: user?.id
          }])
          .select()
          .single();

        if (createError) throw createError;

        return new Response(JSON.stringify(newEvent), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'PUT':
        const updateData = await req.json();
        const { data: updatedEvent, error: updateError } = await supabaseClient
          .from('agenda_events')
          .update(updateData)
          .eq('id', eventId)
          .select()
          .single();

        if (updateError) throw updateError;

        return new Response(JSON.stringify(updatedEvent), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        const { error: deleteError } = await supabaseClient
          .from('agenda_events')
          .delete()
          .eq('id', eventId);

        if (deleteError) throw deleteError;

        return new Response(JSON.stringify({ message: 'Event deleted successfully' }), {
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
