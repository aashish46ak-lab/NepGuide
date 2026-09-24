import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NepGuide — Explore the World. Trek Beyond the Map." },
      {
        name: "description",
        content:
          "Discover trekking routes, destinations, road journeys and trip costs starting with Nepal. Interactive globe, maps and detailed itineraries.",
      },
      { property: "og:title", content: "NepGuide — Trek Beyond the Map" },
      {
        property: "og:description",
        content:
          "Explore trekking routes and destinations across Nepal and beyond.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-[#0c1a14]">
      <Navbar />
      <Hero />

      {/* Placeholder sections for next steps */}
      <section id="treks" className="border-t border-white/5 bg-[#0f231a] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Popular Trekking Routes</h2>
          <p className="mt-3 text-white/60">
            Coming next — destination cards, maps and full itineraries.
          </p>
        </div>
      </section>

      <section id="destinations" className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Popular Destinations</h2>
          <p className="mt-3 text-white/60">
            Everest, Annapurna, Pokhara, Mustang, Chitwan and more.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/40">
        <p>© {new Date().getFullYear()} NepGuide. Explore the Himalayas & Beyond.</p>
      </footer>
    </div>
  );
}
