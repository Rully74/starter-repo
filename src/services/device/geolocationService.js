// Acceso a la ubicación mediante la Web API `navigator.geolocation`.
// Requiere un contexto seguro: https:// o http://localhost.

export function isGeolocationAvailable() {
  return 'geolocation' in navigator
}

// Devuelve una promesa con { latitude, longitude, accuracy, timestamp }.
// `accuracy` está en metros.
export function getCurrentPosition({ enableHighAccuracy = false, timeout = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    if (!isGeolocationAvailable()) {
      reject(new Error('Este navegador o dispositivo no permite obtener la ubicación.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
      },
      (error) => reject(new Error(getGeolocationErrorMessage(error))),
      { enableHighAccuracy, timeout, maximumAge: 0 },
    )
  })
}

function getGeolocationErrorMessage(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Permiso de ubicación denegado. Habilítalo en la configuración del navegador.'
    case error.POSITION_UNAVAILABLE:
      return 'No se pudo determinar la ubicación. Revisa el GPS o la conexión.'
    case error.TIMEOUT:
      return 'La ubicación tardó demasiado en obtenerse. Inténtalo de nuevo.'
    default:
      return 'Ocurrió un error desconocido al obtener la ubicación.'
  }
}
