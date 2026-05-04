import { Button } from "@/components/ui/button";
import { Calendar, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              NSW<span className="text-accent">Training</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Events
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              <User className="w-4 h-4" />
              Sign In
            </Button>
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
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Events</Link>
            <Link to="/admin" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Admin</Link>
            <div className="pt-2">
              <Button variant="default" size="sm" className="w-full" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
