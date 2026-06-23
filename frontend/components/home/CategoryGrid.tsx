import Link from "next/link"
import {
  Shirt,
  Layers,
  AlignJustify,
  Wind,
  Footprints,
  ShoppingBag,
  Scissors,
  RefreshCw,
  ArrowRight,
} from "lucide-react"
import { categories } from "@/lib/data/categories"

const ICON_MAP: Record<string, React.ReactNode> = {
  Shirt: <Shirt size={24} className="text-white" />,
  Layers: <Layers size={24} className="text-white" />,
  AlignJustify: <AlignJustify size={24} className="text-white" />,
  Wind: <Wind size={24} className="text-white" />,
  Footprints: <Footprints size={24} className="text-white" />,
  ShoppingBag: <ShoppingBag size={24} className="text-white" />,
  Scissors: <Scissors size={24} className="text-white" />,
  RefreshCw: <RefreshCw size={24} className="text-white" />,
}

export function CategoryGrid() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
              Explorer par catégorie
            </h2>
            <p className="text-sm text-[#6B7280] mt-0.5">Trouvez exactement ce que vous cherchez</p>
          </div>
          <Link
            href="/boutique"
            className="flex items-center gap-1 text-sm text-[#D97757] font-medium hover:text-[#B85942] transition"
          >
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/boutique?cat=${cat.id}`}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-full aspect-square rounded-[10px] bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
              >
                {ICON_MAP[cat.icon]}
              </div>
              <span className="text-xs text-[#1F3A5F] font-medium text-center leading-tight line-clamp-2">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
