const EUR = new Intl.NumberFormat('es-ES' , {style: 'currency', currency: 'EUR'})

export function formatCents(cents = 0) {
  return EUR.format((cents || 0) / 100)
}
