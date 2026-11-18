# Project conventions
- Validate lesson video links through the shared video helper before rendering an iframe, so unpublished lessons never navigate to a placeholder path.
- Administrator access is determined exclusively by protected database roles, never by email comparisons in the application.
- Keep curriculum IDs stable when removing or merging modules; use array order for numbering/unlocking and active exercise IDs for totals, so saved progress stays associated with the original lessons.
- Derive landing lesson previews from the existing curriculum and validate video URLs; previews never write progress or bypass course unlocking.
- Store teacher replies to lesson questions and feedback in one parent-scoped table; enforce admin-only writes and recipient-only reads with RLS, and serve private video attachments with expiring signed URLs.
- Resolve specific lesson links through stable exercise IDs and preserve the course's existing sequential unlock checks.