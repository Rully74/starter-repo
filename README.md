# Starter PWA — Desarrollo Multiusuario / Multiplataforma

## ¿Qué es este repositorio?

Es la **base común del curso** para la **Fase 3 — Desarrollo multiplataforma e integración con servicios**.

Aquí tienes la configuración, la estructura de carpetas, la PWA y la preparación para Supabase ya resueltas, para que te concentres en lo importante: **convertir tus wireframes y decisiones de las Fases 1 y 2 en una aplicación que funcione**.

> ⚠️ Este repositorio **NO es la aplicación final**. Es el punto de partida. La aplicación de ejemplo es intencionalmente mínima: la irás reemplazando por las pantallas de tu proyecto.

---

## Tecnologías

| Tecnología | Para qué se usa |
|---|---|
| **React** | Construir la interfaz con componentes. |
| **JavaScript** | Lenguaje del proyecto (no usamos TypeScript). |
| **Vite** | Servidor de desarrollo y build de producción. |
| **React Router** | Navegación entre pantallas. |
| **PWA** (`vite-plugin-pwa`) | Manifest, iconos, service worker e instalación. |
| **Supabase** *(opcional)* | Backend para datos persistentes y compartidos entre usuarios. |

Estilos con **CSS estándar** (Flexbox, Grid y media queries). Sin librerías visuales.

---

## Requisitos

- **Node.js LTS** (versión 20.19 o superior; recomendado la LTS actual). Comprueba con `node -v`.
- **npm** (se instala junto con Node.js). Comprueba con `npm -v`.
- **Git**.
- Un editor de código, por ejemplo **VS Code**.

---

## Primeros pasos

```bash
git clone <URL>
cd <PROYECTO>
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente `http://localhost:5173`).

✅ **No necesitas Supabase para empezar.** La aplicación funciona aunque no exista el archivo `.env.local`.

---

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática. Úsalo mientras programas. |
| `npm run build` | Genera la versión de producción en la carpeta `dist/` (incluye el service worker). |
| `npm run preview` | Sirve localmente la carpeta `dist/` para probar la versión de producción. |

---

## Probar la PWA

El service worker **no se activa en `npm run dev`** (a propósito: evita que la caché te muestre código viejo mientras programas). Las funciones PWA se prueban sobre el build de producción:

```bash
npm run build
npm run preview
```

Luego abre `http://localhost:4173` en Chrome o Edge y:

1. Abre las **DevTools → Application (Aplicación)**.
2. En **Manifest** comprueba nombre, iconos, colores y `display: standalone`.
3. En **Service Workers** comprueba que `sw.js` está **activado**.
4. Marca **Offline** en la pestaña **Network** y recarga: la aplicación debe seguir abriendo.
5. Usa el icono de **Instalar** de la barra de direcciones para instalarla como aplicación.

> 💡 Si después de un cambio ves una versión vieja, ve a **Application → Storage → Clear site data** y recarga.

Para probar en un **móvil real** la instalación, la cámara o la ubicación necesitas **HTTPS** (por ejemplo, publicando en Netlify, Vercel o GitHub Pages). `localhost` solo cuenta como seguro en tu propio ordenador.

Los iconos de `public/icons/` son **placeholders**. Reemplázalos por los de tu proyecto manteniendo los mismos nombres y tamaños.

---

## Estructura del proyecto

```
starter-pwa/
├── public/                  Archivos estáticos (favicon, iconos de la PWA)
├── src/
│   ├── components/          Componentes reutilizables de interfaz
│   ├── pages/               Pantallas completas
│   ├── routes/              Definición de rutas (React Router)
│   ├── state/               Estado compartido (cuando realmente haga falta)
│   ├── lib/                 Clientes y configuración externa (Supabase)
│   ├── services/
│   │   ├── api/             Acceso a datos (consultas a Supabase)
│   │   └── device/          Capacidades del dispositivo (cámara, ubicación)
│   ├── storage/             Persistencia local (localStorage)
│   ├── hooks/               Hooks personalizados de React
│   ├── platform/            Adaptaciones justificadas por plataforma
│   ├── styles/              Estilos globales
│   ├── App.jsx              Estructura común (cabecera, contenido, pie)
│   └── main.jsx             Punto de entrada
├── docs/                    Arquitectura y guía de Supabase
├── supabase/                SQL de ejemplo
├── .env.example             Plantilla de variables de entorno
├── PROJECT_CONTEXT.md       Contexto para estudiantes y asistentes de IA
└── vite.config.js           Configuración de Vite y de la PWA
```

### ¿Dónde pongo cada cosa?

