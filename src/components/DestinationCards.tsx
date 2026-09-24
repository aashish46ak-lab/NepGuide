import { Link } from "@tanstack/react-router";
import { MapPin, Clock, TrendingUp, Wallet } from "lucide-react";
import { NEPAL_DESTINATIONS, type Destination } from "@/data/destinations";

function Card({ d }: { d: Destination }) {
  return (
    <Link
      to="/destination/$id"
      params={{ id: d.id }}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-emerald-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-900/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={d.image}
          alt={d.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300">
          {d.name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/50">
          <MapPin className="h-3 w-3" />
          {d.region}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-white/65">{d.short}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/55">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
            {d.duration}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-teal-400" />
            {d.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="h-3.5 w-3.5 text-amber-400" />
            {d.cost}
          </span>
        </div>

        <p className="mt-3 text-xs font-medium text-emerald-400/80 opacity-0 transition group-hover:opacity-100">
          View route & budget →
        </p>
      </div>
    </Link>
  );
}

export function DestinationCards() {
  const featured = NEPAL_DESTINATIONS.filter((d) => d.featured);
  const rest = NEPAL_DESTINATIONS.filter((d) => !d.featured);

  return (
    <section id="destinations" className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Click any card for day-by-day routes, budget breakdown and travel tips.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <Card key={d.id} d={d} />
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <h3 className="mb-5 mt-14 text-xl font-semibold text-white/90">
              More to explore
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map((d) => (
                <Card key={d.id} d={d} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
