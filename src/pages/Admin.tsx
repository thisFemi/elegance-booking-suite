import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3, Users, Calendar, CheckCircle, XCircle, Search,
  Download, QrCode, ClipboardCheck, Eye, ArrowRight
} from "lucide-react";

// Mock data
const mockRegistrations = [
  { id: "r1", name: "Adebayo Ogunlesi", email: "adebayo@example.com", event: "Lagos — ANLCA", type: "Business", status: "pending", date: "2026-05-01" },
  { id: "r2", name: "Chioma Eze", email: "chioma@example.com", event: "Port Harcourt — Limewood", type: "Individual", status: "approved", date: "2026-05-01" },
  { id: "r3", name: "Ibrahim Musa", email: "ibrahim@example.com", event: "Lagos — NAGAFF", type: "Government", status: "pending", date: "2026-05-02" },
  { id: "r4", name: "Funke Adeyemi", email: "funke@example.com", event: "Lagos — ANLCA", type: "Business", status: "approved", date: "2026-04-30" },
  { id: "r5", name: "Emeka Okafor", email: "emeka@example.com", event: "Lagos — NAGAFF", type: "Individual", status: "rejected", date: "2026-04-29" },
];

const mockAttendance = [
  { id: "a1", name: "Chioma Eze", email: "chioma@example.com", event: "Port Harcourt — Limewood", checkedIn: true, time: "9:05 AM" },
  { id: "a2", name: "Funke Adeyemi", email: "funke@example.com", event: "Lagos — ANLCA", checkedIn: true, time: "8:55 AM" },
  { id: "a3", name: "Adebayo Ogunlesi", email: "adebayo@example.com", event: "Lagos — ANLCA", checkedIn: false, time: "" },
];

type Tab = "dashboard" | "registrations" | "attendance" | "reports";

const Admin = () => {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [search, setSearch] = useState("");
  const [registrations, setRegistrations] = useState(mockRegistrations);

  const stats = [
    { label: "Total Registrations", value: registrations.length, icon: Users },
    { label: "Pending Approval", value: registrations.filter((r) => r.status === "pending").length, icon: ClipboardCheck },
    { label: "Approved", value: registrations.filter((r) => r.status === "approved").length, icon: CheckCircle },
    { label: "Attendance Rate", value: "67%", icon: BarChart3 },
  ];

  const tabs = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: BarChart3 },
    { id: "registrations" as Tab, label: "Registrations", icon: Users },
    { id: "attendance" as Tab, label: "Attendance", icon: QrCode },
    { id: "reports" as Tab, label: "Reports", icon: Download },
  ];

  const handleApprove = (id: string) => {
    setRegistrations((prev) => prev.map((r) => r.id === id ? { ...r, status: "approved" } : r));
  };

  const handleReject = (id: string) => {
    setRegistrations((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" } : r));
  };

  const filteredRegistrations = registrations.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground font-body">Manage events, registrations, and attendance</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-background border border-border rounded-lg p-1 w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                  tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard */}
          {tab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="glass-card rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <s.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="font-heading font-bold text-2xl text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground font-body mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-lg p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Recent Registrations</h3>
                <div className="space-y-3">
                  {registrations.slice(0, 3).map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground font-body">{r.name}</p>
                        <p className="text-xs text-muted-foreground font-body">{r.event} · {r.type}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        r.status === "approved" ? "bg-success/10 text-success" :
                        r.status === "rejected" ? "bg-destructive/10 text-destructive" :
                        "bg-warning/10 text-warning"
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => setTab("registrations")}>
                  View All <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Registrations */}
          {tab === "registrations" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                </div>
              </div>

              <div className="glass-card rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Name</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Event</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Type</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Status</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((r) => (
                        <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-foreground font-body">{r.name}</p>
                            <p className="text-xs text-muted-foreground font-body">{r.email}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground font-body">{r.event}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">{r.type}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              r.status === "approved" ? "bg-success/10 text-success" :
                              r.status === "rejected" ? "bg-destructive/10 text-destructive" :
                              "bg-warning/10 text-warning"
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {r.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="default" onClick={() => handleApprove(r.id)} className="h-7 text-xs">
                                  <CheckCircle className="w-3 h-3" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleReject(r.id)} className="h-7 text-xs">
                                  <XCircle className="w-3 h-3" /> Reject
                                </Button>
                              </div>
                            )}
                            {r.status !== "pending" && (
                              <Button size="sm" variant="ghost" className="h-7 text-xs">
                                <Eye className="w-3 h-3" /> View
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Attendance */}
          {tab === "attendance" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by email to mark attendance..." className="pl-10" />
                </div>
                <Button variant="default">
                  <QrCode className="w-4 h-4" /> Scan QR Code
                </Button>
              </div>

              <div className="glass-card rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Name</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Event</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Checked In</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Time</th>
                        <th className="text-left text-xs font-semibold text-muted-foreground font-body px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAttendance.map((a) => (
                        <tr key={a.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-foreground font-body">{a.name}</p>
                            <p className="text-xs text-muted-foreground font-body">{a.email}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground font-body">{a.event}</td>
                          <td className="px-4 py-3">
                            {a.checkedIn ? (
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success">Present</span>
                            ) : (
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">Absent</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground font-body">{a.time || "—"}</td>
                          <td className="px-4 py-3">
                            {!a.checkedIn && (
                              <Button size="sm" variant="default" className="h-7 text-xs">
                                <CheckCircle className="w-3 h-3" /> Mark Present
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Reports */}
          {tab === "reports" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Registration Report", desc: "All registrations with status and participant details", format: "CSV / Excel" },
                  { title: "Attendance Report", desc: "Check-in data per event with timestamps", format: "CSV / PDF" },
                  { title: "Event Analytics", desc: "Booking trends, capacity utilization, and demographics", format: "PDF" },
                ].map((r) => (
                  <div key={r.title} className="glass-card rounded-lg p-5">
                    <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{r.title}</h3>
                    <p className="text-xs text-muted-foreground font-body mb-4">{r.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground font-body">{r.format}</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <Download className="w-3 h-3" /> Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
