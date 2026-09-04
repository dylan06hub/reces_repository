import { useContactForm } from '../../hooks/useContactForm'
import Input from '../../components/ui/Input'

export default function Contacto() {
  const { sent, submit } = useContactForm()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); submit(new FormData(event.currentTarget)) }
  return <><section className="page-hero contact-hero"><p className="eyebrow">Estamos para ayudarte</p><h1>Hablemos<br /><em>de carne.</em></h1></section><section className="section contact-layout"><div><p className="eyebrow">Contacto</p><h2>¿Qué podemos preparar para vos?</h2><p>Escribinos y te respondemos a la brevedad.</p><div className="contact-details"><p><strong>Local</strong><br />Av. Siempreviva 1234, Buenos Aires</p><p><strong>Horarios</strong><br />Lunes a sábado, de 8:00 a 20:00</p><p><strong>Teléfono</strong><br />+54 9 11 0000 0000</p></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><Input name="nombre" placeholder="Nombre" required /><Input name="apellido" placeholder="Apellido" required /></div><Input name="email" type="email" placeholder="Email" required /><textarea name="comentario" placeholder="Tu consulta" rows={5} required /><button className="button" type="submit">{sent ? 'Mensaje enviado' : 'Enviar mensaje'}</button></form></section></>
}
