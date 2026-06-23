"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, Clock, Package, Truck, ShieldCheck } from "lucide-react"
import { useCart, getTotal } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils/format"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { EscrowBadge } from "@/components/checkout/EscrowBadge"
import { Button } from "@/components/ui/button"

const TIMELINE_STEPS = [
  { label: "Paiement reçu et sécurisé par Atlas", icon: ShieldCheck, status: "done", time: "il y a quelques secondes" },
  { label: "Préparation par le vendeur", icon: Package, status: "pending", time: "En attente" },
  { label: "Expédition de votre commande", icon: Truck, status: "pending", time: "En attente" },
  { label: "Livraison et confirmation", icon: CheckCircle, status: "pending", time: "En attente" },
]

export default function ConfirmationPage() {
  const storeItems = useCart((s) => s.items)
  const storeOrderId = useCart((s) => s.orderId)
  const deliveryMethod = useCart((s) => s.deliveryMethod)
  const paymentMethod = useCart((s) => s.paymentMethod)
  const clearCart = useCart((s) => s.clearCart)
  const [snapshotItems] = useState(storeItems)
  const [snapshotTotal] = useState(() => getTotal(storeItems, deliveryMethod, paymentMethod))
  const [snapshotOrderId] = useState(storeOrderId)

  useEffect(() => {
    const t = setTimeout(() => clearCart(), 100)
    return () => clearTimeout(t)
  }, [])

  const displayOrderId = snapshotOrderId ?? "ATL-2026-00000"

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#F5F0E8] py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success hero */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#16A34A] flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
              <CheckCircle size={32} className="text-[#16A34A]" />
            </div>
            <h1 className="text-[26px] font-medium text-[#1F3A5F] mb-1" style={{ letterSpacing: "-0.4px" }}>
              Commande confirmée !
            </h1>
            <p className="text-base font-medium text-[#D97757]">{displayOrderId}</p>
            <p className="text-sm text-[#6B7280] mt-2 max-w-md mx-auto">
              Merci pour votre confiance. Votre paiement est désormais protégé par Atlas Escrow.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-5">
            <h2 className="text-base font-medium text-[#1F3A5F] mb-4">Suivi de commande</h2>
            <div className="space-y-4">
              {TIMELINE_STEPS.map((step, i) => {
                const Icon = step.icon
                const isDone = step.status === "done"
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDone ? "bg-[#F0FDF4] border border-[#16A34A]" : "bg-[#F5F0E8] border border-[#E5E7EB]"}`}>
                      <Icon size={15} className={isDone ? "text-[#16A34A]" : "text-[#6B7280]"} />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className={`text-sm font-medium ${isDone ? "text-[#1F3A5F]" : "text-[#6B7280]"}`}>{step.label}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {!isDone && <Clock size={11} className="text-[#6B7280]" />}
                        <span className={`text-xs ${isDone ? "text-[#16A34A]" : "text-[#6B7280]"}`}>{step.time}</span>
                      </div>
                    </div>
                    {isDone && <span className="text-xs text-[#16A34A] font-medium">✓ Confirmé</span>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order recap */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-5 space-y-4">
            <h2 className="text-base font-medium text-[#1F3A5F]">Récapitulatif</h2>
            {snapshotItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-[6px] flex-shrink-0 bg-gradient-to-br ${item.gradient}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1F3A5F] line-clamp-1">{item.name}</p>
                  <p className="text-xs text-[#6B7280]">Taille {item.size} · Qté {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-[#1F3A5F]">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-[#E5E7EB] pt-3 flex justify-between">
              <span className="text-sm text-[#6B7280]">Total payé</span>
              <span className="text-base font-medium text-[#1F3A5F]">{formatPrice(snapshotTotal)}</span>
            </div>
            <EscrowBadge variant="compact" />
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/compte/commandes">
              <Button className="w-full bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm">
                Suivre ma commande
              </Button>
            </Link>
            <Link href="/compte/commandes">
              <Button variant="outline" className="w-full rounded-[7px] border-[#1F3A5F] text-[#1F3A5F] h-11 text-sm">
                Voir mes commandes
              </Button>
            </Link>
            <Link href="/boutique">
              <Button variant="ghost" className="w-full rounded-[7px] text-[#6B7280] h-11 text-sm hover:bg-[#FAE8DC]">
                Continuer mes achats
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
