export const dynamic = 'force-dynamic';

// Le reste de votre code actuel en dessous...

import { notFound } from "next/navigation"
import Link from "next/link"
import { Star, MapPin, ShieldCheck, Clock, Package, ArrowLeft } from "lucide-react"
import { artisans } from "@/lib/data/artisans"
import { products } from "@/lib/data/products"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/product/ProductCard"

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const artisan = artisans.find((a) => a.id === id)
  if (!artisan) notFound()

  const artisanProducts = products.filter((p) => p.sellerId === artisan.id)

  return (
    <>
      <Header />
      <main>
        {/* Banner */}
        <div className={`h-48 bg-gradient-to-br ${artisan.gradient}`} />

        <div className="max-w-5xl mx-auto px-4">
          {/* Avatar */}
          <div className="relative -mt-12 mb-4">
            <div className={`w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br ${artisan.gradient} shadow-md`} />
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
                  {artisan.name}
                </h1>
                {artisan.verified && (
                  <div className="flex items-center gap-1 bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded-full">
                    <ShieldCheck size={12} className="text-[#16A34A]" />
                    <span className="text-[10px] text-[#16A34A] font-medium">Vérifié</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-[#6B7280]">{artisan.specialty}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin size={12} className="text-[#6B7280]" />
                <span className="text-xs text-[#6B7280]">{artisan.city}, {artisan.wilaya}</span>
              </div>
            </div>

            <div className="flex gap-4 text-center">
              <div>
                <p className="text-xl font-medium text-[#1F3A5F]">{artisan.salesCount}</p>
                <p className="text-xs text-[#6B7280]">Ventes</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-[#FACC15] text-[#FACC15]" />
                  <p className="text-xl font-medium text-[#1F3A5F]">{artisan.rating}</p>
                </div>
                <p className="text-xs text-[#6B7280]">Note</p>
              </div>
              <div>
                <p className="text-xl font-medium text-[#1F3A5F]">{artisan.since}</p>
                <p className="text-xs text-[#6B7280]">Depuis</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-5 mb-8">
            <h2 className="text-sm font-medium text-[#1F3A5F] mb-2">À propos</h2>
            <p className="text-sm text-[#6B7280] leading-relaxed">{artisan.bio}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Clock size={12} />
                <span>Répond {artisan.responseTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Package size={12} />
                <span>{artisanProducts.length} articles en ligne</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <h2 className="text-[18px] font-medium text-[#1F3A5F] mb-4" style={{ letterSpacing: "-0.3px" }}>
            Articles de {artisan.name}
          </h2>
          {artisanProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {artisanProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-sm text-[#6B7280] mb-12">Aucun article disponible pour le moment.</p>
          )}

          {/* Reviews */}
          <h2 className="text-[18px] font-medium text-[#1F3A5F] mb-4" style={{ letterSpacing: "-0.3px" }}>
            Avis clients
          </h2>
          <div className="space-y-3 mb-12">
            {[
              { author: "Rania B.", rating: 5, text: "Travail remarquable, dépasse toutes mes attentes. Je recommande vivement !", date: "Mai 2026" },
              { author: "Mehdi K.", rating: 5, text: "Qualité professionnelle, communication parfaite tout au long de la commande.", date: "Avril 2026" },
              { author: "Fatima Z.", rating: 4, text: "Très belle réalisation, délai légèrement dépassé mais ça vaut le coup d'attendre.", date: "Mars 2026" },
            ].map((r, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-[10px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#F5F0E8] flex items-center justify-center text-xs font-medium text-[#1F3A5F]">
                    {r.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#1F3A5F]">{r.author}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={9} className="fill-[#FACC15] text-[#FACC15]" />)}
                      <span className="text-[10px] text-[#6B7280]">{r.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280]">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
