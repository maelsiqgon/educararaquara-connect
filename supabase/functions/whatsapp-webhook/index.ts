
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // This is a special case for OPTIONS requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get WhatsApp settings
    const { data: whatsappSettings, error: settingsError } = await supabaseClient
      .from('whatsapp_settings')
      .select('*')
      .single();

    if (settingsError || !whatsappSettings) {
      throw new Error('WhatsApp settings not found');
    }

    // Parse webhook payload
    const webhookData = await req.json();
    console.log('Received webhook data:', JSON.stringify(webhookData));

    // Handle webhook
    if (webhookData?.messages && webhookData.messages.length > 0) {
      const message = webhookData.messages[0];
      const phone = message.from;
      const messageText = message.text?.body || '';

      if (!messageText) {
        console.log('No text in the message');
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Log incoming message
      await supabaseClient.from('activity_logs').insert([{
        action: 'whatsapp_message_received',
        resource_type: 'whatsapp',
        details: { phone, message: messageText }
      }]);

      // Search knowledge base for answer
      const { data: knowledgeEntries } = await supabaseClient
        .from('chatbot_knowledge')
        .select('*')
        .or(`question.ilike.%${messageText}%,keywords.cs.{${messageText}}`)
        .eq('active', true)
        .order('usage_count', { ascending: false });

      let responseText = '';

      if (knowledgeEntries && knowledgeEntries.length > 0) {
        responseText = knowledgeEntries[0].answer;
        
        // Increment usage count
        await supabaseClient
          .from('chatbot_knowledge')
          .update({ usage_count: (knowledgeEntries[0].usage_count || 0) + 1 })
          .eq('id', knowledgeEntries[0].id);
      } else {
        responseText = 'Desculpe, não consegui encontrar uma resposta para sua pergunta. Um de nossos atendentes entrará em contato em breve.';
        
        // Create support ticket
        await supabaseClient.from('support_tickets').insert([{
          title: `WhatsApp: ${messageText.substring(0, 50)}${messageText.length > 50 ? '...' : ''}`,
          description: `Mensagem recebida via WhatsApp do número ${phone}: \n\n${messageText}`,
          status: 'open',
          priority: 2
        }]);
      }

      // Check if we should send a response
      if (whatsappSettings.active && whatsappSettings.api_url && whatsappSettings.api_key) {
        try {
          // Send response via WhatsApp API
          const response = await fetch(`${whatsappSettings.api_url}/message/text`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': whatsappSettings.api_key
            },
            body: JSON.stringify({
              phone,
              message: responseText
            })
          });

          const responseData = await response.json();
          console.log('WhatsApp API response:', JSON.stringify(responseData));
          
          // Log outgoing message
          await supabaseClient.from('activity_logs').insert([{
            action: 'whatsapp_message_sent',
            resource_type: 'whatsapp',
            details: { phone, message: responseText, api_response: responseData }
          }]);
        } catch (error) {
          console.error('Error sending WhatsApp message:', error);
          
          // Log error
          await supabaseClient.from('activity_logs').insert([{
            action: 'whatsapp_message_error',
            resource_type: 'whatsapp',
            details: { phone, message: responseText, error: error.message }
          }]);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
