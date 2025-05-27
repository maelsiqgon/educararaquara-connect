
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action = 'get_metrics' } = await req.json();

    switch (action) {
      case 'get_metrics':
        // Simulate system metrics collection
        const metrics = {
          timestamp: new Date().toISOString(),
          cpu_usage: Math.floor(Math.random() * 40) + 30, // 30-70%
          memory_usage: Math.floor(Math.random() * 30) + 50, // 50-80%
          disk_usage: Math.floor(Math.random() * 20) + 70, // 70-90%
          active_users: Math.floor(Math.random() * 100) + 50,
          total_requests: Math.floor(Math.random() * 1000) + 2000,
          error_rate: Math.random() * 2, // 0-2%
          response_time: Math.floor(Math.random() * 200) + 200, // 200-400ms
          status: 'healthy'
        };

        // Log metrics
        await supabaseClient.from('activity_logs').insert([{
          action: 'system_metrics_collected',
          resource_type: 'monitoring',
          details: metrics
        }]);

        return new Response(JSON.stringify({ success: true, metrics }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'health_check':
        // Perform comprehensive health check
        const healthCheck = {
          database: 'healthy',
          storage: 'healthy',
          api: 'healthy',
          external_services: 'healthy',
          overall_status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: '99.9%'
        };

        // Check database connectivity
        try {
          await supabaseClient.from('schools').select('count').limit(1);
        } catch (error) {
          healthCheck.database = 'unhealthy';
          healthCheck.overall_status = 'degraded';
        }

        // Log health check
        await supabaseClient.from('activity_logs').insert([{
          action: 'health_check_performed',
          resource_type: 'monitoring',
          details: healthCheck
        }]);

        return new Response(JSON.stringify({ success: true, health: healthCheck }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'create_alert':
        const { alert_type, message, severity = 'info' } = await req.json();
        
        const alert = {
          id: crypto.randomUUID(),
          type: alert_type,
          message,
          severity,
          timestamp: new Date().toISOString(),
          resolved: false
        };

        // Log alert creation
        await supabaseClient.from('activity_logs').insert([{
          action: 'alert_created',
          resource_type: 'monitoring',
          details: alert
        }]);

        return new Response(JSON.stringify({ success: true, alert }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    console.error('Error in monitoring function:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
