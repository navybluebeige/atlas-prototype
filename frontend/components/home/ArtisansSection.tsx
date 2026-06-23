import Link from "next/link"
import { Scissors, ArrowRight } from "lucide-react"
import { artisans } from "@/lib/data/artisans"
import { ArtisanCard } from "@/components/artisan/ArtisanCard"

export function ArtisansSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scissors size={18} className="text-[#D97757]" />
              <h2 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
                Artisans à découvrir
              </h2>
            </div>
            <p className="text-sm text-[#6B7280]">Des créateurs certifiés qui perpétuent le savoir-faire algérien</p>
          </div>
          <Link href="/artisans" className="flex items-center gap-1 text-sm text-[#D97757] font-medium hover:text-[#B85942] transition">
            Tous les artisans <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {artisans.slice(0, 3).map((a) => (
            <ArtisanCard key={a.id} artisan={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
