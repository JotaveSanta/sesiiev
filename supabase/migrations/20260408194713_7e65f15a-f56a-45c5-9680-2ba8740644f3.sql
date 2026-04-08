
DROP POLICY "Authenticated users can update questions" ON public.questions;
CREATE POLICY "Users can update own questions" ON public.questions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
