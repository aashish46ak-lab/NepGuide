import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ROUTE_COORDS, NEPAL_CENTER } from "@/data/routes-geo";
import { getDestination } from "@/data/destinations";

interface NepalMapProps {
  routeId?: string | null;
  className?: string;
  height?: number;
}

export function NepalMap({ routeId, className = "", height = 420 }: NepalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: NEPAL_CENTER,
      zoom: 6.2,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      map.addSource("trek-route", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "trek-line-glow",
        type: "line",
        source: "trek-route",
        paint: {
          "line-color": "#10b981",
          "line-width": 8,
          "line-opacity": 0.25,
          "line-blur": 4,
        },
      });

      map.addLayer({
        id: "trek-line",
        type: "line",
        source: "trek-route",
        paint: {
          "line-color": "#34d399",
          "line-width": 3.5,
          "line-opacity": 0.95,
        },
      });

      map.addSource("trek-points", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "trek-points",
        type: "circle",
        source: "trek-points",
        paint: {
          "circle-radius": 6,
          "circle-color": "#fbbf24",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#064e3b",
        },
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update route when routeId changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const apply = () => {
      const coords = routeId ? ROUTE_COORDS[routeId] : null;
      const lineSource = map.getSource("trek-route") as maplibregl.GeoJSONSource | undefined;
      const pointSource = map.getSource("trek-points") as maplibregl.GeoJSONSource | undefined;
      if (!lineSource || !pointSource) return;

      if (!coords || coords.length < 2) {
        lineSource.setData({ type: "FeatureCollection", features: [] });
        pointSource.setData({ type: "FeatureCollection", features: [] });
        map.flyTo({ center: NEPAL_CENTER, zoom: 6.2, duration: 1000 });
        return;
      }

      lineSource.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: coords },
      });

      pointSource.setData({
        type: "FeatureCollection",
        features: coords.map((c, i) => ({
          type: "Feature",
          properties: { i },
          geometry: { type: "Point", coordinates: c },
        })),
      });

      const bounds = new maplibregl.LngLatBounds();
      coords.forEach((c) => bounds.extend(c as [number, number]));
      map.fitBounds(bounds, { padding: 60, duration: 1200, maxZoom: 10 });
    };

    if (map.isStyleLoaded()) apply();
    else map.once("load", apply);
  }, [routeId]);

  const dest = routeId ? getDestination(routeId) : null;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      <div ref={containerRef} style={{ height, width: "100%" }} />
      {dest && (
        <div className="absolute left-3 top-3 max-w-[220px] rounded-xl border border-white/15 bg-[#0c1a14]/90 px-3 py-2 text-sm backdrop-blur-md">
          <p className="font-semibold text-white">{dest.name}</p>
          <p className="text-xs text-white/55">
            {dest.duration} · {dest.difficulty}
          </p>
        </div>
      )}
      {!routeId && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-white/50">
          Search a trek to draw its route on the map
        </div>
      )}
    </div>
  );
}
