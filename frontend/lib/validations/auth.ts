import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court (min. 6 caractères)"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  fullName: z.string().min(3, "Nom trop court"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(/^(0|\+213)[5-7][0-9]{8}$/, "Numéro algérien invalide"),
  password: z.string().min(8, "Mot de passe trop court (min. 8 caractères)"),
  acceptTerms: z.boolean().refine((v) => v, "Vous devez accepter les CGU"),
})

export type RegisterFormData = z.infer<typeof registerSchema>
