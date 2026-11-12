# Configurar Supabase

> Supabase es **opcional**. El starter funciona sin él. Sigue esta guía solo cuando tu proyecto lo necesite.

## 1. ¿Cuándo necesito Supabase?

**Utiliza Supabase** si tu proyecto necesita:

- **persistencia remota:** los datos siguen existiendo aunque cierres el navegador o cambies de dispositivo;
- **información compartida:** lo que crea un usuario lo ve otro;
- **múltiples usuarios trabajando sobre los mismos datos**.

**No lo utilices** si tu proyecto solo necesita:

- datos **temporales** → `useState`;
- datos **locales** de un solo dispositivo → `src/storage/localStorageService.js`.

---

## 2. Crear el proyecto

1. Entra en [supabase.com](https://supabase.com) y crea una cuenta (puedes usar GitHub).
2. Pulsa **New project**. Elige un nombre, una contraseña para la base de datos (guárdala, **no** va en el frontend) y la región más cercana.
3. Espera a que el proyecto termine de crearse. Supabase crea automáticamente una base de datos **PostgreSQL**.
4. Obtén los dos valores que necesita el frontend:
   - **Project URL** — en **Project Settings → Data API** (o con el botón **Connect**). Tiene la forma `https://xxxxxxxx.supabase.co`.
   - **Publishable Key** — en **Project Settings → API Keys**. Empieza por `sb_publishable_`.

> ⚠️ En esa misma pantalla verás la **Secret Key** (`sb_secret_...`). **No la copies al proyecto.** Tampoco uses las claves antiguas `service_role`.

---

## 3. Configurar las variables

En la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
```

Reinicia el servidor (`Ctrl + C` y luego `npm run dev`). Vite solo lee las variables al arrancar.

La página de inicio mostrará **"Supabase: configurado"**.

> `.env.local` está en `.gitignore` y **no se sube a GitHub**. Cada integrante del equipo crea su propio `.env.local`.

### ¿Cómo sabe la app si Supabase está configurado?

En `src/lib/supabaseClient.js`:

```js
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey)
```

- Si **no** hay variables, el cliente no se crea y la app funciona igual.
- Si un servicio intenta usar Supabase sin configuración, verás este error:

  > Supabase no está configurado. Revisa docs/SUPABASE_SETUP.md y tu archivo .env.local.

---

## 4. Crear las tablas

> 📏 **Empieza con 1 tabla.** Usa **máximo 2** salvo necesidad real.

Ejemplos razonables para el curso:

```
reservations
```

```
resources
reservations
```

```
reports
```

No estás diseñando un sistema empresarial. Lo que debes demostrar es:

```
crear
↓
consultar
↓
actualizar
↓
compartir información entre usuarios
```

### Cómo crear una tabla

1. En Supabase abre **SQL Editor → New query**.
2. Usa como **referencia** el archivo [`supabase/example-schema.sql`](../supabase/example-schema.sql).
3. **Adapta** el nombre de la tabla y sus columnas a tu proyecto. La tabla `example_items` es **solo un ejemplo**.
4. Pulsa **Run** y comprueba la tabla en **Table Editor**.

Mantén el SQL de tu proyecto dentro de la carpeta `supabase/` del repositorio, para que el equipo y el docente puedan ver cómo se creó.

---

## 5. Seguridad

### El principio

```
Browser
↓
Supabase Publishable Key
↓
Row Level Security
↓
PostgreSQL
```

- La **Publishable Key** identifica a tu aplicación. Está pensada para estar en el frontend: **cualquiera puede verla** en las DevTools.
- Por eso la clave **NO es la protección**. La protección la dan las políticas **Row Level Security (RLS)**.
- **RLS** decide, fila por fila, **qué registros puede leer o modificar** quien hace la petición.
- Con RLS habilitado y **sin políticas**, nadie puede leer ni escribir desde el frontend. Cada política abre **exactamente** el permiso que necesitas.

### Las variables `VITE_`

Toda variable que empieza por `VITE_` se **incrusta en el JavaScript** que descarga el navegador. Por eso:

| ✅ Puede ir en el frontend | ❌ NUNCA en el frontend |
|---|---|
| `VITE_SUPABASE_URL` | Supabase **Secret Key** (`sb_secret_...`) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Claves antiguas **service_role** |
| | Contraseña de la base de datos |
| | Secretos de APIs externas |

### Reglas

1. **Habilita RLS** en toda tabla a la que acceda el frontend.
2. **Crea políticas** solo para las operaciones que tu app realmente usa (por ejemplo, leer e insertar, pero no borrar).
3. **Nunca soluciones un error desactivando RLS** de forma permanente. Si una consulta devuelve una lista vacía o un error de permisos (`new row violates row-level security policy`), lo que falta es **una política**, no quitar la seguridad.

El archivo [`supabase/example-schema.sql`](../supabase/example-schema.sql) incluye un ejemplo de RLS con políticas sencillas.

---

## 6. Servicios: dónde van las consultas

Las consultas **no** se escriben dentro de las páginas o componentes. Van en `src/services/api/`:

```
src/services/api/
├── exampleService.js        (ejemplo incluido)
├── reservationService.js    (tu proyecto)
└── reportService.js         (tu proyecto)
```

Patrón a copiar (de `exampleService.js`):

```js
import { getSupabaseClient } from '../../lib/supabaseClient.js'

