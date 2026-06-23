"use client"

import Link from "next/link"
import { Heart, Star, MapPin } from "lucide-react"
import { useFavorites } from "@/lib/store/favorites"
import { useCart } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils/format"
import type { Product } from "@/lib/data/products"
import { toast } from "sonner"
import { cn } from "@/lib/utils/cn"

const BADGE_LABELS: Record<string, { label: string; color: string }> = {
  custom: { label: "Sur-mesure", color: "bg-[#D97757] text-white" },
  promo: { label: "Promo", color: "bg-orange-500 text-white" },
  new: { label: "Nouveau", color: "bg-[#1F3A5F] text-white" },
  used: { label: "2nde main", color: "bg-[#16A34A] text-white" },
  verified: { label: "Vérifié", color: "bg-[#16A34A] text-white" },
  made_in_algeria: { label: "🇩🇿 Local", color: "bg-[#1F3A5F] text-white" },
}

export function ProductCard({ product }: { product: Product }) {
  const toggle = useFavorites((s) => s.toggle)
  const addItem = useCart((s) => s.addItem)
  const isFav = useFavorites((s) => s.favorites.includes(product.id))

  function handleFav(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    toast(isFav ? "Retiré des favoris" : "Ajouté aux favoris", {
      icon: isFav ? "💔" : "❤️",
      duration: 2000,
    })
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      gradient: product.gradient,
      size: product.sizes[0],
      quantity: 1,
      sellerName: product.sellerName,
      sellerCity: product.city,
      sellerType: product.sellerType,
      badges: product.badges,
    })
    toast.success("Article ajouté au panier", {
      description: product.name,
      duration: 2500,
    })
  }

  const primaryBadge = product.badges[0]
  const discountPct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  return (
    <Link href={`/produit/${product.id}`} className="group block">
      <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className={`relative aspect-[4/5] bg-gradient-to-br ${product.gradient}`}>
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {primaryBadge && BADGE_LABELS[primaryBadge] && (
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${BADGE_LABELS[primaryBadge].color}`}
              >
                {BADGE_LABELS[primaryBadge].label}
              </span>
            )}
            {discountPct && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-orange-500 text-white">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFav}
            aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition shadow-sm"
          >
            <Heart
              size={14}
              className={cn(
                "transition",
                isFav ? "fill-red-500 text-red-500" : "text-[#6B7280]"
              )}
            />
          </button>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform bg-[#1F3A5F]/90 py-2 px-3">
            <button
              onClick={handleAddToCart}
              className="w-full text-white text-xs font-medium text-center"
            >
              + Ajouter au panier
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-[#1F3A5F] text-sm font-medium line-clamp-1 mb-0.5">{product.name}</p>
          <p className="text-[#6B7280] text-xs italic mb-1">{product.sellerName}</p>

          <div className="flex items-center gap-1 mb-2">
            <MapPin size={10} className="text-[#6B7280]" />
            <span className="text-[10px] text-[#6B7280]">{product.city}</span>
            <span className="mx-1 text-[#E5E7EB]">·</span>
            <Star size={10} className="fill-[#FACC15] text-[#FACC15]" />
            <span className="text-[10px] text-[#6B7280]">{product.rating}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-[#1F3A5F]">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-[#6B7280] line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
