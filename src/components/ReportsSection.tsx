import { BarChart3, Download, FileText, TrendingUp, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  {
    icon: Users,
    title: "Attendance Report",
    description: "Track attendee registration and check-in data across all venues",
    type: "CSV / PDF",
  },
  {
    icon: TrendingUp,
    title: "Booking Analytics",
    description: "View booking trends, peak times, and venue utilization rates",
    type: "PDF",
  },
  {
    icon: Calendar,
    title: "Event Summary",
    description: "Comprehensive overview of all events with slot allocation details",
    type: "Excel / PDF",
  },
  {
    icon: FileText,
    title: "Venue Capacity Report",
    description: "Real-time capacity metrics and historical occupancy data",
    type: "PDF",
  },
];

const ReportsSection = () => {
  return (
    <section id="reports" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">
                Reporting
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Spool & Download <span className="text-gradient-gold">Reports</span>
            </h2>
            <p className="text-muted-foreground font-body mt-2 max-w-md">
              Generate detailed reports on bookings, attendance, and venue analytics with a single click.
            </p>
          </div>
          <Button variant="hero" size="sm" className="shrink-0">
            <BarChart3 className="w-4 h-4" />
            Generate All Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reports.map((report) => (
            <div
              key={report.title}
              className="glass-card rounded-xl p-5 hover-lift group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <report.icon className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm">{report.title}</h3>
              <p className="text-xs text-muted-foreground font-body mt-1.5 leading-relaxed">
                {report.description}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground font-body">{report.type}</span>
                <button className="flex items-center gap-1 text-xs font-body font-medium text-secondary hover:text-primary transition-colors">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportsSection;
