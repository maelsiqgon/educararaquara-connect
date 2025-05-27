
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
    const newsId = pathSegments[pathSegments.length - 1];

    switch (req.method) {
      case 'GET':
        if (newsId && newsId !== 'news-api') {
          // Get single news article
          const { data, error } = await supabaseClient
            .from('news')
            .select(`
              *,
              category:news_categories(*),
              author:profiles(id, name, email),
              school:schools(id, name)
            `)
            .eq('id', newsId)
            .single();

          if (error) throw error;

          // Increment views
          await supabaseClient
            .from('news')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', newsId);

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all news
          const { data, error } = await supabaseClient
            .from('news')
            .select(`
              *,
              category:news_categories(*),
              author:profiles(id, name, email),
              school:schools(id, name)
            `)
            .order('created_at', { ascending: false });

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        const newsData = await req.json();
        const slug = newsData.title.toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        const { data: newNews, error: createError } = await supabaseClient
          .from('news')
          .insert([{ ...newsData, slug }])
          .select()
          .single();

        if (createError) throw createError;

        return new Response(JSON.stringify(newNews), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'PUT':
        const updateData = await req.json();
        const { data: updatedNews, error: updateError } = await supabaseClient
          .from('news')
          .update(updateData)
          .eq('id', newsId)
          .select()
          .single();

        if (updateError) throw updateError;

        return new Response(JSON.stringify(updatedNews), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        const { error: deleteError } = await supabaseClient
          .from('news')
          .delete()
          .eq('id', newsId);

        if (deleteError) throw deleteError;

        return new Response(JSON.stringify({ message: 'News deleted successfully' }), {
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
