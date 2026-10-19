import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Info, CalendarPlus } from "lucide-react";
import { useStore, useMyApps } from "@/store/AppStore";
import { PageHeader, Section, Field, SeatBar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { TrainingStatusBadge, AppStatusBadge } from "@/components/StatusBadge";
import { fmtDate, fmtTime, durationLabel, daysUntil } from "@/lib/format";
import { downloadIcs } from "@/lib/helpers";
import NotFound from "@/pages/NotFound";

export default function TrainingDetail() {
  const { id } = useParams();
  const s = useStore();
  const mine = useMyApps();
  const t = s.training(id!);
  if (!t || t.status === "draft") return <NotFound />;
  const v = s.venue(t.venueId)!;
  const ds = s.displayStatus(t);
  const left = s.seatsLeft(t.id);
  const myApp = mine.find((a) => a.trainingId === t.id && !["cancelled", "rejected"].includes(a.status));
  const dl = daysUntil(t.regClose);

  const cta = myApp ? (
    <>
      <div className="mb-3 flex items-center justify-between text-sm"><span>Your application</span><AppStatusBadge status={myApp.status} /></div>
      <Button asChild className="w-full"><Link to={`/app/my-trainings/${myApp.id}`}>View My Application</Link></Button>
    </>
  ) : ds === "Registration Open" ? (
    <>
      <Button asChild className="w-full"><Link to={`/app/trainings/${t.id}/apply`}>Apply for Training</Link></Button>
      {dl <= 7 && <p className="mt-2 text-center text-xs text-warning-foreground">Registration closes in {dl} day{dl === 1 ? "" : "s"}</p>}
    </>
  ) : ds === "Full" ? (
    <>
      <div className="mb-2 rounded border border-border bg-muted px-3 py-2 text-center text-sm font-medium">Fully Booked</div>
      <Button asChild variant="outline" className="w-full"><Link to={`/app/trainings/${t.id}/apply`}>Join Waitlist</Link></Button>
      <p className="mt-2 text-xs text-muted-foreground">You'll be offered a seat automatically if one becomes available.</p>
    </>
  ) : (
    <div className="rounded border border-border bg-muted px-3 py-2 text-center text-sm font-medium">
      {ds === "Opens Soon" ? `Registration opens ${fmtDate(t.regOpen)}` : ds === "Registration Closed" ? "Registration Closed" : ds === "Cancelled" ? "This session was cancelled" : "This session has ended"}
    </div>
  );

  return (
    <>
      <PageHeader
        back={{ to: "/app/trainings", label: "Find Training" }}
        title={t.title}
        description={<span className="flex flex-wrap items-center gap-2"><span>{t.category}</span><TrainingStatusBadge status={ds} /></span>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title="Overview">
            <div className="space-y-3 p-4 text-sm leading-relaxed sm:p-5">
              <p className="font-medium">{t.summary}</p>
              <p className="text-muted-foreground">{t.description}</p>
            </div>
          </Section>
          <Section title="What you'll learn">
            <ul className="space-y-2 p-4 text-sm sm:p-5">
              {t.objectives.map((o) => <li key={o} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{o}</li>)}
            </ul>
          </Section>
          <Section title="Who should attend"><p className="p-4 text-sm sm:p-5">{t.audience}</p></Section>
          <Section title="What to bring">
            <ul className="list-disc space-y-1 p-4 pl-9 text-sm sm:p-5 sm:pl-10">{t.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
          </Section>
          <div className="flex gap-3 rounded-md border border-info/20 bg-info-soft p-4 text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
            <div><p className="font-medium text-info">Important information</p><p className="mt-1">{t.info}</p></div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:h-fit">
          <Section>
            <dl className="grid grid-cols-2 gap-4 p-4 sm:p-5 lg:grid-cols-1">
              <Field label="Date">{fmtDate(t.date)}</Field>
              <Field label="Time">{fmtTime(t.start)} – {fmtTime(t.end)}<span className="block text-xs text-muted-foreground">{durationLabel(t.start, t.end)}</span></Field>
              <Field label="Venue">{v.name}<span className="block text-xs text-muted-foreground">{v.address}, {v.city}</span></Field>
              <Field label="Facilitator">{t.trainer}</Field>
              <Field label="Registration deadline">{fmtDate(t.regClose)}</Field>
              <Field label="Available seats">
                {left} of {t.capacity}
                <div className="mt-1.5"><SeatBar taken={t.capacity - left} capacity={t.capacity} /></div>
              </Field>
            </dl>
            <div className="border-t border-border p-4 sm:p-5">
              {cta}
              <button onClick={() => downloadIcs(t, v)} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline">
                <CalendarPlus className="h-4 w-4" /> Add to calendar
              </button>
            </div>
          </Section>
        </aside>
      </div>
    </>
  );
}
