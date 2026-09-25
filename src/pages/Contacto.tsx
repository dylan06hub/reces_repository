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
    <section className="page-hero contact-hero">
      <p className="eyebrow">Estamos para ayudarte</p>
      <h1>Hablemos<br /><em>de carne.</em></h1>
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
