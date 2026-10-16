import type { Activity, Application, AppStatus, Notification, Participant, Training, Venue } from "@/lib/types";

export const CURRENT_USER_ID = "p1";

export const CATEGORIES = [
  "End User Training",
  "Customs Brokers",
  "Regulatory Agencies",
  "Trade Facilitation",
  "Advanced Modules",
];

export const venues: Venue[] = [
  { id: "v1", name: "Lagos Training Centre", address: "14 Idowu Taylor Street, Victoria Island", city: "Lagos", capacity: 60, contact: "Mrs. Funke Bello", phone: "0803 412 7781", status: "available" },
  { id: "v2", name: "NAGAFF Academy", address: "2 Maybin Road, Apapa", city: "Lagos", capacity: 50, contact: "Mr. Tunde Okafor", phone: "0805 220 1934", status: "available" },
  { id: "v3", name: "ANLCA National Secretariat", address: "20 Durbar Road, Amuwo Odofin", city: "Lagos", capacity: 45, contact: "Mr. Chidi Nwosu", phone: "0802 118 6640", status: "maintenance" },
  { id: "v4", name: "NSW Abuja Office", address: "Plot 1052 Cadastral Zone, Central Business District", city: "Abuja", capacity: 40, contact: "Ms. Amina Yusuf", phone: "0809 331 0457", status: "available" },
  { id: "v5", name: "Limewood Hotel", address: "1B Abacha Road, GRA Phase 3", city: "Port Harcourt", capacity: 50, contact: "Mr. Ibiene Briggs", phone: "0806 774 2208", status: "available" },
  { id: "v6", name: "Customs Training School", address: "Zoo Road, Gidan Murtala", city: "Kano", capacity: 35, contact: "Malam Sani Garba", phone: "0703 556 9012", status: "available" },
];

const OBJ_END_USER = [
  "Navigate the NSW portal and manage your organisation account",
  "Submit and track Form M, PAAR and permit applications",
  "Upload and manage supporting trade documents correctly",
  "Resolve common submission errors and queries",
];
const REQ_STD = [
  "Laptop with a modern web browser (Chrome or Edge)",
  "Valid NSW portal login credentials",
  "Government-issued photo ID for check-in",
  "Booking confirmation (printed or on phone)",
];

function t(p: Partial<Training> & Pick<Training, "id" | "title" | "date" | "venueId" | "category">): Training {
  return {
    summary: "Hands-on session covering the core NSW portal workflows for traders and agents.",
    description:
      "This instructor-led session introduces participants to the National Single Window platform and walks through the end-to-end process of submitting, tracking and managing trade applications. Participants will work through live scenarios on a training environment.",
    trainer: "Mr. Emeka Obi, NSW Training Lead",
    start: "10:00",
    end: "14:00",
    capacity: 50,
    baseBooked: 20,
    regOpen: "2026-09-15",
    regClose: p.date ? shift(p.date, -3) : "2026-10-15",
    status: "published",
    audience: "Importers, exporters, freight forwarders and licensed customs agents who will use the NSW portal.",
    objectives: OBJ_END_USER,
    requirements: REQ_STD,
    info: "Please arrive 30 minutes early for registration. Light refreshments will be provided. Parking is limited.",
    ...p,
  };
}
function shift(d: string, days: number) {
  const [y, m, dd] = d.split("-").map(Number);
  const x = new Date(y, m - 1, dd + days);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
}

