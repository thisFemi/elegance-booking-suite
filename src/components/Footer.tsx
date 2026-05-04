import { Calendar, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">
                NSW<span className="text-primary-foreground/70">Training</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 font-body leading-relaxed">
              National Single Window Training booking platform for seamless event registration.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Browse Events</Link></li>
              <li><Link to="/admin" className="hover:text-primary-foreground transition-colors">Admin Panel</Link></li>
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
                <Phone className="w-3.5 h-3.5" />
                02018870011
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                info@nsw.gov.ng
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5" />
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
