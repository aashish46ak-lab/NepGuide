import { ExternalLink, MapPinned } from "lucide-react";
import { ROUTE_PATHS } from "@/data/routes-geo";
import { getDestination } from "@/data/destinations";

interface GoogleTrekMapProps {
  routeId: string;
  height?: number;
  className?: string;
}

/** Build Google Maps directions URL (opens full route) */
export function buildGoogleMapsUrl(routeId: string): string | null {
  const path = ROUTE_PATHS[routeId];
  if (!path || path.length < 2) return null;

  const origin = `${path[0].coords[1]},${path[0].coords[0]}`; // lat,lng
  const destination = `${path[path.length - 1].coords[1]},${path[path.length - 1].coords[0]}`;
  const middle = path.slice(1, -1);
  const waypoints =
    middle.length > 0
      ? middle.map((p) => `${p.coords[1]},${p.coords[0]}`).join("|")
      : "";

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
  if (waypoints) url += `&waypoints=${encodeURIComponent(waypoints)}`;
  return url;
}

/** Embed URL for iframe — multi-stop dir with output=embed */
function buildEmbedUrl(routeId: string): string | null {
  const path = ROUTE_PATHS[routeId];
  if (!path || path.length < 2) return null;

  // maps/dir/lat,lng/lat,lng/... works well in embed
  const parts = path.map((p) => `${p.coords[1]},${p.coords[0]}`);
  return `https://www.google.com/maps/dir/${parts.join("/")}/data=!3m1!4b1!4m2!4m1!3e2`;
}

export function GoogleTrekMap({
  routeId,
  height = 520,
  className = "",
}: GoogleTrekMapProps) {
  const path = ROUTE_PATHS[routeId];
  const dest = getDestination(routeId);
  const embedUrl = buildEmbedUrl(routeId);
  const openUrl = buildGoogleMapsUrl(routeId);

  if (!path || !embedUrl) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-white/10 bg-[#0a1610] text-sm text-white/50 ${className}`}
        style={{ height }}
      >
        Map route not available for this trek yet
      </div>
    );
  }

  const start = path[0].name;
  const end = path[path.length - 1].name;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1610] ${className}`}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0c1a14] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <MapPinned className="h-4 w-4 text-emerald-400" />
          <span>
            <strong className="text-white">{dest?.name || routeId}</strong>
            <span className="text-white/50"> · {start} → {end}</span>
          </span>
        </div>
        {openUrl && (
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-400"
          >
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* Google Maps embed */}
      <iframe
        title={`${dest?.name || "Trek"} route map`}
        src={embedUrl}
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Stop list under map */}
      <div className="border-t border-white/10 bg-[#0c1a14] px-4 py-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">
          Route stops
        </p>
        <div className="flex flex-wrap gap-2">
          {path.map((p, i) => (
            <span
              key={p.name + i}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 0
                    ? "bg-emerald-500 text-white"
                    : i === path.length - 1
                      ? "bg-amber-500 text-black"
                      : "bg-white/15 text-white/90"
                }`}
              >
                {i + 1}
              </span>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
