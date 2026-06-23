import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "5%", label: "Commission seulement" },
  { value: "69", label: "Wilayas couvertes" },
  { value: "2 min", label: "Pour publier un article" },
  { value: "100%", label: "Paiements garantis" },
]

export function SellerCTA() {
  return (
    <section className="py-12 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1F3A5F 0%, #0F1F33 100%)" }}>
      {/* Decorative circle */}
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#D97757]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-10 items-center relative">
        {/* Left */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            Pour les vendeurs
          </div>
          <h2 className="text-[22px] font-medium text-white leading-snug" style={{ letterSpacing: "-0.4px" }}>
            Vendez en quelques clics,<br />encaissez en confiance.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-md">
            Rejoignez des milliers de vendeurs algériens sur Atlas. Commission réduite, paiement garanti par Escrow, déploiement en 2 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/vendre">
              <Button className="bg-white text-[#1F3A5F] hover:bg-white/90 rounded-[7px] px-6 h-10 text-sm font-medium">
                Commencer à vendre
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </Link>
            <Link href="/comment-ca-marche">
              <Button variant="outline" className="rounded-[7px] px-6 h-10 text-sm font-medium border-white/40 text-white hover:bg-white/10 bg-transparent">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>

        {/* Right — stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-[10px] p-4"
              style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
            >
              <p className="text-2xl font-medium text-white mb-1" style={{ letterSpacing: "-0.4px" }}>
                {s.value}
              </p>
              <p className="text-white/60 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
