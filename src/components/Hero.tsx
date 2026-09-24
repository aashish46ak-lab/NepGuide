import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Mountain, Compass } from "lucide-react";
import { Globe } from "./Globe";
import { CountryPanel } from "./CountryPanel";
import { SEARCH_ITEMS } from "@/data/destinations";

export function Hero() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusCountry, setFocusCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    active: boolean;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

    // Scroll to destinations if Nepal place
    if (item.country === "Nepal" && item.type !== "country") {
      setTimeout(() => {
        document.getElementById("destinations")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 800);
    }
  };

  const handleCountryClick = (name: string, active: boolean) => {
    setFocusCountry(name);
    setQuery(name);
    setSelectedCountry({ name, active });
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0c1a14] via-[#12261c] to-[#0c1a14] pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
            <Compass className="h-3.5 w-3.5" />
            Explore the Himalayas & Beyond
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Explore the World.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Trek Beyond the Map.
            </span>
          </h1>

          <p className="mt-5 text-base text-white/70 sm:text-lg">
            Discover trekking routes, destinations, road journeys and trip costs
            — starting with Nepal. Click any country on the globe.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl" ref={boxRef}>
            <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
              <Search className="ml-3 h-5 w-5 shrink-0 text-white/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) {
                    handleSelect(filtered[0]);
                  }
                }}
                placeholder="Search destinations, treks, countries..."
                className="w-full bg-transparent py-3 text-base text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                onClick={() => filtered[0] && handleSelect(filtered[0])}
                className="shrink-0 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Search
              </button>
            </div>

            {showSuggestions && filtered.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-white/10 bg-[#0f231a]/95 shadow-2xl backdrop-blur-xl">
                {filtered.map((item) => (
                  <li key={item.id + item.label}>
                    <button
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/90 transition hover:bg-emerald-500/20"
                    >
                      {item.type === "country" ? (
                        <MapPin className="h-4 w-4 shrink-0 text-teal-400" />
                      ) : item.type === "trek" || item.type === "viewpoint" ? (
                        <Mountain className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <MapPin className="h-4 w-4 shrink-0 text-sky-400" />
                      )}
                      <span className="flex-1">{item.label}</span>
                      <span className="text-xs text-white/40">{item.country}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Globe */}
        <div className="mt-10 flex justify-center">
          <Globe
            focusCountry={focusCountry}
            onCountryClick={handleCountryClick}
            height={500}
          />
        </div>

        {/* Stats */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Trekking Routes", value: "30+" },
            { label: "Destinations", value: "20+" },
            { label: "Regions", value: "12" },
            { label: "Countries", value: "20" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center backdrop-blur-sm"
            >
              <div className="text-xl font-bold text-emerald-400 sm:text-2xl">
                {s.value}
              </div>
              <div className="mt-0.5 text-[11px] text-white/55 sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
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
