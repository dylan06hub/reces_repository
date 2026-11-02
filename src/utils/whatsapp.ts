// shortcut: número de ejemplo heredado; reemplazar por el WhatsApp comercial antes de publicar.
const WHATSAPP_NUMBER = '5492800000000'

export const getWhatsAppUrl = (productName = '') => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}`
  return productName ? `${url}?text=${encodeURIComponent(`Hola, quiero consultar por: ${productName}`)}` : url
}
