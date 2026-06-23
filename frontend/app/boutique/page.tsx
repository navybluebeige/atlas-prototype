"use client"
export const dynamic = 'force-dynamic';

// Le reste de votre code actuel en dessous...


import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, ChevronDown, X } from "lucide-react"
import { products } from "@/lib/data/products"
import { categories } from "@/lib/data/categories"
import { wilayas } from "@/lib/data/wilayas"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
const CONDITIONS = [
  { id: "new", label: "Neuf" },
  { id: "used", label: "Occasion" },
  { id: "custom", label: "Sur-mesure" },
]
const SORT_OPTIONS = [
  { value: "relevance", label: "Pertinence" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
  { value: "rating", label: "Mieux notés" },
]

function FiltersPanel({
  selectedCats, setSelectedCats,
  selectedSizes, setSelectedSizes,
  selectedConditions, setSelectedConditions,
  selectedWilaya, setSelectedWilaya,
  priceRange, setPriceRange,
  onReset,
}: {
  selectedCats: string[]; setSelectedCats: (v: string[]) => void
  selectedSizes: string[]; setSelectedSizes: (v: string[]) => void
  selectedConditions: string[]; setSelectedConditions: (v: string[]) => void
  selectedWilaya: string; setSelectedWilaya: (v: string) => void
  priceRange: [number, number]; setPriceRange: (v: [number, number]) => void
  onReset: () => void
}) {
  function toggleArr<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#1F3A5F]">Filtres</h3>
        <button onClick={onReset} className="text-xs text-[#D97757] hover:text-[#B85942]">Réinitialiser</button>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-medium text-[#1F3A5F] mb-2">Catégorie</p>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCats.includes(cat.id)}
                onCheckedChange={() => setSelectedCats(toggleArr(selectedCats, cat.id))}
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-xs text-[#6B7280] cursor-pointer">{cat.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-xs font-medium text-[#1F3A5F] mb-2">Taille</p>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSizes(toggleArr(selectedSizes, s))}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
                selectedSizes.includes(s) ? "bg-[#1F3A5F] text-white border-[#1F3A5F]" : "border-[#E5E7EB] text-[#6B7280] hover:border-[#1F3A5F]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <p className="text-xs font-medium text-[#1F3A5F] mb-2">État</p>
        <div className="space-y-1.5">
          {CONDITIONS.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <Checkbox
                id={`cond-${c.id}`}
                checked={selectedConditions.includes(c.id)}
                onCheckedChange={() => setSelectedConditions(toggleArr(selectedConditions, c.id))}
              />
              <Label htmlFor={`cond-${c.id}`} className="text-xs text-[#6B7280] cursor-pointer">{c.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Wilaya */}
      <div>
        <p className="text-xs font-medium text-[#1F3A5F] mb-2">Wilaya</p>
        <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
          <SelectTrigger className="h-8 text-xs rounded-[6px]"><SelectValue placeholder="Toutes" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">Toutes les wilayas</SelectItem>
            {wilayas.map((w) => (
              <SelectItem key={w.id} value={w.name} className="text-xs">{w.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <div>
        <p className="text-xs font-medium text-[#1F3A5F] mb-3">
          Prix : {priceRange[0].toLocaleString()} — {priceRange[1].toLocaleString()} DA
        </p>
        <Slider
          min={0}
          max={50000}
          step={500}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          className="w-full"
        />
      </div>
    </div>
  )
}

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const qParam = searchParams.get("q") ?? ""
  const catParam = searchParams.get("cat") ?? ""

  const [selectedCats, setSelectedCats] = useState<string[]>(catParam ? [catParam] : [])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedWilaya, setSelectedWilaya] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [sort, setSort] = useState("relevance")
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  function resetFilters() {
    setSelectedCats([])
    setSelectedSizes([])
    setSelectedConditions([])
    setSelectedWilaya("all")
    setPriceRange([0, 50000])
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (qParam) list = list.filter((p) => p.name.toLowerCase().includes(qParam.toLowerCase()))
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category))
    if (selectedSizes.length) list = list.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)))
    if (selectedConditions.length) list = list.filter((p) => selectedConditions.includes(p.condition))
    if (selectedWilaya !== "all") list = list.filter((p) => p.city === selectedWilaya)
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price)
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price)
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating)
    return list
  }, [qParam, selectedCats, selectedSizes, selectedConditions, selectedWilaya, priceRange, sort])

  const paginated = filtered.slice(0, page * PER_PAGE)
  const hasMore = paginated.length < filtered.length

  const filterProps = { selectedCats, setSelectedCats, selectedSizes, setSelectedSizes, selectedConditions, setSelectedConditions, selectedWilaya, setSelectedWilaya, priceRange, setPriceRange, onReset: resetFilters }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
              {qParam ? `Résultats pour "${qParam}"` : "Boutique"}
            </h1>
            <p className="text-xs text-[#6B7280]">{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden rounded-[7px] text-xs gap-1.5">
                  <SlidersHorizontal size={13} /> Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5 overflow-y-auto">
                <FiltersPanel {...filterProps} />
              </SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-9 text-xs rounded-[7px] w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-60 flex-shrink-0 sticky top-24 h-fit bg-white border border-[#E5E7EB] rounded-[10px] p-5">
            <FiltersPanel {...filterProps} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <X size={40} className="text-[#E5E7EB] mb-3" />
                <p className="text-sm font-medium text-[#1F3A5F]">Aucun article trouvé</p>
                <button onClick={resetFilters} className="mt-2 text-xs text-[#D97757]">Réinitialiser les filtres</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => p + 1)}
                      className="rounded-[7px] border-[#E5E7EB] text-sm px-8"
                    >
                      Afficher plus ({filtered.length - paginated.length} restants)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF8]" />}>
      <BoutiqueContent />
    </Suspense>
  )
}
