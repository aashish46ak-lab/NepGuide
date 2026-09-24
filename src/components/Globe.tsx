import { useEffect, useRef, useState } from "react";
import GlobeGL from "react-globe.gl";

// Approximate country centers for pointing the globe
const COUNTRY_POINTS = [
  { name: "Nepal", lat: 28.39, lng: 84.12, size: 0.8, color: "#10b981" },
  { name: "India", lat: 20.59, lng: 78.96, size: 0.4, color: "#64748b" },
  { name: "Bhutan", lat: 27.51, lng: 90.43, size: 0.35, color: "#64748b" },
  { name: "Pakistan", lat: 30.37, lng: 69.34, size: 0.35, color: "#64748b" },
  { name: "Japan", lat: 36.2, lng: 138.25, size: 0.35, color: "#64748b" },
  { name: "Peru", lat: -9.19, lng: -75.01, size: 0.35, color: "#64748b" },
  { name: "Tanzania", lat: -6.36, lng: 34.88, size: 0.35, color: "#64748b" },
  { name: "New Zealand", lat: -40.9, lng: 174.88, size: 0.35, color: "#64748b" },
  { name: "Switzerland", lat: 46.81, lng: 8.22, size: 0.35, color: "#64748b" },
  { name: "Chile", lat: -35.67, lng: -71.54, size: 0.35, color: "#64748b" },
  { name: "Norway", lat: 60.47, lng: 8.46, size: 0.35, color: "#64748b" },
  { name: "Kyrgyzstan", lat: 41.2, lng: 74.76, size: 0.35, color: "#64748b" },
];

interface GlobeProps {
  focusCountry?: string | null;
  onCountryClick?: (name: string) => void;
  height?: number;
}

export function Globe({ focusCountry, onCountryClick, height = 520 }: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height });

  useEffect(() => {
    const update = () => {
      const w = Math.min(window.innerWidth - 32, 900);
      setDimensions({ width: w, height: Math.min(height, w * 0.75) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height]);

  // Auto-rotate + focus on Nepal initially
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = true;
    }
    // Point toward Nepal
    globeRef.current.pointOfView({ lat: 28.4, lng: 84.1, altitude: 2.2 }, 1500);
  }, []);

  // Focus when country changes
  useEffect(() => {
    if (!focusCountry || !globeRef.current) return;
    const point = COUNTRY_POINTS.find(
      (p) => p.name.toLowerCase() === focusCountry.toLowerCase()
    );
    if (point) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 1.8 },
        1200
      );
    }
  }, [focusCountry]);

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
        atmosphereAltitude={0.18}
        pointsData={COUNTRY_POINTS}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.01}
        pointRadius="size"
        pointColor="color"
        pointLabel={(d: any) => d.name}
        onPointClick={(d: any) => {
          onCountryClick?.(d.name);
        }}
        pointsMerge={false}
      />

      {/* Subtle gradient overlay at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c1a14]/60 to-transparent" />
    </div>
  );
}
