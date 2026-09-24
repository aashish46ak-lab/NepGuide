import { useEffect, useRef, useState, useCallback } from "react";
import GlobeGL from "react-globe.gl";

export const COUNTRIES = [
  { name: "Nepal", lat: 28.39, lng: 84.12, size: 1.0, color: "#10b981", active: true },
  { name: "India", lat: 20.59, lng: 78.96, size: 0.55, color: "#34d399", active: false },
  { name: "Bhutan", lat: 27.51, lng: 90.43, size: 0.45, color: "#34d399", active: false },
  { name: "Pakistan", lat: 30.37, lng: 69.34, size: 0.45, color: "#64748b", active: false },
  { name: "Japan", lat: 36.2, lng: 138.25, size: 0.5, color: "#64748b", active: false },
  { name: "Peru", lat: -9.19, lng: -75.01, size: 0.5, color: "#64748b", active: false },
  { name: "Tanzania", lat: -6.36, lng: 34.88, size: 0.45, color: "#64748b", active: false },
  { name: "New Zealand", lat: -40.9, lng: 174.88, size: 0.5, color: "#64748b", active: false },
  { name: "Switzerland", lat: 46.81, lng: 8.22, size: 0.4, color: "#64748b", active: false },
  { name: "Chile", lat: -35.67, lng: -71.54, size: 0.5, color: "#64748b", active: false },
  { name: "Norway", lat: 60.47, lng: 8.46, size: 0.45, color: "#64748b", active: false },
  { name: "Kyrgyzstan", lat: 41.2, lng: 74.76, size: 0.4, color: "#64748b", active: false },
  { name: "China", lat: 35.86, lng: 104.19, size: 0.4, color: "#475569", active: false },
  { name: "USA", lat: 37.09, lng: -95.71, size: 0.4, color: "#475569", active: false },
  { name: "France", lat: 46.22, lng: 2.21, size: 0.35, color: "#475569", active: false },
  { name: "Italy", lat: 41.87, lng: 12.56, size: 0.35, color: "#475569", active: false },
  { name: "Iceland", lat: 64.96, lng: -19.02, size: 0.4, color: "#475569", active: false },
  { name: "Morocco", lat: 31.79, lng: -7.09, size: 0.35, color: "#475569", active: false },
  { name: "Argentina", lat: -38.41, lng: -63.61, size: 0.4, color: "#475569", active: false },
  { name: "Australia", lat: -25.27, lng: 133.77, size: 0.45, color: "#475569", active: false },
];

interface GlobeProps {
  focusCountry?: string | null;
  onCountryClick?: (name: string, active: boolean) => void;
  height?: number;
}

export function Globe({ focusCountry, onCountryClick, height = 520 }: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height });
  const [countries, setCountries] = useState<any[]>([]);
  const [hoverD, setHoverD] = useState<any>(null);

  useEffect(() => {
    fetch("/countries-110m.geojson")
      .then((r) => r.json())
      .then((geo) => {
        if (geo?.features) setCountries(geo.features);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const update = () => {
      const w = Math.min(window.innerWidth - 24, 960);
      setDimensions({ width: w, height: Math.min(height, Math.max(360, w * 0.65)) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height]);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableZoom = true;
      controls.minDistance = 120;
      controls.maxDistance = 500;
    }
    globeRef.current.pointOfView({ lat: 28.4, lng: 84.1, altitude: 2.0 }, 1800);
  }, []);

  useEffect(() => {
    if (!focusCountry || !globeRef.current) return;
    const point = COUNTRIES.find(
      (p) => p.name.toLowerCase() === focusCountry.toLowerCase()
    );
    if (point) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 1.6 },
        1400
      );
    }
  }, [focusCountry]);

  const handlePolygonClick = useCallback(
    (polygon: any) => {
      if (!polygon) return;
      const name =
        polygon.properties?.NAME ||
        polygon.properties?.name ||
        polygon.properties?.ADMIN ||
        "";
      if (!name) return;
      const match = COUNTRIES.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      onCountryClick?.(name, match?.active ?? false);
      if (globeRef.current) {
        const lat = polygon.properties?.LABEL_Y ?? match?.lat;
        const lng = polygon.properties?.LABEL_X ?? match?.lng;
        if (lat && lng) {
          globeRef.current.controls().autoRotate = false;
          globeRef.current.pointOfView({ lat, lng, altitude: 1.6 }, 1200);
        }
      }
    },
    [onCountryClick]
  );

  const getPolygonColor = (d: any) => {
    const name = (d.properties?.NAME || d.properties?.name || "").toLowerCase();
    if (focusCountry && name === focusCountry.toLowerCase()) return "rgba(16,185,129,0.55)";
    if (hoverD === d) return "rgba(52,211,153,0.4)";
    if (name === "nepal") return "rgba(16,185,129,0.35)";
    const known = COUNTRIES.find((c) => c.name.toLowerCase() === name);
    if (known?.active) return "rgba(16,185,129,0.25)";
    if (known) return "rgba(100,116,139,0.2)";
    return "rgba(30,41,59,0.15)";
  };

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl">
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#10b981"
        atmosphereAltitude={0.2}
        polygonsData={countries}
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => "rgba(0,0,0,0.05)"}
        polygonStrokeColor={() => "#1e293b"}
        polygonAltitude={(d: any) =>
          hoverD === d ||
          (focusCountry &&
            (d.properties?.NAME || "").toLowerCase() === focusCountry.toLowerCase())
            ? 0.02
            : 0.005
        }
        onPolygonHover={setHoverD}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={300}
        pointsData={COUNTRIES}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.015}
        pointRadius="size"
        pointColor="color"
        pointLabel={(d: any) =>
          `${d.name}${d.active ? " ✓" : " (coming soon)"}`
        }
        onPointClick={(d: any) => {
          onCountryClick?.(d.name, d.active);
        }}
        pointsMerge={false}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c1a14]/70 to-transparent" />
    </div>
  );
}
