/** Approximate route coordinates [lng, lat] for map display */
export type LatLng = [number, number];

export type RoutePoint = {
  coords: LatLng;
  name: string;
};

export const ROUTE_PATHS: Record<string, RoutePoint[]> = {
  ebc: [
    { coords: [86.731, 27.688], name: "Lukla" },
    { coords: [86.713, 27.74], name: "Phakding" },
    { coords: [86.714, 27.807], name: "Namche Bazaar" },
    { coords: [86.764, 27.836], name: "Tengboche" },
    { coords: [86.831, 27.892], name: "Dingboche" },
    { coords: [86.81, 27.948], name: "Lobuche" },
    { coords: [86.829, 27.98], name: "Gorak Shep" },
    { coords: [86.925, 27.988], name: "Everest Base Camp" },
  ],
  abc: [
    { coords: [83.82, 28.28], name: "Nayapul" },
    { coords: [83.82, 28.42], name: "Chhomrong" },
    { coords: [83.86, 28.48], name: "Bamboo" },
    { coords: [83.88, 28.51], name: "Deurali" },
    { coords: [83.88, 28.53], name: "Annapurna Base Camp" },
  ],
  "annapurna-circuit": [
    { coords: [84.38, 28.23], name: "Besisahar" },
    { coords: [84.24, 28.55], name: "Chame" },
    { coords: [84.15, 28.62], name: "Upper Pisang" },
    { coords: [84.017, 28.667], name: "Manang" },
    { coords: [83.92, 28.78], name: "Thorong Phedi" },
    { coords: [83.938, 28.793], name: "Thorong La" },
    { coords: [83.867, 28.817], name: "Muktinath" },
    { coords: [83.73, 28.78], name: "Jomsom" },
  ],
  mardi: [
    { coords: [83.9, 28.25], name: "Kande" },
    { coords: [83.92, 28.35], name: "Forest Camp" },
    { coords: [83.94, 28.4], name: "Low Camp" },
    { coords: [83.95, 28.43], name: "High Camp" },
    { coords: [83.95, 28.45], name: "Mardi Himal" },
  ],
  "poon-hill": [
    { coords: [83.82, 28.28], name: "Nayapul" },
    { coords: [83.72, 28.35], name: "Ulleri" },
    { coords: [83.7, 28.4], name: "Poon Hill" },
    { coords: [83.8, 28.38], name: "Ghandruk" },
  ],
  langtang: [
    { coords: [85.34, 28.16], name: "Syabrubesi" },
    { coords: [85.42, 28.18], name: "Lama Hotel" },
    { coords: [85.5, 28.21], name: "Langtang Village" },
    { coords: [85.56, 28.214], name: "Kyanjin Gompa" },
  ],
  gosaikunda: [
    { coords: [85.3, 28.12], name: "Dhunche" },
    { coords: [85.35, 28.1], name: "Sing Gompa" },
    { coords: [85.42, 28.08], name: "Gosaikunda" },
  ],
  manaslu: [
    { coords: [84.85, 28.15], name: "Machha Khola" },
    { coords: [84.7, 28.35], name: "Jagat" },
    { coords: [84.56, 28.55], name: "Samagaun" },
    { coords: [84.5, 28.65], name: "Larke La" },
    { coords: [84.4, 28.55], name: "Bimthang" },
  ],
  "upper-mustang": [
    { coords: [83.73, 28.78], name: "Jomsom" },
    { coords: [83.78, 28.85], name: "Kagbeni" },
    { coords: [83.9, 29.0], name: "Ghami" },
    { coords: [83.97, 29.18], name: "Lo Manthang" },
  ],
  gokyo: [
    { coords: [86.731, 27.688], name: "Lukla" },
    { coords: [86.714, 27.807], name: "Namche" },
    { coords: [86.72, 27.9], name: "Dole" },
    { coords: [86.69, 27.95], name: "Machhermo" },
    { coords: [86.68, 27.96], name: "Gokyo" },
  ],
  tilicho: [
    { coords: [84.38, 28.23], name: "Besisahar" },
    { coords: [84.017, 28.667], name: "Manang" },
    { coords: [83.95, 28.72], name: "Khangsar" },
    { coords: [83.9, 28.75], name: "Tilicho Base" },
    { coords: [83.85, 28.78], name: "Tilicho Lake" },
  ],
  rara: [
    { coords: [82.18, 29.27], name: "Jumla" },
    { coords: [82.12, 29.4], name: "Rara approach" },
    { coords: [82.08, 29.53], name: "Rara Lake" },
  ],
  "shey-phoksundo": [
    { coords: [82.82, 28.95], name: "Juphal" },
    { coords: [82.9, 29.05], name: "Dunai" },
    { coords: [82.95, 29.2], name: "Shey Phoksundo" },
  ],
};

/** Back-compat: plain coordinate arrays */
export const ROUTE_COORDS: Record<string, LatLng[]> = Object.fromEntries(
  Object.entries(ROUTE_PATHS).map(([id, pts]) => [id, pts.map((p) => p.coords)])
);

export const NEPAL_CENTER: LatLng = [84.1, 28.4];
