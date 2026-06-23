import Link from "next/link"
import { Sparkles, ArrowRight, Heart } from "lucide-react"
import { ideas } from "@/lib/data/ideas"

export function IdeasSection() {
  const featured = ideas.slice(0, 5)

  return (
    <section className="py-12 px-4" style={{ background: "linear-gradient(180deg, #F5F0E8 0%, #FAE8DC 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-[#D97757]" />
              <h2 className="text-[22px] font-medium text-[#1F3A5F]" style={{ letterSpacing: "-0.4px" }}>
                Inspiration mode — Idées
              </h2>
            </div>
            <p className="text-sm text-[#6B7280]">Laissez-vous inspirer par nos moodboards curatés</p>
          </div>
          <Link href="/idees" className="flex items-center gap-1 text-sm text-[#D97757] font-medium hover:text-[#B85942] transition">
            Découvrir Idées <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {featured.map((idea) => (
            <Link
              key={idea.id}
              href={`/idees/${idea.id}`}
              className="group relative rounded-[10px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              style={{ aspectRatio: "3/5" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${idea.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-white text-xs font-medium leading-tight mb-1">{idea.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-[10px]">{idea.productIds.length} articles</span>
                  <div className="flex items-center gap-0.5 text-white/70">
                    <Heart size={10} />
                    <span className="text-[10px]">{idea.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
