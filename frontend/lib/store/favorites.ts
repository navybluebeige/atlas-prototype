import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesStore {
  favorites: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  count: () => number
  clear: () => void
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      has: (id) => get().favorites.includes(id),
      count: () => get().favorites.length,
      clear: () => set({ favorites: [] }),
    }),
    { name: "atlas-favorites-storage" }
  )
)

export { useFavorites as useFavoritesStore }
