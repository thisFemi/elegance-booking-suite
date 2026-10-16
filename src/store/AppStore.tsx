import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as mock from "@/data/mock";
import type { Activity, Application, AppStatus, Attendance, Notification, Participant, Prefs, Role, Training, TrainingDisplayStatus, Venue } from "@/lib/types";
import { TODAY, fmtDate, nowIso } from "@/lib/format";

interface State {
  role: Role | null;
  trainings: Training[];
  venues: Venue[];
  participants: Participant[];
  applications: Application[];
  notifications: Notification[];
  activity: Activity[];
  prefs: Prefs;
  seq: number;
}

const KEY = "nsw-prototype-v1";

function initial(): State {
  return {
    role: null,
    trainings: mock.trainings,
    venues: mock.venues,
    participants: mock.participants,
    applications: mock.applications,
    notifications: mock.notifications,
    activity: mock.activity,
    prefs: { email: true, sms: true, reminders: true, newTrainings: false },
    seq: 200,
  };
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial(), ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return initial();
}

export const SEAT_STATUSES: AppStatus[] = ["submitted", "pending", "approved", "confirmed", "attended", "completed", "no_show"];
export const ACTIVE_STATUSES: AppStatus[] = ["submitted", "pending", "approved", "confirmed", "waitlisted"];

