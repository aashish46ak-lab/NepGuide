/** Approximate route coordinates for map display */
export type LatLng = [number, number]; // [lng, lat] for GeoJSON

export const ROUTE_COORDS: Record<string, LatLng[]> = {
  ebc: [
    [86.731, 27.688], // Lukla
    [86.713, 27.74], // Phakding
    [86.714, 27.807], // Namche
    [86.764, 27.836], // Tengboche
    [86.831, 27.892], // Dingboche
    [86.81, 27.948], // Lobuche
    [86.829, 27.98], // Gorak Shep
    [86.925, 27.988], // EBC
  ],
  abc: [
    [83.82, 28.28], // Nayapul area
    [83.82, 28.42], // Chhomrong
    [83.86, 28.48], // Bamboo
    [83.88, 28.51], // Deurali
    [83.88, 28.53], // ABC
  ],
  "annapurna-circuit": [
    [84.38, 28.23], // Besisahar
    [84.24, 28.55], // Chame
    [84.15, 28.62], // Pisang
    [84.017, 28.667], // Manang
    [83.92, 28.78], // Thorong Phedi
    [83.938, 28.793], // Thorong La
    [83.867, 28.817], // Muktinath
    [83.73, 28.78], // Jomsom
  ],
  mardi: [
    [83.9, 28.25],
    [83.92, 28.35],
    [83.94, 28.4],
    [83.95, 28.43],
    [83.95, 28.45],
  ],
  "poon-hill": [
    [83.82, 28.28],
    [83.72, 28.35],
    [83.7, 28.4], // Poon Hill area
    [83.8, 28.38],
  ],
  langtang: [
    [85.34, 28.16], // Syabrubesi
    [85.42, 28.18], // Lama Hotel
    [85.5, 28.21], // Langtang
    [85.56, 28.214], // Kyanjin
  ],
  gosaikunda: [
    [85.3, 28.12],
    [85.35, 28.1],
    [85.42, 28.08],
  ],
  manaslu: [
    [84.85, 28.15],
    [84.7, 28.35],
    [84.56, 28.55],
    [84.5, 28.65],
    [84.4, 28.55],
  ],
  "upper-mustang": [
    [83.73, 28.78], // Jomsom
    [83.78, 28.85],
    [83.9, 29.0],
    [83.97, 29.18], // Lo Manthang
  ],
  gokyo: [
    [86.731, 27.688],
    [86.714, 27.807],
    [86.72, 27.9],
    [86.69, 27.95],
    [86.68, 27.96],
  ],
};

export const NEPAL_CENTER: LatLng = [84.1, 28.4];
export const NEPAL_BOUNDS: [[number, number], [number, number]] = [
  [80.0, 26.3],
  [88.3, 30.5],
];
