import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import EventCard from "@/components/EventCard";
import ReportsSection from "@/components/ReportsSection";
import Footer from "@/components/Footer";

const events = [
  {
    date: "04",
    month: "May",
    time: "9:00 AM",
    title: "Lagos — ANLCA National Secretariat, Amuwo Odofin",
    venue: "20 Durbar Rd, Lagos, Nigeria",
    slotsLeft: 50,
    totalSlots: 50,
    status: "open" as const,
  },
  {
    date: "04",
    month: "May",
    time: "9:00 AM",
    title: "Lagos — NAGAFF Academy",
    venue: "2 Maybin Road, Apapa Road, Lagos, Nigeria",
    slotsLeft: 28,
    totalSlots: 50,
    status: "filling" as const,
  },
  {
    date: "04",
    month: "May",
    time: "9:00 AM",
    title: "Port Harcourt — Limewood Hotel, GRA Phase 3",
    venue: "1B Abacha Road, GRA Phase 3, Port Harcourt, Rivers",
    slotsLeft: 29,
    totalSlots: 50,
    status: "filling" as const,
  },
  {
    date: "06",
    month: "May",
    time: "9:00 AM",
    title: "Lagos — ANLCA National Secretariat, Amuwo Odofin",
    venue: "20 Durbar Rd, Lagos, Nigeria",
    slotsLeft: 50,
    totalSlots: 50,
    status: "open" as const,
  },
  {
    date: "06",
    month: "May",
    time: "9:00 AM",
    title: "Lagos — NAGAFF Academy",
    venue: "2 Maybin Road, Apapa Road, Lagos, Nigeria",
    slotsLeft: 8,
    totalSlots: 50,
    status: "almost-full" as const,
  },
  {
    date: "06",
    month: "May",
    time: "9:00 AM",
    title: "Port Harcourt — Limewood Hotel, GRA Phase 3",
    venue: "1B Abacha Road, GRA Phase 3, Port Harcourt, Rivers",
    slotsLeft: 33,
    totalSlots: 50,
    status: "open" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Events Section */}
      <section id="events" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar />

          <div className="mt-10 mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                Upcoming <span className="text-gradient-gold">Events</span>
              </h2>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {events.length} events available · February 16 – March 19, 2026
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-16">
            {events.map((event, i) => (
              <EventCard key={i} {...event} />
            ))}
          </div>
        </div>
      </section>

      <ReportsSection />
      <Footer />
    </div>
  );
};

export default Index;
