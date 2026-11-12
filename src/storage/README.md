# `src/storage` — Persistencia local

Aquí se guardan datos **en el propio dispositivo**, usando `localStorage`.

## Funciones incluidas (`localStorageService.js`)

| Función | Qué hace |
|---|---|
| `saveItem(key, value)` | Guarda cualquier valor (texto, número, objeto, array) como JSON. Devuelve `true` o `false`. |
| `getItem(key, defaultValue)` | Lee y convierte el JSON. Si no existe o está dañado, devuelve `defaultValue`. |
| `removeItem(key)` | Elimina el valor. |

```js
import { saveItem, getItem, removeItem } from '../../storage/localStorageService.js'

saveItem('preferences', { theme: 'dark' })
const preferences = getItem('preferences', { theme: 'light' })
removeItem('preferences')
```

Todas las claves llevan el prefijo `starter-pwa:` para no mezclar datos con otros proyectos que también corren en `localhost`. **Cámbialo por el nombre de tu proyecto** en `localStorageService.js`.

## ¿Cuándo usar localStorage?

- Preferencias del usuario.
- Borradores de formularios.
- Datos que solo importan **en ese dispositivo**.
- Cambios hechos **sin conexión** que quedan **pendientes de sincronizar**.

## Limitaciones

- Solo existe en **ese navegador de ese dispositivo**: no se comparte entre usuarios.
- Capacidad limitada (unos pocos MB).
- Es **síncrono** y solo guarda texto (por eso serializamos a JSON).
- **No es seguro**: no guardes contraseñas, tokens ni datos sensibles.

## Más adelante: offline y sincronización

```
local state
↓
pending sync (localStorage)
↓
Supabase
```

En clase veremos cómo guardar cambios pendientes y enviarlos cuando vuelva la conexión. Por ahora **no** se usa IndexedDB: `localStorage` es suficiente para aprender el concepto.
