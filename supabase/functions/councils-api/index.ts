
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
    
    // Check what resource we're accessing
    const isDocuments = pathSegments.includes('documents');
    const isMembers = pathSegments.includes('members');
    const isFinancial = pathSegments.includes('financial');
    const isVisits = pathSegments.includes('visits');
    
    const councilId = isDocuments || isMembers || isFinancial || isVisits ? 
      pathSegments[pathSegments.indexOf(
        isDocuments ? 'documents' : 
        isMembers ? 'members' : 
        isFinancial ? 'financial' : 'visits'
      ) - 1] :
      pathSegments[pathSegments.length - 1];

    switch (req.method) {
      case 'GET':
        if (isDocuments) {
          // Get council documents
          const { data, error } = await supabaseClient
            .from('council_documents')
            .select(`
              *,
              uploader:profiles!uploaded_by(id, name)
            `)
            .eq('council_id', councilId)
            .order('created_at', { ascending: false });

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isMembers) {
          // Get council members
          const { data, error } = await supabaseClient
            .from('council_members')
            .select('*')
            .eq('council_id', councilId)
            .order('start_date', { ascending: false });

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isFinancial) {
          // Get council financial records
          const { data, error } = await supabaseClient
            .from('council_financial_records')
            .select('*')
            .eq('council_id', councilId)
            .order('year', { ascending: false })
            .order('month', { ascending: false });

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isVisits) {
          // Get council school visits
          const { data, error } = await supabaseClient
            .from('council_school_visits')
            .select(`
              *,
              school:schools(id, name),
              creator:profiles!created_by(id, name)
            `)
            .eq('council_id', councilId)
            .order('visit_date', { ascending: false });

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (councilId && councilId !== 'councils-api') {
          // Get single council with all related data
          const { data: councilData, error: councilError } = await supabaseClient
            .from('councils')
            .select('*')
            .eq('id', councilId)
            .single();

          if (councilError) throw councilError;

          // Get members
          const { data: membersData, error: membersError } = await supabaseClient
            .from('council_members')
            .select('*')
            .eq('council_id', councilId)
            .order('start_date', { ascending: false });

          if (membersError) throw membersError;

          // Get financial records
          const { data: financialData, error: financialError } = await supabaseClient
            .from('council_financial_records')
            .select('*')
            .eq('council_id', councilId)
            .order('year', { ascending: false })
            .order('month', { ascending: false });

          if (financialError) throw financialError;

          const response = {
            ...councilData,
            members: membersData,
            financial: financialData
          };

          return new Response(JSON.stringify(response), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all councils
          const { data, error } = await supabaseClient
            .from('councils')
            .select('*')
            .order('name');

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        if (isDocuments) {
          const formData = await req.formData();
          const file = formData.get('file') as File;
          const title = formData.get('title') as string;
          const documentType = formData.get('document_type') as string;
          const description = formData.get('description') as string;
          const year = parseInt(formData.get('year') as string);
          const month = parseInt(formData.get('month') as string);
          const meetingDate = formData.get('meeting_date') as string;

          // Get user ID from auth context
          const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
          if (authError) throw authError;

          if (!file) {
            throw new Error('No file provided');
          }

          const fileExt = file.name.split('.').pop();
          const fileName = `council_${councilId}_${Date.now()}.${fileExt}`;
          const filePath = `councils/${fileName}`;

          // Upload to Supabase Storage
          const { error: uploadError } = await supabaseClient.storage
            .from('uploads')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabaseClient.storage
            .from('uploads')
            .getPublicUrl(filePath);

          // Save document metadata
          const { data: documentData, error: dbError } = await supabaseClient
            .from('council_documents')
            .insert([{
              council_id: councilId,
              title,
              document_type: documentType,
              description,
              file_path: publicUrl,
              file_size: file.size,
              year,
              month,
              meeting_date,
              uploaded_by: user?.id
            }])
            .select()
            .single();

          if (dbError) throw dbError;

          return new Response(JSON.stringify(documentData), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isMembers) {
          const memberData = await req.json();
          
          const { data: newMember, error: createError } = await supabaseClient
            .from('council_members')
            .insert([{
              ...memberData,
              council_id: councilId
            }])
            .select()
            .single();

          if (createError) throw createError;

          return new Response(JSON.stringify(newMember), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isFinancial) {
          const financialData = await req.json();
          
          // Get user ID from auth context
          const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
          if (authError) throw authError;
          
          const { data: newRecord, error: createError } = await supabaseClient
            .from('council_financial_records')
            .insert([{
              ...financialData,
              council_id: councilId,
              created_by: user?.id
            }])
            .select()
            .single();

          if (createError) throw createError;

          return new Response(JSON.stringify(newRecord), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isVisits) {
          const visitData = await req.json();
          
          // Get user ID from auth context
          const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
          if (authError) throw authError;
          
          const { data: newVisit, error: createError } = await supabaseClient
            .from('council_school_visits')
            .insert([{
              ...visitData,
              council_id: councilId,
              created_by: user?.id
            }])
            .select()
            .single();

          if (createError) throw createError;

          return new Response(JSON.stringify(newVisit), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Create new council
          const councilData = await req.json();
          
          const { data: newCouncil, error: createError } = await supabaseClient
            .from('councils')
            .insert([councilData])
            .select()
            .single();

          if (createError) throw createError;

          return new Response(JSON.stringify(newCouncil), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'PUT':
        if (councilId && councilId !== 'councils-api') {
          const updateData = await req.json();
          const { data: updatedCouncil, error: updateError } = await supabaseClient
            .from('councils')
            .update(updateData)
            .eq('id', councilId)
            .select()
            .single();

          if (updateError) throw updateError;

          return new Response(JSON.stringify(updatedCouncil), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          throw new Error('Council ID is required for update');
        }

      case 'DELETE':
        if (councilId && councilId !== 'councils-api') {
          const { error: deleteError } = await supabaseClient
            .from('councils')
            .update({ active: false })
            .eq('id', councilId);

          if (deleteError) throw deleteError;

          return new Response(JSON.stringify({ message: 'Council deleted successfully' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          throw new Error('Council ID is required for delete');
        }

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
