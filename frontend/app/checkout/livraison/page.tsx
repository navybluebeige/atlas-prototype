"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Store, Truck, Package, Building2, ArrowLeft, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart, type DeliveryMethod } from "@/lib/store/cart"
import { addressSchema, type AddressFormData } from "@/lib/validations/checkout"
import { wilayas } from "@/lib/data/wilayas"
import { getCommunesByWilaya } from "@/lib/data/communes"
import { pickupPoints } from "@/lib/data/pickup-points"
import { CheckoutHeader } from "@/components/layout/CheckoutHeader"
import { Footer } from "@/components/layout/Footer"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils/cn"

const DELIVERY_OPTIONS = [
  { id: "pickup" as DeliveryMethod, label: "Point relais Atlas", icon: Store, price: 300, delay: "2–3 jours", desc: "" },
  { id: "home" as DeliveryMethod, label: "Livraison à domicile", icon: Truck, price: 600, delay: "1–2 jours", desc: "Alger / Oran / Constantine", highlight: true },
  { id: "yalidine" as DeliveryMethod, label: "Yalidine Express", icon: Package, price: 450, delay: "3–5 jours", desc: "" },
  { id: "click_collect" as DeliveryMethod, label: "Click & Collect", icon: Building2, price: 0, delay: "Aujourd'hui", desc: "" },
]

