import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper"

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1F3A5F] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">A</span>
          </div>
          <span className="text-[#1F3A5F] text-base font-semibold hidden sm:block">ATLAS</span>
        </Link>

        <CheckoutStepper />

        <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-medium">
          <ShieldCheck size={14} />
          <span className="hidden sm:block">Paiement protégé Atlas</span>
        </div>
      </div>
    </header>
  )
}
