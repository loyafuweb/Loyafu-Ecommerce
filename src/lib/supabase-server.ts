import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Service role client for server-side operations that bypass RLS.
 * Only use this in server-side files (API routes, server components).
 * It will NOT be bundled in the client-side code if it's strictly isolated.
 */
export const getSupabaseService = () => {
    // We prefer the sensitive service role key, but can fall back to the anon key if allowed.
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

    if (!supabaseUrl || !serviceRoleKey) {
        console.warn('Supabase URL or Service Role Key missing in Server Client.');
        return null;
    }

    return createClient(supabaseUrl, serviceRoleKey);
};
