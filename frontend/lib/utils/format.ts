export function formatPrice(n: number): string {
  return n.toLocaleString("fr-DZ").replace(/\s/g, " ") + " DA"
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("fr-DZ", { day: "2-digit", month: "long", year: "numeric" })
}

export function generateOrderId(): string {
  const digits = Math.floor(10000 + Math.random() * 90000)
  return `ATL-2026-${digits}`
}