export default function LivraisonPage() {
  const router = useRouter()
  const items = useCart((s) => s.items)
  const setDelivery = useCart((s) => s.setDelivery)
  const setAddress = useCart((s) => s.setAddress)
  const setPickupPoint = useCart((s) => s.setPickupPoint)
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<DeliveryMethod>("home")
  const [selectedWilayaId, setSelectedWilayaId] = useState<number>(16)
  const [selectedPickup, setSelectedPickup] = useState<string>("")

  const communes = getCommunesByWilaya(selectedWilayaId)

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { wilayaId: 16, wilayaName: "Alger" },
    mode: "onChange",
  })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && items.length === 0) router.replace("/panier")
  }, [mounted, items])

  function onSubmit(data: AddressFormData) {
    setDelivery(selected)
    if (selected === "home" || selected === "yalidine") {
      setAddress(data)
    } else if (selected === "pickup" && selectedPickup) {
      setPickupPoint(selectedPickup)
    }
    router.push("/checkout/paiement")
  }

  const needsAddress = selected === "home" || selected === "yalidine"
  const canContinue = selected === "click_collect" || (selected === "pickup" && selectedPickup !== "") || (needsAddress && isValid)

  return (
    <>
      <CheckoutHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1.6fr_1fr] gap-8">
          <div>
            <h1 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
              Mode de livraison
            </h1>

            {/* Delivery options */}
            <RadioGroup value={selected} onValueChange={(v) => setSelected(v as DeliveryMethod)} className="space-y-3 mb-6">
              {DELIVERY_OPTIONS.map((opt) => {
                const Icon = opt.icon
                const isActive = selected === opt.id
                return (
                  <label
                    key={opt.id}
                    htmlFor={opt.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-[10px] border cursor-pointer transition",
                      isActive ? "border-[#1F3A5F] bg-[#F0F4F9]" : "border-[#E5E7EB] bg-white hover:bg-[#FAFBFC]"
                    )}
                  >
                    <RadioGroupItem value={opt.id} id={opt.id} className="sr-only" />
                    <div className={cn("w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0", isActive ? "bg-[#1F3A5F]" : "bg-[#F5F0E8]")}>
                      <Icon size={18} className={isActive ? "text-white" : "text-[#6B7280]"} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#1F3A5F]">{opt.label}</p>
                        {opt.highlight && (
                          <span className="text-[10px] bg-[#D97757] text-white px-1.5 py-0.5 rounded-full">Rapide</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock size={11} className="text-[#6B7280]" />
                        <span className="text-xs text-[#6B7280]">{opt.delay}</span>
                        {opt.desc && <span className="text-xs text-[#6B7280]">· {opt.desc}</span>}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#1F3A5F] flex-shrink-0">
                      {opt.price === 0 ? "Gratuit" : `${opt.price} DA`}
                    </div>
                  </label>
                )
              })}
            </RadioGroup>

            {/* Dynamic section */}
            {needsAddress && (
              <form id="address-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white border border-[#E5E7EB] rounded-[10px] p-5">
                <h2 className="text-base font-medium text-[#1F3A5F]">Adresse de livraison</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="fullName" className="text-xs mb-1.5">Nom complet</Label>
                    <Input id="fullName" {...register("fullName")} className="rounded-[8px]" placeholder="Prénom Nom" />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="phone" className="text-xs mb-1.5">Téléphone</Label>
                    <Input id="phone" {...register("phone")} className="rounded-[8px]" placeholder="0661234567" />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Label className="text-xs mb-1.5">Wilaya</Label>
                    <Select
                      defaultValue="16"
                      onValueChange={(v) => {
                        const id = parseInt(v)
                        setSelectedWilayaId(id)
                        const wilaya = wilayas.find((w) => w.id === id)
                        setValue("wilayaId", id)
                        setValue("wilayaName", wilaya?.name ?? "")
                        setValue("commune", "")
                      }}
                    >
                      <SelectTrigger className="rounded-[8px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {wilayas.map((w) => (
                          <SelectItem key={w.id} value={String(w.id)}>{w.code} — {w.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs mb-1.5">Commune</Label>
                    <Select onValueChange={(v) => setValue("commune", v, { shouldValidate: true })}>
                      <SelectTrigger className="rounded-[8px]"><SelectValue placeholder="Choisir..." /></SelectTrigger>
                      <SelectContent>
                        {communes.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.commune && <p className="text-[11px] text-red-500 mt-1">{errors.commune.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address" className="text-xs mb-1.5">Adresse complète</Label>
                    <Textarea id="address" {...register("address")} className="rounded-[8px] resize-none" placeholder="Numéro, rue, quartier..." rows={2} />
                    {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-xs mb-1.5">Code postal <span className="text-[#6B7280]">(optionnel)</span></Label>
                    <Input id="postalCode" {...register("postalCode")} className="rounded-[8px]" placeholder="16000" maxLength={5} />
                  </div>
                </div>
              </form>
            )}

            {selected === "pickup" && (
              <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 space-y-3">
                <h2 className="text-base font-medium text-[#1F3A5F]">Choisir un point relais</h2>
                <RadioGroup value={selectedPickup} onValueChange={setSelectedPickup} className="space-y-2">
                  {pickupPoints.map((pp) => (
                    <label key={pp.id} htmlFor={pp.id} className={cn(
                      "flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition",
                      selectedPickup === pp.id ? "border-[#1F3A5F] bg-[#F0F4F9]" : "border-[#E5E7EB] hover:bg-[#FAFBFC]"
                    )}>
                      <RadioGroupItem value={pp.id} id={pp.id} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1F3A5F]">{pp.name}</p>
                        <p className="text-xs text-[#6B7280]">{pp.neighborhood} · {pp.hours}</p>
                      </div>
                      <span className="text-xs text-[#6B7280]">{pp.distance}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {selected === "click_collect" && (
              <div className="bg-[#F0F4F9] border border-[#1F3A5F]/20 rounded-[10px] p-5 space-y-2">
                <h2 className="text-base font-medium text-[#1F3A5F]">Adresse du vendeur</h2>
                <p className="text-sm text-[#1F3A5F]">Atelier Yasmine</p>
                <p className="text-xs text-[#6B7280]">12 rue Didouche Mourad, Alger Centre</p>
                <p className="text-xs text-[#6B7280]">Dim–Jeu : 9h–18h · Vendredi : fermé</p>
                <p className="text-xs text-[#6B7280]">Tél : 0661 23 45 67</p>
                <button className="text-xs text-[#D97757] font-medium mt-1">📍 Voir l'itinéraire</button>
              </div>
            )}

            {/* Footer buttons */}
            <div className="flex gap-3 mt-6">
              <Link href="/panier">
                <Button variant="outline" className="rounded-[7px] border-[#E5E7EB] text-[#1F3A5F] h-11">
                  <ArrowLeft size={14} className="mr-1.5" /> Retour au panier
                </Button>
              </Link>
              <Button
                form={needsAddress ? "address-form" : undefined}
                type={needsAddress ? "submit" : "button"}
                onClick={!needsAddress ? () => {
                  setDelivery(selected)
                  if (selected === "pickup") setPickupPoint(selectedPickup)
                  router.push("/checkout/paiement")
                } : undefined}
                disabled={!canContinue}
                className="flex-1 bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm disabled:opacity-50"
              >
                Continuer vers le paiement →
              </Button>
            </div>
          </div>

          <div className="md:sticky md:top-24 h-fit">
            <OrderSummary variant="checkout" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