export const trainings: Training[] = [
  t({ id: "t1", title: "National Single Window End User Training", date: "2026-10-18", venueId: "v1", category: "End User Training", baseBooked: 24, regClose: "2026-10-15" }),
  t({ id: "t2", title: "NSW End User Training — Apapa Cohort", date: "2026-10-22", venueId: "v2", category: "End User Training", baseBooked: 31, regClose: "2026-10-19" }),
  t({ id: "t3", title: "Customs Broker Onboarding to NSW", date: "2026-10-27", start: "09:00", end: "15:00", venueId: "v2", category: "Customs Brokers", capacity: 40, baseBooked: 39, summary: "Onboarding session for licensed customs brokers moving declarations to NSW.", trainer: "Mrs. Ngozi Eze, Customs Liaison", objectives: ["Lodge declarations through NSW", "Link broker licences to client accounts", "Manage duty payments and receipts"] }),
  t({ id: "t4", title: "Regulatory Agency Permit Processing", date: "2026-10-29", venueId: "v4", category: "Regulatory Agencies", capacity: 40, baseBooked: 12, summary: "For agency officers who review and approve permits on NSW.", trainer: "Dr. Halima Bello, Agency Integration", audience: "Officers of NAFDAC, SON, NAQS and other permit-issuing agencies.", objectives: ["Review and approve permit applications", "Use the agency workbench and queues", "Issue e-certificates and track SLAs"] }),
  t({ id: "t5", title: "National Single Window End User Training", date: "2026-11-03", venueId: "v4", category: "End User Training", baseBooked: 18, capacity: 40, regOpen: "2026-10-01" }),
  t({ id: "t6", title: "Trade Facilitation & Document Standards", date: "2026-11-05", start: "11:00", end: "15:00", venueId: "v5", category: "Trade Facilitation", baseBooked: 9, summary: "Understand document standards, HS classification and compliance on NSW.", trainer: "Mr. Femi Ajayi, Trade Policy Advisor", objectives: ["Apply HS codes correctly", "Prepare compliant commercial documents", "Understand risk management flags"] }),
  t({ id: "t7", title: "NSW End User Training — Kano Cohort", date: "2026-11-10", venueId: "v6", category: "End User Training", capacity: 35, baseBooked: 6, regOpen: "2026-10-20" }),
  t({ id: "t8", title: "Advanced NSW: Bulk Uploads & API Integration", date: "2026-11-17", start: "09:00", end: "16:00", venueId: "v1", category: "Advanced Modules", capacity: 30, baseBooked: 14, summary: "For high-volume traders integrating systems with NSW.", trainer: "Engr. Kola Adeyemi, Systems Integration", audience: "IT staff and operations leads at high-volume trading organisations.", objectives: ["Use bulk upload templates", "Understand NSW API authentication", "Monitor integration errors"], requirements: ["Laptop with admin rights", "Basic familiarity with JSON/CSV", "NSW organisation admin access"] }),
  t({ id: "t9", title: "National Single Window End User Training", date: "2026-09-24", venueId: "v1", category: "End User Training", baseBooked: 38, status: "completed", regOpen: "2026-08-20" }),
  t({ id: "t10", title: "NSW End User Training — Port Harcourt", date: "2026-10-08", venueId: "v5", category: "End User Training", baseBooked: 22, status: "cancelled", regOpen: "2026-09-01" }),
  t({ id: "t11", title: "Trade Facilitation & Document Standards", date: "2026-10-06", start: "11:00", end: "15:00", venueId: "v4", category: "Trade Facilitation", baseBooked: 27, status: "completed", regOpen: "2026-09-01" }),
  t({ id: "t12", title: "Customs Broker Refresher (Draft)", date: "2026-12-02", venueId: "v3", category: "Customs Brokers", baseBooked: 0, status: "draft", regOpen: "2026-11-01" }),
];

export const participants: Participant[] = [
  { id: "p1", name: "John Adewale", email: "john.adewale@abclogistics.ng", phone: "0803 555 0192", org: "ABC Logistics Ltd", role: "Import Operations Officer", city: "Lagos", tin: "20417733-0001" },
  { id: "p2", name: "Chiamaka Okonkwo", email: "c.okonkwo@deltafreight.ng", phone: "0806 221 4410", org: "Delta Freight Services", role: "Customs Agent", city: "Lagos" },
  { id: "p3", name: "Ibrahim Musa", email: "imusa@sahelagro.com", phone: "0809 118 2205", org: "Sahel Agro Exports", role: "Export Manager", city: "Kano" },
  { id: "p4", name: "Adaeze Nnamdi", email: "adaeze@nafdac.gov.ng", phone: "0802 773 9001", org: "NAFDAC", role: "Regulatory Officer", city: "Abuja" },
  { id: "p5", name: "Tolu Bakare", email: "tolu.b@primeclearing.ng", phone: "0805 331 6672", org: "Prime Clearing Agency", role: "Licensed Broker", city: "Lagos" },
  { id: "p6", name: "Emmanuel Ekpo", email: "e.ekpo@riversoil.ng", phone: "0703 910 4421", org: "Rivers Oil Services", role: "Procurement Lead", city: "Port Harcourt" },
  { id: "p7", name: "Fatima Abdullahi", email: "fatima@son.gov.ng", phone: "0810 442 1189", org: "Standards Organisation of Nigeria", role: "Inspector", city: "Abuja" },
  { id: "p8", name: "Segun Olatunji", email: "segun@westportcargo.ng", phone: "0807 664 3320", org: "Westport Cargo Ltd", role: "Operations Manager", city: "Lagos" },
  { id: "p9", name: "Ngozi Agu", email: "ngozi.agu@abclogistics.ng", phone: "0803 120 8876", org: "ABC Logistics Ltd", role: "Documentation Officer", city: "Lagos" },
  { id: "p10", name: "Yusuf Danjuma", email: "ydanjuma@northtrade.ng", phone: "0806 770 1203", org: "Northern Trade Hub", role: "Compliance Officer", city: "Kano" },
  { id: "p11", name: "Blessing Okoro", email: "b.okoro@gulfshipping.ng", phone: "0805 998 7712", org: "Gulf Shipping Agency", role: "Shipping Coordinator", city: "Port Harcourt" },
  { id: "p12", name: "Kemi Adeyemi", email: "kemi@harbourline.ng", phone: "0802 556 1090", org: "Harbourline Imports", role: "Finance Officer", city: "Lagos" },
  { id: "p13", name: "Musa Bello", email: "musa.bello@naqs.gov.ng", phone: "0809 223 4456", org: "NAQS", role: "Quarantine Officer", city: "Abuja" },
  { id: "p14", name: "Grace Etim", email: "grace@calabarexports.ng", phone: "0703 445 8890", org: "Calabar Exports Co.", role: "Export Officer", city: "Port Harcourt" },
  { id: "p15", name: "Daniel Uche", email: "d.uche@primeclearing.ng", phone: "0805 101 2234", org: "Prime Clearing Agency", role: "Junior Broker", city: "Lagos" },
];