function useStoreValue() {
  const [s, setS] = useState<State>(load);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(s));
  }, [s]);

  const me = s.participants.find((p) => p.id === mock.CURRENT_USER_ID)!;

  const venue = useCallback((id: string) => s.venues.find((v) => v.id === id), [s.venues]);
  const training = useCallback((id: string) => s.trainings.find((t) => t.id === id), [s.trainings]);
  const participant = useCallback((id: string) => s.participants.find((p) => p.id === id), [s.participants]);

  const seatsTaken = useCallback(
    (tid: string) => {
      const t = s.trainings.find((x) => x.id === tid);
      if (!t) return 0;
      return t.baseBooked + s.applications.filter((a) => a.trainingId === tid && SEAT_STATUSES.includes(a.status)).length;
    },
    [s.trainings, s.applications],
  );
  const seatsLeft = useCallback(
    (tid: string) => {
      const t = s.trainings.find((x) => x.id === tid);
      return t ? Math.max(0, t.capacity - seatsTaken(tid)) : 0;
    },
    [s.trainings, seatsTaken],
  );
  const displayStatus = useCallback(
    (t: Training): TrainingDisplayStatus => {
      if (t.status === "draft") return "Draft";
      if (t.status === "cancelled") return "Cancelled";
      if (t.status === "archived") return "Archived";
      if (t.status === "completed" || t.date < TODAY) return "Completed";
      if (seatsLeft(t.id) <= 0) return "Full";
      if (TODAY > t.regClose) return "Registration Closed";
      if (TODAY < t.regOpen) return "Opens Soon";
      return "Registration Open";
    },
    [seatsLeft],
  );

  const pushNote = (n: Omit<Notification, "id" | "at" | "read">, st: State): Notification[] => [
    { ...n, id: `n${st.seq + Math.random().toString(36).slice(2, 6)}`, at: nowIso(), read: false },
    ...st.notifications,
  ];
  const pushActivity = (text: string, st: State, actor = "Training Administrator"): Activity[] => [
    { id: `ac${Math.random().toString(36).slice(2, 8)}`, at: nowIso(), actor, text },
    ...st.activity,
  ];

  const actions = {
    setRole: (role: Role | null) => setS((st) => ({ ...st, role })),
    reset: () => setS({ ...initial(), role: s.role }),

    apply: (trainingId: string, details: Partial<Participant>, contactMethod: Application["contactMethod"]): Application => {
      const full = seatsLeft(trainingId) <= 0;
      const seq = s.seq + 1;
      const ref = `NSW-TRN-2026-00${seq}`;
      const at = nowIso();
      const t = training(trainingId)!;
      const status: AppStatus = full ? "waitlisted" : "pending";
      const a: Application = {
        id: `a${seq}`,
        ref,
        trainingId,
        participantId: mock.CURRENT_USER_ID,
        submittedAt: at,
        status,
        contactMethod,
        history: [
          { status: "submitted", at, by: "Participant" },
          full
            ? { status: "waitlisted", at, by: "System", note: "Session at capacity — added to waitlist" }
            : { status: "pending", at, by: "System", note: "Queued for review" },
        ],
      };
      setS((st) => ({
        ...st,
        seq,
        participants: st.participants.map((p) => (p.id === mock.CURRENT_USER_ID ? { ...p, ...details } : p)),
        applications: [a, ...st.applications],
        notifications: pushNote(
          {
            audience: "admin",
            kind: "info",
            title: "New application received",
            body: `${details.name ?? me.name} applied for ${t.title} (${fmtDate(t.date)}). Ref ${ref}.`,
            link: `/admin/applications/${a.id}`,
          },
          st,
        ),
      }));
      return a;
    },

    setAppStatus: (ids: string[], status: AppStatus, note?: string, by: "admin" | "participant" = "admin") => {
      setS((st) => {
        let notes = st.notifications;
        let acts = st.activity;
        const labels: Partial<Record<AppStatus, string>> = { confirmed: "approved", rejected: "rejected", waitlisted: "waitlisted", cancelled: "cancelled" };
        const apps = st.applications.map((a) => {
          if (!ids.includes(a.id)) return a;
          const t = st.trainings.find((x) => x.id === a.trainingId)!;
          const p = st.participants.find((x) => x.id === a.participantId)!;
          if (by === "admin") {
            if (a.participantId === mock.CURRENT_USER_ID) {
              notes = [
                {
                  id: `n${Math.random().toString(36).slice(2, 8)}`,
                  audience: "participant",
                  kind: status === "confirmed" ? "approval" : status === "cancelled" || status === "rejected" ? "cancel" : "update",
                  title: `Application ${labels[status] ?? status}`,
                  body: `Your application for ${t.title} (${a.ref}) has been ${labels[status] ?? status}.${note ? ` Reason: ${note}` : ""}`,
                  at: nowIso(),
                  read: false,
                  link: `/app/my-trainings/${a.id}`,
                },
                ...notes,
              ];
            }
            acts = [{ id: `ac${Math.random().toString(36).slice(2, 8)}`, at: nowIso(), actor: "Training Administrator", text: `${(labels[status] ?? status).replace(/^./, (c) => c.toUpperCase())} application ${a.ref} (${p.name})` }, ...acts];
          } else {
            notes = [
              { id: `n${Math.random().toString(36).slice(2, 8)}`, audience: "admin", kind: "cancel", title: "Application withdrawn", body: `${p.name} cancelled their application for ${t.title} (${a.ref}).`, at: nowIso(), read: false, link: `/admin/applications/${a.id}` },
              ...notes,
            ];
          }
          return {
            ...a,
            status,
            history: [...a.history, { status, at: nowIso(), by: by === "admin" ? "Training Administrator" : "Participant", note }],
          };
        });
        return { ...st, applications: apps, notifications: notes, activity: acts };
      });
    },

    saveTraining: (t: Training, isNew: boolean) => {
      setS((st) => ({
        ...st,
        trainings: isNew ? [t, ...st.trainings] : st.trainings.map((x) => (x.id === t.id ? t : x)),
        activity: pushActivity(`${isNew ? "Created" : "Updated"} ${t.title}${t.status === "draft" ? " (draft)" : ""}`, st),
      }));
    },
    duplicateTraining: (id: string): string => {
      const src = s.trainings.find((x) => x.id === id)!;
      const nid = `t${Date.now().toString(36)}`;
      setS((st) => ({
        ...st,
        trainings: [{ ...src, id: nid, title: `${src.title} (Copy)`, status: "draft", baseBooked: 0 }, ...st.trainings],
        activity: pushActivity(`Duplicated ${src.title} as draft`, st),
      }));
      return nid;
    },
    setTrainingStatus: (id: string, status: Training["status"], reason?: string) => {
      setS((st) => {
        const t = st.trainings.find((x) => x.id === id)!;
        let apps = st.applications;
        let notes = st.notifications;
        if (status === "cancelled") {
          const affected = apps.filter((a) => a.trainingId === id && ACTIVE_STATUSES.includes(a.status));
          apps = apps.map((a) =>
            affected.includes(a)
              ? { ...a, status: "cancelled" as AppStatus, history: [...a.history, { status: "cancelled" as AppStatus, at: nowIso(), by: "Training Administrator", note: `Training session cancelled by NSW.${reason ? ` ${reason}` : ""}` }] }
              : a,
          );
          affected
            .filter((a) => a.participantId === mock.CURRENT_USER_ID)
            .forEach((a) => {
              notes = [
                { id: `n${Math.random().toString(36).slice(2, 8)}`, audience: "participant", kind: "cancel", title: "Training cancelled", body: `${t.title} on ${fmtDate(t.date)} has been cancelled.${reason ? ` ${reason}` : ""} You can apply for another session.`, at: nowIso(), read: false, link: `/app/my-trainings/${a.id}` },
                ...notes,
              ];
            });
        }
        return {
          ...st,
          applications: apps,
          notifications: notes,
          trainings: st.trainings.map((x) => (x.id === id ? { ...x, status } : x)),
          activity: pushActivity(`${status === "cancelled" ? "Cancelled" : status === "archived" ? "Archived" : status === "published" ? "Published" : "Updated"} ${t.title} (${fmtDate(t.date)})`, st),
        };
      });
    },

    saveAttendance: (tid: string, marks: Record<string, Attendance>) => {
      setS((st) => {
        const t = st.trainings.find((x) => x.id === tid)!;
        let notes = st.notifications;
        const apps = st.applications.map((a) => {
          const m = marks[a.id];
          if (!m || a.trainingId !== tid) return a;
          const status: AppStatus = m === "absent" ? "no_show" : "completed";
          if (a.participantId === mock.CURRENT_USER_ID && status === "completed" && a.status !== "completed") {
            notes = [{ id: `n${Math.random().toString(36).slice(2, 8)}`, audience: "participant", kind: "info", title: "Certificate available", body: `Your certificate for ${t.title} (${fmtDate(t.date)}) is ready.`, at: nowIso(), read: false, link: `/app/my-trainings/${a.id}/certificate` }, ...notes];
          }
          if (a.status === status && a.attendance === m) return a;
          return { ...a, attendance: m, status, history: [...a.history, { status, at: nowIso(), by: "Training Administrator", note: `Attendance recorded: ${m[0].toUpperCase() + m.slice(1)}` }] };
        });
        return {
          ...st,
          applications: apps,
          notifications: notes,
          trainings: st.trainings.map((x) => (x.id === tid && x.date <= TODAY ? { ...x, status: "completed" } : x)),
          activity: pushActivity(`Recorded attendance for ${t.title} (${fmtDate(t.date)}) — ${Object.keys(marks).length} participants`, st),
        };
      });
    },

    saveVenue: (v: Venue, isNew: boolean) =>
      setS((st) => ({
        ...st,
        venues: isNew ? [...st.venues, v] : st.venues.map((x) => (x.id === v.id ? v : x)),
        activity: pushActivity(`${isNew ? "Added" : "Updated"} venue ${v.name}`, st, "Venue Coordinator"),
      })),

    markRead: (id: string, read = true) => setS((st) => ({ ...st, notifications: st.notifications.map((n) => (n.id === id ? { ...n, read } : n)) })),
    markAllRead: (aud: Role) => setS((st) => ({ ...st, notifications: st.notifications.map((n) => (n.audience === aud ? { ...n, read: true } : n)) })),
    updateProfile: (p: Partial<Participant>) => setS((st) => ({ ...st, participants: st.participants.map((x) => (x.id === mock.CURRENT_USER_ID ? { ...x, ...p } : x)) })),
    updatePrefs: (p: Prefs) => setS((st) => ({ ...st, prefs: p })),
    notifyParticipants: (tid: string, title: string, body: string) =>
      setS((st) => {
        const t = st.trainings.find((x) => x.id === tid)!;
        const mine = st.applications.find((a) => a.trainingId === tid && a.participantId === mock.CURRENT_USER_ID && ACTIVE_STATUSES.includes(a.status));
        const count = st.applications.filter((a) => a.trainingId === tid && ACTIVE_STATUSES.includes(a.status)).length;
        return {
          ...st,
          notifications: mine ? pushNote({ audience: "participant", kind: "update", title, body, link: `/app/trainings/${tid}` }, st) : st.notifications,
          activity: pushActivity(`Sent message "${title}" to ${count} participants of ${t.title}`, st),
        };
      }),
  };

  return { ...s, me, venue, training, participant, seatsTaken, seatsLeft, displayStatus, ...actions };
}

type Store = ReturnType<typeof useStoreValue>;
const Ctx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const value = useStoreValue();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}
export function useMyApps() {
  const s = useStore();
  return useMemo(() => s.applications.filter((a) => a.participantId === mock.CURRENT_USER_ID), [s.applications]);
}
