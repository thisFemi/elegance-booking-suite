import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-16">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-body font-medium text-primary-foreground/60 uppercase tracking-wider mb-4">
              National Single Window
            </p>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] tracking-tight">
              Training &amp; Onboarding Events
            </h1>

            <p className="mt-5 text-base sm:text-lg text-primary-foreground/70 font-body max-w-lg leading-relaxed">
              Register for upcoming NSW training sessions across Nigeria. Simple booking, seamless experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 group"
                onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex gap-10 mt-14 pt-8 border-t border-primary-foreground/10">
              {[
                { value: "6+", label: "Upcoming Events" },
                { value: "150+", label: "Available Slots" },
                { value: "3", label: "Venues" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-2xl sm:text-3xl text-primary-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-primary-foreground/50 font-body mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
