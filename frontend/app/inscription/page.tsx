"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export default function InscriptionPage() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false },
  })

  async function onSubmit(data: RegisterFormData) {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Compte créé avec succès !", { description: `Bienvenue sur Atlas, ${data.fullName}` })
    router.push("/compte")
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#F5F0E8] py-12 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#D97757] flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <h1 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
                Créer votre compte
              </h1>
              <p className="text-xs text-[#6B7280] mt-1">Rejoignez la communauté Atlas</p>
            </div>

            <div className="space-y-2 mb-5">
              <button className="w-full h-10 rounded-[8px] border border-[#E5E7EB] flex items-center justify-center gap-3 text-sm text-[#1F3A5F] hover:bg-[#FAFBFC] transition">
                <span className="text-base">G</span> Continuer avec Google
              </button>
            </div>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E7EB]" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-[#6B7280]">ou</span></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-xs mb-1.5">Nom complet</Label>
                <Input id="fullName" {...register("fullName")} className="rounded-[8px]" placeholder="Prénom Nom" />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-xs mb-1.5">Email</Label>
                <Input id="email" type="email" {...register("email")} className="rounded-[8px]" placeholder="vous@exemple.com" />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs mb-1.5">Téléphone algérien</Label>
                <Input id="phone" {...register("phone")} className="rounded-[8px]" placeholder="0661234567" />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="text-xs mb-1.5">Mot de passe</Label>
                <Input id="password" type="password" {...register("password")} className="rounded-[8px]" placeholder="••••••••" />
                {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="acceptTerms" onCheckedChange={(v) => setValue("acceptTerms", !!v)} className="mt-0.5" />
                <Label htmlFor="acceptTerms" className="text-xs text-[#6B7280] leading-relaxed cursor-pointer">
                  J&apos;accepte les{" "}
                  <Link href="/a-propos#cgu" className="text-[#1F3A5F] underline">CGU</Link>
                  {" "}et la{" "}
                  <Link href="/a-propos#cgu" className="text-[#1F3A5F] underline">politique de confidentialité</Link>
                </Label>
              </div>
              {errors.acceptTerms && <p className="text-[11px] text-red-500">{errors.acceptTerms.message}</p>}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm"
              >
                {isSubmitting ? "Création du compte..." : "Créer mon compte"}
              </Button>
            </form>

            <p className="text-center text-xs text-[#6B7280] mt-5">
              Déjà un compte ?{" "}
              <Link href="/connexion" className="text-[#1F3A5F] font-medium hover:text-[#D97757]">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
