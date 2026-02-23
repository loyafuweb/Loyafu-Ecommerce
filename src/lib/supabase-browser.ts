import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient> | undefined

export function createSupabaseBrowserClient() {
    if (client) return client

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase URL or Anon Key is not defined. Please check your .env.local file and RESTART the dev server.");
    }

    client = createBrowserClient(supabaseUrl, supabaseAnonKey)

    return client
}
