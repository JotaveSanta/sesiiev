CREATE TABLE public.teacher_responses (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 question_id uuid REFERENCES public.questions(id) ON DELETE CASCADE,
 feedback_id uuid REFERENCES public.feedback_submissions(id) ON DELETE CASCADE,
 author_id uuid NOT NULL,
 message text NOT NULL,
 video_url text,
 video_path text,
 lesson_id text,
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT response_one_parent CHECK (num_nonnulls(question_id, feedback_id) = 1),
 CONSTRAINT response_message CHECK (char_length(btrim(message)) BETWEEN 1 AND 4000),
 CONSTRAINT response_video_url CHECK (video_url IS NULL OR (char_length(video_url) <= 2000 AND video_url ~ '^https://[^[:space:]]+$')),
 CONSTRAINT response_one_video CHECK (num_nonnulls(video_url, video_path) <= 1),
 CONSTRAINT response_video_path CHECK (video_path IS NULL OR (video_path = author_id::text || '/' || id::text || '/video.mp4' OR video_path = author_id::text || '/' || id::text || '/video.webm' OR video_path = author_id::text || '/' || id::text || '/video.mov')),
 CONSTRAINT response_lesson CHECK (lesson_id IS NULL OR lesson_id ~ '^[0-9]+-[0-9]+$')
);
GRANT SELECT, INSERT ON public.teacher_responses TO authenticated;
GRANT ALL ON public.teacher_responses TO service_role;
ALTER TABLE public.teacher_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers send responses" ON public.teacher_responses FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid() AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Recipients and teachers read responses" ON public.teacher_responses FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR EXISTS (SELECT 1 FROM public.questions q WHERE q.id = question_id AND q.user_id = auth.uid()) OR EXISTS (SELECT 1 FROM public.feedback_submissions f WHERE f.id = feedback_id AND f.user_id = auth.uid()));
CREATE INDEX teacher_responses_question_idx ON public.teacher_responses(question_id);
CREATE INDEX teacher_responses_feedback_idx ON public.teacher_responses(feedback_id);
CREATE INDEX teacher_responses_author_idx ON public.teacher_responses(author_id);
CREATE FUNCTION public.mark_question_replied() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN IF NEW.question_id IS NOT NULL THEN UPDATE public.questions SET answered = true WHERE id = NEW.question_id; END IF; RETURN NEW; END; $$;
REVOKE ALL ON FUNCTION public.mark_question_replied() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER question_replied AFTER INSERT ON public.teacher_responses FOR EACH ROW EXECUTE FUNCTION public.mark_question_replied();
CREATE POLICY "Teachers upload response videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'teacher-reply-videos' AND (storage.foldername(name))[1] = auth.uid()::text AND private.has_role(auth.uid(), 'admin'::public.app_role) AND lower(storage.extension(name)) IN ('mp4','webm','mov'));
CREATE POLICY "Recipients read response videos" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'teacher-reply-videos' AND (private.has_role(auth.uid(), 'admin'::public.app_role) OR EXISTS (SELECT 1 FROM public.teacher_responses r WHERE r.video_path = name)));
CREATE POLICY "Teachers remove own pending videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'teacher-reply-videos' AND (storage.foldername(name))[1] = auth.uid()::text AND private.has_role(auth.uid(), 'admin'::public.app_role) AND NOT EXISTS (SELECT 1 FROM public.teacher_responses r WHERE r.video_path = name));