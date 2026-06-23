import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { EscrowBadge } from "@/components/checkout/EscrowBadge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQS = [
  { q: "Comment fonctionne Atlas Escrow ?", a: "Lorsque vous payez, l'argent est bloqué par Atlas. Le vendeur expédie votre commande. Une fois que vous la recevez et la confirmez, le vendeur reçoit son paiement. En cas de problème, Atlas arbitre le litige et vous rembourse." },
  { q: "Quels sont les modes de livraison disponibles ?", a: "Vous avez 4 options : point relais Atlas (300 DA, 2-3 jours), livraison à domicile (600 DA, 1-2 jours), Yalidine Express (450 DA, 3-5 jours), et Click & Collect (gratuit, le jour même)." },
  { q: "Comment puis-je retourner un article ?", a: "Si l'article ne correspond pas à la description, signalez le problème dans les 48h suivant la réception. Atlas ouvrira un litige et étudiera votre demande de remboursement." },
  { q: "Les artisans sont-ils vérifiés ?", a: "Oui, tous les artisans avec le badge 'Vérifié' ont été contrôlés par l'équipe Atlas : identité, adresse, et qualité des productions vérifiées physiquement." },
  { q: "Puis-je payer en espèces ?", a: "Oui, la livraison contre remboursement (espèces à la livraison) est disponible moyennant 200 DA de frais supplémentaires." },
  { q: "Comment contacter le service client ?", a: "Via le chat intégré dans chaque commande, par email à support@atlas.dz, ou au 3030 (numéro vert, Dim-Jeu 8h-18h)." },
]

export default function CommentCaMarchePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16 px-4 bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[26px] font-medium text-[#1F3A5F] mb-3" style={{ letterSpacing: "-0.5px" }}>
              Comment ça marche ?
            </h1>
            <p className="text-sm text-[#6B7280]">
              Atlas est conçu pour que vous achetiez et vendiez en toute confiance.
            </p>
          </div>
        </section>

        {/* Escrow detail */}
        <section id="escrow" className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
              🛡️ Atlas Escrow — Votre paiement protégé
            </h2>
            <EscrowBadge variant="detailed" />
            <div className="mt-6 space-y-3 text-sm text-[#6B7280]">
              <p>L&apos;Atlas Escrow est inspiré du système de tiers de confiance utilisé par les plateformes mondiales les plus fiables. Il garantit que vous ne perdez jamais votre argent.</p>
              <p>En cas de litige, notre équipe examine les preuves (photos, échanges de messages) et rend une décision dans les 72h.</p>
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section id="livraison" className="py-12 px-4 bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
              🚚 Modes de livraison
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Point relais Atlas", price: "300 DA", delay: "2–3 jours", desc: "Réseau de 500+ points dans 69 wilayas." },
                { label: "Domicile", price: "600 DA", delay: "1–2 jours", desc: "Livraison directe chez vous dans les grandes villes." },
                { label: "Yalidine Express", price: "450 DA", delay: "3–5 jours", desc: "Partenariat avec Yalidine pour toute l'Algérie." },
                { label: "Click & Collect", price: "Gratuit", delay: "Le jour même", desc: "Récupérez directement chez le vendeur." },
              ].map((m) => (
                <div key={m.label} className="bg-white rounded-[10px] border border-[#E5E7EB] p-4">
                  <p className="text-sm font-medium text-[#1F3A5F]">{m.label}</p>
                  <p className="text-[#D97757] text-sm font-medium">{m.price} · {m.delay}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="retours" className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
              Questions fréquentes
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-[#E5E7EB] rounded-[8px] px-4">
                  <AccordionTrigger className="text-sm font-medium text-[#1F3A5F] hover:text-[#D97757] py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#6B7280] pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
