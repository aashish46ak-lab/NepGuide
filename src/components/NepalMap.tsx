import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ROUTE_PATHS, NEPAL_CENTER } from "@/data/routes-geo";
import { getDestination } from "@/data/destinations";

interface NepalMapProps {
  routeId?: string | null;
  className?: string;
  height?: number;
  /** Auto-fit and show route immediately */
  autoFocus?: boolean;
}

export function NepalMap({
  routeId,
  className = "",
  height = 480,
  autoFocus = true,
}: NepalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

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
      center: NEPAL_CENTER,
      zoom: 6.5,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      "top-right"
    );
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );
    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.on("load", () => {
      map.addSource("trek-route", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      // Outer glow
      map.addLayer({
        id: "trek-glow",
        type: "line",
        source: "trek-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#059669",
          "line-width": 12,
          "line-opacity": 0.3,
          "line-blur": 6,
        },
      });

      // Main path
      map.addLayer({
        id: "trek-line",
        type: "line",
        source: "trek-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#10b981",
          "line-width": 4.5,
          "line-opacity": 1,
        },
      });

      // Dashed center for “trail” feel
      map.addLayer({
        id: "trek-dash",
        type: "line",
        source: "trek-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#ecfdf5",
          "line-width": 1.5,
          "line-opacity": 0.7,
          "line-dasharray": [1, 2],
        },
      });
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const apply = () => {
      const path = routeId ? ROUTE_PATHS[routeId] : null;
      const lineSource = map.getSource("trek-route") as
        | maplibregl.GeoJSONSource
        | undefined;
      if (!lineSource) return;

      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (!path || path.length < 2) {
        lineSource.setData({ type: "FeatureCollection", features: [] });
        map.flyTo({ center: NEPAL_CENTER, zoom: 6.5, duration: 800 });
        return;
      }

      const coords = path.map((p) => p.coords);

      lineSource.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: coords },
      });

      // Start / middle / end markers with labels
      path.forEach((pt, i) => {
        const isStart = i === 0;
        const isEnd = i === path.length - 1;

        const el = document.createElement("div");
        el.style.cssText = `
          display: flex; flex-direction: column; align-items: center;
          cursor: default; pointer-events: auto;
        `;

        const dot = document.createElement("div");
        dot.style.cssText = `
          width: ${isStart || isEnd ? 16 : 11}px;
          height: ${isStart || isEnd ? 16 : 11}px;
          border-radius: 50%;
          background: ${isStart ? "#34d399" : isEnd ? "#f59e0b" : "#fbbf24"};
          border: 2.5px solid #064e3b;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        `;

        const label = document.createElement("div");
        label.textContent = pt.name;
        label.style.cssText = `
          margin-top: 4px;
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(12, 26, 20, 0.92);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        `;

        el.appendChild(dot);
        el.appendChild(label);

        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(pt.coords)
          .addTo(map);

        markersRef.current.push(marker);
      });

      if (autoFocus) {
        const bounds = new maplibregl.LngLatBounds();
        coords.forEach((c) => bounds.extend(c as [number, number]));
        map.fitBounds(bounds, {
          padding: { top: 70, bottom: 50, left: 50, right: 50 },
          duration: 1400,
          maxZoom: 11,
        });
      }
    };

    if (map.isStyleLoaded()) apply();
    else map.once("load", apply);
  }, [routeId, autoFocus]);

  const dest = routeId ? getDestination(routeId) : null;
  const hasRoute = routeId && ROUTE_PATHS[routeId];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1610] ${className}`}
    >
      <div ref={containerRef} style={{ height, width: "100%" }} />

      {dest && hasRoute && (
        <div className="absolute left-3 top-3 z-10 max-w-[240px] rounded-xl border border-white/15 bg-[#0c1a14]/92 px-3 py-2.5 shadow-lg backdrop-blur-md">
          <p className="text-sm font-semibold text-white">{dest.name}</p>
          <p className="mt-0.5 text-xs text-white/55">
            {dest.duration} · {dest.difficulty} · {dest.distance || "Route"}
          </p>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-white/50">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Start
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
              End
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
              Stops
            </span>
          </div>
        </div>
      )}

      {routeId && !hasRoute && (
        <div className="absolute inset-x-0 bottom-4 text-center text-xs text-white/60">
          Route path coming soon for this destination
        </div>
      )}
    </div>
  );
}
