"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Building2,
  Edit2,
  Lock,
  Loader2,
  Store,
  Truck,
  Package,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart, getTotal, type PaymentMethod } from "@/lib/store/cart"
import { cardPaymentSchema, type CardPaymentFormData } from "@/lib/validations/checkout"
import { formatPrice } from "@/lib/utils/format"
import { CheckoutHeader } from "@/components/layout/CheckoutHeader"
import { Footer } from "@/components/layout/Footer"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { EscrowBadge } from "@/components/checkout/EscrowBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils/cn"

const PAYMENT_METHODS = [
  {
    id: "cib" as PaymentMethod,
    label: "Carte CIB",
    desc: "Paiement sécurisé par la SATIM",
    logo: <div className="w-10 h-7 rounded bg-[#1F3A5F] flex items-center justify-center"><span className="text-white text-xs font-bold">CIB</span></div>,
  },
  {
    id: "edahabia" as PaymentMethod,
    label: "Carte EDAHABIA",
    desc: "Carte postale Algérie Poste",
    logo: <div className="w-10 h-7 rounded bg-[#FACC15] flex items-center justify-center"><span className="text-[#1F3A5F] text-xs font-bold">ED</span></div>,
  },
  {
    id: "cod" as PaymentMethod,
    label: "Espèces à la livraison",
    desc: "Payez en cash au livreur",
    logo: <div className="w-10 h-7 flex items-center justify-center"><Banknote size={20} className="text-[#16A34A]" /></div>,
    badge: "+200 DA de frais",
  },
  {
    id: "bank_transfer" as PaymentMethod,
    label: "Virement bancaire",
    desc: "Coordonnées envoyées par email — 24–48h",
    logo: <div className="w-10 h-7 flex items-center justify-center"><Building2 size={20} className="text-[#6B7280]" /></div>,
  },
]

const DELIVERY_ICONS: Record<string, React.ReactNode> = {
  pickup: <Store size={14} />,
  home: <Truck size={14} />,
  yalidine: <Package size={14} />,
  click_collect: <Building2 size={14} />,
}

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
}
function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2)
  return digits
}

