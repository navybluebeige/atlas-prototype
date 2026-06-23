export const dynamic = 'force-dynamic';

// Le reste de votre code en dessous (vos imports, votre composant...)
import { notFound } from "next/navigation"
import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"
import { ideas } from "@/lib/data/ideas"
import { products } from "@/lib/data/products"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductCard } from "@/components/product/ProductCard"

export default async function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idea = ideas.find((i) => i.id === id)
  if (!idea) notFound()

  const ideaProducts = products.filter((p) => idea.productIds.includes(p.id))

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/idees" className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#1F3A5F] mb-6">
          <ArrowLeft size={14} /> Retour aux Idées
        </Link>

        <div className={`h-64 md:h-80 rounded-[16px] bg-gradient-to-br ${idea.gradient} mb-8`} />

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[26px] font-medium text-[#1F3A5F] mb-2" style={{ letterSpacing: "-0.5px" }}>
              {idea.title}
            </h1>
            <p className="text-sm text-[#6B7280] max-w-xl">{idea.description}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[#6B7280]">
            <Heart size={16} />
            <span className="text-sm">{idea.likes}</span>
          </div>
        </div>

        <h2 className="text-base font-medium text-[#1F3A5F] mb-4">
          Articles dans ce moodboard ({ideaProducts.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ideaProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <Footer />
    </>
  )
}
