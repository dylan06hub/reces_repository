// Pie de página compartido con horarios y canales de contacto.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <div className="footer-brand">
            <span className="footer-brand__mark">R</span>
            <span>RESES S.R.L.</span>
          </div>

          <p>
            La carnicería de confianza elegida por las familias argentinas. Calidad artesanal y servicio impecable de origen a fin.
          </p>

          <div className="footer-socials" aria-label="Redes sociales">
            <span aria-hidden="true">◎</span>
            <span aria-hidden="true">f</span>
            <span aria-hidden="true">◌</span>
          </div>
        </div>

        <div className="site-footer__column">
          <h3>CONTACTO</h3>
          <div className="footer-contact-item">
            <span className="footer-icon">◌</span>
            <p>Eva Perón 1340, Trelew-Chubut</p>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">◍</span>
            <p>Por mayor: 2808431430</p>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">◍</span>
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
          <p>Pesos argentinos · Transferencias · Mercado Pago · NaranjaX</p>
          <div className="footer-payments" aria-label="Medios de pago">
            <span>◫</span>
            <span>◫</span>
            <span>◫</span>
            <span>◫</span>
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
