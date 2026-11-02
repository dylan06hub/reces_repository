// Pagina de contacto con informacion del local y formulario de consultas.
import { useContactForm } from '../hooks/useContactForm'
import Input from '../components/Input'
import { useSucursales } from '../hooks/useSucursales'

export default function Contacto() {
  const { sent, sending, error, submit } = useContactForm()
  const { sucursales, loading, error: sucursalesError } = useSucursales()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submit(new FormData(event.currentTarget))
  }

  return <>
    <section className="contact-hero" aria-label="Horarios de atención">
      <div className="contact-hours-banner">
        <div className="contact-hours-banner__header">
          <span className="contact-hours-banner__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2.8a9.2 9.2 0 1 1 0 18.4 9.2 9.2 0 0 1 0-18.4Zm0 2.2a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm.8 2.4h-1.6v6.2l4.7 2.8 0.8-1.3-3.9-2.3V7.4Z" fill="currentColor" />
            </svg>
          </span>
          <h1>HORARIOS DE ATENCIÓN</h1>
        </div>

        <div className="contact-hours-banner__divider" />

        {loading && <p role="status">Cargando sucursales y horarios...</p>}
        {sucursalesError && <p role="alert">{sucursalesError}</p>}
        {!loading && !sucursalesError && sucursales.length === 0 && (
          <p role="status">Próximamente publicaremos nuestras sucursales y horarios.</p>
        )}
        {sucursales.map(sucursal => (
          <div className="contact-hours-banner__row" key={sucursal.id}>
            <span>
              {sucursal.nombre} ({sucursal.ciudad})<br />
              {sucursal.direccion}
              {sucursal.telefono && <><br />Teléfono: {sucursal.telefono}</>}
            </span>
            <strong>{sucursal.horario || 'Horario no informado.'}</strong>
          </div>
        ))}
      </div>
    </section>
    <section className="section contact-layout contact-layout--stacked">
      <div>
        <p className="eyebrow">Contacto</p>
        <h2>Escribinos</h2>
        <p>Consultas, pedidos o lo que necesites. Te respondemos apenas podamos.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Input name="nombre" placeholder="Nombre" aria-label="Nombre" required />
          <Input name="apellido" placeholder="Apellido" aria-label="Apellido" required />
        </div>
        <Input name="email" type="email" placeholder="Email" aria-label="Email" required />
        <textarea name="comentario" placeholder="Tu consulta" aria-label="Tu consulta" rows={5} required />
        {error && <p className="form-message form-message--error" role="alert">{error}</p>}
        {sent && <p className="form-message form-message--success" role="status">Mensaje enviado. Gracias por escribirnos.</p>}
        <button className="button" type="submit" disabled={sending}>
          {sending ? 'Enviando...' : sent ? 'Enviar otra consulta' : 'Enviar mensaje'}
        </button>
      </form>
    </section>
  </>
}
