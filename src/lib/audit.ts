import { supabase } from "@/integrations/supabase/client";

/**
 * Registra uma ação do painel administrativo na tabela de auditoria.
 * Falhas de log nunca devem quebrar a interface — por isso os erros são silenciados.
 */
export async function logAudit(
  action: string,
  opts: {
    targetType?: string;
    targetId?: string;
    details?: Record<string, unknown>;
  } = {}
) {
  try {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;

    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      actor_email: user.email ?? null,
      action,
      target_type: opts.targetType ?? null,
      target_id: opts.targetId ?? null,
      details: (opts.details ?? {}) as never,
    });
  } catch {
    // ignorado de propósito
  }
}
