import Link from "next/link"
import { Star, MapPin, ShieldCheck } from "lucide-react"
import { products } from "@/lib/data/products"
import type { Artisan } from "@/lib/data/artisans"

export function ArtisanCard({ artisan }: { artisan: Artisan }) {
  const artisanProducts = products.filter((p) => artisan.productIds.includes(p.id)).slice(0, 3)

  return (
    <Link href={`/artisans/${artisan.id}`} className="group block">
      <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${artisan.gradient} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-[#1F3A5F] truncate">{artisan.name}</p>
              {artisan.verified && (
                <ShieldCheck size={13} className="text-[#16A34A] flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-[#6B7280]">{artisan.specialty}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-[#6B7280]" />
              <span className="text-[10px] text-[#6B7280]">{artisan.city}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-[#FACC15] text-[#FACC15]" />
            <span className="text-xs font-medium text-[#1F3A5F]">{artisan.rating}</span>
          </div>
          <span className="text-[10px] text-[#6B7280]">{artisan.salesCount} ventes</span>
          <span className="text-[10px] text-[#6B7280]">Depuis {artisan.since}</span>
        </div>

        {/* Mini products */}
        <div className="grid grid-cols-3 gap-1.5">
          {artisanProducts.map((p) => (
            <div
              key={p.id}
              className={`aspect-square rounded-[6px] bg-gradient-to-br ${p.gradient}`}
            />
          ))}
        </div>

        <div className="mt-3 text-center">
          <span className="text-xs text-[#D97757] font-medium group-hover:text-[#B85942] transition">
            Voir la boutique →
          </span>
        </div>
      </div>
    </Link>
  )
}
