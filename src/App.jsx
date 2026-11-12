import { Link } from 'react-router'
import AppRouter from './routes/AppRouter.jsx'

// App define la estructura común a todas las pantallas (cabecera, contenido, pie).
// Las rutas concretas viven en src/routes/AppRouter.jsx.
function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>

      <header className="app-header">
        <div className="container">
          <Link to="/" className="app-header__brand">
            Starter PWA
          </Link>
        </div>
      </header>

      <main id="main-content" className="container app-main" tabIndex="-1">
        <AppRouter />
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Desarrollo Multiusuario / Multiplataforma</p>
        </div>
      </footer>
    </>
  )
}

export default App
