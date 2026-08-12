import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_sheets/v4';
const SPREADSHEET_ID = '1Zb2ejSuVh5AFlKRL9FW4OqGa3sXxfL7iAJrYPaAOLOQ';

const BodySchema = z.object({
  type: z.enum(['duvida', 'video']),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

async function appendToSheet(row: string[]) {
  const lovableKey = Deno.env.get('LOVABLE_API_KEY');
  const sheetsKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
  if (!lovableKey) throw new Error('LOVABLE_API_KEY not configured');
  if (!sheetsKey) throw new Error('GOOGLE_SHEETS_API_KEY not configured');

  const gatewayHeaders = {
    Authorization: `Bearer ${lovableKey}`,
    'X-Connection-Api-Key': sheetsKey,
  };

  // Descobre o nome da primeira aba (Sheet1, Página1, Hoja1, ...)
  const metaRes = await fetch(
    `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`,
    { headers: gatewayHeaders },
  );
  if (!metaRes.ok) {
    throw new Error(`Sheets metadata failed (${metaRes.status}): ${await metaRes.text()}`);
  }
  const meta = await metaRes.json();
  const sheetTitle: string = meta?.sheets?.[0]?.properties?.title ?? 'Sheet1';

  const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${sheetTitle}!A:E:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...gatewayHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed (${res.status}): ${await res.text()}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
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

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );

    // Identifica o aluno logado (opcional — o formulário também aceita anônimos)
    let userId: string | null = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const { data } = await admin.auth.getUser(authHeader.replace('Bearer ', ''));
      userId = data.user?.id ?? null;
    }

    // 1) Grava no banco primeiro — garante que nada é perdido
    const { data: inserted, error: insertError } = await admin
      .from('feedback_submissions')
      .insert({ user_id: userId, type, name, email, message })
      .select('id')
      .single();

    if (insertError) {
      console.error('DB insert failed:', insertError);
      throw new Error('Não foi possível registrar o envio.');
    }

    // 2) Tenta espelhar na planilha; se falhar, o envio continua salvo
    let syncedToSheet = false;
    let syncError: string | null = null;
    try {
      await appendToSheet([timestamp, typeLabel, name, email, message]);
      syncedToSheet = true;
    } catch (e) {
      syncError = e instanceof Error ? e.message : 'Unknown sheet error';
      console.error('Sheet sync failed:', syncError);
    }

    await admin
      .from('feedback_submissions')
      .update({ synced_to_sheet: syncedToSheet, sync_error: syncError })
      .eq('id', inserted.id);

    return new Response(JSON.stringify({ ok: true, syncedToSheet }), {
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
