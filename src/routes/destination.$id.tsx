import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  MapPin,
  Clock,
  TrendingUp,
  Wallet,
  Mountain,
  Route as RouteIcon,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { getDestination } from "@/data/destinations";

export const Route = createFileRoute("/destination/$id")({
  component: DestinationPage,
});

function DestinationPage() {
  const { id } = Route.useParams();
  const d = getDestination(id);

  if (!d) {
    return (
      <div className="min-h-screen bg-[#0c1a14]">
        <Navbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-16 text-center">
          <h1 className="text-2xl font-bold text-white">Destination not found</h1>
          <Link to="/" className="mt-4 text-emerald-400 hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1a14]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[42vh] min-h-[280px] w-full">
        <img
          src={d.image}
          alt={d.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a14] via-[#0c1a14]/50 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <p className="flex items-center gap-1 text-sm text-emerald-300">
              <MapPin className="h-3.5 w-3.5" />
              {d.region}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {d.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Clock, label: "Duration", value: d.duration },
            { icon: TrendingUp, label: "Difficulty", value: d.difficulty },
            { icon: Wallet, label: "Budget", value: d.cost },
            { icon: Mountain, label: "Season", value: d.season },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <s.icon className="mb-2 h-4 w-4 text-emerald-400" />
              <p className="text-[11px] uppercase tracking-wide text-white/45">
                {s.label}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Overview</h2>
          <p className="mt-3 leading-relaxed text-white/70">
            {d.description || d.short}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            {d.start && (
              <span>
                <strong className="text-white/80">Start:</strong> {d.start}
              </span>
            )}
            {d.end && (
              <span>
                <strong className="text-white/80">End:</strong> {d.end}
              </span>
            )}
            {d.distance && (
              <span>
                <strong className="text-white/80">Distance:</strong> {d.distance}
              </span>
            )}
            {d.maxElev && (
              <span>
                <strong className="text-white/80">Max elev:</strong> {d.maxElev}
              </span>
            )}
            {d.permits && (
              <span>
                <strong className="text-white/80">Permits:</strong> {d.permits}
              </span>
            )}
          </div>
        </section>

        {/* Day-by-day route */}
        {d.stops && d.stops.length > 0 && (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <RouteIcon className="h-5 w-5 text-emerald-400" />
              Day-by-day route
            </h2>
            <ol className="mt-5 space-y-0">
              {d.stops.map((stop, i) => (
                <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < d.stops!.length - 1 && (
                    <span className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-white/10" />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-xs font-bold text-emerald-300">
                    {stop.day}
                  </span>
                  <div className="pt-1">
                    <p className="font-medium text-white">{stop.name}</p>
                    <p className="mt-0.5 text-sm text-white/50">
                      {[stop.elev, stop.note].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Budget */}
        {d.budget && d.budget.length > 0 && (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Wallet className="h-5 w-5 text-amber-400" />
              Estimated budget
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Approximate costs in USD. Not guaranteed prices.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <tbody>
                  {d.budget.map((b) => (
                    <tr
                      key={b.category}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-4 py-3 text-white/75">{b.category}</td>
                      <td className="px-4 py-3 text-right font-medium text-emerald-300">
                        {b.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-right text-sm text-white/60">
              Total estimate:{" "}
              <span className="font-semibold text-white">{d.cost}</span>
            </p>
          </section>
        )}

        {/* Tips */}
        {d.tips && d.tips.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-white">Tips</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-white/70">
              {d.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore more destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
