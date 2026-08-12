CREATE TABLE public.zz_rls_probe (id uuid primary key default gen_random_uuid());
GRANT SELECT ON public.zz_rls_probe TO anon;
GRANT ALL ON public.zz_rls_probe TO service_role;
ALTER TABLE public.zz_rls_probe ENABLE ROW LEVEL SECURITY;
CREATE POLICY "probe" ON public.zz_rls_probe FOR SELECT TO anon USING (public.has_role(auth.uid(), 'admin'::app_role));