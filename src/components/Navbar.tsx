import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

const navLinks = [
  { href: "/", label: "Explore" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#treks", label: "Trekking Routes" },
  { href: "/#countries", label: "Countries" },
  { href: "/#about", label: "About" },
];

export function Navbar({ onSearchFocus }: { onSearchFocus?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0c1a14]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center" onClick={() => setOpen(false)}>
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/75 transition hover:text-emerald-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchFocus}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-emerald-500/30 hover:text-emerald-300"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#0c1a14] transition-all duration-300 md:hidden",
          open ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
