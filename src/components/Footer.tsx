const IconMapPin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Zm0-8.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" fill="currentColor" />
  </svg>
)

const IconPhone = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.35 2.29.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.21.19 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.2Z" fill="currentColor" />
  </svg>
)

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.4 21v-8h2.7l.4-3.2h-3.1V7.2c0-.9.3-1.6 1.7-1.6H17V2.7c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V9.8H7v3.2h2.8v8h3.6Z" fill="currentColor" />
  </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2.1A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Zm5.1-3.1a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" fill="currentColor" />
  </svg>
)

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.1 4.9A9.4 9.4 0 0 0 3.4 15l-1 3.7 3.8-1a9.4 9.4 0 0 0 13-13Zm-9.8 2.3c.2 0 .4 0 .7.1 1 .3 1.6 1.1 1.8 2.2.1.7-.2 1.5-.9 2l-.6.5c-.3.2-.4.4-.3.8.3 1.5 1.9 2.7 3.2 3.1.5.1.7.1 1-.1l.7-.5c.6-.4 1.4-.3 1.9.2l.9.8c.4.4.6.9.6 1.5-.1 1.1-1 1.9-2.1 2.1-.7.1-1.4.2-2.2.2A8.4 8.4 0 0 1 5 16.8a7.9 7.9 0 0 1 4.3-13.6Z" fill="currentColor" />
  </svg>
)

// Pie de página compartido con horarios y canales de contacto.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <div className="footer-brand">
            <img className="logo" src="/logo.png" alt="Logo RESES" />
            <span>RESES S.R.L.</span>
          </div>

          <p>
            La carnicería de confianza elegida por las familias argentinas. Calidad artesanal y servicio impecable de origen a fin.
          </p>

          <div className="footer-socials" aria-label="Redes sociales">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="https://wa.me/5492800000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconWhatsApp />
            </a>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>CONTACTO</h3>
          <div className="footer-contact-item">
            <span className="footer-icon">
              <IconMapPin />
            </span>
            <p>Eva Perón 1340, Trelew-Chubut</p>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">
              <IconPhone />
            </span>
            <p>Por mayor: 2808431430</p>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">
              <IconPhone />
            </span>
            <p>Por menor: 2805013245</p>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>HORARIOS DE ATENCIÓN</h3>
          <div className="footer-hours">
            <p>
              <strong>Lunes a Sábados en Trelew:</strong>
            </p>
            <p>Invierno: 9:00 a 13:00 - 17:00 a 21:00</p>
            <p>Verano: 9:00 a 13:00 - 16:30 a 20:30</p>
            <p>
              <strong>Lunes a Domingos en Rawson:</strong>
            </p>
            <p>Invierno: 9:00 a 13:00 - 17:00 a 21:00</p>
            <p>Verano: 9:00 a 13:00 - 16:30 a 20:30</p>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>MEDIOS DE PAGO</h3>
          <div className="footer-payment-badges" aria-label="Medios de pago">
            <span className="payment-pill payment-pill--mp">Mercado Pago</span>
            <span className="payment-pill payment-pill--orange">Naranja X</span>
            <span className="payment-pill payment-pill--mode">Modo</span>
            <span className="payment-pill payment-pill--uala">Ualá</span>
            <span className="payment-pill payment-pill--transfer">Transferencia</span>
            <span className="payment-pill payment-pill--ars">$ ARS</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 Reses S.R.L. - Todos los derechos reservados. Dirección de Defensa del Consumidor.</p>
        <p>Desarrollado con pasión criolla</p>
      </div>
    </footer>
  )
}
