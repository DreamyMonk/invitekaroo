import { NextResponse } from "next/server";

// Sends an approved WhatsApp template via whatapi.in (Meta Cloud API format).
// Body: { to, template, language?, bodyVars?: string[], buttonVar?: string }
// Credentials live in Vercel env (WHATAPI_*).
export async function POST(req) {
  try {
    const { to, template, language = "en", bodyVars = [], buttonVar } = await req.json();
    if (!to || !template) {
      return NextResponse.json({ ok: false, error: "to and template are required" }, { status: 400 });
    }
    const token = process.env.WHATAPI_ACCESS_TOKEN;
    const base = process.env.WHATAPI_API_URL;
    const ver = process.env.WHATAPI_API_VERSION || "v19.0";
    const pnid = process.env.WHATAPI_PHONE_NUMBER_ID;
    if (!token || !base || !pnid) {
      return NextResponse.json({ ok: false, error: "WhatsApp API not configured on the server" }, { status: 501 });
    }

    const components = [];
    if (Array.isArray(bodyVars) && bodyVars.length) {
      components.push({
        type: "body",
        parameters: bodyVars.map((t) => ({ type: "text", text: String(t) })),
      });
    }
    if (buttonVar != null && buttonVar !== "") {
      // Authentication templates (OTP): the code also fills the copy-code button.
      components.push({
        type: "button",
        sub_type: "url",
        index: "0",
        parameters: [{ type: "text", text: String(buttonVar) }],
      });
    }

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: String(to).replace(/[^0-9]/g, ""),
      type: "template",
      template: {
        name: template,
        language: { code: language },
        ...(components.length ? { components } : {}),
      },
    };

    const url = `${base.replace(/\/$/, "")}/${ver}/${pnid}/messages`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: j?.error?.message || j?.message || JSON.stringify(j) || `HTTP ${r.status}` },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, id: j?.messages?.[0]?.id || j?.id || null });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
