import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ShieldCheck, Globe, Users, Award } from "lucide-react"

export default function AProposPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 px-4 bg-[#F5F0E8] text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#1F3A5F] flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-semibold">A</span>
            </div>
            <h1 className="text-[26px] font-medium text-[#1F3A5F] mb-3" style={{ letterSpacing: "-0.5px" }}>
              À propos d&apos;Atlas
            </h1>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              La première plateforme algérienne d&apos;e-commerce verticale dédiée à la mode et au textile.
              Notre mission : démocratiser le commerce de mode en Algérie tout en valorisant le savoir-faire artisanal local.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-4" style={{ letterSpacing: "-0.4px" }}>
                Notre mission
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-3">
                Atlas est né d&apos;un constat simple : le marché de la mode algérienne mérite une plateforme à sa hauteur.
                Des milliers d&apos;artisans talentueux, de boutiques locales et de vendeurs particuliers n&apos;avaient pas d&apos;espace numérique sécurisé.
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Nous avons bâti Atlas pour changer ça — avec la confiance au cœur de chaque transaction grâce à Atlas Escrow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, label: "Transactions sécurisées", value: "50 000+" },
                { icon: Globe, label: "Wilayas couvertes", value: "69" },
                { icon: Users, label: "Vendeurs actifs", value: "2 500+" },
                { icon: Award, label: "Artisans certifiés", value: "120+" },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="bg-[#F5F0E8] rounded-[10px] p-4 text-center">
                    <Icon size={20} className="text-[#D97757] mx-auto mb-2" />
                    <p className="text-xl font-medium text-[#1F3A5F]">{s.value}</p>
                    <p className="text-xs text-[#6B7280]">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Careers */}
        <section id="carrieres" className="py-12 px-4 bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-3" style={{ letterSpacing: "-0.4px" }}>
              Rejoignez l&apos;équipe
            </h2>
            <p className="text-sm text-[#6B7280] mb-6">
              Atlas recrute des développeurs, designers, community managers et account managers.
              Envoyez votre CV à <strong>careers@atlas.dz</strong>
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
              Nous contacter
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Support client", info: "support@atlas.dz · 3030", sub: "Dim–Jeu 8h–18h" },
                { label: "Presse", info: "presse@atlas.dz", sub: "Réponse sous 24h" },
                { label: "Partenariats", info: "partners@atlas.dz", sub: "B2B & institutionnel" },
              ].map((c) => (
                <div key={c.label} className="bg-[#F5F0E8] rounded-[10px] p-4">
                  <p className="text-sm font-medium text-[#1F3A5F] mb-1">{c.label}</p>
                  <p className="text-xs text-[#D97757] font-medium">{c.info}</p>
                  <p className="text-xs text-[#6B7280]">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CGU */}
        <section id="cgu" className="py-12 px-4 bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-4" style={{ letterSpacing: "-0.4px" }}>
              CGU & Mentions légales
            </h2>
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-5 space-y-3 text-xs text-[#6B7280] leading-relaxed">
              <p><strong className="text-[#1F3A5F]">Atlas DZ SAS</strong> — Plateforme de commerce électronique enregistrée en Algérie conformément à la Loi 18-05 relative au commerce électronique.</p>
              <p><strong className="text-[#1F3A5F]">Protection des données :</strong> Vos données personnelles sont traitées conformément aux dispositions de la Loi 18-07 relative à la protection des personnes physiques dans le traitement des données à caractère personnel.</p>
              <p><strong className="text-[#1F3A5F]">Escrow :</strong> Le service Atlas Escrow est opéré sous supervision de la Banque d&apos;Algérie. Tous les fonds bloqués sont déposés sur un compte séquestre réglementé.</p>
              <p><strong className="text-[#1F3A5F]">Paiement :</strong> Les paiements par carte CIB et EDAHABIA sont traités par la SATIM (Société d&apos;Automatisation des Transactions Interbancaires et de Monétique).</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