let refN = 100;
function app(id: string, trainingId: string, participantId: string, submitted: string, status: AppStatus, extra: Partial<Application> = {}): Application {
  refN++;
  const history: Application["history"] = [{ status: "submitted", at: `${submitted}T10:12:00`, by: "Participant" }];
  if (status !== "pending" && status !== "submitted") {
    history.push({ status: "pending", at: `${submitted}T10:12:30`, by: "System", note: "Queued for review" });
  }
  if (["confirmed", "completed", "attended", "no_show"].includes(status)) {
    history.push({ status: "confirmed", at: `${submitted}T15:40:00`, by: "Training Administrator", note: "Seat confirmed" });
  }
  if (status === "completed") history.push({ status: "completed", at: `${submitted}T18:00:00`, by: "Training Administrator", note: "Attendance recorded: Present" });
  if (status === "no_show") history.push({ status: "no_show", at: `${submitted}T18:00:00`, by: "Training Administrator", note: "Attendance recorded: Absent" });
  if (status === "rejected") history.push({ status: "rejected", at: `${submitted}T16:00:00`, by: "Training Administrator", note: "Applicant does not meet the target audience for this session." });
  if (status === "waitlisted") history.push({ status: "waitlisted", at: `${submitted}T16:00:00`, by: "System", note: "Session at capacity" });
  if (status === "cancelled") history.push({ status: "cancelled", at: `${submitted}T16:00:00`, by: "Training Administrator", note: "Training session cancelled by NSW." });
  if (status === "pending") history.push({ status: "pending", at: `${submitted}T10:12:30`, by: "System", note: "Queued for review" });
  return { id, ref: `NSW-TRN-2026-00${refN}`, trainingId, participantId, submittedAt: `${submitted}T10:12:00`, status, history, contactMethod: "email", ...extra };
}

export const applications: Application[] = [
  app("a1", "t1", "p1", "2026-10-02", "confirmed"),
  app("a2", "t5", "p1", "2026-10-12", "pending"),
  app("a3", "t9", "p1", "2026-09-10", "completed", { attendance: "present" }),
  app("a4", "t10", "p1", "2026-09-18", "cancelled"),
  app("a5", "t1", "p2", "2026-10-04", "confirmed"),
  app("a6", "t1", "p9", "2026-10-05", "confirmed"),
  app("a7", "t1", "p12", "2026-10-11", "pending"),
  app("a8", "t2", "p5", "2026-10-07", "confirmed"),
  app("a9", "t2", "p8", "2026-10-13", "pending"),
  app("a10", "t2", "p15", "2026-10-14", "pending"),
  app("a11", "t3", "p5", "2026-10-03", "confirmed"),
  app("a12", "t3", "p2", "2026-10-14", "waitlisted"),
  app("a13", "t4", "p4", "2026-10-06", "confirmed"),
  app("a14", "t4", "p7", "2026-10-09", "confirmed"),
  app("a15", "t4", "p13", "2026-10-15", "pending"),
  app("a16", "t4", "p8", "2026-10-10", "rejected"),
  app("a17", "t5", "p4", "2026-10-11", "pending"),
  app("a18", "t6", "p6", "2026-10-08", "confirmed"),
  app("a19", "t6", "p11", "2026-10-12", "pending"),
  app("a20", "t6", "p14", "2026-10-15", "pending"),
  app("a21", "t8", "p8", "2026-10-14", "pending"),
  app("a22", "t9", "p2", "2026-09-08", "completed", { attendance: "present" }),
  app("a23", "t9", "p9", "2026-09-09", "completed", { attendance: "late" }),
  app("a24", "t9", "p12", "2026-09-11", "no_show", { attendance: "absent" }),
  app("a25", "t11", "p4", "2026-09-20", "confirmed"),
  app("a26", "t11", "p7", "2026-09-21", "confirmed"),
  app("a27", "t11", "p13", "2026-09-22", "confirmed"),
  app("a28", "t11", "p10", "2026-09-25", "confirmed"),
  app("a29", "t10", "p6", "2026-09-19", "cancelled"),
  app("a30", "t10", "p11", "2026-09-20", "cancelled"),
  app("a31", "t7", "p3", "2026-10-15", "pending"),
  app("a32", "t7", "p10", "2026-10-15", "pending"),
];

