"use client"

import Link from "next/link"
import { Star, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-12 md:py-16 px-4" style={{ background: "linear-gradient(135deg, #FEF3EC 0%, #FAE8DC 50%, #F5DCC4 100%)" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
        {/* Left */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#FEF3EC] border border-[#D97757]/30 text-[#D97757] text-xs font-medium px-3 py-1.5 rounded-full">
            <Sparkles size={12} />
            Nouveau · Collection automne 2026
          </div>

          <h1 className="text-3xl md:text-4xl font-medium text-[#1F3A5F] leading-tight" style={{ letterSpacing: "-0.6px" }}>
            La mode algérienne,<br />
            <span className="text-[#D97757]">en confiance.</span>
          </h1>

          <p className="text-[#6B7280] text-sm leading-relaxed max-w-md">
            Découvrez des milliers de pièces uniques — kaftans brodés, maroquinerie artisanale, prêt-à-porter moderne.
            Chaque achat est protégé par Atlas Escrow.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/boutique">
              <Button className="bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] px-6 h-11 text-sm font-medium">
                Découvrir la boutique
                <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
            <Link href="/vendre">
              <Button variant="outline" className="rounded-[7px] px-6 h-11 text-sm font-medium border-[#1F3A5F] text-[#1F3A5F] hover:bg-[#F0F4F9]">
                Devenir vendeur
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="fill-[#FACC15] text-[#FACC15]" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#1F3A5F]">4.8/5</span>
            <span className="text-xs text-[#6B7280]">Plus de 50 000 transactions sécurisées</span>
          </div>
        </div>

        {/* Right — visual grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { gradient: "from-[#D97757] to-[#8B4513]", label: "Kaftan brodé main", sub: "Atelier Yasmine" },
            { gradient: "from-[#FACC15] to-[#C4863A]", label: "Bijoux & Accessoires", sub: "Tlemcen Brodé" },
            { gradient: "from-[#1F3A5F] to-[#4A6FA5]", label: "Costume sur-mesure", sub: "Maison Karim" },
            { gradient: "from-[#7C5C3E] to-[#3D2B1F]", label: "Maroquinerie cuir", sub: "Cuir & Co" },
          ].map((card, i) => (
            <div
              key={i}
              className={`relative rounded-[10px] overflow-hidden aspect-square bg-gradient-to-br ${card.gradient} shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-white text-xs font-medium leading-tight">{card.label}</p>
                <p className="text-white/70 text-[10px]">{card.sub}</p>
              </div>
              {i === 0 && (
                <div className="absolute top-2 left-2 bg-[#D97757] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Tendance
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
