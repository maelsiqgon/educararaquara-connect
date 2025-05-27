
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const createSupabaseClient = (authHeader: string | null) => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { 
      auth: { persistSession: false },
      global: { headers: authHeader ? { Authorization: authHeader } : {} }
    }
  );
};
