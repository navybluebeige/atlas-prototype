"use client"

import Link from "next/link"
import { useCart, getSubtotal, getDeliveryFee, getAtlasProtection, getCodFee, getTotal } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils/format"
import { EscrowBadge } from "@/components/checkout/EscrowBadge"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface OrderSummaryProps {
  variant?: "cart" | "checkout"
  ctaLabel?: string
  onCta?: () => void
  ctaDisabled?: boolean
  ctaLoading?: boolean
}

export function OrderSummary({
  variant = "cart",
  ctaLabel,
  onCta,
  ctaDisabled,
  ctaLoading,
}: OrderSummaryProps) {
  const items = useCart((s) => s.items)
  const deliveryMethod = useCart((s) => s.deliveryMethod)
  const paymentMethod = useCart((s) => s.paymentMethod)
  const subtotal = getSubtotal(items)
  const deliveryFee = getDeliveryFee(deliveryMethod)
  const atlasProtection = getAtlasProtection(subtotal)
  const codFee = getCodFee(paymentMethod)
  const total = getTotal(items, deliveryMethod, paymentMethod)

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 space-y-4">
      <h3 className="text-base font-medium text-[#1F3A5F]">Récapitulatif</h3>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-[#6B7280]">Sous-total</span>
          <span className="font-medium text-[#1F3A5F]">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#6B7280]">Livraison</span>
          {deliveryMethod ? (
            <span className="font-medium text-[#1F3A5F]">
              {deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}
            </span>
          ) : (
            <span className="text-xs text-[#6B7280] italic">Calculée à l&apos;étape suivante</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1 text-[#6B7280] cursor-help">
                  Atlas Protection (5%)
                  <Info size={12} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                La commission Atlas couvre la protection Escrow, l&apos;assurance litiges et le support client.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-medium text-[#1F3A5F]">{formatPrice(atlasProtection)}</span>
        </div>

        {codFee > 0 && (
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Frais espèces</span>
            <span className="font-medium text-orange-500">+{formatPrice(codFee)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-[#E5E7EB] pt-3 flex justify-between items-baseline">
        <span className="text-sm font-medium text-[#1F3A5F]">Total estimé</span>
        <span className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
          {formatPrice(total)}
        </span>
      </div>

      <EscrowBadge variant="compact" />

      {ctaLabel && (
        <Button
          onClick={onCta}
          disabled={ctaDisabled || ctaLoading}
          className="w-full bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {ctaLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Traitement...
            </span>
          ) : (
            ctaLabel
          )}
        </Button>
      )}

      {variant === "cart" && (
        <Link href="/checkout/livraison">
          <Button className="w-full bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm font-medium">
            Passer à la livraison →
          </Button>
        </Link>
      )}
    </div>
  )
}
