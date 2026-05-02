import { MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  date: string;
  month: string;
  time: string;
  title: string;
  venue: string;
  slotsLeft: number;
  totalSlots: number;
  status: "open" | "filling" | "almost-full";
}

const EventCard = ({ date, month, time, title, venue, slotsLeft, totalSlots, status }: EventCardProps) => {
  const fillPercent = ((totalSlots - slotsLeft) / totalSlots) * 100;

  const statusColors = {
    open: "bg-emerald-glow/10 text-secondary",
    filling: "bg-accent/10 text-accent",
    "almost-full": "bg-destructive/10 text-destructive",
  };

  const statusLabels = {
    open: "Open",
    filling: "Filling Up",
    "almost-full": "Almost Full",
  };

  return (
    <div className="group glass-card rounded-xl overflow-hidden hover-lift cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Date block */}
        <div className="sm:w-24 p-4 sm:p-5 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 hero-gradient text-primary-foreground shrink-0">
          <span className="text-xs font-body uppercase tracking-wider opacity-80">{month}</span>
          <span className="text-3xl font-heading font-bold leading-none">{date}</span>
          <div className="flex items-center gap-1 mt-1 opacity-70">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-body">{time}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-foreground text-base leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="text-sm font-body truncate">{venue}</span>
              </div>
            </div>
            <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>

          {/* Capacity bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="font-body">{slotsLeft} slots left</span>
              </div>
              <span className="font-body font-medium">Free</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full hero-gradient transition-all duration-500"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button variant="hero" size="sm" className="text-xs">
              Book Slot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
