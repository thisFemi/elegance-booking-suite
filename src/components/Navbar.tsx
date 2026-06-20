import { Button } from "@/components/ui/button";
import { Calendar, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              NSW<span className="text-gradient-gold">Booking</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Events
            </a>
            <a href="#venues" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Venues
            </a>
            <a href="#reports" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                Reports
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="hero" size="sm">Book Now</Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <a href="#events" className="block text-sm font-medium text-muted-foreground">Events</a>
            <a href="#venues" className="block text-sm font-medium text-muted-foreground">Venues</a>
            <a href="#reports" className="block text-sm font-medium text-muted-foreground">Reports</a>
            <div className="pt-2 flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
              <Button variant="hero" size="sm" className="flex-1">Book Now</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
