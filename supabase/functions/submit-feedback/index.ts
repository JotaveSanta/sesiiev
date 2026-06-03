import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_sheets/v4';
const SPREADSHEET_ID = '1Zb2ejSuVh5AFlKRL9FW4OqGa3sXxfL7iAJrYPaAOLOQ';

const BodySchema = z.object({
  type: z.enum(['duvida', 'video']),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const lovableKey = Deno.env.get('LOVABLE_API_KEY');
    const sheetsKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    if (!lovableKey) throw new Error('LOVABLE_API_KEY not configured');
    if (!sheetsKey) throw new Error('GOOGLE_SHEETS_API_KEY not configured');

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { type, name, email, message } = parsed.data;
    const timestamp = new Date().toISOString();
    const typeLabel = type === 'video' ? 'Vídeo (link)' : 'Dúvida';

    const gatewayHeaders = {
      Authorization: `Bearer ${lovableKey}`,
      'X-Connection-Api-Key': sheetsKey,
    };

    // Get the first sheet's title (works regardless of language: Sheet1, Página1, Hoja1, etc.)
    const metaRes = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`,
      { headers: gatewayHeaders },
    );
    if (!metaRes.ok) {
      const text = await metaRes.text();
      throw new Error(`Failed to read spreadsheet metadata (${metaRes.status}): ${text}`);
    }
    const meta = await metaRes.json();
    const sheetTitle: string = meta?.sheets?.[0]?.properties?.title ?? 'Sheet1';
    const range = `${sheetTitle}!A:E`;

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { ...gatewayHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        values: [[timestamp, typeLabel, name, email, message]],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Google Sheets append failed (${res.status}): ${text}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('submit-feedback error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
