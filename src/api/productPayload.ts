export type ProductForm = {
  name: string
  price: string
  previousPrice: string
  offer: boolean
  description: string
}

export const buildProductBody = (form: ProductForm, imageFile: File | null, removeImage: boolean) => {
  const payload = {
    nombre: form.name.trim() || 'Nuevo producto',
    precio: Number(form.price) || 0,
    previousPrice: form.previousPrice ? Number(form.previousPrice) : null,
    offer: form.offer,
    descripcion: form.description.trim() || 'Corte seleccionado',
  }

  if (imageFile) {
    const data = new FormData()
    for (const [key, value] of Object.entries(payload)) {
      data.append(key, value === null ? '' : String(value))
    }
    data.append('imagen_upload', imageFile)
    return data
  }

  // Omitir el campo conserva la imagen; null solicita quitarla al guardar.
  return JSON.stringify(removeImage ? { ...payload, imagen_upload: null } : payload)
}
