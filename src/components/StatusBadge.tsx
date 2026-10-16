import { cn } from "@/lib/utils";
import type { AppStatus, Attendance, TrainingDisplayStatus } from "@/lib/types";
import { CheckCircle2, Clock, XCircle, AlertCircle, Circle, MinusCircle, Hourglass, Ban } from "lucide-react";

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const toneCls: Record<Tone, string> = {
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning-foreground border-warning/30",
  danger: "bg-danger-soft text-destructive border-destructive/20",
  info: "bg-info-soft text-info border-info/20",
  neutral: "bg-muted text-muted-foreground border-border",
};
const toneIcon = { success: CheckCircle2, warning: Clock, danger: XCircle, info: AlertCircle, neutral: Circle };

export const APP_STATUS: Record<AppStatus, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  submitted: { label: "Submitted", tone: "info" },
  pending: { label: "Pending Review", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  confirmed: { label: "Confirmed", tone: "success" },
  waitlisted: { label: "Waitlisted", tone: "info" },
  rejected: { label: "Rejected", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "neutral" },
  completed: { label: "Completed", tone: "success" },
  attended: { label: "Attended", tone: "success" },
  no_show: { label: "No Show", tone: "danger" },
};

const TRAINING_TONE: Record<TrainingDisplayStatus, Tone> = {
  Draft: "neutral",
  "Opens Soon": "info",
  "Registration Open": "success",
  "Registration Closed": "warning",
  Full: "danger",
  Completed: "neutral",
  Cancelled: "danger",
  Archived: "neutral",
};

export function Badge({ tone, children, icon = true, className }: { tone: Tone; children: React.ReactNode; icon?: boolean; className?: string }) {
  const Icon = toneIcon[tone];
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded border px-2 py-0.5 text-xs font-medium", toneCls[tone], className)}>
      {icon && <Icon className="h-3 w-3" aria-hidden />}
      {children}
    </span>
  );
}

export function AppStatusBadge({ status }: { status: AppStatus }) {
  const s = APP_STATUS[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}
export function TrainingStatusBadge({ status }: { status: TrainingDisplayStatus }) {
  return <Badge tone={TRAINING_TONE[status]}>{status}</Badge>;
}
export function AttendanceBadge({ value }: { value?: Attendance }) {
  if (!value) return <span className="text-xs text-muted-foreground">Not recorded</span>;
  const map = { present: ["success", "Present"], late: ["warning", "Late"], absent: ["danger", "Absent"] } as const;
  return <Badge tone={map[value][0]}>{map[value][1]}</Badge>;
}
export { Hourglass, Ban, MinusCircle };
