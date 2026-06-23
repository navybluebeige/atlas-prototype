"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ConnexionPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Connexion réussie !", { description: `Bienvenue, ${data.email}` })
    router.push("/compte")
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#F5F0E8] py-12 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#1F3A5F] flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <h1 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
                Bon retour 👋
              </h1>
              <p className="text-xs text-[#6B7280] mt-1">Connectez-vous à votre compte Atlas</p>
            </div>

            {/* Social buttons */}
            <div className="space-y-2 mb-5">
              <button className="w-full h-10 rounded-[8px] border border-[#E5E7EB] flex items-center justify-center gap-3 text-sm text-[#1F3A5F] hover:bg-[#FAFBFC] transition">
                <span className="text-base">G</span> Continuer avec Google
              </button>
              <button className="w-full h-10 rounded-[8px] border border-[#E5E7EB] flex items-center justify-center gap-3 text-sm text-[#1F3A5F] hover:bg-[#FAFBFC] transition">
                <span className="text-base">f</span> Continuer avec Facebook
              </button>
            </div>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E7EB]" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-[#6B7280]">ou</span></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-xs mb-1.5">Email</Label>
                <Input id="email" type="email" {...register("email")} className="rounded-[8px]" placeholder="vous@exemple.com" />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="text-xs mb-1.5">Mot de passe</Label>
                <Input id="password" type="password" {...register("password")} className="rounded-[8px]" placeholder="••••••••" />
                {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[#D97757] hover:text-[#B85942]">Mot de passe oublié ?</button>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm"
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <p className="text-center text-xs text-[#6B7280] mt-5">
              Pas encore de compte ?{" "}
              <Link href="/inscription" className="text-[#1F3A5F] font-medium hover:text-[#D97757]">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
