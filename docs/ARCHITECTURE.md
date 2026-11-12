# Arquitectura del Starter PWA

> Los diagramas de este documento son **guías, no reglas absolutas**. Sirven para decidir *dónde* va cada cosa. Si un caso concreto no encaja, prioriza la claridad y explica tu decisión.

## Idea central

Cada carpeta tiene **una responsabilidad**. Una página organiza la pantalla; los componentes dibujan; los servicios hablan con el exterior (Supabase, cámara, ubicación); el storage guarda datos en el dispositivo.

```
src/
├── pages/       ¿Qué pantalla ve el usuario?
├── components/  ¿Qué piezas de interfaz se repiten?
├── routes/      ¿Cómo se navega entre pantallas?
├── state/       ¿Qué datos necesitan varias pantallas a la vez?
├── services/    ¿Cómo hablo con el exterior?
│   ├── api/     → datos remotos (Supabase)
│   └── device/  → capacidades del dispositivo
├── storage/     ¿Qué guardo en este dispositivo?
├── lib/         ¿Qué clientes externos configuro?
├── hooks/       ¿Qué lógica de React reutilizo?
└── platform/    ¿Qué adaptación exige una limitación real?
```

---

## 1. Flujo de una interacción

```
User
 ↓
Page
 ↓
Components
 ↓
Action
 ↓
State / Service
 ↓
UI updates
```

1. El **usuario** interactúa (pulsa un botón, escribe, navega).
2. La **página** recibe la acción, normalmente a través de un **componente** (por ejemplo, `onClick` pasado por props).
3. La **acción** actualiza el **estado** (`useState`) o llama a un **servicio**.
4. React vuelve a renderizar y la **interfaz se actualiza**.

Ejemplo:

```jsx
function CounterPage() {
  const [count, setCount] = useState(0)

  return <Button label={`Contador: ${count}`} onClick={() => setCount(count + 1)} />
}
```

---

## 2. Flujo de datos remotos (Supabase)

```
Page
 ↓
Service
 ↓
Supabase
 ↓
PostgreSQL
 ↓
Result
 ↓
State
 ↓
UI
```

- La página **no** escribe consultas de Supabase: llama a una función del servicio.
- El servicio (`src/services/api/`) usa el cliente de `src/lib/supabaseClient.js`.
- Supabase aplica las políticas **RLS** y consulta **PostgreSQL**.
- El resultado se guarda en el **estado** de la página y la **interfaz** se actualiza.

```jsx
import { useEffect, useState } from 'react'
import { getItems } from '../../services/api/exampleService.js'

function ItemsPage() {
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((error) => setErrorMessage(error.message))
  }, [])

  // ...renderizar items o errorMessage
}
```

¿Por qué separar el servicio? Si mañana cambia la tabla o la consulta, solo modificas **un archivo**, no todas las pantallas que usan esos datos.

---

## 3. Flujo de capacidades del dispositivo

```
Page
 ↓
Device Service
 ↓
Web API
 ↓
Camera / Geolocation
```

- `cameraService.js` envuelve `navigator.mediaDevices.getUserMedia`.
- `geolocationService.js` envuelve `navigator.geolocation`.
- Ambos comprueban la disponibilidad, piden permiso y traducen los errores a mensajes comprensibles.
- La página solo decide **cuándo** usarlos y **qué mostrar**.

---

## 4. Flujo offline y persistencia local

Hoy:

```
Page
 ↓
Storage
 ↓
localStorage
```

Y posteriormente, cuando el proyecto necesite sincronizar:

```
local state
↓
pending sync
↓
Supabase
```

1. El usuario realiza un cambio sin conexión.
2. El cambio se guarda en el **estado local** y en `localStorage` como **pendiente de sincronizar**.
3. Cuando vuelve la conexión, un servicio envía los pendientes a **Supabase**.
4. Aquí aplican las **reglas de resolución de conflictos** que diseñaste en la Fase 2.

Este flujo se trabajará en clase. El starter deja preparado `src/storage/localStorageService.js`.

---

## 5. La PWA

```
npm run build
 ↓
vite-plugin-pwa genera manifest.webmanifest + sw.js
 ↓
El navegador registra el service worker
 ↓
Los archivos estáticos quedan en caché
 ↓
La app abre sin conexión y puede instalarse
```

- La configuración está en `vite.config.js`.
- Estrategia de caché: **precache** de los archivos generados por el build (HTML, JS, CSS, iconos).
- Los datos de Supabase **no** se cachean automáticamente: el offline de datos se diseña con `storage`.
- El service worker solo funciona en el build (`npm run build` + `npm run preview`), no en `npm run dev`.

---

## 6. Reglas prácticas

| Si necesitas... | Ve a... |
|---|---|
| Una pantalla nueva | `src/pages` + ruta en `src/routes/AppRouter.jsx` |
| Una pieza visual que se repite | `src/components` (con props) |
| Datos que varias pantallas usan a la vez | `src/state` (Context) — solo si realmente se comparten |
| Leer o guardar en Supabase | `src/services/api` |
| Cámara o ubicación | `src/services/device` |
| Guardar algo en el dispositivo | `src/storage` |
| Reutilizar lógica de React (`useState` + `useEffect`) | `src/hooks` |
| Resolver una limitación real de un navegador | `src/platform` |
