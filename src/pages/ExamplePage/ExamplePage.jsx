import { Link } from 'react-router'
import ExampleCard from '../../components/ExampleCard/ExampleCard.jsx'
import './ExamplePage.css'

// Datos de ejemplo locales. En tu proyecto podrían venir de un estado,
// de localStorage o de un servicio en src/services/api.
const exampleItems = [
  {
    id: 1,
    title: 'Elemento de ejemplo',
    description: 'Ejemplo de un componente reutilizable.',
  },
  {
    id: 2,
    title: 'Mismo componente',
    description: 'Solo cambian las props: no hace falta crear otro componente.',
  },
  {
    id: 3,
    title: 'Diseño responsive',
    description: 'La cuadrícula se adapta a móvil, tablet y escritorio.',
  },
]

function ExamplePage() {
  return (
    <section className="example-page" aria-labelledby="example-title">
      <title>Ejemplo · Starter PWA</title>

      <h1 id="example-title">Página de ejemplo</h1>
      <p>
        Esta página usa el componente <code>ExampleCard</code> varias veces con información
        diferente.
      </p>

      <div className="example-page__grid">
        {exampleItems.map((item) => (
          <ExampleCard key={item.id} title={item.title} description={item.description} />
        ))}
      </div>

      <Link to="/" className="button button--secondary">
        Volver al inicio
      </Link>
    </section>
  )
}

export default ExamplePage
