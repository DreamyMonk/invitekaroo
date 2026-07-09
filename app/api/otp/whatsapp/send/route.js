import { NextResponse } from "next/server";
import { sendWhatsAppTemplate, normalizePhone } from "@/lib/whatsapp";

// App login OTP over WhatsApp: generate a code, store it, send the otp_login
// authentication template. Requires FIREBASE_SERVICE_ACCOUNT + WHATAPI_* env.
export async function POST(req) {
  try {
    const { phone } = await req.json();
    const p = normalizePhone(phone);
    if (!p || p.length < 11) {
      return NextResponse.json({ ok: false, error: "Enter a valid mobile number" }, { status: 400 });
    }
    const admin = (await import("firebase-admin")).default;
    if (!admin.apps.length) {
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
      if (!raw) return NextResponse.json({ ok: false, error: "FIREBASE_SERVICE_ACCOUNT env var not set" }, { status: 501 });
      admin.initializeApp({ credential: admin.credential.cert(JSON.parse(raw)) });
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    await admin.firestore().collection("otps").doc("wa_" + p).set({
      code,
      phone: p,
      expiresAt: Date.now() + 5 * 60 * 1000,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    // Mirror to otpDebug so the admin "Login Codes" view can show it during testing.
    try {
      await admin.firestore().collection("otpDebug").doc("+" + p).set(
        { number: "+" + p, code, at: admin.firestore.FieldValue.serverTimestamp(), used: false, via: "whatsapp" },
        { merge: true },
      );
    } catch (_) {}

    const r = await sendWhatsAppTemplate({
      to: p,
      template: "otp_login",
      language: "en",
      bodyVars: [code],
      buttonVar: code,
    });
    if (!r.ok) return NextResponse.json({ ok: false, error: r.error || "Could not send WhatsApp code" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
