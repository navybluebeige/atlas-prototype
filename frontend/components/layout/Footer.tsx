import Link from "next/link"
import { Globe, MessageCircle, Video } from "lucide-react"

const footerLinks = [
  {
    title: "Atlas",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Notre mission", href: "/a-propos#mission" },
      { label: "Carrières", href: "/a-propos#carrieres" },
      { label: "Presse", href: "/a-propos#presse" },
    ],
  },
  {
    title: "Acheter",
    links: [
      { label: "Comment ça marche", href: "/comment-ca-marche" },
      { label: "Atlas Escrow", href: "/comment-ca-marche#escrow" },
      { label: "Livraison", href: "/comment-ca-marche#livraison" },
      { label: "Retours & litiges", href: "/comment-ca-marche#retours" },
    ],
  },
  {
    title: "Vendre",
    links: [
      { label: "Devenir vendeur", href: "/vendre" },
      { label: "Espace boutique", href: "/vendre#boutique" },
      { label: "Devenir artisan", href: "/vendre#artisan" },
      { label: "Tarifs", href: "/vendre#tarifs" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Centre d'aide", href: "/comment-ca-marche" },
      { label: "Nous contacter", href: "/a-propos#contact" },
      { label: "CGU & Confidentialité", href: "/a-propos#cgu" },
      { label: "Loi 18-05", href: "/a-propos#loi" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0F1F33] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#D97757] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <span className="text-white text-lg font-semibold">ATLAS</span>
            </Link>
            <p className="text-[#9CA3AF] text-xs leading-relaxed mb-4">
              La première plateforme algérienne dédiée à la mode, à la confiance et au savoir-faire local.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: <Globe size={14} />, label: "Instagram" },
                { icon: <MessageCircle size={14} />, label: "Facebook" },
                { icon: <Video size={14} />, label: "TikTok" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-medium mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#9CA3AF] text-xs hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#9CA3AF] text-xs">
            © 2026 Atlas DZ · Tous droits réservés
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[#9CA3AF] text-xs">🇩🇿 Algérie · Français</span>
            <div className="flex items-center gap-2">
              {/* CIB logo */}
              <div className="h-6 px-2 rounded bg-[#1F3A5F] border border-white/20 flex items-center">
                <span className="text-white text-[10px] font-bold">CIB</span>
              </div>
              {/* EDAHABIA logo */}
              <div className="h-6 px-2 rounded bg-[#FACC15] flex items-center">
                <span className="text-[#1F3A5F] text-[10px] font-bold">EDAHABIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
