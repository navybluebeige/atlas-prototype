"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/data/products"
import { ProductCard } from "@/components/product/ProductCard"

const FILTERS = [
  { id: "all", label: "Tous" },
  { id: "new", label: "Nouveautés" },
  { id: "promo", label: "Promos" },
  { id: "custom", label: "Sur-mesure" },
  { id: "made_in_algeria", label: "Made in Algeria" },
]

export function TrendingProducts() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filtered =
    activeFilter === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.badges.includes(activeFilter as never)).slice(0, 8)

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
            Tendances de la semaine
          </h2>
          <Link href="/boutique" className="flex items-center gap-1 text-sm text-[#D97757] font-medium hover:text-[#B85942] transition">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeFilter === f.id
                  ? "bg-[#1F3A5F] text-white"
                  : "bg-[#F5F0E8] text-[#6B7280] hover:bg-[#FAE8DC]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
