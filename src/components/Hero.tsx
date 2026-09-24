import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, MapPin, Mountain, Compass } from "lucide-react";
import { Globe } from "./Globe";
import { CountryPanel } from "./CountryPanel";
import { NepalMap } from "./NepalMap";
import { SEARCH_ITEMS, getDestination } from "@/data/destinations";
import { ROUTE_COORDS } from "@/data/routes-geo";

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusCountry, setFocusCountry] = useState<string | null>("Nepal");
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    active: boolean;
  } | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : SEARCH_ITEMS.slice(0, 8);

  const handleSelect = (item: (typeof SEARCH_ITEMS)[0]) => {
    setQuery(item.label);
    setShowSuggestions(false);
    setFocusCountry(item.country);
    setSelectedCountry({
      name: item.country,
      active: item.country === "Nepal",
    });

    // Draw route on map if we have coords
    if (item.country === "Nepal" && item.type !== "country") {
      if (ROUTE_COORDS[item.id]) {
        setActiveRouteId(item.id);
        setTimeout(() => {
          document.getElementById("nepal-map")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 400);
      } else {
        // Navigate to detail page
        navigate({ to: "/destination/$id", params: { id: item.id } });
      }
    }
  };

  const handleCountryClick = (name: string, active: boolean) => {
    setFocusCountry(name);
    setQuery(name);
    setSelectedCountry({ name, active });
    if (name !== "Nepal") setActiveRouteId(null);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeDest = activeRouteId ? getDestination(activeRouteId) : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c1a14] via-[#0f1f18] to-[#0c1a14] pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-600/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
            <Compass className="h-3.5 w-3.5" />
            Explore the Himalayas & Beyond
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Explore the World.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Trek Beyond the Map.
            </span>
          </h1>

          <p className="mt-4 text-base text-white/65 sm:text-lg">
            Search a trek — the globe focuses, the map draws the route, and you get
            budget + day-by-day details.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl" ref={boxRef}>
            <div className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/8 p-2 shadow-xl backdrop-blur-md">
              <Search className="ml-3 h-5 w-5 shrink-0 text-white/45" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) handleSelect(filtered[0]);
                }}
                placeholder="Try Everest Base Camp, Annapurna, Pokhara..."
                className="w-full bg-transparent py-3 text-base text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                onClick={() => filtered[0] && handleSelect(filtered[0])}
                className="shrink-0 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Search
              </button>
            </div>

            {showSuggestions && filtered.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-white/10 bg-[#0f231a]/98 shadow-2xl backdrop-blur-xl">
                {filtered.map((item) => (
                  <li key={item.id + item.label}>
                    <button
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/90 transition hover:bg-emerald-500/20"
                    >
                      {item.type === "trek" || item.type === "viewpoint" ? (
                        <Mountain className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <MapPin className="h-4 w-4 shrink-0 text-teal-400" />
                      )}
                      <span className="flex-1">{item.label}</span>
                      <span className="text-xs text-white/35">{item.country}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Globe */}
        <div className="mt-8">
          <Globe
            focusCountry={focusCountry}
            onCountryClick={handleCountryClick}
            height={460}
          />
        </div>

        {/* Stats */}
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Routes", value: "30+" },
            { label: "Destinations", value: "20+" },
            { label: "Regions", value: "12" },
            { label: "Countries", value: "12" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/8 bg-white/4 px-3 py-2.5 text-center"
            >
              <div className="text-lg font-bold text-emerald-400">{s.value}</div>
              <div className="text-[11px] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nepal map section */}
      <div id="nepal-map" className="border-t border-white/5 bg-[#0a1610] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Nepal route map
              </h2>
              <p className="mt-1 text-sm text-white/55">
                {activeDest
                  ? `Showing: ${activeDest.name}`
                  : "Search a trek above to draw its path"}
              </p>
            </div>
            {activeDest && (
              <button
                onClick={() =>
                  navigate({
                    to: "/destination/$id",
                    params: { id: activeDest.id },
                  })
                }
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
              >
                Full itinerary & budget →
              </button>
            )}
          </div>

          {/* Quick route chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            {Object.keys(ROUTE_COORDS).map((id) => {
              const d = getDestination(id);
              if (!d) return null;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveRouteId(id);
                    setQuery(d.name);
                    setFocusCountry("Nepal");
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    activeRouteId === id
                      ? "bg-emerald-500 text-white"
                      : "bg-white/8 text-white/70 hover:bg-white/15"
                  }`}
                >
                  {d.name}
                </button>
              );
            })}
          </div>

          <NepalMap routeId={activeRouteId} height={440} />
        </div>
      </div>

      {selectedCountry && (
        <CountryPanel
          country={selectedCountry.name}
          active={selectedCountry.active}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </section>
  );
}