export const notifications: Notification[] = [
  { id: "n1", audience: "participant", kind: "reminder", title: "Training in 2 days", body: "Your National Single Window End User Training is on 18 October 2026 at Lagos Training Centre, 10:00 AM.", at: "2026-10-16T08:00:00", read: false, link: "/app/my-trainings/a1" },
  { id: "n2", audience: "participant", kind: "update", title: "Venue details updated", body: "Parking guidance has been added for Lagos Training Centre. Please arrive 30 minutes early.", at: "2026-10-15T14:20:00", read: false, link: "/app/trainings/t1" },
  { id: "n3", audience: "participant", kind: "deadline", title: "Registration closing soon", body: "Registration for NSW End User Training — Apapa Cohort closes in 3 days.", at: "2026-10-16T07:30:00", read: false, link: "/app/trainings/t2" },
  { id: "n4", audience: "participant", kind: "approval", title: "Application approved", body: "Your application for National Single Window End User Training (NSW-TRN-2026-00101) has been approved.", at: "2026-10-02T15:40:00", read: true, link: "/app/my-trainings/a1" },
  { id: "n5", audience: "participant", kind: "cancel", title: "Training cancelled", body: "NSW End User Training — Port Harcourt on 8 October 2026 has been cancelled. You can apply for another session.", at: "2026-10-01T09:00:00", read: true, link: "/app/my-trainings/a4" },
  { id: "n6", audience: "participant", kind: "info", title: "Certificate available", body: "Your certificate for National Single Window End User Training (24 September 2026) is ready.", at: "2026-09-25T10:00:00", read: true, link: "/app/my-trainings/a3/certificate" },
  { id: "n7", audience: "admin", kind: "info", title: "12 applications awaiting review", body: "Pending applications across 7 sessions require a decision.", at: "2026-10-16T08:00:00", read: false, link: "/admin/applications" },
  { id: "n8", audience: "admin", kind: "deadline", title: "Session nearly full", body: "Customs Broker Onboarding to NSW (27 Oct) has 1 seat remaining.", at: "2026-10-15T17:10:00", read: false, link: "/admin/trainings/t3" },
  { id: "n9", audience: "admin", kind: "update", title: "Venue under maintenance", body: "ANLCA National Secretariat is marked as under maintenance until 30 November.", at: "2026-10-12T11:00:00", read: true, link: "/admin/venues" },
  { id: "n10", audience: "admin", kind: "reminder", title: "Attendance not yet recorded", body: "Attendance for Trade Facilitation & Document Standards (6 Oct, Abuja) has not been recorded.", at: "2026-10-07T09:00:00", read: false, link: "/admin/trainings/t11/attendance" },
];

export const activity: Activity[] = [
  { id: "ac1", at: "2026-10-15T16:42:00", actor: "Training Administrator", text: "Approved application NSW-TRN-2026-00114 (Adaeze Nnamdi)" },
  { id: "ac2", at: "2026-10-15T11:05:00", actor: "Training Administrator", text: "Published Advanced NSW: Bulk Uploads & API Integration" },
  { id: "ac3", at: "2026-10-12T11:00:00", actor: "Venue Coordinator", text: "Marked ANLCA National Secretariat as under maintenance" },
  { id: "ac4", at: "2026-10-10T15:20:00", actor: "Training Administrator", text: "Rejected application NSW-TRN-2026-00116 (Segun Olatunji)" },
  { id: "ac5", at: "2026-10-01T09:00:00", actor: "Training Administrator", text: "Cancelled NSW End User Training — Port Harcourt (8 Oct) and notified 3 applicants" },
];
