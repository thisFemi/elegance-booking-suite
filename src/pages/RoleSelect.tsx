import { useNavigate } from "react-router-dom";
import { ArrowRight, User, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/AppStore";
import { DemoBar } from "@/components/AppShell";

export default function RoleSelect() {
  const s = useStore();
  const nav = useNavigate();
  const go = (r: "participant" | "admin") => {
    s.setRole(r);
    nav(r === "admin" ? "/admin" : "/app");
  };
  const opts = [
    { r: "participant" as const, icon: User, title: "Continue as Participant", who: "John Adewale · ABC Logistics Ltd", text: "Find training, apply, track your applications, view your calendar and certificates." },
    { r: "admin" as const, icon: ShieldCheck, title: "Continue as Admin", who: "Training Administrator · NSW Training Unit", text: "Manage sessions, review applications, record attendance and export reports." },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DemoBar role={null} />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center gap-2.5 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">NSW</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Training Portal</div>
            <div className="text-[11px] text-muted-foreground">National Single Window</div>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">NSW Training & Event Booking</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Book training for the National Single Window, track every application, and download your confirmation and certificate in one place.
        </p>
        <p className="mt-8 text-sm font-medium text-foreground">Choose a demo account to explore the prototype</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {opts.map((o) => (
            <button key={o.r} onClick={() => go(o.r)} className="group rounded-md border border-border bg-card p-5 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <o.icon className="h-5 w-5 text-primary" aria-hidden />
              <div className="mt-3 flex items-center justify-between font-semibold">
                {o.title}
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{o.who}</div>
              <p className="mt-3 text-sm text-muted-foreground">{o.text}</p>
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">No sign-in is required. Data is stored in this browser only and can be reset from the demo bar.</p>
      </main>
    </div>
  );
}
