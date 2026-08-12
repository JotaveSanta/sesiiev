-- 1) Profiles: remove broad read access
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2) feedback_submissions: allow authenticated users to insert their own rows
GRANT INSERT ON public.feedback_submissions TO authenticated;

CREATE POLICY "Users can insert own feedback"
ON public.feedback_submissions FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback"
ON public.feedback_submissions FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- 3) Prevent direct RPC execution of the SECURITY DEFINER helper
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated, anon, PUBLIC;