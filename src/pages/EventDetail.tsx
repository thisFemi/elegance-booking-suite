import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Calendar, ArrowLeft, CheckCircle } from "lucide-react";

const mockEvents: Record<string, any> = {
  "evt-1": {
    title: "Lagos — ANLCA National Secretariat, Amuwo Odofin",
    venue: "20 Durbar Rd, Lagos, Nigeria",
    date: "May 4, 2026",
    time: "9:00 AM – 4:00 PM",
    slotsLeft: 50,
    totalSlots: 50,
    description: "Comprehensive training on the Nigeria National Single Window platform. Learn how to navigate the system for import/export documentation, customs declarations, and trade facilitation.",
    topics: [
      "Introduction to NSW Platform",
      "Import/Export Documentation",
      "Customs Declaration Process",
      "Trade Facilitation Best Practices",
      "Hands-on Practical Session",
    ],
  },
  "evt-2": {
    title: "Lagos — NAGAFF Academy",
    venue: "2 Maybin Road, Apapa Road, Lagos, Nigeria",
    date: "May 4, 2026",
    time: "9:00 AM – 4:00 PM",
    slotsLeft: 28,
    totalSlots: 50,
    description: "Practical training session focused on the NSW platform for freight forwarding agents and customs brokers.",
    topics: [
      "NSW Portal Navigation",
      "Freight Documentation",
      "Agent Registration Process",
      "Common Errors & Troubleshooting",
    ],
  },
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents[id || ""] || mockEvents["evt-1"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to events
            </button>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl">{event.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{event.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{event.time}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{event.venue}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{event.slotsLeft} of {event.totalSlots} slots left</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading font-semibold text-lg mb-3">About This Training</h2>
                <p className="text-muted-foreground font-body leading-relaxed">{event.description}</p>
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg mb-3">What You'll Learn</h2>
                <ul className="space-y-2">
                  {event.topics.map((topic: string) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="glass-card rounded-lg p-6 sticky top-24">
                <h3 className="font-heading font-semibold text-foreground mb-1">Register Now</h3>
                <p className="text-sm text-muted-foreground font-body mb-4">Free · {event.slotsLeft} slots remaining</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${((event.totalSlots - event.slotsLeft) / event.totalSlots) * 100}%` }} />
                </div>
                <Button className="w-full" size="lg" onClick={() => navigate(`/register/${id}`)}>
                  Register for This Event
                </Button>
                <p className="text-xs text-muted-foreground font-body mt-3 text-center">
                  Registration is subject to approval
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;
