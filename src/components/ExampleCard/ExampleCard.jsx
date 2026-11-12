import './ExampleCard.css'

// Componente reutilizable: la estructura es siempre la misma,
// lo que cambia es la información que llega por props.
function ExampleCard({ title, description }) {
  return (
    <article className="example-card">
      <h2 className="example-card__title">{title}</h2>
      <p className="example-card__description">{description}</p>
    </article>
  )
}

export default ExampleCard
