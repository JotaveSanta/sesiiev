CREATE TABLE public.feedback_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('duvida','video')),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  synced_to_sheet boolean NOT NULL DEFAULT false,
  sync_error text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.feedback_submissions TO authenticated;
GRANT ALL ON public.feedback_submissions TO service_role;

ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all feedback"
ON public.feedback_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update feedback"
ON public.feedback_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_feedback_submissions_created_at ON public.feedback_submissions (created_at DESC);