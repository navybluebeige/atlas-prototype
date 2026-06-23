"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { ideas } from "@/lib/data/ideas"
import { products } from "@/lib/data/products"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/product/ProductCard"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import type { Idea } from "@/lib/data/ideas"

const THEMES = ["Tous", "Mariage", "Soirée", "Streetwear", "Classique", "Automne", "Été", "Made in Algeria", "Aïd", "Hiver"]

export default function IdeesPage() {
  const [activeTheme, setActiveTheme] = useState("Tous")
  const [openIdea, setOpenIdea] = useState<Idea | null>(null)

  const filtered = activeTheme === "Tous" ? ideas : ideas.filter((i) => i.theme === activeTheme)

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-[26px] font-medium text-[#1F3A5F] mb-1" style={{ letterSpacing: "-0.5px" }}>
            ✨ Idées & Inspiration
          </h1>
          <p className="text-sm text-[#6B7280]">Laissez-vous inspirer par nos moodboards curatés</p>
        </div>

        {/* Theme filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeTheme === t
                  ? "bg-[#1F3A5F] text-white"
                  : "bg-[#F5F0E8] text-[#6B7280] hover:bg-[#FAE8DC]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {filtered.map((idea) => (
            <button
              key={idea.id}
              onClick={() => setOpenIdea(idea)}
              className="group w-full rounded-[10px] overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow"
              style={{
                aspectRatio: idea.height === "tall" ? "3/5" : idea.height === "medium" ? "4/5" : "5/5",
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${idea.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <p className="text-white text-sm font-medium mb-1">{idea.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs">{idea.productIds.length} articles</span>
                  <div className="flex items-center gap-1 text-white/70">
                    <Heart size={11} />
                    <span className="text-xs">{idea.likes}</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <span className="bg-white/90 text-[#1F3A5F] text-xs font-medium px-2 py-1 rounded-full">Voir →</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Modal */}
      <Dialog open={!!openIdea} onOpenChange={() => setOpenIdea(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[16px]">
          {openIdea && (
            <div>
              <div className={`h-48 rounded-[10px] bg-gradient-to-br ${openIdea.gradient} mb-5`} />
              <DialogTitle className="text-xl font-medium text-[#1F3A5F] mb-1">{openIdea.title}</DialogTitle>
              <p className="text-sm text-[#6B7280] mb-5">{openIdea.description}</p>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[#1F3A5F]">Articles dans ce moodboard</h3>
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <Heart size={13} />
                  <span className="text-xs">{openIdea.likes} j&apos;aime</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {products.filter((p) => openIdea.productIds.includes(p.id)).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  )
}
