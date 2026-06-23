"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Heart, Settings, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const NAV = [
  { href: "/compte", label: "Dashboard", icon: LayoutDashboard },
  { href: "/compte/commandes", label: "Mes commandes", icon: Package },
  { href: "/compte/favoris", label: "Mes favoris", icon: Heart },
  { href: "/compte/parametres", label: "Paramètres", icon: Settings },
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0">
      {/* User info */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-white border border-[#E5E7EB] rounded-[10px]">
        <div className="w-10 h-10 rounded-full bg-[#1F3A5F] flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#1F3A5F]">Yasmine A.</p>
          <p className="text-xs text-[#6B7280]">yasmine@demo.dz</p>
        </div>
      </div>

      <nav className="space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-sm font-medium transition",
              pathname === href
                ? "bg-[#1F3A5F] text-white"
                : "text-[#6B7280] hover:bg-[#F5F0E8] hover:text-[#1F3A5F]"
            )}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-sm font-medium text-red-500 hover:bg-red-50 transition mt-2">
          <LogOut size={15} />
          Déconnexion
        </button>
      </nav>
    </aside>
  )
}
