import type { Application, Training, Venue } from "@/lib/types";
import { TODAY } from "@/lib/format";

export type MyTab = "upcoming" | "pending" | "completed" | "cancelled";

export function tabFor(a: Application, t: Training): MyTab {
  if (["cancelled", "rejected"].includes(a.status)) return "cancelled";
  if (["completed", "attended", "no_show"].includes(a.status)) return "completed";
  if (["pending", "submitted", "waitlisted", "draft"].includes(a.status)) return "pending";
  return t.date < TODAY ? "completed" : "upcoming";
}

export function downloadIcs(t: Training, v?: Venue) {
  const d = t.date.replace(/-/g, "");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//NSW Training Portal//EN", "BEGIN:VEVENT",
    `UID:${t.id}@nsw-training`, `DTSTART:${d}T${t.start.replace(":", "")}00`, `DTEND:${d}T${t.end.replace(":", "")}00`,
    `SUMMARY:${t.title}`, `LOCATION:${v ? `${v.name}, ${v.address}, ${v.city}` : ""}`, `DESCRIPTION:${t.summary}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${t.title.replace(/[^a-z0-9]+/gi, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function paginate<T>(items: T[], page: number, size = 10) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const p = Math.min(page, pages);
  return { rows: items.slice((p - 1) * size, p * size), pages, page: p, total: items.length, from: items.length ? (p - 1) * size + 1 : 0, to: Math.min(p * size, items.length) };
}
