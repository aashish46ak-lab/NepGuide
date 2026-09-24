
-- COUNTRIES
CREATE TABLE public.countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  iso_code text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  description text,
  hero_image text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.countries TO anon;
GRANT SELECT ON public.countries TO authenticated;
GRANT ALL ON public.countries TO service_role;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "countries public read" ON public.countries FOR SELECT TO anon, authenticated USING (true);

-- REGIONS
CREATE TABLE public.regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  latitude double precision,
  longitude double precision,
  hero_image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, slug)
);
CREATE INDEX regions_country_idx ON public.regions(country_id);
GRANT SELECT ON public.regions TO anon;
GRANT SELECT ON public.regions TO authenticated;
GRANT ALL ON public.regions TO service_role;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "regions public read" ON public.regions FOR SELECT TO anon, authenticated USING (true);

-- CITIES
CREATE TABLE public.cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  elevation_m integer,
  has_airport boolean NOT NULL DEFAULT false,
  is_major boolean NOT NULL DEFAULT false,
  description text,
  UNIQUE (country_id, slug)
);
CREATE INDEX cities_country_idx ON public.cities(country_id);
GRANT SELECT ON public.cities TO anon;
GRANT SELECT ON public.cities TO authenticated;
GRANT ALL ON public.cities TO service_role;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cities public read" ON public.cities FOR SELECT TO anon, authenticated USING (true);

-- DESTINATIONS
CREATE TABLE public.destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type text NOT NULL DEFAULT 'destination',
  description text,
  short_description text,
  latitude double precision,
  longitude double precision,
  image text,
  duration_days text,
  distance_km numeric,
  difficulty text,
  estimated_cost_min integer,
  estimated_cost_max integer,
  currency text NOT NULL DEFAULT 'USD',
  best_season text,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX destinations_country_idx ON public.destinations(country_id);
CREATE INDEX destinations_region_idx ON public.destinations(region_id);
GRANT SELECT ON public.destinations TO anon;
GRANT SELECT ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "destinations public read" ON public.destinations FOR SELECT TO anon, authenticated USING (true);

-- TREKKING ROUTES
CREATE TABLE public.trekking_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  short_description text,
  difficulty text,
  duration_days text,
  distance_km numeric,
  elevation_max_m integer,
  best_season text,
  start_location text,
  end_location text,
  estimated_cost_min integer,
  estimated_cost_max integer,
  currency text NOT NULL DEFAULT 'USD',
  hero_image text,
  permits text,
  accommodation text,
  food text,
  transportation text,
  safety text,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX routes_country_idx ON public.trekking_routes(country_id);
CREATE INDEX routes_region_idx ON public.trekking_routes(region_id);
GRANT SELECT ON public.trekking_routes TO anon;
GRANT SELECT ON public.trekking_routes TO authenticated;
GRANT ALL ON public.trekking_routes TO service_role;
ALTER TABLE public.trekking_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routes public read" ON public.trekking_routes FOR SELECT TO anon, authenticated USING (true);

-- ROUTE STOPS
CREATE TABLE public.route_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid NOT NULL REFERENCES public.trekking_routes(id) ON DELETE CASCADE,
  name text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  day_number integer,
  elevation_m integer,
  distance_from_previous_km numeric,
  transport_mode text NOT NULL DEFAULT 'trek',
  description text,
  sort_order integer NOT NULL DEFAULT 0
);
CREATE INDEX route_stops_route_idx ON public.route_stops(route_id, sort_order);
GRANT SELECT ON public.route_stops TO anon;
GRANT SELECT ON public.route_stops TO authenticated;
GRANT ALL ON public.route_stops TO service_role;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "route stops public read" ON public.route_stops FOR SELECT TO anon, authenticated USING (true);

-- COST ESTIMATES
CREATE TABLE public.cost_estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid REFERENCES public.trekking_routes(id) ON DELETE CASCADE,
  destination_id uuid REFERENCES public.destinations(id) ON DELETE CASCADE,
  category text NOT NULL,
  amount_min integer NOT NULL,
  amount_max integer NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  note text
);
CREATE INDEX cost_estimates_route_idx ON public.cost_estimates(route_id);
GRANT SELECT ON public.cost_estimates TO anon;
GRANT SELECT ON public.cost_estimates TO authenticated;
GRANT ALL ON public.cost_estimates TO service_role;
ALTER TABLE public.cost_estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cost estimates public read" ON public.cost_estimates FOR SELECT TO anon, authenticated USING (true);

-- ROAD ROUTES (travel distances between places)
CREATE TABLE public.road_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  from_name text NOT NULL,
  to_name text NOT NULL,
  from_lat double precision,
  from_lng double precision,
  to_lat double precision,
  to_lng double precision,
  road_distance_km numeric,
  road_hours numeric,
  flight_minutes integer,
  mode text NOT NULL DEFAULT 'road',
  is_approximate boolean NOT NULL DEFAULT true,
  note text
);
CREATE INDEX road_routes_country_idx ON public.road_routes(country_id);
GRANT SELECT ON public.road_routes TO anon;
GRANT SELECT ON public.road_routes TO authenticated;
GRANT ALL ON public.road_routes TO service_role;
ALTER TABLE public.road_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "road routes public read" ON public.road_routes FOR SELECT TO anon, authenticated USING (true);

-- ATTRACTIONS
CREATE TABLE public.attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL,
  type text NOT NULL DEFAULT 'landmark',
  latitude double precision,
  longitude double precision,
  elevation_m integer,
  description text,
  UNIQUE (country_id, slug)
);
GRANT SELECT ON public.attractions TO anon;
GRANT SELECT ON public.attractions TO authenticated;
GRANT ALL ON public.attractions TO service_role;
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attractions public read" ON public.attractions FOR SELECT TO anon, authenticated USING (true);
