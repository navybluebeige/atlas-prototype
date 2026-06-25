import { notFound } from "next/navigation"
import { products } from "@/lib/data/products"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ProductClient } from "./ProductClient"

// Configuration requise pour l'export statique (output: "export")
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  return (
    <>
      <Header />
      <ProductClient product={product} />
      <Footer />
    </>
  )
}