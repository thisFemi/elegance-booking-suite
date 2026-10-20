# Architecture rules
- Public routes use live Cloud events and atomic registration RPCs; existing prototype modules remain untouched for preservation.
- Admin routes validate the authenticated user and server-backed admin role; RLS enforces every administrative operation.
- Administrator profile data lives separately from protected user roles.
- Public availability exposes aggregate counts only, never participant records.
- Email UI must distinguish saved registrations from actual delivery; enable sending only after verified email infrastructure exists.