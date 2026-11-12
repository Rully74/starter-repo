import { Navigate, Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage/HomePage.jsx'
import ExamplePage from '../pages/ExamplePage/ExamplePage.jsx'

// Todas las rutas de la aplicación se declaran aquí.
// Para agregar una pantalla: crea la página en src/pages y añade su <Route>.
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ejemplo" element={<ExamplePage />} />
      {/* Cualquier ruta desconocida vuelve al inicio. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
