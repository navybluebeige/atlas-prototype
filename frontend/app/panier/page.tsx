"use client"

import Link from "next/link"
import { Trash2, ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils/format"
import { CheckoutHeader } from "@/components/layout/CheckoutHeader"
import { Footer } from "@/components/layout/Footer"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { products } from "@/lib/data/products"

export default function CartPage() {
  const items = useCart((s) => s.items)
  const addItem = useCart((s) => s.addItem)
  const removeItem = useCart((s) => s.removeItem)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const updateSize = useCart((s) => s.updateSize)

  if (items.length === 0) {
    return (
      <>
        <CheckoutHeader />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <ShoppingBag size={56} className="text-[#E5E7EB] mb-4" />
          <h2 className="text-xl font-medium text-[#1F3A5F] mb-2">Votre panier est vide</h2>
          <p className="text-sm text-[#6B7280] mb-6">Découvrez des milliers de pièces uniques sur Atlas</p>
          <Link href="/boutique">
            <Button className="bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] px-8 h-11">
              Découvrir la boutique
            </Button>
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <CheckoutHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/boutique" className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#1F3A5F] transition mb-6">
          <ArrowLeft size={14} />
          Continuer mes achats
        </Link>

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-8">
          {/* Cart items */}
          <div>
            <h1 className="text-[22px] font-medium text-[#1F3A5F] mb-4" style={{ letterSpacing: "-0.4px" }}>
              Mon panier <span className="text-base text-[#6B7280] font-normal">({items.length} article{items.length > 1 ? "s" : ""})</span>
            </h1>

            <div className="space-y-3">
              {items.map((item) => {
                const prod = products.find((p) => p.id === item.productId)
                return (
                  <div key={item.id} className="bg-white border border-[#E5E7EB] rounded-[10px] p-4 flex gap-4">
                    <Link href={`/produit/${item.productId}`}>
                      <div className={`w-[100px] h-[130px] flex-shrink-0 rounded-[8px] bg-gradient-to-br ${item.gradient}`} />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/produit/${item.productId}`} className="text-sm font-medium text-[#1F3A5F] hover:text-[#D97757] transition line-clamp-2">
                        {item.name}
                      </Link>
                      <p className="text-xs italic text-[#6B7280] mt-0.5">{item.sellerName} · {item.sellerCity}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-32">
                          <Select value={item.size} onValueChange={(v) => updateSize(item.id, v)}>
                            <SelectTrigger className="h-8 text-xs rounded-[6px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(prod?.sizes ?? [item.size]).map((s) => (
                                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-[#6B7280] hover:bg-[#F5F0E8] transition" aria-label="Moins">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium text-[#1F3A5F]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-[#6B7280] hover:bg-[#F5F0E8] transition" aria-label="Plus">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-[#1F3A5F]">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => {
                            const name = item.name
                            removeItem(item.id)
                            toast(`Article retiré`, {
                              description: name,
                              action: { label: "Annuler", onClick: () => addItem(item) },
                            })
                          }}
                          aria-label="Supprimer"
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="md:sticky md:top-24 h-fit">
            <OrderSummary variant="cart" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
