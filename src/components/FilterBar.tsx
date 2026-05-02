import { Search, SlidersHorizontal, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

const FilterBar = () => {
  const [search, setSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState("all");

  const locations = [
    { id: "all", label: "All Venues" },
    { id: "lagos", label: "Lagos" },
    { id: "portharcourt", label: "Port Harcourt" },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 -mt-8 relative z-20 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events, venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all"
          />
        </div>

        {/* Location filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin className="w-4 h-4 text-muted-foreground hidden sm:block" />
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
                activeLocation === loc.id
                  ? "hero-gradient text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Date & Filter */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm font-body text-muted-foreground hover:bg-muted transition-all">
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Date</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/50 border border-border text-sm font-body text-muted-foreground hover:bg-muted transition-all">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
