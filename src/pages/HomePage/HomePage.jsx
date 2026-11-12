import { Link } from 'react-router'
import { isSupabaseConfigured } from '../../lib/supabaseClient.js'
import './HomePage.css'

const technologies = ['React', 'JavaScript', 'Vite', 'React Router', 'PWA', 'Supabase (opcional)']

function HomePage() {
  return (
    <section className="home-page" aria-labelledby="home-title">
      <title>Inicio · Starter PWA</title>

      <h1 id="home-title">Starter PWA</h1>
      <p className="home-page__lead">
        Base común del curso <strong>Desarrollo Multiusuario / Multiplataforma</strong>. A partir
        de aquí construirás tu propia aplicación usando los wireframes y decisiones de las fases
        anteriores.
      </p>

      <h2>Tecnologías</h2>
      <ul className="home-page__tech-list">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      {/* El estado se comunica con texto, no solo con color. */}
      <p className="home-page__status">
        <strong>Supabase:</strong>{' '}
        {isSupabaseConfigured
          ? 'configurado (variables encontradas en .env.local).'
          : 'no configurado. La aplicación funciona igual; revisa docs/SUPABASE_SETUP.md cuando lo necesites.'}
      </p>

      <Link to="/ejemplo" className="button">
        Ver página de ejemplo
      </Link>
    </section>
  )
}

export default HomePage
