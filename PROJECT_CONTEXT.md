# PROJECT_CONTEXT

> Este archivo sirve a la vez para **estudiantes** y para **asistentes de IA**.
> Léelo antes de modificar el código.

## Identidad

Starter académico para la asignatura **Desarrollo Multiusuario / Multiplataforma**.

## Objetivo

Construir progresivamente una **Progressive Web App (PWA)** a partir del diseño elaborado por cada estudiante en las fases anteriores:

- **Fase 1 — Análisis:** perfiles de usuario, plataformas, dispositivos, condiciones de uso, conexión, requerimientos y funciones del dispositivo.
- **Fase 2 — Diseño:** flujo principal, navegación, wireframes, componentes, estado local y compartido, sincronización, offline y conflictos.
- **Fase 3 — Desarrollo (actual):** transformar esas decisiones en una aplicación funcionando.

## Stack

- React
- JavaScript (sin TypeScript)
- Vite
- React Router
- PWA (`vite-plugin-pwa`)
- CSS estándar
- Supabase, **solo cuando sea necesario**

## Estructura

| Carpeta | Responsabilidad |
|---|---|
| `src/pages` | Pantallas completas. |
| `src/components` | Interfaz reutilizable (configurable mediante props). |
| `src/routes` | Rutas centralizadas (`AppRouter.jsx`). |
| `src/state` | Estado compartido entre varias partes de la app. |
| `src/services/api` | Acceso a datos (Supabase). |
| `src/services/device` | Capacidades del dispositivo (cámara, ubicación). |
| `src/storage` | Persistencia local (`localStorage`). |
| `src/hooks` | Hooks personalizados reutilizables. |
| `src/lib` | Clientes y configuración externa (`supabaseClient.js`). |
| `src/platform` | Adaptaciones justificadas por una limitación real. |
| `src/styles` | Estilos globales y variables CSS. |

---

## Principios

### Base compartida primero

Utilizar una base común para todas las plataformas. Solo adaptar cuando exista una **limitación concreta y comprobada**.

### Separación de responsabilidades

- **Pages:** pantallas completas.
- **Components:** interfaz reutilizable.
- **State:** estado compartido.
- **Services:** integraciones (datos, dispositivo).
- **Storage:** persistencia local.
- **Lib:** clientes y configuración externa.
- **Platform:** adaptaciones justificadas.

### Simplicidad

No incorporar herramientas o patrones innecesarios. El código debe poder entenderlo alguien que sabe JavaScript.

### JavaScript

No convertir el proyecto a TypeScript.

### Estado

Preferir `useState` y `useContext` de React antes de incorporar gestores externos. No todo estado debe ser global.

### Backend

Utilizar Supabase **solo** cuando el proyecto necesite datos remotos o compartidos entre usuarios. Si basta con estado o `localStorage`, no usar Supabase.

### Backend pequeño

Normalmente:

- **1 tabla**;
- **máximo 2** si realmente hace falta.

### Seguridad

- Nunca utilizar claves secretas desde el frontend.
- La Publishable Key puede estar en el frontend; la **Secret Key nunca**.
- Toda tabla expuesta al frontend debe tener **Row Level Security (RLS)** habilitado.
- Si una API externa requiere una clave secreta, la llamada debe hacerse del lado servidor (por ejemplo, una Supabase Edge Function).

---

## Instrucciones para asistentes de IA

Cuando ayudes a desarrollar este proyecto:

1. Lee este archivo antes de modificar código.
2. Respeta la arquitectura existente.
3. Usa JavaScript, no TypeScript.
4. No agregues dependencias sin necesidad clara.
5. No cambies React, Vite o React Router.
6. Mantén compatibilidad PWA.
7. Coloca páginas en `src/pages`.
8. Coloca componentes reutilizables en `src/components`.
9. Coloca acceso a datos en `src/services/api`.
10. Utiliza `src/lib/supabaseClient.js` para Supabase.
11. Coloca cámara y ubicación en `src/services/device`.
12. Coloca persistencia local en `src/storage`.
13. Usa `src/platform` únicamente ante una limitación real.
14. Antes de crear un componente, comprueba si ya existe uno reutilizable.
15. Antes de crear estado global, comprueba si realmente debe compartirse.
16. No implementes un backend Express.
17. No agregues ORM.
18. No agregues Redux ni Zustand.
19. No implementes autenticación salvo petición explícita.
20. No agregues Supabase Realtime salvo necesidad concreta.
21. No utilices Supabase Secret Key en frontend.
22. No expongas secretos de APIs.
23. Mantén Row Level Security cuando exista acceso a tablas.
24. Si una API requiere una clave secreta, recomienda lógica server-side o Edge Function.
25. Mantén accesibilidad básica.
26. Evita reescribir archivos completos cuando un cambio localizado sea suficiente.
27. Explica al estudiante las decisiones importantes.
28. Prioriza código comprensible para alguien con conocimientos de JavaScript.
29. No desarrolles funcionalidades fuera del alcance solicitado.
30. El estudiante debe poder explicar el código final.

### Convenciones de código

- Una carpeta por página y por componente: `NombrePage/NombrePage.jsx` + `NombrePage.css`.
- Componentes como funciones con `export default`.
- Servicios como funciones con `export` nombrado (`getItems`, `createItem`, `updateItem`).
- Los servicios de datos obtienen el cliente con `getSupabaseClient()`, que muestra un error claro si Supabase no está configurado.
- Comentarios solo donde expliquen una decisión importante.
- Textos de la interfaz en español.

---

## Preguntas que la IA debe hacerse antes de modificar código

- ¿Esto es una **Page** o un **Component**?
- ¿Existe ya algo **reutilizable**?
- ¿Esta lógica pertenece a un **Service**?
- ¿Este estado realmente necesita **compartirse**?
- ¿Necesito **Supabase** o basta con estado/`localStorage`?
- ¿Estoy agregando una **tabla innecesaria**?
- ¿Estoy agregando una **dependencia evitable**?
- ¿Estoy creando una **adaptación específica** sin una limitación real?
- ¿Estoy **exponiendo algún secreto**?
- ¿Este cambio mantiene la **PWA funcionando**?
- ¿Este código sigue siendo **comprensible para el estudiante**?