| Pregunta | Respuesta |
|---|---|
| ¿Dónde creo una **página**? | `src/pages` — una carpeta por página (`ReservationsPage/ReservationsPage.jsx` + `.css`). Después regístrala en `src/routes/AppRouter.jsx`. |
| ¿Dónde creo un **componente**? | `src/components` — una carpeta por componente. Si solo cambia la información, **usa props**, no crees otro componente. |
| ¿Dónde pongo una **llamada a Supabase**? | `src/services/api` — nunca directamente dentro de una página o componente. |
| ¿Dónde está el **cliente Supabase**? | `src/lib/supabaseClient.js` |
| ¿Dónde trabajo **cámara o ubicación**? | `src/services/device` |
| ¿Dónde guardo **datos locales**? | `src/storage` |
| ¿Dónde pongo una **adaptación específica** de plataforma? | `src/platform` — **solo si existe una limitación real y comprobada**. |

Cada carpeta importante tiene su propio `README.md` con explicaciones y ejemplos. La arquitectura completa está en [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Flujo de trabajo recomendado

```
Wireframe
↓
Page
↓
Components
↓
Routes
↓
State
↓
Services
↓
Backend si es necesario
↓
Pruebas
```

1. Toma un **wireframe** de la Fase 2.
2. Crea la **página** con contenido estático.
3. Extrae las partes repetidas como **componentes** con props.
4. Agrega la **ruta** en `AppRouter.jsx`.
5. Agrega **estado** (`useState`) cuando la pantalla necesite cambiar.
6. Mueve integraciones (datos, cámara, ubicación) a **servicios**.
7. Conecta el **backend** solo si tu proyecto lo necesita.
8. **Prueba** en móvil, tablet y escritorio, y como PWA instalada.

---

## ¿Mi proyecto necesita backend?

**NO necesariamente.**

### Sin Supabase

Si tu proyecto solo necesita:

- demostrar navegación;
- mostrar información estática;
- estado temporal (se pierde al recargar);

puedes trabajar inicialmente **sin Supabase**, solo con React (`useState`).

### Utiliza localStorage

Si necesitas que los datos **persistan solamente en ese dispositivo** (preferencias, borradores, datos pendientes de enviar), usa `src/storage/localStorageService.js`.

### Utiliza Supabase

Si necesitas:

- datos **compartidos entre usuarios**;
- **persistencia remota** (los datos existen aunque cambies de dispositivo);
- **CRUD compartido**;
- **sincronización**.

En ese caso sigue la guía [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md).

> 📏 **Mantén el backend pequeño:** normalmente basta con **1 tabla principal**, y como máximo **2** si realmente hace falta (por ejemplo `reservations`, o `resources` + `reservations`). Lo que debes demostrar es: **crear → consultar → actualizar → compartir información entre usuarios**.

---

## Conectar Supabase (resumen)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Copia la plantilla de variables:

   ```bash
   cp .env.example .env.local
   ```

3. Completa `.env.local` con los valores de **tu** proyecto:

   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

4. Reinicia `npm run dev`. La página de inicio indicará **"Supabase: configurado"**.

La guía completa, con la creación de tablas y la seguridad, está en [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md).

### ⚠️ Variables de entorno y seguridad

Las variables que empiezan por `VITE_` **terminan dentro del código JavaScript que se ejecuta en el navegador**. Cualquier persona puede verlas abriendo las DevTools.

Por eso:

- ✅ `VITE_SUPABASE_PUBLISHABLE_KEY` **sí** puede usarse en el frontend: está diseñada para ser pública. La seguridad real la ponen las políticas **Row Level Security (RLS)**.
- ❌ **NUNCA** coloques en el frontend:
  - la **Supabase Secret Key** (`sb_secret_...`);
  - claves administrativas;
  - las antiguas **service_role keys**;
  - contraseñas;
  - secretos de APIs externas.

El archivo `.env.local` está en `.gitignore`: **no se sube a GitHub**. El archivo `.env.example` sí se sube, pero siempre **sin valores**.

---

## Uso de IA

Puedes usar asistentes de IA como **apoyo**, pero **tú diriges y tú respondes por el código**.

Antes de pedir ayuda, entrega a la IA el archivo [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md). Ejemplo de prompt:

> Lee primero PROJECT_CONTEXT.md. Estoy desarrollando una PWA para este curso. Necesito implementar la siguiente funcionalidad respetando la arquitectura existente. No agregues nuevas dependencias ni cambies la arquitectura salvo que exista una necesidad técnica clara. Explícame los cambios realizados.

Reglas:

- La IA es una **herramienta de apoyo**, no la autora del proyecto.
- **Revisa** todo el código generado antes de aceptarlo.
- **Entiéndelo**: si no sabes qué hace una línea, pregunta o investiga.
- Debes **poder explicarlo** en clase o en una evaluación.
- Evita que cada prompt genere una arquitectura diferente: por eso existe `PROJECT_CONTEXT.md`.

---

## Documentación adicional

- [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) — principios del proyecto e instrucciones para IA.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — cómo fluyen las acciones y los datos.
- [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md) — conectar Supabase paso a paso.
- [`supabase/example-schema.sql`](supabase/example-schema.sql) — tabla de ejemplo con RLS.
