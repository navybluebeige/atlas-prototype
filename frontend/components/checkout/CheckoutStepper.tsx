"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, ShoppingCart, MapPin, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const STEPS = [
  { label: "Panier", href: "/panier", icon: ShoppingCart },
  { label: "Livraison", href: "/checkout/livraison", icon: MapPin },
  { label: "Paiement", href: "/checkout/paiement", icon: CreditCard },
]

export function CheckoutStepper() {
  const pathname = usePathname()
  const currentIdx = STEPS.findIndex((s) => pathname.startsWith(s.href))
  const activeIdx = currentIdx === -1 ? 0 : currentIdx

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < activeIdx
        const active = i === activeIdx
        const Icon = step.icon

        return (
          <div key={step.href} className="flex items-center">
            <div className="flex flex-col items-center">
              {done ? (
                <Link href={step.href}>
                  <div className="w-7 h-7 rounded-full bg-[#1F3A5F] flex items-center justify-center">
                    <Check size={13} className="text-white" />
                  </div>
                </Link>
              ) : (
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium",
                    active
                      ? "bg-[#1F3A5F] text-white"
                      : "bg-[#E5E7EB] text-[#6B7280]"
                  )}
                >
                  {i + 1}
                </div>
              )}
              <span className={cn("text-[10px] mt-1 font-medium", active ? "text-[#1F3A5F]" : done ? "text-[#1F3A5F]" : "text-[#6B7280]")}>
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className={cn("w-16 h-0.5 mb-4 mx-1", i < activeIdx ? "bg-[#1F3A5F]" : "bg-[#E5E7EB]")} />
            )}
          </div>
        )
      })}
    </div>
  )
}
