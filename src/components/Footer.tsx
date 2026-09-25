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
  const handleAdminOpen = () => {
    const newWindow = window.open('about:blank', '_blank')

    if (!newWindow) return

    newWindow.document.write(`<!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Admin - Reses S.R.L.</title>
          <style>
            :root {
              --red: #c92f24;
              --red-dark: #8e1f1a;
              --ink: #171514;
              --paper: #fffdf9;
              --line: #ddd6cc;
              --bg: #f3f1ee;
            }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: var(--bg);
              color: var(--ink);
            }
            .admin-page {
              min-height: 100vh;
              display: block;
              background: var(--bg);
              padding: 32px 20px 48px;
            }
            .admin-shell {
              max-width: 1100px;
              margin: 0 auto;
              background: rgba(255,255,255,0.82);
              border: 1px solid #e3ddd5;
              border-radius: 18px;
              box-shadow: 0 16px 32px rgba(0,0,0,0.06);
              padding: 28px;
            }
            .eyebrow {
              margin: 0 0 8px;
              color: var(--red);
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.14em;
              text-transform: uppercase;
            }
            h1 {
              margin: 0 0 12px;
              font-size: clamp(2.2rem, 5vw, 4rem);
              line-height: 1;
              font-family: Georgia, 'Times New Roman', serif;
            }
            p {
              margin: 0;
              color: #4e4b49;
              line-height: 1.6;
            }
            .hero {
              background: linear-gradient(135deg, rgba(28, 27, 27, 0.78), rgba(165, 34, 34, 0.7)), url('/img/carne1.jpeg');
              background-size: cover;
              background-position: center;
              border-radius: 18px;
              padding: 42px 28px;
              margin-bottom: 26px;
              color: white;
            }
            .hero p {
              color: rgba(255,255,255,0.9);
              max-width: 700px;
            }
            .layout {
              display: grid;
              grid-template-columns: 1.2fr 0.8fr;
              gap: 22px;
            }
            .card {
              background: rgba(255,255,255,0.9);
              border: 1px solid #e6dfd9;
              border-radius: 18px;
              padding: 22px;
            }
            form {
              display: grid;
              gap: 16px;
            }
            .row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
            }
            label {
              display: grid;
              gap: 8px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: #403d3c;
            }
            input, textarea {
              width: 100%;
              border: 1px solid #d9d0c7;
              border-radius: 12px;
              padding: 12px 14px;
              font-size: 15px;
              color: #1a1a1a;
              background: white;
            }
            textarea {
              min-height: 110px;
              resize: vertical;
            }
            .check {
              display: flex;
              align-items: center;
              gap: 10px;
              text-transform: none;
              letter-spacing: 0;
              font-weight: 600;
            }
            .check input { width: 18px; height: 18px; }
            .button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: var(--red);
              color: white;
              border: none;
              border-radius: 999px;
              padding: 12px 18px;
              width: fit-content;
              font-weight: 800;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              cursor: pointer;
            }
            .preview-box {
              display: grid;
              gap: 16px;
            }
            .product-card {
              border: 1px solid #eae2db;
              background: white;
              border-radius: 12px;
              overflow: hidden;
            }
            .product-image {
              height: 170px;
              background: #eee;
            }
            .product-image img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            .product-info {
              padding: 14px 14px 16px;
            }
            .product-info h3 {
              margin: 0 0 8px;
              font-size: 18px;
            }
            .product-info p {
              font-size: 12px;
              color: #7b756f;
            }
            .price {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-top: 10px;
            }
            .price strong {
              color: var(--red);
              font-size: 18px;
            }
            .badge {
              display: inline-block;
              background: var(--red);
              color: white;
              font-size: 10px;
              padding: 6px 10px;
              border-radius: 999px;
              font-weight: 800;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }
            .badge-wrap { margin-bottom: 10px; }
            @media (max-width: 760px) {
              .layout, .row { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="admin-page">
            <div class="admin-shell">
              <div class="hero">
                <p class="eyebrow">Panel administrativo</p>
                <h1>Cargar nuevo producto</h1>
                <p>Agregá cortes nuevos al catálogo para mantener tu sección de productos actualizada con la misma identidad visual de la marca.</p>
              </div>

              <div class="layout">
                <div class="card">
                  <form>
                    <div class="row">
                      <label>Nombre<input value="Nuevo producto" /></label>
                      <label>Precio<input value="15000" /></label>
                    </div>
                    <div class="row">
                      <label>Precio anterior<input value="18000" /></label>
                      <label>URL de imagen<input value="/img/carne1.jpeg" /></label>
                    </div>
                    <label>Descripción<textarea>Corte premium disponible para entrega inmediata.</textarea></label>
                    <label class="check"><input type="checkbox" checked /> Mostrar badge de oferta</label>
                    <button class="button" type="button">Guardar producto</button>
                  </form>
                </div>

                <div class="card preview-box">
                  <div>
                    <p class="eyebrow">Vista previa</p>
                    <h2 style="margin:0; font-size:2rem; font-family: Georgia, 'Times New Roman', serif;">Tarjeta del producto</h2>
                  </div>
                  <div class="product-card">
                    <div class="product-image"><img src="/img/carne1.jpeg" alt="Producto" /></div>
                    <div class="product-info">
                      <div class="badge-wrap"><span class="badge">Oferta</span></div>
                      <h3>Nuevo producto</h3>
                      <p>Corte premium disponible para entrega inmediata.</p>
                      <div class="price"><strong>$15.000</strong><span>/kg</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `)
    newWindow.document.close()
  }

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

          <button type="button" className="footer-admin-button" onClick={handleAdminOpen}>
            Admin
          </button>
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
