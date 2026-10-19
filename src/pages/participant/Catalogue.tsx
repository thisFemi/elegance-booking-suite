import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Search, SearchX, X } from "lucide-react";
import { useStore, useMyApps, ACTIVE_STATUSES } from "@/store/AppStore";
import { PageHeader, EmptyState, SeatBar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrainingStatusBadge, Badge } from "@/components/StatusBadge";
import { CATEGORIES } from "@/data/mock";
import { fmtDate, fmtTime, daysUntil, fmtDateShort, TODAY } from "@/lib/format";

const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Kano"];

export default function Catalogue() {
  const s = useStore();
  const mine = useMyApps();
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") ?? "";
  const city = sp.get("city") ?? "all";
  const cat = sp.get("cat") ?? "all";
  const avail = sp.get("avail") ?? "all";
  const when = sp.get("when") ?? "all";
  const sort = sp.get("sort") ?? "asc";
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp);
    if (!v || v === "all" || (k === "sort" && v === "asc")) n.delete(k);
    else n.set(k, v);
    setSp(n, { replace: true });
  };

  const applied = new Map(mine.filter((a) => ACTIVE_STATUSES.includes(a.status) || a.status === "confirmed").map((a) => [a.trainingId, a]));

  const list = useMemo(() => {
    const base = s.trainings.filter((t) => ["published"].includes(t.status) && t.date >= TODAY);
    return base
      .filter((t) => {
        const v = s.venue(t.venueId)!;
        const ds = s.displayStatus(t);
        if (q && !`${t.title} ${t.category} ${v.name} ${v.city} ${t.summary}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (city !== "all" && v.city !== city) return false;
        if (cat !== "all" && t.category !== cat) return false;
        if (avail === "open" && ds !== "Registration Open") return false;
        if (avail === "waitlist" && ds !== "Full") return false;
        if (when === "14" && daysUntil(t.date) > 14) return false;
        if (when === "oct" && !t.date.startsWith("2026-10")) return false;
        if (when === "nov" && !t.date.startsWith("2026-11")) return false;
        return true;
      })
      .sort((a, b) => (sort === "asc" ? a.date.localeCompare(b.date) : sort === "desc" ? b.date.localeCompare(a.date) : s.seatsLeft(b.id) - s.seatsLeft(a.id)));
  }, [s, q, city, cat, avail, when, sort]);

  const active = [city, cat, avail, when].filter((x) => x !== "all").length + (q ? 1 : 0);

  return (
    <>
      <PageHeader title="Find Training" description="Browse scheduled NSW training sessions and apply for a seat." />

      <div className="mb-4 rounded-md border border-border bg-card p-4">
        <div className="relative">
          <Label htmlFor="q" className="sr-only">Search training</Label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="q" value={q} onChange={(e) => set("q", e.target.value)} placeholder="Search by title, venue or city" className="pl-9" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { k: "city", label: "Location", v: city, opts: [["all", "All locations"], ...CITIES.map((c) => [c, c])] },
            { k: "cat", label: "Category", v: cat, opts: [["all", "All categories"], ...CATEGORIES.map((c) => [c, c])] },
            { k: "when", label: "Date", v: when, opts: [["all", "Any date"], ["14", "Next 14 days"], ["oct", "October 2026"], ["nov", "November 2026"]] },
            { k: "avail", label: "Availability", v: avail, opts: [["all", "All"], ["open", "Seats available"], ["waitlist", "Full (waitlist)"]] },
            { k: "sort", label: "Sort by", v: sort, opts: [["asc", "Date: soonest"], ["desc", "Date: latest"], ["seats", "Most seats"]] },
          ].map((f) => (
            <div key={f.k}>
              <Label className="mb-1 block text-xs text-muted-foreground">{f.label}</Label>
              <Select value={f.v} onValueChange={(v) => set(f.k, v)}>
                <SelectTrigger className="h-9" aria-label={f.label}><SelectValue /></SelectTrigger>
                <SelectContent>{f.opts.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground" aria-live="polite">{list.length} session{list.length === 1 ? "" : "s"} found</span>
        {active > 0 && (
          <button onClick={() => setSp({}, { replace: true })} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      <div className="rounded-md border border-border bg-card">
        {list.length === 0 ? (
          <EmptyState icon={SearchX} title="No training sessions match your search" description="Try a different location or date, or clear the filters." action={<Button variant="outline" size="sm" onClick={() => setSp({})}>Clear filters</Button>} />
        ) : (
          <ul className="divide-y divide-border">
            {list.map((t) => {
              const v = s.venue(t.venueId)!;
              const ds = s.displayStatus(t);
              const left = s.seatsLeft(t.id);
              const dl = daysUntil(t.regClose);
              const myApp = applied.get(t.id);
              return (
                <li key={t.id} className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1fr_200px_auto] md:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{t.category}</span>
                      <TrainingStatusBadge status={ds} />
                      {myApp && <Badge tone="info">Applied</Badge>}
                    </div>
                    <Link to={`/app/trainings/${t.id}`} className="mt-1 block font-semibold text-foreground hover:text-primary hover:underline">{t.title}</Link>
                    <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{t.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <span>{fmtDate(t.date)}</span>
                      <span className="text-muted-foreground">{fmtTime(t.start)} – {fmtTime(t.end)}</span>
                      <span className="text-muted-foreground">{v.name}, {v.city}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Seats</span><span className="font-medium">{left} of {t.capacity} left</span></div>
                    <div className="my-1.5"><SeatBar taken={t.capacity - left} capacity={t.capacity} /></div>
                    <div className="text-xs text-muted-foreground">
                      {ds === "Registration Open" ? (dl <= 3 ? <span className="font-medium text-warning-foreground">Registration closes in {dl} day{dl === 1 ? "" : "s"}</span> : `Registration closes ${fmtDateShort(t.regClose)}`) : ds === "Opens Soon" ? `Opens ${fmtDateShort(t.regOpen)}` : `Closed ${fmtDateShort(t.regClose)}`}
                    </div>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <Button asChild variant="outline" size="sm" className="flex-1"><Link to={`/app/trainings/${t.id}`}>View Details</Link></Button>
                    {myApp ? (
                      <Button asChild size="sm" variant="secondary" className="flex-1"><Link to={`/app/my-trainings/${myApp.id}`}>My Application</Link></Button>
                    ) : ds === "Registration Open" ? (
                      <Button asChild size="sm" className="flex-1"><Link to={`/app/trainings/${t.id}/apply`}>Apply</Link></Button>
                    ) : ds === "Full" ? (
                      <Button asChild size="sm" variant="secondary" className="flex-1"><Link to={`/app/trainings/${t.id}/apply`}>Join Waitlist</Link></Button>
                    ) : (
                      <Button size="sm" disabled className="flex-1">{ds === "Opens Soon" ? "Not yet open" : "Closed"}</Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
