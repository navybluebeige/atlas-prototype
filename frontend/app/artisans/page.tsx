import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ArtisanCard } from "@/components/artisan/ArtisanCard"
import { artisans } from "@/lib/data/artisans"

export default function ArtisansPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-[26px] font-medium text-[#1F3A5F] mb-1" style={{ letterSpacing: "-0.5px" }}>
            ✂️ Artisans & Créateurs
          </h1>
          <p className="text-sm text-[#6B7280]">
            Découvrez les artisans certifiés qui perpétuent le savoir-faire algérien
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {artisans.map((a) => <ArtisanCard key={a.id} artisan={a} />)}
        </div>
      </main>
      <Footer />
    </>
  )
}
