
-- Revoke execute on has_role from anon
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon;

-- Replace overly permissive registration insert policy
DROP POLICY IF EXISTS "Anyone can register" ON public.registrations;
CREATE POLICY "Anyone can register" ON public.registrations
  FOR INSERT WITH CHECK (
    first_name IS NOT NULL AND
    last_name IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL
  );
