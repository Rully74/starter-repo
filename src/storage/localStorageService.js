// Persistencia local sencilla sobre `localStorage`.
// Los valores se guardan como JSON, así se pueden almacenar objetos y arrays.

// Todos los proyectos que corren en http://localhost:5173 comparten el mismo
// localStorage. El prefijo evita mezclar datos de proyectos distintos.
// Cámbialo por el nombre de tu proyecto.
const KEY_PREFIX = 'starter-pwa:'

export function saveItem(key, value) {
  try {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value))
    return true
  } catch (error) {
    // Puede fallar si el almacenamiento está lleno o bloqueado (p. ej., modo privado).
    console.error(`No se pudo guardar "${key}" en localStorage:`, error)
    return false
  }
}

export function getItem(key, defaultValue = null) {
  try {
    const storedValue = localStorage.getItem(KEY_PREFIX + key)
    return storedValue === null ? defaultValue : JSON.parse(storedValue)
  } catch (error) {
    // JSON inválido o almacenamiento no disponible: devolvemos el valor por defecto.
    console.error(`No se pudo leer "${key}" de localStorage:`, error)
    return defaultValue
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(KEY_PREFIX + key)
    return true
  } catch (error) {
    console.error(`No se pudo eliminar "${key}" de localStorage:`, error)
    return false
  }
}
