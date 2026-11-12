# `src/hooks` — Hooks personalizados

Un **hook personalizado** es una función que empieza por `use` y agrupa lógica de React (`useState`, `useEffect`, etc.) para reutilizarla en varios componentes.

Esta carpeta está **vacía a propósito**. Crea un hook solo cuando repitas la misma lógica en dos o más lugares.

## ¿Cuándo crear un hook?

- Varias páginas cargan datos de un servicio con el mismo patrón de `loading` / `error` / `data`.
- Varias pantallas necesitan saber si hay conexión.
- Varias pantallas usan la ubicación del usuario.

## Ejemplo

```jsx
// src/hooks/useGeolocation.js
import { useState } from 'react'
import { getCurrentPosition } from '../services/device/geolocationService.js'

export function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function requestLocation() {
    setIsLoading(true)
    setErrorMessage('')
    try {
      setLocation(await getCurrentPosition())
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { location, errorMessage, isLoading, requestLocation }
}
```

Uso:

```jsx
const { location, errorMessage, isLoading, requestLocation } = useGeolocation()
```

## Diferencia con un servicio

- El **servicio** (`src/services`) es JavaScript puro: habla con Supabase o con una Web API.
- El **hook** conecta ese servicio con React: maneja estado, carga y errores para la interfaz.
