// Pagina de contacto con informacion del local y formulario de consultas.
import { useContactForm } from '../hooks/useContactForm'
import Input from '../components/Input'

export default function Contacto() {
  const { sent, error, submit } = useContactForm()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit(new FormData(event.currentTarget))
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

        <div className="contact-hours-banner__row">
          <span>Lunes a Sábados (Trelew):</span>
          <strong>09:00 - 13:00 | 17:00 - 21:00</strong>
        </div>

        <div className="contact-hours-banner__row">
          <span>Lunes a Domingos y Feriados provinciales (Rawson):</span>
          <strong>08:30 - 13:30 | 17:00 - 21:00</strong>
        </div>

        <div className="contact-hours-banner__row contact-hours-banner__row--compact">
          <span>Feriados nacionales:</span>
          <strong>09:00 - 13:00 (Solo Rawson)</strong>
        </div>
      </div>
    </section>
    <section className="section contact-layout">
      <div>
        <p className="eyebrow">Contacto</p>
        <h2>¿Que podemos preparar para vos?</h2>
        <p>Escribinos y te respondemos a la brevedad.</p>
        <div className="contact-details">
          <p><strong>Local</strong><br />Av. Siempreviva 1234, Buenos Aires</p>
          <p><strong>Horarios</strong><br />Lunes a sabado, de 8:00 a 20:00</p>
          <p><strong>Telefono</strong><br /><a href="tel:+5491100000000">+54 9 11 0000 0000</a></p>
        </div>
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
        <button className="button" type="submit">{sent ? 'Enviar otra consulta' : 'Enviar mensaje'}</button>
      </form>
    </section>
  </>
}