export default function PaiementPage() {
  const router = useRouter()
  const items = useCart((s) => s.items)
  const deliveryMethod = useCart((s) => s.deliveryMethod)
  const deliveryAddress = useCart((s) => s.deliveryAddress)
  const setPayment = useCart((s) => s.setPayment)
  const generateOrderId = useCart((s) => s.generateOrderId)

  const [mounted, setMounted] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cib")
  const total = getTotal(items, deliveryMethod, selectedPayment)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && (items.length === 0 || !deliveryMethod)) {
      router.replace("/panier")
    }
  }, [mounted, items, deliveryMethod])

  const { register, handleSubmit, setValue, formState: { isValid: cardValid } } = useForm<CardPaymentFormData>({
    resolver: zodResolver(cardPaymentSchema),
    mode: "onChange",
  })

  const needsCard = selectedPayment === "cib" || selectedPayment === "edahabia"
  const canPay = termsAccepted && (!needsCard || cardValid)

  async function onPay() {
    if (!canPay) return
    setPayment(selectedPayment)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    generateOrderId()
    router.push("/checkout/confirmation")
  }

  const deliveryLabel =
    deliveryMethod === "pickup" ? "Point relais" :
    deliveryMethod === "home" ? "Domicile" :
    deliveryMethod === "yalidine" ? "Yalidine" : "Click & Collect"

  return (
    <>
      <CheckoutHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1.6fr_1fr] gap-8">
          <div className="space-y-5">
            <h1 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>Paiement</h1>

            {/* Delivery recap */}
            <div className="bg-[#F0F4F9] border border-[#E5E7EB] rounded-[10px] p-4 flex items-center gap-3">
              <div className="text-[#1F3A5F]">{deliveryMethod && DELIVERY_ICONS[deliveryMethod]}</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#1F3A5F]">{deliveryLabel}</p>
                {deliveryAddress && (
                  <p className="text-xs text-[#6B7280]">{deliveryAddress.address}, {deliveryAddress.wilayaName}</p>
                )}
              </div>
              <Link href="/checkout/livraison" className="flex items-center gap-1 text-xs text-[#D97757]">
                <Edit2 size={11} /> Modifier
              </Link>
            </div>

            {/* Payment methods */}
            <RadioGroup
              value={selectedPayment}
              onValueChange={(v) => setSelectedPayment(v as PaymentMethod)}
              className="space-y-2"
            >
              {PAYMENT_METHODS.map((pm) => {
                const isActive = selectedPayment === pm.id
                return (
                  <label
                    key={pm.id}
                    htmlFor={`pm-${pm.id}`}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-[10px] border cursor-pointer transition",
                      isActive ? "border-[#1F3A5F] bg-[#F0F4F9]" : "border-[#E5E7EB] bg-white hover:bg-[#FAFBFC]"
                    )}
                  >
                    <RadioGroupItem value={pm.id} id={`pm-${pm.id}`} className="sr-only" />
                    {pm.logo}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#1F3A5F]">{pm.label}</p>
                        {isActive && pm.id !== "cod" && <span className="text-[10px] bg-[#16A34A] text-white px-1.5 py-0.5 rounded-full">Recommandé</span>}
                        {pm.badge && <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">{pm.badge}</span>}
                      </div>
                      <p className="text-xs text-[#6B7280] mt-0.5">{pm.desc}</p>
                    </div>
                  </label>
                )
              })}
            </RadioGroup>

            {/* Card form */}
            {needsCard && (
              <form id="card-form" onSubmit={handleSubmit(onPay)} className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <Label htmlFor="cardNumber" className="text-xs mb-1.5">Numéro de carte</Label>
                  <div className="relative">
                    <CreditCard size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <Input
                      id="cardNumber"
                      {...register("cardNumber")}
                      value={cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        setCardNumber(formatted)
                        setValue("cardNumber", formatted.replace(/\s/g, ""), { shouldValidate: true })
                      }}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="pl-9 rounded-[8px]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName" className="text-xs mb-1.5">Nom sur la carte</Label>
                  <Input id="cardName" {...register("cardName")} placeholder="PRÉNOM NOM" className="rounded-[8px] uppercase" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-xs mb-1.5">Date d&apos;expiration</Label>
                    <Input
                      id="expiry"
                      {...register("expiry")}
                      value={expiry}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value)
                        setExpiry(formatted)
                        setValue("expiry", formatted, { shouldValidate: true })
                      }}
                      placeholder="MM/AA"
                      maxLength={5}
                      className="rounded-[8px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-xs mb-1.5">CVV</Label>
                    <Input id="cvv" {...register("cvv")} type="password" placeholder="•••" maxLength={3} className="rounded-[8px]" />
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#F0F4F9] rounded-[8px] p-3">
                  <Lock size={13} className="text-[#1F3A5F] flex-shrink-0" />
                  <p className="text-[11px] text-[#6B7280]">
                    <strong>Prototype</strong> — Aucune donnée bancaire n&apos;est transmise ni stockée. Connexion SSL chiffrée.
                  </p>
                </div>
              </form>
            )}

            {/* Escrow */}
            <EscrowBadge variant="detailed" />

            {/* Terms */}
            <div className="flex items-start gap-3 bg-white border border-[#E5E7EB] rounded-[10px] p-4">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(v) => setTermsAccepted(!!v)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-xs text-[#6B7280] leading-relaxed cursor-pointer">
                J&apos;accepte les{" "}
                <Link href="/a-propos#cgu" className="text-[#1F3A5F] underline">Conditions Générales d&apos;Utilisation</Link>{" "}
                et la{" "}
                <Link href="/a-propos#cgu" className="text-[#1F3A5F] underline">Politique de remboursement Atlas</Link>
              </Label>
            </div>

            {/* Footer buttons */}
            <div className="flex gap-3">
              <Link href="/checkout/livraison">
                <Button variant="outline" className="rounded-[7px] border-[#E5E7EB] text-[#1F3A5F] h-11">
                  <ArrowLeft size={14} className="mr-1.5" /> Retour
                </Button>
              </Link>
              <Button
                onClick={onPay}
                disabled={!canPay || loading}
                className="flex-1 bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm font-medium disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={15} className="animate-spin" />
                    Traitement en cours...
                  </span>
                ) : (
                  `Confirmer et payer ${formatPrice(total)}`
                )}
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
