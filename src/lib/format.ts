// Prototype "today" so mock data always reads consistently.
export const TODAY = "2026-10-16";
export const NOW_ISO = "2026-10-16T09:00:00";

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function parseDate(d: string) {
  const [y, m, day] = d.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, day);
}
export function fmtDate(d: string) {
  const x = parseDate(d);
  return `${x.getDate()} ${months[x.getMonth()]} ${x.getFullYear()}`;
}
export function fmtDateShort(d: string) {
  const x = parseDate(d);
  return `${x.getDate()} ${months[x.getMonth()].slice(0, 3)} ${x.getFullYear()}`;
}
export function fmtDay(d: string) {
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][parseDate(d).getDay()];
}
export function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
}
export function fmtDateTime(iso: string) {
  const time = iso.length > 10 ? iso.slice(11, 16) : "09:00";
  return `${fmtDateShort(iso)}, ${fmtTime(time)}`;
}
export function daysBetween(a: string, b: string) {
  return Math.round((parseDate(b).getTime() - parseDate(a).getTime()) / 86400000);
}
export function daysUntil(d: string) {
  return daysBetween(TODAY, d);
}
export function durationLabel(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hour${h === 1 ? "" : "s"}${m ? ` ${m} min` : ""}`;
}
export function relTime(iso: string) {
  const diff = daysBetween(iso.slice(0, 10), TODAY);
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return fmtDateShort(iso);
}
export function nowIso() {
  const d = new Date();
  return `${TODAY}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:00`;
}

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
