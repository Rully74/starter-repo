# `src/services/api` — Acceso a datos

Aquí van **todas** las operaciones con datos remotos (Supabase). Las páginas y componentes **no** escriben consultas: llaman a funciones de estos archivos.

## ¿Por qué?

- Si cambia una tabla o una consulta, modificas **un solo archivo**.
- Las páginas quedan más cortas y fáciles de leer.
- Los errores se traducen a mensajes comprensibles en un solo lugar.

## Patrón

Un archivo por tabla principal, con funciones pequeñas y nombres descriptivos:

```
exampleService.js       -> example_items (ejemplo incluido)
reservationService.js   -> reservations
productService.js       -> products
reportService.js        -> reports
orderService.js         -> orders
```

Cada función:

1. Obtiene el cliente con `getSupabaseClient()` (muestra un error claro si Supabase no está configurado).
2. Hace **una** operación.
3. Si hay `error`, lanza un `Error` con un mensaje en español.
4. Devuelve `data`.

```js
import { getSupabaseClient } from '../../lib/supabaseClient.js'

export async function getReservations() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from('reservations').select('*')

  if (error) {
    throw new Error(`No se pudieron cargar las reservas: ${error.message}`)
  }
  return data
}
```

## Usarlo desde una página

```jsx
const [reservations, setReservations] = useState([])
const [errorMessage, setErrorMessage] = useState('')

useEffect(() => {
  getReservations()
    .then(setReservations)
    .catch((error) => setErrorMessage(error.message))
}, [])
```

## Importante

- `exampleService.js` **no se llama automáticamente** en el starter. Así la app funciona sin Supabase.
- Nunca uses aquí la Secret Key. Si necesitas un secreto, usa una Edge Function (ver `docs/SUPABASE_SETUP.md`).
