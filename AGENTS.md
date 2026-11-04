# Project conventions
- Validate lesson video links through the shared video helper before rendering an iframe, so unpublished lessons never navigate to a placeholder path.
- Administrator access is determined exclusively by protected database roles, never by email comparisons in the application.
- Keep curriculum IDs stable when removing or merging modules; use array order for numbering/unlocking and active exercise IDs for totals, so saved progress stays associated with the original lessons.