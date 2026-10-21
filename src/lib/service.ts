import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
export type Event = Tables<'events'>;
export type Registration = Tables<'registrations'>;
export const registrationSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name').max(120),
  email: z.string().trim().email('Enter a valid email address').max(254),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,25}$/, 'Enter a valid phone number').refine(v => v.replace(/\D/g, '').length >= 7, 'Enter a valid phone number'),
  organisation: z.string().trim().min(2, 'Enter your organisation').max(150),
  role: z.string().trim().min(2, 'Enter your designation').max(120),
});
export function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date()); }
export function eventStatus(e: Pick<Event,'status'|'reg_open'|'reg_close'|'event_date'|'total_slots'>, registered=0, date=today()) {
  if (e.status !== 'published') return e.status.charAt(0).toUpperCase()+e.status.slice(1);
  if (date > (e.reg_close || e.event_date) || date > e.event_date) return 'Registration Closed';
  if (date < e.reg_open) return 'Opens Soon';
  if (registered >= e.total_slots) return 'Fully Booked';
  return 'Registration Open';
}
export const dateLabel = (d:string) => new Date(`${d.slice(0,10)}T12:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
export const timeLabel = (t:string) => new Date(`2000-01-01T${t}`).toLocaleTimeString('en-NG',{hour:'numeric',minute:'2-digit'});
export async function getEvents(admin=false) {
  let query = supabase.from('events').select('*').order('event_date');
  if(!admin) query=query.eq('status','published');
  const {data,error}=await query;
  if(error) throw error;
  return data;
}
export async function availability() {
  const {data,error}=await supabase.rpc('event_availability');
  if(error) throw error;
  return Object.fromEntries((data||[]).map(r=>[r.event_id,Number(r.registered)]));
}
export function exportCsv(filename:string, rows:Record<string,unknown>[]) {
  if(!rows.length) return;
  const keys=Object.keys(rows[0]);
  const escape=(v:unknown) => { let text=String(v??''); if(/^[=+\-@\t\r]/.test(text)) text="'"+text; return '"'+text.replace(/"/g,'""')+'"'; };
  const blob=new Blob(['\ufeff'+[keys.map(escape).join(','),...rows.map(r=>keys.map(k=>escape(r[k])).join(','))].join('\r\n')],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}