
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
    const authHeader = req.headers.get('Authorization');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        auth: { persistSession: false },
        global: { headers: authHeader ? { Authorization: authHeader } : {} }
      }
    );

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const mediaId = pathSegments[pathSegments.length - 1];

    console.log('Media API called:', req.method, mediaId);

    switch (req.method) {
      case 'GET':
        const { data, error } = await supabaseClient
          .from('media_library')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'POST':
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'uploads';
        const altText = formData.get('alt_text') as string;
        const description = formData.get('description') as string;
        const schoolId = formData.get('school_id') as string;

        if (!file) {
          throw new Error('No file provided');
        }

        // Get current user for uploaded_by field
        const { data: { user } } = await supabaseClient.auth.getUser();

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // Determine bucket based on file type
        const bucket = file.type.startsWith('image/') ? 'images' : 'documents';
        const filePath = `${folder}/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabaseClient.storage
          .from(bucket)
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabaseClient.storage
          .from(bucket)
          .getPublicUrl(filePath);

        // Save to media library
        const { data: mediaData, error: dbError } = await supabaseClient
          .from('media_library')
          .insert([{
            filename: fileName,
            original_name: file.name,
            file_path: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            folder,
            alt_text: altText,
            description,
            school_id: schoolId,
            uploaded_by: user?.id
          }])
          .select()
          .single();

        if (dbError) throw dbError;

        return new Response(JSON.stringify(mediaData), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'PUT':
        const updateData = await req.json();
        const { data: updatedMedia, error: updateError } = await supabaseClient
          .from('media_library')
          .update({
            alt_text: updateData.alt_text,
            description: updateData.description,
            tags: updateData.tags
          })
          .eq('id', mediaId)
          .select()
          .single();

        if (updateError) throw updateError;

        return new Response(JSON.stringify(updatedMedia), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        // Get media info
        const { data: mediaInfo, error: fetchError } = await supabaseClient
          .from('media_library')
          .select('file_path')
          .eq('id', mediaId)
          .single();

        if (fetchError) throw fetchError;

        // Extract bucket and path from URL
        const urlParts = new URL(mediaInfo.file_path);
        const pathParts = urlParts.pathname.split('/');
        const bucket = pathParts[pathParts.length - 3]; // Should be 'images' or 'documents'
        const storagePath = pathParts.slice(-2).join('/'); // folder/filename

        // Delete from storage
        const { error: storageError } = await supabaseClient.storage
          .from(bucket)
          .remove([storagePath]);
        
        if (storageError) console.warn('Storage deletion error:', storageError);

        // Delete from database
        const { error: deleteError } = await supabaseClient
          .from('media_library')
          .delete()
          .eq('id', mediaId);

        if (deleteError) throw deleteError;

        return new Response(JSON.stringify({ message: 'Media deleted successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }
  } catch (error) {
    console.error('Media API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
