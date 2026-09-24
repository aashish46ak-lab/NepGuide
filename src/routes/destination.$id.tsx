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
import { LiveTrekMap } from "@/components/LiveTrekMap";
import { GoogleTrekMap } from "@/components/GoogleTrekMap";
import { getDestination } from "@/data/destinations";
import { ROUTE_PATHS } from "@/data/routes-geo";

export const Route = createFileRoute("/destination/$id")({
  component: DestinationPage,
});

function DestinationPage() {
  const { id } = Route.useParams();
  const d = getDestination(id);
  const hasMap = Boolean(ROUTE_PATHS[id]);

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

      <div className="border-b border-white/10 bg-[#0a1610] pt-16">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <p className="flex items-center gap-1 text-sm text-emerald-300">
            <MapPin className="h-3.5 w-3.5" />
            {d.region}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {d.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60">{d.short}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-400" />
              {d.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-teal-400" />
              {d.difficulty}
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4 text-amber-400" />
              {d.cost}
            </span>
            <span className="flex items-center gap-1.5">
              <Mountain className="h-4 w-4 text-sky-400" />
              {d.season}
            </span>
          </div>
        </div>
      </div>

      {/* LIVE MAP + tracking */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <RouteIcon className="h-5 w-5 text-emerald-400" />
          Live map & navigation
        </h2>
        {hasMap ? (
          <LiveTrekMap routeId={id} height={500} />
        ) : (
          <div className="flex h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a1610] text-sm text-white/50">
            Live map for this destination coming soon
          </div>
        )}

        {/* Google Maps alternative */}
        {hasMap && (
          <div className="mt-8">
            <h3 className="mb-3 text-base font-semibold text-white/90">
              Also open in Google Maps
            </h3>
            <GoogleTrekMap routeId={id} height={360} />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
        <section className="mt-2">
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

        {d.budget && d.budget.length > 0 && (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Wallet className="h-5 w-5 text-amber-400" />
              Estimated budget
            </h2>
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
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore more
          </Link>
        </div>
      </div>
    </div>
  );
}
