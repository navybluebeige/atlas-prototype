"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Heart, Star, MapPin, MessageCircle, ChevronDown, Minus, Plus, Truck, Package, Store,
} from "lucide-react"
import { useCart } from "@/lib/store/cart"
import { useFavorites } from "@/lib/store/favorites"
import { formatPrice } from "@/lib/utils/format"
import { EscrowBadge } from "@/components/checkout/EscrowBadge"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next/navigation"
import { products } from "@/lib/data/products"
import type { Product } from "@/lib/data/products"

const BADGE_LABELS: Record<string, { label: string; color: string }> = {
  custom: { label: "Sur-mesure", color: "bg-[#D97757] text-white" },
  promo: { label: "Promo", color: "bg-orange-500 text-white" },
  new: { label: "Nouveau", color: "bg-[#1F3A5F] text-white" },
  used: { label: "2nde main", color: "bg-[#16A34A] text-white" },
  verified: { label: "Vérifié ✓", color: "bg-[#16A34A] text-white" },
  made_in_algeria: { label: "🇩🇿 Made in Algeria", color: "bg-[#1F3A5F] text-white" },
}

export function ProductClient({ product }: { product: Product }) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const addItem = useCart((s) => s.addItem)
  const toggle = useFavorites((s) => s.toggle)
  const isFav = useFavorites((s) => s.favorites.includes(product.id))

  const similar = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const mockImages = Array.from({ length: Math.min(product.images, 4) }, (_, i) => i)
  const discountPct = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      gradient: product.gradient,
      size: selectedSize,
      quantity: qty,
      sellerName: product.sellerName,
      sellerCity: product.city,
      sellerType: product.sellerType,
      badges: product.badges,
    })
    toast.success("Ajouté au panier !", {
      description: `${product.name} — Taille ${selectedSize}`,
      action: { label: "Voir le panier", onClick: () => router.push("/panier") },
    })
  }

  function handleBuyNow() {
    handleAddToCart()
    router.push("/panier")
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#1F3A5F]">Accueil</Link>
        <span>/</span>
        <Link href="/boutique" className="hover:text-[#1F3A5F]">Boutique</Link>
        <span>/</span>
        <span className="text-[#1F3A5F]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="space-y-3">
          <div className={`relative aspect-square rounded-[10px] overflow-hidden bg-gradient-to-br ${product.gradient}`}>
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.badges.slice(0, 2).map((badge) =>
                BADGE_LABELS[badge] ? (
                  <span key={badge} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${BADGE_LABELS[badge].color}`}>
                    {BADGE_LABELS[badge].label}
                  </span>
                ) : null
              )}
            </div>
            <button
              onClick={() => {
                toggle(product.id)
                toast(isFav ? "Retiré des favoris" : "Ajouté aux favoris", { icon: isFav ? "💔" : "❤️" })
              }}
              aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition"
            >
              <Heart size={16} className={cn(isFav ? "fill-red-500 text-red-500" : "text-[#6B7280]")} />
            </button>
            {activeImage > 0 && <div className="absolute inset-0 bg-black/10" />}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mockImages.map((i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "aspect-square rounded-[8px] overflow-hidden bg-gradient-to-br transition border-2",
                  product.gradient,
                  activeImage === i ? "border-[#1F3A5F]" : "border-transparent opacity-60 hover:opacity-90"
                )}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <h1 className="text-[26px] font-medium text-[#1F3A5F] leading-tight mb-1" style={{ letterSpacing: "-0.4px" }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={`/artisans/${product.sellerId}`} className="text-sm italic text-[#1F3A5F] hover:text-[#D97757] transition">
                {product.sellerName}
              </Link>
              <span className="text-[#E5E7EB]">·</span>
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-[#6B7280]" />
                <span className="text-xs text-[#6B7280]">{product.city}</span>
              </div>
              <span className="text-[#E5E7EB]">·</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-[#FACC15] text-[#FACC15]" />
                <span className="text-xs font-medium text-[#1F3A5F]">{product.rating}</span>
                <span className="text-xs text-[#6B7280]">({product.reviewCount} avis)</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-[26px] font-medium text-[#1F3A5F]">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-base text-[#6B7280] line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {discountPct && <span className="text-sm text-orange-500 font-medium">-{discountPct}%</span>}
          </div>

          <EscrowBadge variant="compact" />

          {/* Sizes */}
          <div>
            <p className="text-sm font-medium text-[#1F3A5F] mb-2">Taille</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-11 h-11 rounded-[8px] text-sm font-medium border transition",
                    selectedSize === size
                      ? "border-[#1F3A5F] bg-[#1F3A5F] text-white"
                      : "border-[#E5E7EB] text-[#1F3A5F] hover:border-[#1F3A5F]"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium text-[#1F3A5F] mb-2">Quantité</p>
            <div className="flex items-center gap-1 w-fit border border-[#E5E7EB] rounded-[8px] overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Moins" className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F5F0E8] transition">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium text-[#1F3A5F]">{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Plus" className="w-9 h-9 flex items-center justify-center text-[#6B7280] hover:bg-[#F5F0E8] transition">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleBuyNow} className="flex-1 bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] h-11 text-sm font-medium">
              Acheter maintenant
            </Button>
            <Button variant="outline" aria-label="Envoyer un message" className="w-11 h-11 rounded-[7px] border-[#E5E7EB] flex-shrink-0 p-0">
              <MessageCircle size={17} className="text-[#1F3A5F]" />
            </Button>
          </div>

          <button onClick={handleAddToCart} className="w-full text-sm text-[#D97757] font-medium hover:text-[#B85942] transition text-center">
            + Ajouter au panier
          </button>

          <details className="border border-[#E5E7EB] rounded-[8px] overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-[#1F3A5F]">
              <div className="flex items-center gap-2"><Truck size={15} />Livraison</div>
              <ChevronDown size={14} className="text-[#6B7280]" />
            </summary>
            <div className="px-4 pb-4 space-y-2 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2"><Store size={13} /> Point relais — 300 DA — 2–3 jours</div>
              <div className="flex items-center gap-2"><Truck size={13} /> Domicile — 600 DA — 1–2 jours</div>
              <div className="flex items-center gap-2"><Package size={13} /> Yalidine — 450 DA — 3–5 jours</div>
            </div>
          </details>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <Tabs defaultValue="description">
          <TabsList className="border-b border-[#E5E7EB] bg-transparent w-full justify-start rounded-none h-auto p-0 gap-0">
            {["description", "details", "avis", "livraison"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F3A5F] data-[state=active]:text-[#1F3A5F] pb-3 px-4 text-sm font-medium text-[#6B7280] bg-transparent capitalize"
              >
                {tab === "livraison" ? "Livraison & retours" : tab === "avis" ? `Avis (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="description" className="pt-5">
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-2xl">{product.description}</p>
          </TabsContent>

          <TabsContent value="details" className="pt-5">
            <div className="grid grid-cols-2 gap-y-3 max-w-md text-sm">
              {[
                ["Catégorie", product.category],
                ["État", product.condition === "new" ? "Neuf" : product.condition === "used" ? "Occasion" : "Sur-mesure"],
                ["Vendeur", product.sellerName],
                ["Ville", product.city],
                ["Tailles dispo", product.sizes.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <span className="text-[#6B7280]">{k}</span>
                  <span className="font-medium text-[#1F3A5F]">{v}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="avis" className="pt-5">
            <div className="space-y-4">
              {[
                { author: "Nadia B.", rating: 5, comment: "Qualité exceptionnelle, exactement comme décrit.", date: "12 avril 2026" },
                { author: "Karim T.", rating: 5, comment: "Superbe pièce, le vendeur est très réactif.", date: "8 mars 2026" },
                { author: "Samira M.", rating: 4, comment: "Très belle qualité, livraison un peu longue.", date: "2 février 2026" },
              ].map((r, i) => (
                <div key={i} className="border border-[#E5E7EB] rounded-[8px] p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5F0E8] flex items-center justify-center text-xs font-medium text-[#1F3A5F]">{r.author[0]}</div>
                    <div>
                      <p className="text-sm font-medium text-[#1F3A5F]">{r.author}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={10} className="fill-[#FACC15] text-[#FACC15]" />)}
                        <span className="text-[10px] text-[#6B7280] ml-1">{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280]">{r.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="livraison" className="pt-5">
            <div className="space-y-3 text-sm text-[#6B7280] max-w-xl">
              <p>Expédition sous 2–5 jours ouvrés après confirmation de paiement Atlas Escrow.</p>
              <p>Retours dans les 7 jours suivant la réception. Atlas arbitre les litiges.</p>
              <EscrowBadge variant="compact" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-5" style={{ letterSpacing: "-0.4px" }}>Articles similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similar.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </main>
  )
}
