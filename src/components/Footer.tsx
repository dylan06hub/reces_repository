// Pie de página compartido con navegación, horarios y canales de contacto.
export default function Footer() {
  return <footer className="site-footer">
    <div className="site-footer__brand">
      <a className="site-footer__logo" href="/">RESES <span>S.R.L.</span></a>
      <p>Carne elegida para momentos memorables.</p>
      <p className="site-footer__address">Av. Siempreviva 1234<br />Buenos Aires, Argentina</p>
    </div>
    <div className="site-footer__column">
      <strong>Explorar</strong>
      <a href="/">Inicio</a>
      <a href="/nosotros">Nosotros</a>
      <a href="/contacto">Contacto</a>
    </div>
    <div className="site-footer__column">
      <strong>Horarios</strong>
      <p>Lunes a sábado<br /><b>8:00 a 20:00</b></p>
      <p className="site-footer__status"><span />Atencion en el local</p>
    </div>
    <div className="site-footer__column">
      <strong>Hablemos</strong>
      <a href="tel:+5491100000000">+54 9 11 0000 0000</a>
      <a href="mailto:hola@reses.com.ar">hola@reses.com.ar</a>
      <div className="site-footer__socials">
        <a href="https://instagram.com" aria-label="Instagram">IG</a>
        <a href="https://wa.me/5491100000000" aria-label="WhatsApp">WA</a>
      </div>
    </div>
    <div className="site-footer__bottom">
      <span>© 2026 RESES S.R.L.</span>
      <span>Calidad que se comparte.</span>
    </div>
  </footer>
}
