export interface Category {
  id: string
  label: string
  icon: string
  gradient: string
  count: number
}

export const categories: Category[] = [
  { id: "robes", label: "Robes & Kaftans", icon: "Shirt", gradient: "from-[#D97757] to-[#B85942]", count: 142 },
  { id: "tops", label: "Hauts & T-shirts", icon: "Layers", gradient: "from-[#1F3A5F] to-[#2D5494]", count: 89 },
  { id: "pants", label: "Pantalons & Jeans", icon: "AlignJustify", gradient: "from-[#7C5C3E] to-[#5A3E28]", count: 76 },
  { id: "jackets", label: "Vestes & Manteaux", icon: "Wind", gradient: "from-[#B8860B] to-[#8B6914]", count: 54 },
  { id: "shoes", label: "Chaussures", icon: "Footprints", gradient: "from-[#C4863A] to-[#9A6022]", count: 63 },
  { id: "bags", label: "Sacs & Maroquinerie", icon: "ShoppingBag", gradient: "from-[#6B4423] to-[#4A2F18]", count: 48 },
  { id: "custom", label: "Sur-mesure", icon: "Scissors", gradient: "from-[#D97757] to-[#FACC15]", count: 37 },
  { id: "used", label: "Seconde main", icon: "RefreshCw", gradient: "from-[#16A34A] to-[#15803D]", count: 211 },
]
