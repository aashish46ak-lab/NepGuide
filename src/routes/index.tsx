import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DestinationCards } from "@/components/DestinationCards";

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
      <DestinationCards />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/40">
        <p>© {new Date().getFullYear()} NepGuide. Explore the Himalayas & Beyond.</p>
      </footer>
    </div>
  );
}
