import { ShieldCheck, Truck, Scissors, MessageCircle } from "lucide-react"

const items = [
  {
    icon: <ShieldCheck size={20} className="text-[#4ADE80]" />,
    title: "Paiement protégé",
    sub: "Escrow sur chaque commande",
  },
  {
    icon: <Truck size={20} className="text-[#FCD34D]" />,
    title: "Livraison flexible",
    sub: "69 wilayas couvertes",
  },
  {
    icon: <Scissors size={20} className="text-[#C4B5FD]" />,
    title: "Sur-mesure",
    sub: "Artisans certifiés",
  },
  {
    icon: <MessageCircle size={20} className="text-[#FCA5A5]" />,
    title: "Support 24/7",
    sub: "Réponse en moins de 24h",
  },
]

export function TrustStrip() {
  return (
    <section className="bg-[#1F3A5F] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <p className="text-white text-xs font-medium">{item.title}</p>
                <p className="text-white/60 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
