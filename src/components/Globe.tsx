import { useEffect, useRef, useState, useCallback } from "react";
import GlobeGL from "react-globe.gl";

/** Only countries we care about — clean markers */
export const COUNTRIES = [
  { name: "Nepal", lat: 28.39, lng: 84.12, active: true },
  { name: "India", lat: 22.5, lng: 79.0, active: false },
  { name: "Bhutan", lat: 27.5, lng: 90.4, active: false },
  { name: "Pakistan", lat: 30.4, lng: 69.3, active: false },
  { name: "Japan", lat: 36.2, lng: 138.3, active: false },
  { name: "Peru", lat: -9.2, lng: -75.0, active: false },
  { name: "Tanzania", lat: -6.4, lng: 34.9, active: false },
  { name: "New Zealand", lat: -41.0, lng: 174.0, active: false },
  { name: "Switzerland", lat: 46.8, lng: 8.2, active: false },
  { name: "Chile", lat: -35.7, lng: -71.5, active: false },
  { name: "Norway", lat: 60.5, lng: 8.5, active: false },
  { name: "Kyrgyzstan", lat: 41.2, lng: 74.8, active: false },
];

interface GlobeProps {
  focusCountry?: string | null;
  onCountryClick?: (name: string, active: boolean) => void;
  height?: number;
}

export function Globe({ focusCountry, onCountryClick, height = 480 }: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 640, height });
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
      const w = Math.min(window.innerWidth - 32, 720);
      setDimensions({ width: w, height: Math.min(height, Math.max(340, w * 0.7)) });
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
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = true;
      controls.minDistance = 140;
      controls.maxDistance = 450;
    }
    globeRef.current.pointOfView({ lat: 28.4, lng: 84.1, altitude: 2.15 }, 2000);
  }, []);

  useEffect(() => {
    if (!focusCountry || !globeRef.current) return;
    const point = COUNTRIES.find(
      (p) => p.name.toLowerCase() === focusCountry.toLowerCase()
    );
    if (point) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 1.55 },
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
      if (globeRef.current && match) {
        globeRef.current.controls().autoRotate = false;
        globeRef.current.pointOfView(
          { lat: match.lat, lng: match.lng, altitude: 1.55 },
          1200
        );
      }
    },
    [onCountryClick]
  );

  const getPolygonColor = (d: any) => {
    const name = (d.properties?.NAME || d.properties?.name || "").toLowerCase();
    const focused = focusCountry && name === focusCountry.toLowerCase();
    if (focused) return "rgba(16, 185, 129, 0.55)";
    if (hoverD === d) return "rgba(52, 211, 153, 0.35)";
    if (name === "nepal") return "rgba(16, 185, 129, 0.4)";
    const known = COUNTRIES.some((c) => c.name.toLowerCase() === name);
    if (known) return "rgba(71, 85, 105, 0.25)";
    return "rgba(15, 23, 42, 0.08)";
  };

  // Rings only for Nepal + focused country — cleaner look
  const ringsData = COUNTRIES.filter(
    (c) =>
      c.active ||
      (focusCountry && c.name.toLowerCase() === focusCountry.toLowerCase())
  ).map((c) => ({
    lat: c.lat,
    lng: c.lng,
    maxR: c.active ? 4 : 3,
    propagationSpeed: 2,
    repeatPeriod: 1400,
  }));

  const labelsData = COUNTRIES.filter(
    (c) =>
      c.active ||
      (focusCountry && c.name.toLowerCase() === focusCountry.toLowerCase())
  );

  return (
    <div className="relative mx-auto flex w-full max-w-3xl items-center justify-center">
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#34d399"
        atmosphereAltitude={0.15}
        polygonsData={countries}
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => "rgba(0,0,0,0.12)"}
        polygonStrokeColor={() => "rgba(148, 163, 184, 0.25)"}
        polygonAltitude={(d: any) => {
          const name = (d.properties?.NAME || "").toLowerCase();
          if (name === "nepal") return 0.012;
          if (focusCountry && name === focusCountry.toLowerCase()) return 0.014;
          if (hoverD === d) return 0.01;
          return 0.003;
        }}
        onPolygonHover={setHoverD}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={280}
        // Soft pulse rings for Nepal / selected
        ringsData={ringsData}
        ringColor={() => "rgba(16, 185, 129, 0.45)"}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        // Labels only for key countries
        labelsData={labelsData}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.4}
        labelDotRadius={0.45}
        labelColor={() => "#a7f3d0"}
        labelAltitude={0.02}
        labelResolution={2}
        onLabelClick={(d: any) => {
          const match = COUNTRIES.find((c) => c.name === d.name);
          onCountryClick?.(d.name, match?.active ?? false);
        }}
      />
    </div>
  );
}
