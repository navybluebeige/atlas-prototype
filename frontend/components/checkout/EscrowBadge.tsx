import { ShieldCheck, CreditCard, Truck, CheckCircle } from "lucide-react"

interface EscrowBadgeProps {
  variant?: "compact" | "detailed" | "inline"
}

export function EscrowBadge({ variant = "compact" }: EscrowBadgeProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[8px] px-3 py-2">
        <ShieldCheck size={14} className="text-[#16A34A] flex-shrink-0" />
        <span className="text-xs text-[#16A34A] font-medium">
          Paiement protégé par Atlas Escrow · Remboursé si problème
        </span>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-1.5 text-[#16A34A]">
        <ShieldCheck size={13} />
        <span className="text-xs font-medium">Atlas Escrow</span>
      </div>
    )
  }

  return (
    <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <ShieldCheck size={24} className="text-[#16A34A]" />
        <div>
          <p className="text-sm font-medium text-[#16A34A]">Comment fonctionne Atlas Escrow ?</p>
          <p className="text-xs text-[#6B7280]">Votre argent est protégé à chaque étape</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            icon: <CreditCard size={18} className="text-[#1F3A5F]" />,
            title: "Vous payez",
            desc: "L'argent est bloqué par Atlas — le vendeur ne reçoit rien encore.",
          },
          {
            icon: <Truck size={18} className="text-[#1F3A5F]" />,
            title: "Le vendeur expédie",
            desc: "Vous recevez votre commande et vérifiez son état.",
          },
          {
            icon: <CheckCircle size={18} className="text-[#16A34A]" />,
            title: "Vous confirmez",
            desc: "Vous validez la réception — le vendeur reçoit son paiement.",
          },
        ].map((step, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-[8px] p-3 border border-[#BBF7D0]/50">
            <div className="flex-shrink-0 mt-0.5">{step.icon}</div>
            <div>
              <p className="text-xs font-medium text-[#1F3A5F] mb-0.5">{step.title}</p>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-[#6B7280] text-center">
        En cas de problème, vous êtes intégralement remboursé.
      </p>
    </div>
  )
}
