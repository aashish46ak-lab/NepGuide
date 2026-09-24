import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Mountain, Compass } from "lucide-react";
import { Globe } from "./Globe";

const SUGGESTIONS = [
  "Everest Base Camp",
  "Annapurna Circuit",
  "Annapurna Base Camp",
  "Mardi Himal",
  "Langtang Valley",
  "Manaslu Circuit",
  "Upper Mustang",
  "Gokyo Lakes",
  "Poon Hill",
  "Pokhara",
  "Kathmandu",
  "Chitwan",
  "Rara Lake",
  "Nepal",
  "Japan",
  "Peru",
  "Switzerland",
];

export function Hero() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusCountry, setFocusCountry] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : SUGGESTIONS.slice(0, 6);

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowSuggestions(false);

    // Map common destinations to country for globe focus
    const lower = value.toLowerCase();
    if (
      lower.includes("everest") ||
      lower.includes("annapurna") ||
      lower.includes("langtang") ||
      lower.includes("manaslu") ||
      lower.includes("mustang") ||
      lower.includes("pokhara") ||
      lower.includes("kathmandu") ||
      lower.includes("chitwan") ||
      lower.includes("rara") ||
      lower.includes("gokyo") ||
      lower.includes("poon") ||
      lower.includes("mardi") ||
      lower === "nepal"
    ) {
      setFocusCountry("Nepal");
    } else if (lower.includes("japan")) {
      setFocusCountry("Japan");
    } else if (lower.includes("peru")) {
      setFocusCountry("Peru");
    } else if (lower.includes("switzerland")) {
      setFocusCountry("Switzerland");
    } else {
      setFocusCountry(value);
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0c1a14] via-[#12261c] to-[#0c1a14] pt-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        {/* Headline */}
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
            Discover trekking routes, destinations, road journeys, travel
            distances, estimated days and trip costs — starting with Nepal.
          </p>

          {/* Search bar */}
          <div className="relative mx-auto mt-8 max-w-xl">
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
                placeholder="Search popular destinations..."
                className="w-full bg-transparent py-3 text-base text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                onClick={() => query && handleSelect(query)}
                className="shrink-0 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Search
              </button>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && filtered.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f231a]/95 shadow-2xl backdrop-blur-xl">
                {filtered.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/90 transition hover:bg-emerald-500/20"
                    >
                      {item.toLowerCase().includes("trek") ||
                      item.toLowerCase().includes("camp") ||
                      item.toLowerCase().includes("circuit") ||
                      item.toLowerCase().includes("hill") ||
                      item.toLowerCase().includes("lakes") ? (
                        <Mountain className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <MapPin className="h-4 w-4 text-teal-400" />
                      )}
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Globe */}
        <div className="mt-12 flex justify-center">
          <Globe
            focusCountry={focusCountry}
            onCountryClick={(name) => {
              setFocusCountry(name);
              setQuery(name);
            }}
            height={480}
          />
        </div>

        {/* Quick stats */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Trekking Routes", value: "30+" },
            { label: "Regions", value: "12" },
            { label: "Destinations", value: "50+" },
            { label: "Countries Ready", value: "12" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-emerald-400">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
