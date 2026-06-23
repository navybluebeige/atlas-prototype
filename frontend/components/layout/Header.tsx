"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  Sparkles,
  Scissors,
  ShieldCheck,
  X,
} from "lucide-react"
import { useCart } from "@/lib/store/cart"
import { useFavorites } from "@/lib/store/favorites"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const SEARCH_PLACEHOLDERS = [
  "Rechercher un kaftan...",
  "Rechercher une veste en jean...",
  "Rechercher un atelier à Alger...",
  "Rechercher une robe de soirée...",
  "Rechercher un sac en cuir...",
]

const NAV_LINKS = [
  { href: "/boutique?cat=robes", label: "Femme" },
  { href: "/boutique?cat=tops", label: "Homme" },
  { href: "/boutique?cat=pants", label: "Enfant" },
  { href: "/boutique?cat=custom", label: "Sur-mesure", icon: <Scissors size={12} />, accent: true },
  { href: "/boutique?cat=used", label: "Seconde main" },
  { href: "/idees", label: "Idées", icon: <Sparkles size={12} /> },
  { href: "/artisans", label: "Artisans" },
]

export function Header() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartItems = useCart((s) => s.items)
  const favCount = useFavorites((s) => s.favorites.length)
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % SEARCH_PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/boutique?q=${encodeURIComponent(query.trim())}`)
      setQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-sm">
      {/* Row 1 */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-lg bg-[#1F3A5F] flex items-center justify-center">
            <span className="text-white text-xs font-semibold tracking-wider">A</span>
          </div>
          <span className="text-[#1F3A5F] text-lg font-semibold tracking-tight">ATLAS</span>
        </Link>

        {/* Search — hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={SEARCH_PLACEHOLDERS[placeholderIdx]}
              className="w-full pl-9 pr-4 py-2.5 rounded-[8px] border border-[#E5E7EB] bg-[#FAFBFC] text-sm text-[#1F3A5F] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] focus:ring-offset-1 transition"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <Link
            href="/vendre"
            className="hidden md:block text-sm font-medium text-[#1F3A5F] hover:text-[#D97757] transition px-3 py-2"
          >
            Vendre
          </Link>

          {/* Favorites */}
          <Link href="/compte/favoris" aria-label="Mes favoris" className="relative p-2 rounded-lg hover:bg-[#F0F4F9] transition">
            <Heart size={20} className="text-[#1F3A5F]" />
            {mounted && favCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D97757] text-white text-[10px] font-semibold flex items-center justify-center">
                {favCount > 9 ? "9+" : favCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/panier" aria-label="Mon panier" className="relative p-2 rounded-lg hover:bg-[#F0F4F9] transition">
            <ShoppingBag size={20} className="text-[#1F3A5F]" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D97757] text-white text-[10px] font-semibold flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          <Link href="/connexion" className="hidden md:block">
            <Button size="sm" className="bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px] text-sm px-4">
              Connexion
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded-lg hover:bg-[#F0F4F9]" aria-label="Menu">
                <Menu size={20} className="text-[#1F3A5F]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <MobileNav onClose={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Row 2 — nav categories */}
      <div className="hidden md:block border-t border-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition hover:bg-[#F0F4F9] ${
                  link.accent
                    ? "text-[#D97757] hover:text-[#B85942]"
                    : "text-[#1F3A5F] hover:text-[#D97757]"
                }`}
              >
                {link.icon && link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-medium">
            <ShieldCheck size={14} />
            <span>Tous nos paiements sont protégés</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/boutique?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#E5E7EB]">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1F3A5F] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">A</span>
          </div>
          <span className="text-[#1F3A5F] text-base font-semibold">ATLAS</span>
        </Link>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F4F9]" aria-label="Fermer">
          <X size={18} className="text-[#6B7280]" />
        </button>
      </div>

      <form onSubmit={handleSearch} className="px-4 py-3 border-b border-[#E5E7EB]">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-[#E5E7EB] bg-[#FAFBFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]"
          />
        </div>
      </form>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition hover:bg-[#F0F4F9] ${
              link.accent ? "text-[#D97757]" : "text-[#1F3A5F]"
            }`}
          >
            {link.icon && link.icon}
            {link.label}
          </Link>
        ))}
        <hr className="my-2 border-[#E5E7EB]" />
        <Link href="/vendre" onClick={onClose} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1F3A5F] hover:bg-[#F0F4F9]">
          Vendre sur Atlas
        </Link>
        <Link href="/comment-ca-marche" onClick={onClose} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1F3A5F] hover:bg-[#F0F4F9]">
          Comment ça marche
        </Link>
      </nav>

      <div className="px-4 py-4 border-t border-[#E5E7EB] space-y-2">
        <Link href="/connexion" onClick={onClose}>
          <Button className="w-full bg-[#1F3A5F] hover:bg-[#0F1F33] text-white rounded-[7px]">
            Se connecter
          </Button>
        </Link>
        <Link href="/inscription" onClick={onClose}>
          <Button variant="outline" className="w-full rounded-[7px] border-[#1F3A5F] text-[#1F3A5F]">
            Créer un compte
          </Button>
        </Link>
      </div>
    </div>
  )
}
