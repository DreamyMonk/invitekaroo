import { NextResponse } from "next/server";
import { sendWhatsAppTemplate } from "@/lib/whatsapp";

// Sends an approved WhatsApp template.
// Body: { to, template, language?, bodyVars?: string[], buttonVar?: string }
export async function POST(req) {
  try {
    const { to, template, language = "en", bodyVars = [], buttonVar } = await req.json();
    if (!to || !template) {
      return NextResponse.json({ ok: false, error: "to and template are required" }, { status: 400 });
    }
    const r = await sendWhatsAppTemplate({ to, template, language, bodyVars, buttonVar });
    if (!r.ok) return NextResponse.json(r, { status: r.error?.includes("not configured") ? 501 : 502 });
    return NextResponse.json(r);
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
