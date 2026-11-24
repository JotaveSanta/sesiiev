DROP POLICY IF EXISTS "Recipients read response videos" ON storage.objects;
CREATE POLICY "Recipients read response videos" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'teacher-reply-videos' AND (
  private.has_role(auth.uid(), 'admin'::app_role)
  OR EXISTS (SELECT 1 FROM public.teacher_responses r JOIN public.questions q ON q.id = r.question_id WHERE r.video_path = objects.name AND q.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.teacher_responses r JOIN public.feedback_submissions f ON f.id = r.feedback_id WHERE r.video_path = objects.name AND f.user_id = auth.uid())
));