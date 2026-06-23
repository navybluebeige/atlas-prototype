import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SellerType = "individual" | "shop" | "artisan"
export type DeliveryMethod = "pickup" | "home" | "yalidine" | "click_collect"
export type PaymentMethod = "cib" | "edahabia" | "cod" | "bank_transfer"

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  gradient: string
  size: string
  quantity: number
  sellerName: string
  sellerCity: string
  sellerType: SellerType
  badges: string[]
}

export interface AddressData {
  fullName: string
  phone: string
  wilayaId: number
  wilayaName: string
  commune: string
  address: string
  postalCode?: string
}

interface CartStore {
  items: CartItem[]
  deliveryMethod: DeliveryMethod | null
  deliveryAddress: AddressData | null
  pickupPointId: string | null
  paymentMethod: PaymentMethod | null
  orderId: string | null

  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  updateSize: (id: string, size: string) => void
  setDelivery: (method: DeliveryMethod) => void
  setAddress: (data: AddressData) => void
  setPickupPoint: (id: string) => void
  setPayment: (method: PaymentMethod) => void
  clearCart: () => void
  generateOrderId: () => string
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryMethod: null,
      deliveryAddress: null,
      pickupPointId: null,
      paymentMethod: null,
      orderId: null,

      addItem: (item) => {
        const id = `${item.productId}-${item.size}`
        const existing = get().items.find((i) => i.id === id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: Math.min(i.quantity + item.quantity, 10) } : i
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, id }] })
        }
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((i) => i.id !== id) })
          return
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(qty, 10) } : i
          ),
        })
      },

      updateSize: (id, size) =>
        set({ items: get().items.map((i) => (i.id === id ? { ...i, size } : i)) }),

      setDelivery: (method) => set({ deliveryMethod: method }),
      setAddress: (data) => set({ deliveryAddress: data }),
      setPickupPoint: (id) => set({ pickupPointId: id }),
      setPayment: (method) => set({ paymentMethod: method }),

      clearCart: () =>
        set({
          items: [],
          deliveryMethod: null,
          deliveryAddress: null,
          pickupPointId: null,
          paymentMethod: null,
          orderId: null,
        }),

      generateOrderId: () => {
        const rand = Math.floor(10000 + Math.random() * 90000)
        const id = `ATL-2026-${rand}`
        set({ orderId: id })
        return id
      },
    }),
    { name: "atlas-cart-storage" }
  )
)

export const getSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export const getDeliveryFee = (method: DeliveryMethod | null): number => {
  if (!method) return 0
  const fees: Record<DeliveryMethod, number> = { pickup: 300, home: 600, yalidine: 450, click_collect: 0 }
  return fees[method]
}

export const getAtlasProtection = (subtotal: number) => Math.round(subtotal * 0.05)

export const getCodFee = (paymentMethod: PaymentMethod | null) =>
  paymentMethod === "cod" ? 200 : 0

export const getTotal = (
  items: CartItem[],
  deliveryMethod: DeliveryMethod | null,
  paymentMethod: PaymentMethod | null
): number => {
  const sub = getSubtotal(items)
  return sub + getDeliveryFee(deliveryMethod) + getAtlasProtection(sub) + getCodFee(paymentMethod)
}

export { useCart as useCartStore }
