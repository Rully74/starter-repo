import { getSupabaseClient } from '../../lib/supabaseClient.js'

// Servicio de EJEMPLO para la tabla `example_items` (ver supabase/example-schema.sql).
// La interfaz del starter NO llama a estas funciones: así funciona sin Supabase.
//
// Para tu proyecto, copia este archivo y adáptalo:
//   reservationService.js -> tabla "reservations"
//   reportService.js      -> tabla "reports"

const TABLE_NAME = 'example_items'
const COLUMNS = 'id, title, description, status, created_at'

export async function getItems() {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(COLUMNS)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`No se pudieron cargar los elementos: ${error.message}`)
  }
  return data
}

export async function createItem({ title, description = '' }) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({ title, description })
    .select(COLUMNS)
    .single()

  if (error) {
    throw new Error(`No se pudo crear el elemento: ${error.message}`)
  }
  return data
}

// `changes` contiene solo los campos que se quieren modificar,
// por ejemplo: updateItem(3, { status: 'done' })
export async function updateItem(id, changes) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(changes)
    .eq('id', id)
    .select(COLUMNS)
    .single()

  if (error) {
    throw new Error(`No se pudo actualizar el elemento: ${error.message}`)
  }
  return data
}
