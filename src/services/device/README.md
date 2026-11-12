# `src/services/device` — Capacidades del dispositivo

Aquí se envuelven las **Web APIs** del navegador que acceden al hardware: cámara, ubicación y, más adelante, otras que tu proyecto necesite.

## Servicios incluidos

| Archivo | Web API | Funciones |
|---|---|---|
| `cameraService.js` | `navigator.mediaDevices.getUserMedia` | `isCameraAvailable()`, `requestCameraStream()`, `stopCameraStream()` |
| `geolocationService.js` | `navigator.geolocation` | `isGeolocationAvailable()`, `getCurrentPosition()` |

Cada servicio:

1. **Detecta si la capacidad está disponible** (no asume que existe).
2. **Pide permiso** al usuario a través del navegador.
3. **Traduce los errores** a mensajes comprensibles en español.
4. Devuelve un resultado simple.

## Requisito: contexto seguro

Cámara y ubicación solo funcionan en **HTTPS** o en **`http://localhost`**. Si pruebas desde el móvil usando la IP de tu ordenador (`http://192.168...`), el navegador las bloqueará. Publica la app con HTTPS para probar en un dispositivo real.

## Ejemplo: ubicación

```jsx
import { getCurrentPosition } from '../../services/device/geolocationService.js'

async function handleGetLocation() {
  try {
    const { latitude, longitude } = await getCurrentPosition()
    setLocation({ latitude, longitude })
  } catch (error) {
    setErrorMessage(error.message)
  }
}

<button type="button" onClick={handleGetLocation}>Obtener mi ubicación</button>
```

## Ejemplo: cámara

```jsx
import { useEffect, useRef } from 'react'
import { requestCameraStream, stopCameraStream } from '../../services/device/cameraService.js'

function CameraPreview() {
  const videoRef = useRef(null)

  useEffect(() => {
    let stream
    requestCameraStream()
      .then((cameraStream) => {
        stream = cameraStream
        videoRef.current.srcObject = stream
      })
      .catch((error) => console.error(error.message))

    // Apagar la cámara al salir de la pantalla.
    return () => stopCameraStream(stream)
  }, [])

  return <video ref={videoRef} autoPlay playsInline muted aria-label="Vista previa de la cámara" />
}
```

## Buenas prácticas

- Pide permisos **cuando el usuario realiza una acción** (pulsar un botón), no al abrir la app.
- Muestra siempre un mensaje si la capacidad **no está disponible** o el permiso fue **denegado**.
- Detecta capacidades (`isCameraAvailable()`), no sistemas operativos (ver `src/platform/README.md`).
