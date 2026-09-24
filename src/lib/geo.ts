/** Haversine distance in meters */
export function distanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

/** Trekking average ~2.5 km/h on trail */
const TREK_SPEED_M_PER_MIN = 2500 / 60;

export function formatETA(meters: number): string {
  const mins = Math.max(1, Math.round(meters / TREK_SPEED_M_PER_MIN));
  if (mins < 60) return `~${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `~${h}h ${m}m` : `~${h}h`;
}

export type RoutePoint = { coords: [number, number]; name: string }; // [lng, lat]

/** Find nearest point index on route to user position */
export function nearestPointIndex(
  path: RoutePoint[],
  lat: number,
  lng: number
): number {
  let best = 0;
  let bestD = Infinity;
  path.forEach((p, i) => {
    const d = distanceMeters(lat, lng, p.coords[1], p.coords[0]);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

/** Remaining distance from user along route to end (via next stops) */
export function remainingAlongRoute(
  path: RoutePoint[],
  lat: number,
  lng: number
): {
  toNextM: number;
  toEndM: number;
  nextIndex: number;
  nearestIndex: number;
} {
  const nearest = nearestPointIndex(path, lat, lng);
  // Next stop is the one after nearest, or nearest if we're before it
  let nextIndex = Math.min(nearest + 1, path.length - 1);
  // If still far from nearest, target nearest first
  const distToNearest = distanceMeters(
    lat,
    lng,
    path[nearest].coords[1],
    path[nearest].coords[0]
  );
  if (distToNearest > 400 && nearest < path.length - 1) {
    // might still be approaching nearest
    nextIndex = nearest;
  }

  const toNextM = distanceMeters(
    lat,
    lng,
    path[nextIndex].coords[1],
    path[nextIndex].coords[0]
  );

  let toEndM = toNextM;
  for (let i = nextIndex; i < path.length - 1; i++) {
    toEndM += distanceMeters(
      path[i].coords[1],
      path[i].coords[0],
      path[i + 1].coords[1],
      path[i + 1].coords[0]
    );
  }

  return { toNextM, toEndM, nextIndex, nearestIndex: nearest };
}
