export type Role = "participant" | "admin";

export type TrainingStatus = "draft" | "published" | "completed" | "cancelled" | "archived";
export type TrainingDisplayStatus =
  | "Draft"
  | "Opens Soon"
  | "Registration Open"
  | "Registration Closed"
  | "Full"
  | "Completed"
  | "Cancelled"
  | "Archived";

export interface Training {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  trainer: string;
  date: string; // yyyy-mm-dd
  start: string; // HH:mm
  end: string;
  venueId: string;
  capacity: number;
  baseBooked: number; // seats taken by people outside the mock participant list
  regOpen: string;
  regClose: string;
  status: TrainingStatus;
  audience: string;
  objectives: string[];
  requirements: string[];
  info: string;
}

export type AppStatus =
  | "draft"
  | "submitted"
  | "pending"
  | "approved"
  | "confirmed"
  | "waitlisted"
  | "rejected"
  | "cancelled"
  | "completed"
  | "attended"
  | "no_show";

export type Attendance = "present" | "absent" | "late";

export interface HistoryEntry {
  status: AppStatus;
  at: string;
  by: string;
  note?: string;
}

export interface Application {
  id: string;
  ref: string;
  trainingId: string;
  participantId: string;
  submittedAt: string;
  status: AppStatus;
  history: HistoryEntry[];
  attendance?: Attendance;
  contactMethod?: "email" | "sms" | "whatsapp";
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  org: string;
  role: string;
  city: string;
  tin?: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  capacity: number;
  contact: string;
  phone: string;
  status: "available" | "unavailable" | "maintenance";
}

export interface Notification {
  id: string;
  audience: Role;
  title: string;
  body: string;
  at: string;
  read: boolean;
  link?: string;
  kind: "approval" | "reminder" | "deadline" | "update" | "cancel" | "info";
}

export interface Activity {
  id: string;
  at: string;
  actor: string;
  text: string;
}

export interface Prefs {
  email: boolean;
  sms: boolean;
  reminders: boolean;
  newTrainings: boolean;
}
