import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Calendar, LayoutDashboard, Search, BookOpen, User, Menu, Users, FileText, MapPin, BarChart3, Settings, GraduationCap, RotateCcw, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/store/AppStore";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NAV: Record<Role, { to: string; label: string; icon: typeof Bell; end?: boolean }[]> = {
  participant: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/app/trainings", label: "Find Training", icon: Search },
    { to: "/app/my-trainings", label: "My Trainings", icon: BookOpen },
    { to: "/app/calendar", label: "Calendar", icon: Calendar },
    { to: "/app/notifications", label: "Notifications", icon: Bell },
    { to: "/app/profile", label: "Profile", icon: User },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/trainings", label: "Trainings", icon: GraduationCap },
    { to: "/admin/applications", label: "Applications", icon: FileText },
    { to: "/admin/participants", label: "Participants", icon: Users },
    { to: "/admin/venues", label: "Venues", icon: MapPin },
    { to: "/admin/reports", label: "Reports", icon: BarChart3 },
    { to: "/admin/notifications", label: "Notifications", icon: Bell },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ],
};

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">NSW</div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-foreground">Training Portal</div>
        <div className="text-[11px] text-muted-foreground">National Single Window</div>
      </div>
    </Link>
  );
}

export function DemoBar({ role }: { role: Role | null }) {
  const s = useStore();
  const nav = useNavigate();
  const go = (r: Role) => {
    s.setRole(r);
    nav(r === "admin" ? "/admin" : "/app");
  };
  return (
    <div className="no-print border-b border-warning/40 bg-warning-soft text-warning-foreground">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs">
        <span className="font-semibold">Prototype / Demo Mode</span>
        <div className="flex items-center gap-1" role="group" aria-label="Demo role">
          <span className="mr-1 hidden sm:inline">Viewing as:</span>
          {(["participant", "admin"] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => go(r)}
              aria-pressed={role === r}
              className={cn("rounded px-2 py-0.5 font-medium capitalize", role === r ? "bg-warning-foreground text-warning-soft" : "hover:bg-warning/20")}
            >
              {r}
            </button>
          ))}
          <button
            onClick={() => {
              s.reset();
              toast.success("Demo data reset");
            }}
            className="ml-2 inline-flex items-center gap-1 rounded px-2 py-0.5 hover:bg-warning/20"
          >
            <RotateCcw className="h-3 w-3" /> Reset data
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppShell({ role }: { role: Role }) {
  const s = useStore();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  useEffect(() => {
    if (s.role !== role) s.setRole(role);
  }, [role]); // eslint-disable-line

  const unread = s.notifications.filter((n) => n.audience === role && !n.read).length;
  const pending = s.applications.filter((a) => a.status === "pending").length;
  const who = role === "admin" ? { name: "Training Administrator", sub: "NSW Training Unit" } : { name: s.me.name, sub: s.me.org };

  const links = (
    <nav className="flex flex-col gap-0.5 p-3" aria-label="Main">
      {NAV[role].map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          end={n.end}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )
          }
        >
          <n.icon className="h-4 w-4" aria-hidden />
          <span className="flex-1">{n.label}</span>
          {n.label === "Notifications" && unread > 0 && (
            <span className="rounded bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground" aria-label={`${unread} unread`}>{unread}</span>
          )}
          {n.label === "Applications" && pending > 0 && (
            <span className="rounded bg-warning-soft px-1.5 text-[11px] font-semibold text-warning-foreground" aria-label={`${pending} pending`}>{pending}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );

  const userBlock = (
    <div className="border-t border-border p-3">
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
          {who.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{who.name}</div>
          <div className="truncate text-xs text-muted-foreground">{who.sub}</div>
        </div>
        <button aria-label="Exit demo" onClick={() => { s.setRole(null); nav("/"); }} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <DemoBar role={role} />
      <div className="flex flex-1">
        <aside className="no-print sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
          <div className="border-b border-border px-4 py-4"><Logo /></div>
          <div className="flex-1 overflow-y-auto">{links}</div>
          {userBlock}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
            <Logo />
            <div className="flex items-center gap-1">
              <Link to={role === "admin" ? "/admin/notifications" : "/app/notifications"} className="relative rounded p-2 hover:bg-muted" aria-label={`Notifications, ${unread} unread`}>
                <Bell className="h-5 w-5" />
                {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />}
              </Link>
              <button className="rounded p-2 hover:bg-muted" aria-label="Open menu" onClick={() => setOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </header>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="flex w-72 flex-col p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="border-b border-border px-4 py-4"><Logo /></div>
              <div className="flex-1 overflow-y-auto">{links}</div>
              {userBlock}
            </SheetContent>
          </Sheet>
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
          <footer className="no-print border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-8">
            Nigeria Customs Service — National Single Window · Prototype for demonstration only
          </footer>
        </div>
      </div>
    </div>
  );
}
