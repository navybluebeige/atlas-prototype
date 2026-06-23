import { z } from "zod"

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\s/g, "")
  if (!/^\d{16}$/.test(digits)) return false
  let sum = 0
  let shouldDouble = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i])
    if (shouldDouble) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

function isFutureDate(val: string): boolean {
  const [mm, yy] = val.split("/")
  if (!mm || !yy) return false
  const month = parseInt(mm)
  const year = 2000 + parseInt(yy)
  const now = new Date()
  const expiry = new Date(year, month - 1, 1)
  return expiry > now
}

export const addressSchema = z.object({
  fullName: z.string().min(3, "Nom trop court (min. 3 caractères)"),
  phone: z
    .string()
    .regex(/^(0|\+213)[5-7][0-9]{8}$/, "Numéro de téléphone algérien invalide (ex: 0661234567)"),
  wilayaId: z.number().int().min(1).max(69),
  wilayaName: z.string().min(1),
  commune: z.string().min(2, "Veuillez sélectionner une commune"),
  address: z.string().min(10, "Adresse trop courte (min. 10 caractères)"),
  postalCode: z
    .string()
    .refine((v) => !v || /^\d{5}$/.test(v), "Code postal à 5 chiffres")
    .optional(),
})

export type AddressFormData = z.infer<typeof addressSchema>

export const cardPaymentSchema = z.object({
  cardNumber: z
    .string()
    .refine((v) => luhnCheck(v), "Numéro de carte invalide"),
  cardName: z.string().min(3, "Nom trop court"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/AA requis")
    .refine(isFutureDate, "La date d'expiration est dépassée"),
  cvv: z.string().regex(/^\d{3}$/, "CVV à 3 chiffres"),
})

export type CardPaymentFormData = z.infer<typeof cardPaymentSchema>
