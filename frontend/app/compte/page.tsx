import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AccountSidebar } from "@/components/layout/AccountSidebar"
import { Package, Heart, CreditCard, Star } from "lucide-react"
import Link from "next/link"

const KPIs = [
  { label: "Commandes en cours", value: "2", icon: Package, color: "bg-[#F0F4F9] text-[#1F3A5F]", href: "/compte/commandes" },
  { label: "Total dépensé", value: "34 500 DA", icon: CreditCard, color: "bg-[#FEF3EC] text-[#D97757]", href: "/compte/commandes" },
  { label: "Articles favoris", value: "8", icon: Heart, color: "bg-[#FFF1F0] text-red-500", href: "/compte/favoris" },
  { label: "Points fidélité", value: "345", icon: Star, color: "bg-[#FFFBEB] text-[#FACC15]", href: "/compte" },
]

const RECENT_ORDERS = [
  { id: "ATL-2026-84712", date: "10 mai 2026", total: "18 300 DA", status: "En cours", statusColor: "bg-blue-100 text-blue-700" },
  { id: "ATL-2026-71053", date: "28 avril 2026", total: "5 800 DA", status: "Livré", statusColor: "bg-[#F0FDF4] text-[#16A34A]" },
  { id: "ATL-2026-59841", date: "15 avril 2026", total: "12 500 DA", status: "Livré", statusColor: "bg-[#F0FDF4] text-[#16A34A]" },
]

export default function ComptePage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
            Mon espace
          </h1>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {KPIs.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Link key={kpi.label} href={kpi.href}>
                  <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-4 hover:shadow-sm transition">
                    <div className={`w-9 h-9 rounded-[8px] ${kpi.color} flex items-center justify-center mb-3`}>
                      <Icon size={17} />
                    </div>
                    <p className="text-xl font-medium text-[#1F3A5F]">{kpi.value}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{kpi.label}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Recent orders */}
          <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-sm font-medium text-[#1F3A5F]">Dernières commandes</h2>
              <Link href="/compte/commandes" className="text-xs text-[#D97757] hover:text-[#B85942]">Voir tout →</Link>
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-[#1F3A5F]">{order.id}</p>
                    <p className="text-xs text-[#6B7280]">{order.date}</p>
                  </div>
                  <span className="text-sm font-medium text-[#1F3A5F]">{order.total}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
