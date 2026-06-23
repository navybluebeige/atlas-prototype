import type { CartItem } from "@/lib/store/cart"

export const sampleCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: "p1",
    name: "Kaftan traditionnel brodé main",
    price: 12500,
    gradient: "from-[#D97757] to-[#8B4513]",
    size: "M",
    quantity: 1,
    sellerName: "Atelier Yasmine",
    sellerCity: "Alger",
    sellerType: "artisan",
    badges: ["custom", "verified", "made_in_algeria"],
  },
  {
    id: "cart-2",
    productId: "p3",
    name: "Sac en cuir véritable",
    price: 5800,
    gradient: "from-[#7C5C3E] to-[#4A2F18]",
    size: "Unique",
    quantity: 1,
    sellerName: "Cuir & Co",
    sellerCity: "Constantine",
    sellerType: "artisan",
    badges: ["promo", "made_in_algeria"],
  },
]
