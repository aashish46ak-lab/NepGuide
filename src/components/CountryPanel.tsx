import { X } from "lucide-react";

interface CountryPanelProps {
  country: string;
  active: boolean;
  onClose: () => void;
}

export function CountryPanel({ country, active, onClose }: CountryPanelProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-40 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-white/15 bg-[#0f231a]/95 p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{country}</h3>
          {active ? (
            <p className="mt-2 text-sm text-white/70">
              Detailed trekking routes, destinations and budgets are available.
              Scroll down or open a destination card.
            </p>
          ) : (
            <p className="mt-2 text-sm text-white/70">
              {country} routes are <span className="text-emerald-300">coming soon</span>.
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/10 p-1.5 text-white/70 transition hover:bg-white/20 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {active && (
        <a
          href="#destinations"
          onClick={onClose}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
        >
          Explore destinations
        </a>
      )}
    </div>
  );
}
