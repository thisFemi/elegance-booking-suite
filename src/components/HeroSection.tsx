import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPattern from "@/assets/hero-pattern.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroPattern} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-body font-medium text-accent">National Single Window Training</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] tracking-tight">
            Book Your
            <br />
            Training{" "}
            <span className="text-gradient-gold">Session</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-primary-foreground/70 font-body max-w-lg leading-relaxed">
            Select your preferred venue, choose a date, and reserve your seat. 
            Seamless booking for NSW training across Nigeria.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button variant="hero" size="lg" className="group">
              Browse Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="lg">
              My Bookings
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-primary-foreground/10">
            {[
              { value: "6+", label: "Events Available" },
              { value: "150+", label: "Total Slots" },
              { value: "3", label: "Venues" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading font-bold text-2xl sm:text-3xl text-accent">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/50 font-body mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
