"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AccountSidebar } from "@/components/layout/AccountSidebar"
import { ProductCard } from "@/components/product/ProductCard"
import { useFavorites } from "@/lib/store/favorites"
import { products } from "@/lib/data/products"
import { Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FavorisPage() {
  const favorites = useFavorites((s) => s.favorites)
  const favProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
            Mes favoris
          </h1>
          {favProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Heart size={48} className="text-[#E5E7EB] mb-4" />
              <p className="text-sm font-medium text-[#1F3A5F] mb-1">Aucun article dans vos favoris</p>
              <p className="text-xs text-[#6B7280] mb-4">Cliquez sur ❤️ sur un article pour le sauvegarder ici</p>
              <Link href="/boutique">
                <Button className="bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px]">Découvrir la boutique</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
