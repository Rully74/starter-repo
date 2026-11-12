# `src/state` — Estado compartido

Esta carpeta está **vacía a propósito**. Úsala solo cuando un dato necesite compartirse entre varias partes de la aplicación.

> No instales Redux ni Zustand. React ya trae lo necesario: `useState` y `useContext`.

## ¿Qué es el estado local?

Es un dato que **solo necesita un componente o una página**. Se crea con `useState` dentro de ese componente:

```jsx
function SearchPage() {
  const [searchText, setSearchText] = useState('')
  // solo SearchPage usa searchText
}
```

Ejemplos: el texto de un buscador, si un menú está abierto, el valor de un formulario.

**La mayoría del estado de tu aplicación debería ser local.**

## ¿Cuándo podría necesitar estado compartido?

Cuando **varias pantallas o componentes lejanos** necesitan **el mismo dato** al mismo tiempo, y pasarlo por props se vuelve difícil.

Ejemplos:

- el usuario o el equipo seleccionado, visible en varias pantallas;
- un carrito o una lista de elementos pendientes de sincronizar;
- el estado de conexión (en línea / sin conexión).

Antes de hacerlo global, prueba:

1. **Subir el estado** al componente padre común y pasarlo por props.
2. Si son muchas capas, entonces usa **Context**.

## No todo estado debe ser global

Hacer global un dato que solo usa una pantalla:

- complica entender **quién lo cambia**;
- provoca renders innecesarios;
- dificulta reutilizar componentes.

Pregunta clave: **¿qué componentes necesitan este dato?** Si la respuesta es "uno", es estado local.

## Ejemplo con Context (para cuando realmente lo necesites)

```jsx
// src/state/ConnectionContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ConnectionContext = createContext(true)

export function ConnectionProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  return <ConnectionContext.Provider value={isOnline}>{children}</ConnectionContext.Provider>
}

export function useConnection() {
  return useContext(ConnectionContext)
}
```

Se envuelve la aplicación en `main.jsx` con `<ConnectionProvider>` y cualquier componente usa `const isOnline = useConnection()`.
