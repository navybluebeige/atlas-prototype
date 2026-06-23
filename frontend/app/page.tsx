import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/home/Hero"
import { TrustStrip } from "@/components/home/TrustStrip"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { TrendingProducts } from "@/components/home/TrendingProducts"
import { IdeasSection } from "@/components/home/IdeasSection"
import { ArtisansSection } from "@/components/home/ArtisansSection"
import { SellerCTA } from "@/components/home/SellerCTA"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <TrendingProducts />
        <IdeasSection />
        <ArtisansSection />
        <SellerCTA />
      </main>
      <Footer />
    </>
  )
}
