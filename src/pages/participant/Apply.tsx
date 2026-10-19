import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Check, CheckCircle2, Loader2, Clock } from "lucide-react";
import { useStore, useMyApps } from "@/store/AppStore";
import { PageHeader, Section, Field } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AppStatusBadge } from "@/components/StatusBadge";
import { fmtDate, fmtTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Application } from "@/lib/types";
import NotFound from "@/pages/NotFound";

const STEPS = ["Training", "Your details", "Review", "Confirmation"];

export default function Apply() {
  const { id } = useParams();
  const s = useStore();
  const mine = useMyApps();
  const nav = useNavigate();
  const t = s.training(id!);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: s.me.name, email: s.me.email, phone: s.me.phone, org: s.me.org, role: s.me.role });
  const [contact, setContact] = useState<Application["contactMethod"]>("email");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Application | null>(null);

  if (!t) return <NotFound />;
  const v = s.venue(t.venueId)!;
  const ds = s.displayStatus(t);
  const existing = mine.find((a) => a.trainingId === t.id && !["cancelled", "rejected"].includes(a.status));
  const isWaitlist = ds === "Full";

  if (!result && (existing || !["Registration Open", "Full"].includes(ds))) {
    return (
      <>
        <PageHeader back={{ to: `/app/trainings/${t.id}`, label: "Training details" }} title="Application unavailable" />
        <Section>
          <div className="p-6 text-sm">
            {existing ? <>You have already applied for this session (Ref {existing.ref}).</> : <>Registration for this session is not open.</>}
            <div className="mt-4 flex gap-2">
              {existing && <Button asChild size="sm"><Link to={`/app/my-trainings/${existing.id}`}>View My Application</Link></Button>}
              <Button asChild size="sm" variant="outline"><Link to="/app/trainings">Find other training</Link></Button>
            </div>
          </div>
        </Section>
      </>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address, like name@company.ng.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number with at least 10 digits.";
    if (!form.org.trim()) e.org = "Enter your organisation.";
    if (!form.role.trim()) e.role = "Enter your role or designation.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!agree) {
      setErrors({ agree: "Please confirm the declaration to continue." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const a = s.apply(t.id, form, contact);
      setResult(a);
      setSubmitting(false);
      setStep(3);
    }, 700);
  };

  const fields: { k: keyof typeof form; label: string; type?: string; hint?: string }[] = [
    { k: "name", label: "Full name", hint: "As it should appear on your certificate" },
    { k: "email", label: "Email address", type: "email" },
    { k: "phone", label: "Phone number", type: "tel" },
    { k: "org", label: "Organisation" },
    { k: "role", label: "Role / designation" },
  ];

  return (
    <>
      <PageHeader back={step < 3 ? { to: `/app/trainings/${t.id}`, label: "Training details" } : undefined} title={isWaitlist ? "Join waitlist" : "Apply for training"} description={t.title} />

      <ol className="mb-6 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
            <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold", i < step ? "border-primary bg-primary text-primary-foreground" : i === step ? "border-primary text-primary" : "border-border text-muted-foreground")}>
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={cn("hidden text-sm sm:inline", i === step ? "font-medium" : "text-muted-foreground")}>{label}</span>
            {i < STEPS.length - 1 && <span className={cn("h-px flex-1", i < step ? "bg-primary" : "bg-border")} />}
          </li>
        ))}
      </ol>
      <p className="mb-4 text-sm text-muted-foreground sm:hidden">Step {step + 1} of 4 — {STEPS[step]}</p>

      <div className="max-w-3xl">
        {step === 0 && (
          <Section title="Confirm the training session">
            <dl className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Training" className="sm:col-span-2">{t.title}</Field>
              <Field label="Date">{fmtDate(t.date)}</Field>
              <Field label="Time">{fmtTime(t.start)} – {fmtTime(t.end)}</Field>
              <Field label="Venue">{v.name}<span className="block text-xs text-muted-foreground">{v.address}, {v.city}</span></Field>
              <Field label="Seats">{s.seatsLeft(t.id)} of {t.capacity} available</Field>
            </dl>
            {isWaitlist && (
              <div className="mx-4 mb-4 flex gap-2 rounded border border-info/20 bg-info-soft p-3 text-sm sm:mx-5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-info" />This session is full. You'll join the waitlist and be notified if a seat becomes available.
              </div>
            )}
            <div className="flex justify-between border-t border-border p-4">
              <Button variant="outline" onClick={() => nav(`/app/trainings/${t.id}`)}>Back</Button>
              <Button onClick={() => setStep(1)}>Next</Button>
            </div>
          </Section>
        )}

        {step === 1 && (
          <Section title="Participant information">
            <form className="space-y-5 p-4 sm:p-5" noValidate onSubmit={(e) => { e.preventDefault(); if (validate()) setStep(2); }}>
              <p className="text-sm text-muted-foreground">We've filled this in from your profile. Changes will also update your profile.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.k} className={f.k === "name" ? "sm:col-span-2" : ""}>
                    <Label htmlFor={f.k}>{f.label} <span className="text-destructive" aria-hidden>*</span></Label>
                    <Input id={f.k} type={f.type ?? "text"} value={form[f.k]} aria-invalid={!!errors[f.k]} aria-describedby={errors[f.k] ? `${f.k}-err` : undefined}
                      className={cn("mt-1.5", errors[f.k] && "border-destructive")} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
                    {f.hint && !errors[f.k] && <p className="mt-1 text-xs text-muted-foreground">{f.hint}</p>}
                    {errors[f.k] && <p id={`${f.k}-err`} className="mt-1 text-xs text-destructive">{errors[f.k]}</p>}
                  </div>
                ))}
              </div>
              <fieldset>
                <legend className="text-sm font-medium">Preferred communication method</legend>
                <RadioGroup value={contact} onValueChange={(v) => setContact(v as Application["contactMethod"])} className="mt-2 flex flex-wrap gap-4">
                  {[["email", "Email"], ["sms", "SMS"], ["whatsapp", "WhatsApp"]].map(([v, l]) => (
                    <div key={v} className="flex items-center gap-2"><RadioGroupItem value={v} id={`c-${v}`} /><Label htmlFor={`c-${v}`} className="font-normal">{l}</Label></div>
                  ))}
                </RadioGroup>
              </fieldset>
              <div className="flex justify-between border-t border-border pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>Back</Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          </Section>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Section title="Training" action={<Button variant="link" size="sm" className="h-auto p-0" onClick={() => setStep(0)}>Edit</Button>}>
              <dl className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
                <Field label="Training" className="sm:col-span-3">{t.title}</Field>
                <Field label="Date">{fmtDate(t.date)}</Field>
                <Field label="Time">{fmtTime(t.start)} – {fmtTime(t.end)}</Field>
                <Field label="Venue">{v.name}, {v.city}</Field>
              </dl>
            </Section>
            <Section title="Participant details" action={<Button variant="link" size="sm" className="h-auto p-0" onClick={() => setStep(1)}>Edit</Button>}>
              <dl className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                {fields.map((f) => <Field key={f.k} label={f.label}>{form[f.k]}</Field>)}
                <Field label="Communication">{contact === "sms" ? "SMS" : contact === "whatsapp" ? "WhatsApp" : "Email"}</Field>
              </dl>
            </Section>
            <Section>
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Checkbox id="agree" checked={agree} onCheckedChange={(c) => { setAgree(!!c); setErrors({}); }} className="mt-0.5" aria-describedby={errors.agree ? "agree-err" : undefined} />
                  <Label htmlFor="agree" className="font-normal leading-relaxed">I confirm the information above is correct and I will attend the session or cancel at least 48 hours in advance.</Label>
                </div>
                {errors.agree && <p id="agree-err" className="mt-2 text-xs text-destructive">{errors.agree}</p>}
              </div>
              <div className="flex justify-between border-t border-border p-4">
                <Button variant="outline" onClick={() => setStep(1)} disabled={submitting}>Back</Button>
                <Button onClick={submit} disabled={submitting}>{submitting && <Loader2 className="animate-spin" />}{isWaitlist ? "Join Waitlist" : "Submit Application"}</Button>
              </div>
            </Section>
          </div>
        )}

        {step === 3 && result && (
          <Section>
            <div className="p-6 text-center sm:p-8">
              <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-3 text-xl font-semibold">{result.status === "waitlisted" ? "You've joined the waitlist" : "Application submitted successfully"}</h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                {result.status === "waitlisted" ? "We'll notify you if a seat becomes available." : `We'll review your application and notify you by ${contact === "sms" ? "SMS" : contact === "whatsapp" ? "WhatsApp" : "email"}. This usually takes 1–2 working days.`}
              </p>
              <dl className="mx-auto mt-6 grid max-w-md gap-4 rounded-md border border-border p-4 text-left sm:grid-cols-2">
                <Field label="Application reference"><span className="font-mono font-semibold">{result.ref}</span></Field>
                <Field label="Status"><AppStatusBadge status={result.status} /></Field>
                <Field label="Training" className="sm:col-span-2">{t.title}</Field>
                <Field label="Date">{fmtDate(t.date)}</Field>
                <Field label="Venue">{v.name}</Field>
              </dl>
              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                <Button asChild><Link to={`/app/my-trainings/${result.id}`}>View My Training</Link></Button>
                <Button asChild variant="outline"><Link to={`/app/my-trainings/${result.id}/confirmation`}>Download Confirmation</Link></Button>
              </div>
            </div>
          </Section>
        )}
      </div>
    </>
  );
}
