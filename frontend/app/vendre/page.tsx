import Link from "next/link"
import { UserPlus, Image, DollarSign, ShieldCheck, Globe, Zap, ArrowRight, Star } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"

const STEPS = [
  { icon: UserPlus, title: "1. Inscription", desc: "Créez votre compte en 2 minutes. Particulier, boutique ou artisan — choisissez votre profil." },
  { icon: Image, title: "2. Mise en ligne", desc: "Publiez vos articles avec photos, description et prix. Notre IA vous aide à rédiger." },
  { icon: DollarSign, title: "3. Encaissement", desc: "Recevez vos paiements sécurisés via Atlas Escrow, directement sur votre compte CIB ou EDAHABIA." },
]

const BENEFITS = [
  { icon: ShieldCheck, title: "Paiement garanti", desc: "Atlas Escrow bloque le paiement jusqu'à confirmation de réception." },
  { icon: Globe, title: "69 wilayas", desc: "Touchez des acheteurs dans toute l'Algérie." },
  { icon: Zap, title: "Mise en ligne rapide", desc: "Publiez un article en moins de 2 minutes." },
  { icon: Star, title: "Commission réduite", desc: "Seulement 5% par vente. Aucun abonnement obligatoire." },
]

const TESTIMONIALS = [
  { name: "Khadidja M.", city: "Alger", type: "Couturière", quote: "En 3 mois, j'ai vendu 47 pièces sur Atlas. Les paiements arrivent toujours à temps grâce à l'Escrow.", gradient: "from-[#D97757] to-[#8B4513]" },
  { name: "Yacine B.", city: "Oran", type: "Boutique", quote: "Atlas m'a permis de toucher des clients jusqu'à Annaba et Béjaïa. Mon chiffre d'affaires a doublé.", gradient: "from-[#1F3A5F] to-[#4A6FA5]" },
  { name: "Nassima L.", city: "Tizi Ouzou", type: "Artisane", quote: "Mes broderies kabyles trouvent enfin preneurs grâce à la section Artisans. Merci Atlas !", gradient: "from-[#16A34A] to-[#15803D]" },
]

const PLANS = [
  {
    name: "Particulier",
    price: "Gratuit",
    desc: "Pour vendre vos articles de seconde main",
    features: ["Jusqu'à 20 articles", "Commission 5%", "Support email", "Atlas Escrow inclus"],
    cta: "Commencer",
    featured: false,
  },
  {
    name: "Pro",
    price: "4 000 DA/mois",
    desc: "Pour les boutiques et vendeurs réguliers",
    features: ["Articles illimités", "Commission 4%", "Badge Pro", "Support prioritaire", "Analytics vendeur"],
    cta: "Essai 30 jours",
    featured: true,
  },
  {
    name: "Premium",
    price: "8 000 DA/mois",
    desc: "Pour les artisans et grandes boutiques",
    features: ["Articles illimités", "Commission 3%", "Badge Artisan certifié", "Mise en avant Homepage", "Manager dédié", "API d'intégration"],
    cta: "Nous contacter",
    featured: false,
  },
]

export default function VendrePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #1F3A5F 0%, #0F1F33 100%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4" style={{ letterSpacing: "-0.6px" }}>
              Vendez en quelques clics,<br />encaissez en confiance.
            </h1>
            <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">
              Rejoignez des milliers de vendeurs algériens. Kaftan, maroquinerie, prêt-à-porter — tout se vend sur Atlas.
            </p>
            <Link href="/inscription">
              <Button className="bg-[#D97757] hover:bg-[#B85942] text-white rounded-[7px] px-8 h-12 text-sm font-medium">
                Commencer à vendre gratuitement <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] text-center mb-10" style={{ letterSpacing: "-0.4px" }}>
              3 étapes pour commencer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="text-center">
                    <div className="w-12 h-12 rounded-[10px] bg-[#F0F4F9] flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} className="text-[#1F3A5F]" />
                    </div>
                    <h3 className="text-base font-medium text-[#1F3A5F] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="boutique" className="py-16 px-4 bg-[#F5F0E8]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] text-center mb-10" style={{ letterSpacing: "-0.4px" }}>
              Pourquoi choisir Atlas ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {BENEFITS.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.title} className="bg-white rounded-[10px] border border-[#E5E7EB] p-5">
                    <div className="w-10 h-10 rounded-[8px] bg-[#FEF3EC] flex items-center justify-center mb-3">
                      <Icon size={18} className="text-[#D97757]" />
                    </div>
                    <h3 className="text-sm font-medium text-[#1F3A5F] mb-1">{b.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{b.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] text-center mb-10" style={{ letterSpacing: "-0.4px" }}>
              Ils vendent déjà sur Atlas
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-white border border-[#E5E7EB] rounded-[10px] p-5">
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient}`} />
                    <div>
                      <p className="text-sm font-medium text-[#1F3A5F]">{t.name}</p>
                      <p className="text-xs text-[#6B7280]">{t.type} · {t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="tarifs" className="py-16 px-4 bg-[#F5F0E8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] text-center mb-2" style={{ letterSpacing: "-0.4px" }}>
              Tarifs transparents
            </h2>
            <p className="text-center text-sm text-[#6B7280] mb-10">Commencez gratuitement, évoluez selon vos besoins.</p>
            <div className="grid md:grid-cols-3 gap-5">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[10px] border p-6 ${plan.featured ? "border-[#1F3A5F] bg-[#1F3A5F] text-white shadow-lg" : "border-[#E5E7EB] bg-white"}`}
                >
                  <p className={`text-xs font-medium mb-2 ${plan.featured ? "text-white/60" : "text-[#6B7280]"}`}>{plan.desc}</p>
                  <p className={`text-xl font-medium mb-1 ${plan.featured ? "text-white" : "text-[#1F3A5F]"}`}>{plan.name}</p>
                  <p className={`text-sm font-medium mb-5 ${plan.featured ? "text-[#D97757]" : "text-[#D97757]"}`}>{plan.price}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-xs ${plan.featured ? "text-white/80" : "text-[#6B7280]"}`}>
                        <span className={`text-xs ${plan.featured ? "text-[#4ADE80]" : "text-[#16A34A]"}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/inscription">
                    <Button className={`w-full rounded-[7px] text-sm h-9 ${plan.featured ? "bg-[#D97757] hover:bg-[#B85942] text-white" : "bg-[#1F3A5F] hover:bg-[#0F1F33] text-white"}`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-[#1F3A5F] text-center">
          <h2 className="text-[22px] font-medium text-white mb-4" style={{ letterSpacing: "-0.4px" }}>
            Prêt à rejoindre Atlas ?
          </h2>
          <p className="text-white/70 text-sm mb-8">Inscription gratuite en 2 minutes. Première vente en quelques heures.</p>
          <Link href="/inscription">
            <Button className="bg-[#D97757] hover:bg-[#B85942] text-white rounded-[7px] px-8 h-12 text-sm font-medium">
              Commencer à vendre <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
