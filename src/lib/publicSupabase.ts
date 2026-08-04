const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClient: Awaited<ReturnType<typeof import("@supabase/supabase-js").createClient>> | null = null;

export async function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (supabaseClient) return supabaseClient;

  const { createClient } = await import("@supabase/supabase-js");
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
