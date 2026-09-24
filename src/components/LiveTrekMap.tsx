import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Navigation,
  MapPin,
  Clock,
  LocateFixed,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { ROUTE_PATHS } from "@/data/routes-geo";
import { getDestination } from "@/data/destinations";
import {
  remainingAlongRoute,
  formatDistance,
  formatETA,
  distanceMeters,
} from "@/lib/geo";
import { buildGoogleMapsUrl } from "./GoogleTrekMap";

interface LiveTrekMapProps {
  routeId: string;
  height?: number;
}

type LocState =
  | { status: "idle" }
  | { status: "requesting" }
  | { status: "tracking"; lat: number; lng: number; accuracy: number }
  | { status: "error"; message: string };

export function LiveTrekMap({ routeId, height = 480 }: LiveTrekMapProps) {
  const path = ROUTE_PATHS[routeId];
  const dest = getDestination(routeId);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const stopMarkersRef = useRef<maplibregl.Marker[]>([]);
  const watchIdRef = useRef<number | null>(null);

  const [loc, setLoc] = useState<LocState>({ status: "idle" });
  const [follow, setFollow] = useState(true);

  const googleUrl = buildGoogleMapsUrl(routeId);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current || !path) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap",
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
      center: path[0].coords,
      zoom: 10,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.on("load", () => {
      const coords = path.map((p) => p.coords);

      map.addSource("trek-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: coords },
        },
      });

      map.addLayer({
        id: "trek-glow",
        type: "line",
        source: "trek-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#059669",
          "line-width": 12,
          "line-opacity": 0.28,
          "line-blur": 5,
        },
      });

      map.addLayer({
        id: "trek-line",
        type: "line",
        source: "trek-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#10b981",
          "line-width": 4.5,
        },
      });

      // Stop markers
      path.forEach((pt, i) => {
        const isStart = i === 0;
        const isEnd = i === path.length - 1;
        const el = document.createElement("div");
        el.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center">
            <div style="width:${isStart || isEnd ? 14 : 10}px;height:${isStart || isEnd ? 14 : 10}px;border-radius:50%;background:${isStart ? "#34d399" : isEnd ? "#f59e0b" : "#fbbf24"};border:2px solid #064e3b;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>
            <div style="margin-top:3px;padding:1px 6px;border-radius:5px;background:rgba(12,26,20,.9);color:#fff;font-size:10px;font-weight:600;white-space:nowrap;border:1px solid rgba(255,255,255,.1)">${pt.name}</div>
          </div>`;
        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(pt.coords)
          .addTo(map);
        stopMarkersRef.current.push(marker);
      });

      const bounds = new maplibregl.LngLatBounds();
      coords.forEach((c) => bounds.extend(c as [number, number]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 11, duration: 0 });
    });

    mapRef.current = map;

    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      stopMarkersRef.current.forEach((m) => m.remove());
      stopMarkersRef.current = [];
      userMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [routeId, path]);

  const updateUserOnMap = useCallback(
    (lat: number, lng: number, accuracy: number) => {
      const map = mapRef.current;
      if (!map) return;

      if (!userMarkerRef.current) {
        const el = document.createElement("div");
        el.innerHTML = `
          <div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center">
            <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(59,130,246,0.25);animation:pulse 2s infinite"></div>
            <div style="width:16px;height:16px;border-radius:50%;background:#3b82f6;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.45);z-index:1"></div>
          </div>
          <style>@keyframes pulse{0%{transform:scale(.8);opacity:1}100%{transform:scale(1.6);opacity:0}}</style>
        `;
        userMarkerRef.current = new maplibregl.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([lng, lat])
          .addTo(map);
      } else {
        userMarkerRef.current.setLngLat([lng, lat]);
      }

      if (follow) {
        map.easeTo({ center: [lng, lat], duration: 600 });
      }

      // Optional accuracy circle via source
      const src = map.getSource("user-acc") as maplibregl.GeoJSONSource | undefined;
      const circle = accuracyCircle(lat, lng, accuracy);
      if (src) {
        src.setData(circle);
      } else if (map.isStyleLoaded()) {
        map.addSource("user-acc", { type: "geojson", data: circle });
        map.addLayer({
          id: "user-acc-fill",
          type: "fill",
          source: "user-acc",
          paint: {
            "fill-color": "#3b82f6",
            "fill-opacity": 0.12,
          },
        });
        map.addLayer({
          id: "user-acc-line",
          type: "line",
          source: "user-acc",
          paint: {
            "line-color": "#3b82f6",
            "line-width": 1.5,
            "line-opacity": 0.4,
          },
        });
      }
    },
    [follow]
  );

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setLoc({ status: "error", message: "Geolocation not supported on this device" });
      return;
    }

    setLoc({ status: "requesting" });

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setLoc({
          status: "tracking",
          lat: latitude,
          lng: longitude,
          accuracy,
        });
        updateUserOnMap(latitude, longitude, accuracy);
      },
      (err) => {
        let message = "Could not get location";
        if (err.code === err.PERMISSION_DENIED)
          message = "Location permission denied — enable GPS in browser settings";
        else if (err.code === err.POSITION_UNAVAILABLE)
          message = "Location unavailable — try outdoors with GPS on";
        else if (err.code === err.TIMEOUT) message = "Location timeout — retry";
        setLoc({ status: "error", message });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 20000,
      }
    );
  }, [updateUserOnMap]);

  const stopTracking = () => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setLoc({ status: "idle" });
  };

  // Stats when tracking
  let stats: {
    toNext: string;
    toEnd: string;
    etaNext: string;
    etaEnd: string;
    nextName: string;
    endName: string;
    offRoute: boolean;
  } | null = null;

  if (loc.status === "tracking" && path) {
    const r = remainingAlongRoute(path, loc.lat, loc.lng);
    const nearestDist = distanceMeters(
      loc.lat,
      loc.lng,
      path[r.nearestIndex].coords[1],
      path[r.nearestIndex].coords[0]
    );
    stats = {
      toNext: formatDistance(r.toNextM),
      toEnd: formatDistance(r.toEndM),
      etaNext: formatETA(r.toNextM),
      etaEnd: formatETA(r.toEndM),
      nextName: path[r.nextIndex].name,
      endName: path[path.length - 1].name,
      offRoute: nearestDist > 3000, // >3km from route
    };
  }

  if (!path) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-white/10 text-sm text-white/50">
        Route data not available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1610]">
      {/* Live stats bar */}
      <div className="border-b border-white/10 bg-[#0c1a14] px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">
              {dest?.name || routeId}
            </p>
            <p className="text-xs text-white/50">
              Live tracking · trail speed ~2.5 km/h
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {loc.status !== "tracking" ? (
              <button
                onClick={startTracking}
                disabled={loc.status === "requesting"}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-400 disabled:opacity-60"
              >
                <LocateFixed className="h-3.5 w-3.5" />
                {loc.status === "requesting" ? "Getting GPS…" : "Start live location"}
              </button>
            ) : (
              <>
                <button
                  onClick={() => setFollow((f) => !f)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    follow
                      ? "bg-blue-500/30 text-blue-200"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {follow ? "Following you" : "Follow off"}
                </button>
                <button
                  onClick={stopTracking}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/15"
                >
                  Stop
                </button>
              </>
            )}
            {googleUrl && (
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {loc.status === "error" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {loc.message}
          </div>
        )}

        {stats && (
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat
              icon={<MapPin className="h-3.5 w-3.5 text-emerald-400" />}
              label={`Next: ${stats.nextName}`}
              value={stats.toNext}
              sub={stats.etaNext}
            />
            <Stat
              icon={<Navigation className="h-3.5 w-3.5 text-amber-400" />}
              label={`To ${stats.endName}`}
              value={stats.toEnd}
              sub={stats.etaEnd}
            />
            <Stat
              icon={<Clock className="h-3.5 w-3.5 text-sky-400" />}
              label="ETA to end"
              value={stats.etaEnd}
              sub="at ~2.5 km/h"
            />
            <Stat
              icon={<LocateFixed className="h-3.5 w-3.5 text-blue-400" />}
              label="GPS accuracy"
              value={
                loc.status === "tracking"
                  ? `±${Math.round(loc.accuracy)} m`
                  : "—"
              }
              sub={stats.offRoute ? "Far from route" : "On trail area"}
            />
          </div>
        )}
      </div>

      <div ref={containerRef} style={{ height, width: "100%" }} />

      {loc.status === "idle" && (
        <p className="border-t border-white/10 px-4 py-2 text-center text-xs text-white/45">
          Tap “Start live location” to show your position, distance left and time estimate
        </p>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-white/45">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <p className="mt-0.5 text-sm font-bold text-white">{value}</p>
      <p className="text-[10px] text-white/40">{sub}</p>
    </div>
  );
}

function accuracyCircle(lat: number, lng: number, radiusM: number) {
  const points = 64;
  const coords: [number, number][] = [];
  const R = 6371000;
  for (let i = 0; i <= points; i++) {
    const bearing = (i / points) * 2 * Math.PI;
    const lat2 = Math.asin(
      Math.sin((lat * Math.PI) / 180) * Math.cos(radiusM / R) +
        Math.cos((lat * Math.PI) / 180) *
          Math.sin(radiusM / R) *
          Math.cos(bearing)
    );
    const lng2 =
      ((lng * Math.PI) / 180 +
        Math.atan2(
          Math.sin(bearing) *
            Math.sin(radiusM / R) *
            Math.cos((lat * Math.PI) / 180),
          Math.cos(radiusM / R) -
            Math.sin((lat * Math.PI) / 180) * Math.sin(lat2)
        )) *
      (180 / Math.PI);
    coords.push([(lng2 * 180) / Math.PI, (lat2 * 180) / Math.PI]);
  }
  // fix: lat2/lng2 already in radians converted wrong — recalculate simply
  const simple: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dx = (radiusM / R) * (180 / Math.PI) * Math.cos(angle);
    const dy =
      ((radiusM / R) * (180 / Math.PI) * Math.sin(angle)) /
      Math.cos((lat * Math.PI) / 180);
    simple.push([lng + dy, lat + dx]);
  }
  return {
    type: "Feature" as const,
    properties: {},
    geometry: { type: "Polygon" as const, coordinates: [simple] },
  };
}
