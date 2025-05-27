
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getUserById, getAllUsers, createUser, updateUser, deactivateUser } from "./handlers/userHandlers.ts";
import { getSchoolUsers, addUserToSchool } from "./handlers/schoolUserHandlers.ts";
import { parseRequest } from "./utils/requestParser.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { 
        auth: { persistSession: false },
        global: { headers: authHeader ? { Authorization: authHeader } : {} }
      }
    );

    const { userId, isSchoolUsers, schoolId } = parseRequest(req.url);

    console.log('Users API called:', req.method, userId, { isSchoolUsers, schoolId });

    switch (req.method) {
      case 'GET':
        if (userId && !isSchoolUsers && userId !== 'users-api') {
          // Get single user
          const data = await getUserById(supabaseClient, userId);
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (isSchoolUsers && schoolId) {
          // Get users for a specific school
          const data = await getSchoolUsers(supabaseClient, schoolId);
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all users
          const data = await getAllUsers(supabaseClient);
          return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        const postData = await req.json();
        
        if (isSchoolUsers && schoolId) {
          // Add user to a school
          const data = await addUserToSchool(supabaseClient, schoolId, postData);
          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Create new user
          const data = await createUser(supabaseClient, postData);
          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'PUT':
        if (!userId) {
          throw new Error('User ID is required for updates');
        }
        const updateData = await req.json();
        const updatedUser = await updateUser(supabaseClient, userId, updateData);
        return new Response(JSON.stringify(updatedUser), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        if (!userId) {
          throw new Error('User ID is required for deletion');
        }
        const result = await deactivateUser(supabaseClient, userId);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }
  } catch (error) {
    console.error('Users API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
