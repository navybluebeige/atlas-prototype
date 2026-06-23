"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AccountSidebar } from "@/components/layout/AccountSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ParametresPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <AccountSidebar />
        <div className="flex-1 space-y-6">
          <h1 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
            Paramètres
          </h1>

          {/* Personal info */}
          <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5">
            <h2 className="text-base font-medium text-[#1F3A5F] mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs mb-1.5">Prénom</Label>
                <Input defaultValue="Yasmine" className="rounded-[8px]" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Nom</Label>
                <Input defaultValue="Aidouni" className="rounded-[8px]" />
              </div>
              <div className="col-span-2">
                <Label className="text-xs mb-1.5">Email</Label>
                <Input defaultValue="yasmine@demo.dz" type="email" className="rounded-[8px]" />
              </div>
              <div className="col-span-2">
                <Label className="text-xs mb-1.5">Téléphone</Label>
                <Input defaultValue="0661 23 45 67" className="rounded-[8px]" />
              </div>
            </div>
            <Button onClick={() => toast.success("Informations sauvegardées")} className="mt-4 bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-9 text-sm">
              Sauvegarder
            </Button>
          </div>

          {/* Password */}
          <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5">
            <h2 className="text-base font-medium text-[#1F3A5F] mb-4">Changer le mot de passe</h2>
            <div className="space-y-3 max-w-md">
              <div>
                <Label className="text-xs mb-1.5">Mot de passe actuel</Label>
                <Input type="password" placeholder="••••••••" className="rounded-[8px]" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Nouveau mot de passe</Label>
                <Input type="password" placeholder="••••••••" className="rounded-[8px]" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Confirmer le nouveau mot de passe</Label>
                <Input type="password" placeholder="••••••••" className="rounded-[8px]" />
              </div>
            </div>
            <Button onClick={() => toast.success("Mot de passe mis à jour")} className="mt-4 bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-9 text-sm">
              Mettre à jour
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
