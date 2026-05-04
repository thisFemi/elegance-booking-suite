import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import EventCard from "@/components/EventCard";
import ReportsSection from "@/components/ReportsSection";
import Footer from "@/components/Footer";

const events = [
  {
    id: "evt-1",
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
    id: "evt-2",
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
    id: "evt-3",
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
    id: "evt-4",
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
    id: "evt-5",
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
    id: "evt-6",
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

      <section id="events" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Upcoming Events
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {events.length} events available
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
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
