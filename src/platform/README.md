# `src/platform` — Adaptaciones específicas

## La base compartida es la opción por defecto

Una PWA usa **el mismo código** en Android, iOS, Windows, macOS y Linux. Esa es su principal ventaja. Por eso esta carpeta está **vacía** y debería seguir así la mayor parte del proyecto.

## ¿Cuándo crear una adaptación?

Solo cuando encuentres una **limitación concreta y comprobada** de una plataforma, un navegador o una capacidad. Por ejemplo:

- Un navegador no soporta una Web API que tu proyecto necesita y debes ofrecer una alternativa.
- En iOS la instalación de la PWA se hace desde el menú **Compartir → Añadir a pantalla de inicio** y quieres mostrar esa instrucción.
- Una capacidad funciona distinto y lo has **verificado en un dispositivo real**.

Documenta siempre **qué limitación encontraste** y **en qué dispositivo/navegador**.

## Preferir detección de capacidades

❌ Evita código artificial basado en el sistema operativo:

```js
if (android) { /* ... */ }
if (ios) { /* ... */ }
```

- El *user agent* puede mentir o cambiar.
- Un mismo sistema operativo tiene muchos navegadores con capacidades distintas.
- Agrega ramas de código que nadie prueba.

✅ Pregunta si **la capacidad existe**:

```js
if ('share' in navigator) {
  await navigator.share({ title: 'Mi reserva', url: window.location.href })
} else {
  await navigator.clipboard.writeText(window.location.href)
}
```

```js
if ('geolocation' in navigator) {
  // usar ubicación
} else {
  // pedir que el usuario escriba su ciudad
}
```

## Cómo organizarlo (solo si hace falta)

```
src/platform/
└── shareContent.js   // usa navigator.share o, si no existe, copia el enlace
```

La página llama a `shareContent()` y no necesita saber qué camino se tomó.
