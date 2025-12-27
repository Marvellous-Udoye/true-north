import { createClient } from "@supabase/supabase-js";

const supabaseSeviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export const supabaseAdminClient = () =>
  createClient(supabaseUrl, supabaseSeviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
