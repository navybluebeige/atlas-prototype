import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AccountSidebar } from "@/components/layout/AccountSidebar"
import { EscrowBadge } from "@/components/checkout/EscrowBadge"

const ORDERS = [
  { id: "ATL-2026-84712", date: "10 mai 2026", items: ["Kaftan traditionnel brodé main", "Sac en cuir véritable"], total: "18 300 DA", status: "En cours", statusColor: "bg-blue-100 text-blue-700", escrow: true },
  { id: "ATL-2026-71053", date: "28 avril 2026", items: ["Sac en cuir véritable"], total: "5 800 DA", status: "Livré", statusColor: "bg-[#F0FDF4] text-[#16A34A]", escrow: false },
  { id: "ATL-2026-59841", date: "15 avril 2026", items: ["Kaftan traditionnel brodé main"], total: "12 500 DA", status: "Livré", statusColor: "bg-[#F0FDF4] text-[#16A34A]", escrow: false },
  { id: "ATL-2026-43210", date: "2 mars 2026", items: ["Burnous traditionnel brodé"], total: "18 000 DA", status: "Litige", statusColor: "bg-orange-100 text-orange-700", escrow: true },
]

export default function CommandesPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-[22px] font-medium text-[#1F3A5F] mb-6" style={{ letterSpacing: "-0.4px" }}>
            Mes commandes
          </h1>
          <div className="space-y-4">
            {ORDERS.map((order) => (
              <div key={order.id} className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
                  <div>
                    <p className="text-sm font-medium text-[#1F3A5F]">{order.id}</p>
                    <p className="text-xs text-[#6B7280]">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#1F3A5F]">{order.total}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                  </div>
                </div>
                <div className="px-5 py-3">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-xs text-[#6B7280] py-0.5">— {item}</p>
                  ))}
                  {order.escrow && (
                    <div className="mt-3">
                      <EscrowBadge variant="compact" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
