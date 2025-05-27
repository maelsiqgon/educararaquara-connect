
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
    
    // Handle different endpoints
    if (pathSegments.includes('query')) {
      // Handle chatbot query
      const { query } = await req.json();
      
      // Search for knowledge base entries that match the query
      const { data, error } = await supabaseClient
        .from('chatbot_knowledge')
        .select('*')
        .or(`question.ilike.%${query}%,keywords.cs.{${query}}`)
        .eq('active', true)
        .order('usage_count', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Increment usage count for the best match
        await supabaseClient
          .from('chatbot_knowledge')
          .update({ usage_count: data[0].usage_count + 1 })
          .eq('id', data[0].id);
        
        return new Response(JSON.stringify({
          answer: data[0].answer,
          found: true
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({
          answer: 'Desculpe, não encontrei uma resposta para sua pergunta. Posso ajudar com algo mais?',
          found: false
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else if (pathSegments.includes('knowledge')) {
      // Handle knowledge base CRUD
      const knowledgeId = pathSegments[pathSegments.length - 1];
      
      switch (req.method) {
        case 'GET':
          if (knowledgeId && knowledgeId !== 'knowledge') {
            // Get specific knowledge entry
            const { data, error } = await supabaseClient
              .from('chatbot_knowledge')
              .select('*')
              .eq('id', knowledgeId)
              .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } else {
            // Get all knowledge entries
            const { data, error } = await supabaseClient
              .from('chatbot_knowledge')
              .select('*')
              .order('category')
              .order('question');

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

        case 'POST':
          const newEntry = await req.json();
          
          // Get user ID from auth context
          const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
          if (authError) throw authError;
          
          const { data, error } = await supabaseClient
            .from('chatbot_knowledge')
            .insert([{
              ...newEntry,
              created_by: user?.id
            }])
            .select()
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        case 'PUT':
          const updateData = await req.json();
          const { data: updated, error: updateError } = await supabaseClient
            .from('chatbot_knowledge')
            .update(updateData)
            .eq('id', knowledgeId)
            .select()
            .single();

          if (updateError) throw updateError;

          return new Response(JSON.stringify(updated), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        case 'DELETE':
          const { error: deleteError } = await supabaseClient
            .from('chatbot_knowledge')
            .delete()
            .eq('id', knowledgeId);

          if (deleteError) throw deleteError;

          return new Response(JSON.stringify({ message: 'Knowledge entry deleted successfully' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }
    } else if (pathSegments.includes('tickets')) {
      // Handle support tickets
      const ticketId = pathSegments[pathSegments.length - 1];
      
      switch (req.method) {
        case 'GET':
          if (ticketId && ticketId !== 'tickets') {
            // Get specific ticket with messages
            const { data: ticket, error: ticketError } = await supabaseClient
              .from('support_tickets')
              .select(`
                *,
                creator:profiles!user_id(id, name, email),
                assignee:profiles!assigned_to(id, name, email),
                school:schools(id, name)
              `)
              .eq('id', ticketId)
              .single();

            if (ticketError) throw ticketError;

            // Get ticket messages
            const { data: messages, error: messagesError } = await supabaseClient
              .from('ticket_messages')
              .select(`
                *,
                user:profiles(id, name, email)
              `)
              .eq('ticket_id', ticketId)
              .order('created_at', { ascending: true });

            if (messagesError) throw messagesError;

            return new Response(JSON.stringify({ ...ticket, messages }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } else {
            // Get all tickets
            const { data, error } = await supabaseClient
              .from('support_tickets')
              .select(`
                *,
                creator:profiles!user_id(id, name, email),
                assignee:profiles!assigned_to(id, name, email),
                school:schools(id, name)
              `)
              .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

        case 'POST':
          if (ticketId && ticketId !== 'tickets' && pathSegments.includes('messages')) {
            // Add a message to an existing ticket
            const messageData = await req.json();
            
            // Get user ID from auth context
            const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
            if (authError) throw authError;
            
            const { data, error } = await supabaseClient
              .from('ticket_messages')
              .insert([{
                ticket_id: ticketId,
                user_id: user?.id,
                message: messageData.message,
                is_internal: messageData.is_internal || false
              }])
              .select()
              .single();

            if (error) throw error;

            // Update ticket's updated_at
            await supabaseClient
              .from('support_tickets')
              .update({ updated_at: new Date().toISOString() })
              .eq('id', ticketId);

            return new Response(JSON.stringify(data), {
              status: 201,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } else {
            // Create a new ticket
            const ticketData = await req.json();
            
            // Get user ID from auth context
            const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
            if (authError) throw authError;
            
            const { data, error } = await supabaseClient
              .from('support_tickets')
              .insert([{
                ...ticketData,
                user_id: user?.id
              }])
              .select()
              .single();

            if (error) throw error;
            
            // Add initial message if provided
            if (ticketData.initialMessage) {
              await supabaseClient
                .from('ticket_messages')
                .insert([{
                  ticket_id: data.id,
                  user_id: user?.id,
                  message: ticketData.initialMessage,
                  is_internal: false
                }]);
            }

            return new Response(JSON.stringify(data), {
              status: 201,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }

        case 'PUT':
          const updateData = await req.json();
          const { data: updated, error: updateError } = await supabaseClient
            .from('support_tickets')
            .update(updateData)
            .eq('id', ticketId)
            .select()
            .single();

          if (updateError) throw updateError;

          return new Response(JSON.stringify(updated), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        case 'DELETE':
          const { error: deleteError } = await supabaseClient
            .from('support_tickets')
            .delete()
            .eq('id', ticketId);

          if (deleteError) throw deleteError;

          return new Response(JSON.stringify({ message: 'Ticket deleted successfully' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }
    } else if (pathSegments.includes('whatsapp')) {
      // WhatsApp integration settings
      switch (req.method) {
        case 'GET':
          const { data, error } = await supabaseClient
            .from('whatsapp_settings')
            .select('*')
            .single();

          if (error && error.code !== 'PGRST116') { // Ignore "No rows returned" error
            throw error;
          }

          return new Response(JSON.stringify(data || {}), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        case 'POST':
          const settingsData = await req.json();
          
          // Check if settings already exist
          const { data: existingSettings, error: checkError } = await supabaseClient
            .from('whatsapp_settings')
            .select('id')
            .limit(1);

          if (checkError && checkError.code !== 'PGRST116') throw checkError;

          let result;
          
          if (existingSettings && existingSettings.length > 0) {
            // Update existing settings
            const { data: updated, error: updateError } = await supabaseClient
              .from('whatsapp_settings')
              .update(settingsData)
              .eq('id', existingSettings[0].id)
              .select()
              .single();

            if (updateError) throw updateError;
            result = updated;
          } else {
            // Create new settings
            const { data: created, error: createError } = await supabaseClient
              .from('whatsapp_settings')
              .insert([settingsData])
              .select()
              .single();

            if (createError) throw createError;
            result = created;
          }

          return new Response(JSON.stringify(result), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        default:
          return new Response('Method not allowed', { status: 405, headers: corsHeaders });
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
