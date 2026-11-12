// Acceso a la cámara mediante la Web API `navigator.mediaDevices.getUserMedia`.
// Requiere un contexto seguro: https:// o http://localhost.

export function isCameraAvailable() {
  return Boolean(navigator.mediaDevices?.getUserMedia)
}

// Devuelve un MediaStream que puede asignarse a un <video>:
//   videoElement.srcObject = stream
// facingMode: 'environment' (cámara trasera) o 'user' (cámara frontal).
export async function requestCameraStream({ facingMode = 'environment' } = {}) {
  if (!window.isSecureContext) {
    throw new Error('La cámara solo funciona en HTTPS o en localhost.')
  }
  if (!isCameraAvailable()) {
    throw new Error('Este navegador o dispositivo no permite acceder a la cámara.')
  }

  try {
    return await navigator.mediaDevices.getUserMedia({
      video: { facingMode },
      audio: false,
    })
  } catch (error) {
    throw new Error(getCameraErrorMessage(error))
  }
}

// Apaga la cámara. Llamarla siempre al salir de la pantalla que la usa.
export function stopCameraStream(stream) {
  stream?.getTracks().forEach((track) => track.stop())
}

function getCameraErrorMessage(error) {
  switch (error.name) {
    case 'NotAllowedError':
      return 'Permiso de cámara denegado. Habilítalo en la configuración del navegador.'
    case 'NotFoundError':
      return 'No se encontró ninguna cámara en este dispositivo.'
    case 'NotReadableError':
      return 'La cámara está siendo usada por otra aplicación.'
    case 'OverconstrainedError':
      return 'No hay una cámara que cumpla las condiciones solicitadas.'
    default:
      return `No se pudo acceder a la cámara (${error.name || 'error desconocido'}).`
  }
}
