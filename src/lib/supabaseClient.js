import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Supabase es OPCIONAL en este starter.
// Si las variables están vacías, la aplicación sigue funcionando y
// el cliente simplemente no se crea.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null

export const SUPABASE_NOT_CONFIGURED_MESSAGE =
  'Supabase no está configurado. Revisa docs/SUPABASE_SETUP.md y tu archivo .env.local.'

// Los servicios deben usar esta función en lugar de importar `supabase` directamente:
// así, si falta la configuración, el error es claro en lugar de un
// "Cannot read properties of null".
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error(SUPABASE_NOT_CONFIGURED_MESSAGE)
  }
  return supabase
}