const TABLE_NAME = 'reservations'

export async function getReservations() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from(TABLE_NAME).select('*')

  if (error) {
    throw new Error(`No se pudieron cargar las reservas: ${error.message}`)
  }
  return data
}
```

Y desde la página:

```js
import { getReservations } from '../../services/api/reservationService.js'
```

Así, si cambia la consulta, solo modificas el servicio, no todas las pantallas.

---

## 7. Funcionalidades para más adelante

Estas funcionalidades **no están configuradas** en el starter. Agrégalas **solo** si tu proyecto realmente las necesita.

### Supabase Auth (autenticación)

Permite registro e inicio de sesión de usuarios. El curso **no depende** de autenticación. Si tu proyecto necesita identificar a cada usuario (por ejemplo, "cada usuario solo ve sus propias reservas"), consúltalo primero con el docente. Con Auth, las políticas RLS pueden usar `auth.uid()` para filtrar por usuario.

### Supabase Realtime (tiempo real)

Permite que varios usuarios reciban cambios **automáticamente**, sin recargar:

```
Usuario A
↓
modifica reserva
↓
Supabase
↓
Realtime
↓
Usuario B recibe cambio
```

Úsalo solo si tu diseño de la Fase 2 lo justifica. Muchas veces basta con volver a consultar los datos al abrir la pantalla o al pulsar "Actualizar".

### Edge Functions (lógica del lado servidor)

Una **Edge Function** es código que se ejecuta en los servidores de Supabase, no en el navegador. Es necesaria cuando la app debe usar un **secreto**.

Ejemplo: tu PWA necesita consumir una API externa que exige una clave secreta.

```
INCORRECTO

PWA
↓
API externa
SECRET_KEY expuesta
```

Si la clave está en el frontend, cualquiera puede copiarla desde las DevTools.

```
CORRECTO

PWA
↓
Supabase Edge Function
↓
API externa
```

La función guarda el secreto **del lado servidor** (como secreto de Supabase) y la PWA solo llama a la función.

> Solo crea una Edge Function si realmente existe una necesidad de **lógica segura del lado servidor**. Para leer y escribir en tus tablas **no la necesitas**: basta con el servicio + RLS.

---

## Problemas frecuentes

| Síntoma | Causa probable |
|---|---|
| "Supabase no está configurado..." | Falta `.env.local`, tiene nombres de variables distintos o no reiniciaste `npm run dev`. |
| La consulta devuelve `[]` aunque hay datos | RLS está habilitado y falta una política de lectura (`select`). |
| `new row violates row-level security policy` | Falta una política de inserción o actualización, o el `with check` no se cumple. |
| `relation "..." does not exist` | El nombre de la tabla en el servicio no coincide con el de Supabase. |
| Funciona en local pero no en el sitio publicado | Configura las mismas variables `VITE_` en el servicio de hosting y vuelve a hacer el build. |
