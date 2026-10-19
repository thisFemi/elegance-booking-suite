import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin, CalendarX, ArrowRight } from "lucide-react";
import { useStore, useMyApps } from "@/store/AppStore";
import { PageHeader, Section, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { AppStatusBadge, TrainingStatusBadge } from "@/components/StatusBadge";
import { fmtDate, fmtTime, daysUntil, relTime, TODAY, fmtDateShort } from "@/lib/format";
import { tabFor } from "@/lib/helpers";

export default function Dashboard() {
  const s = useStore();
  const mine = useMyApps();
  const withT = mine.map((a) => ({ a, t: s.training(a.trainingId)! })).filter((x) => x.t);
  const upcoming = withT.filter((x) => tabFor(x.a, x.t) === "upcoming").sort((x, y) => x.t.date.localeCompare(y.t.date));
  const next = upcoming[0];
  const counts = {
    pending: withT.filter((x) => tabFor(x.a, x.t) === "pending").length,
    upcoming: upcoming.length,
    completed: withT.filter((x) => tabFor(x.a, x.t) === "completed").length,
  };
  const appliedIds = new Set(mine.filter((a) => !["cancelled", "rejected"].includes(a.status)).map((a) => a.trainingId));
  const available = s.trainings
    .filter((t) => s.displayStatus(t) === "Registration Open" && !appliedIds.has(t.id))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);
  const notes = s.notifications.filter((n) => n.audience === "participant").slice(0, 4);
  const v = next && s.venue(next.t.venueId);
  const firstName = s.me.name.split(" ")[0];

  return (
    <>
      <PageHeader title={`Welcome back, ${firstName}`} description={`${s.me.org} · ${fmtDate(TODAY)}`} actions={<Button asChild><Link to="/app/trainings">Find Training</Link></Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title="Upcoming training">
            {next ? (
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-primary">
                      {daysUntil(next.t.date) === 0 ? "Today" : daysUntil(next.t.date) === 1 ? "Tomorrow" : `In ${daysUntil(next.t.date)} days`}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{next.t.title}</h3>
                  </div>
                  <AppStatusBadge status={next.a.status} />
                </div>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div className="flex gap-2"><CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="sr-only">Date</dt><dd>{fmtDate(next.t.date)}</dd></div></div>
                  <div className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="sr-only">Time</dt><dd>{fmtTime(next.t.start)} – {fmtTime(next.t.end)}</dd></div></div>
                  <div className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="sr-only">Venue</dt><dd>{v?.name}<span className="block text-xs text-muted-foreground">{v?.city}</span></dd></div></div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  <Button asChild size="sm"><Link to={`/app/my-trainings/${next.a.id}`}>View Training</Link></Button>
                  <Button asChild size="sm" variant="outline"><Link to={`/app/my-trainings/${next.a.id}/confirmation`}>Booking Confirmation</Link></Button>
                  <span className="ml-auto self-center text-xs text-muted-foreground">Ref {next.a.ref}</span>
                </div>
              </div>
            ) : (
              <EmptyState icon={CalendarX} title="No upcoming training sessions" description="When an application is confirmed it will appear here." action={<Button asChild size="sm"><Link to="/app/trainings">Find Training</Link></Button>} />
            )}
          </Section>

          <Section title="My applications" action={<Link to="/app/my-trainings" className="text-sm font-medium text-primary hover:underline">View all</Link>}>
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { k: "pending", label: "Pending", n: counts.pending },
                { k: "upcoming", label: "Confirmed", n: counts.upcoming },
                { k: "completed", label: "Completed", n: counts.completed },
              ].map((c) => (
                <Link key={c.k} to={`/app/my-trainings?tab=${c.k}`} className="px-4 py-4 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                  <div className="text-2xl font-semibold">{c.n}</div>
                  <div className="text-sm text-muted-foreground">{c.label}</div>
                </Link>
              ))}
            </div>
          </Section>

          <Section title="Available training" action={<Link to="/app/trainings" className="text-sm font-medium text-primary hover:underline">Browse all</Link>}>
            <ul className="divide-y divide-border">
              {available.map((t) => {
                const dl = daysUntil(t.regClose);
                return (
                  <li key={t.id}>
                    <Link to={`/app/trainings/${t.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50">
                      <div className="w-12 shrink-0 text-center">
                        <div className="text-xs uppercase text-muted-foreground">{fmtDateShort(t.date).split(" ")[1]}</div>
                        <div className="text-lg font-semibold leading-tight">{fmtDateShort(t.date).split(" ")[0]}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{t.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.venue(t.venueId)?.city} · {s.seatsLeft(t.id)} seats left · {dl <= 3 ? <span className="font-medium text-warning-foreground">Closes in {dl} day{dl === 1 ? "" : "s"}</span> : `Closes ${fmtDateShort(t.regClose)}`}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
              {available.length === 0 && <li className="px-4 py-6 text-sm text-muted-foreground">No other sessions are open for registration right now.</li>}
            </ul>
          </Section>
        </div>

        <Section title="Recent activity" action={<Link to="/app/notifications" className="text-sm font-medium text-primary hover:underline">All</Link>} className="h-fit">
          <ul className="divide-y divide-border">
            {notes.map((n) => (
              <li key={n.id}>
                <Link to={n.link ?? "/app/notifications"} onClick={() => s.markRead(n.id)} className="block px-4 py-3 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                    <span className={`text-sm ${n.read ? "" : "font-semibold"}`}>{n.title}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{relTime(n.at)}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden"><TrainingStatusBadge status="Draft" /></div>
        </Section>
      </div>
    </>
  );
}
