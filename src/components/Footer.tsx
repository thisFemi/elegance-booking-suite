import { Calendar, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <span className="font-heading font-bold text-lg">
                NSW<span className="text-accent">Booking</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 font-body leading-relaxed">
              National Single Window Training booking platform for seamless event registration.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <li><a href="#events" className="hover:text-accent transition-colors">Browse Events</a></li>
              <li><a href="#venues" className="hover:text-accent transition-colors">Venues</a></li>
              <li><a href="#reports" className="hover:text-accent transition-colors">Reports</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">My Bookings</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Venues</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <li>Lagos — ANLCA Secretariat</li>
              <li>Lagos — NAGAFF Academy</li>
              <li>Port Harcourt — Limewood Hotel</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60 font-body">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent" />
                02018870011
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent" />
                info@nsw.gov.ng
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent mt-0.5" />
                National Single Window Secretariat
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40 font-body">
          © {new Date().getFullYear()} National Single Window. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
