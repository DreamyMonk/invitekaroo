import { NextResponse } from "next/server";
import { normalizePhone } from "@/lib/whatsapp";

// Verify the WhatsApp OTP → mint a Firebase custom token for the app to sign in.
export async function POST(req) {
  try {
    const { phone, code } = await req.json();
    const p = normalizePhone(phone);
    if (!p || !code) return NextResponse.json({ ok: false, error: "Phone and code required" }, { status: 400 });

    const admin = (await import("firebase-admin")).default;
    if (!admin.apps.length) {
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
      if (!raw) return NextResponse.json({ ok: false, error: "FIREBASE_SERVICE_ACCOUNT env var not set" }, { status: 501 });
      admin.initializeApp({ credential: admin.credential.cert(JSON.parse(raw)) });
    }
    const db = admin.firestore();
    const ref = db.collection("otps").doc("wa_" + p);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ ok: false, error: "Request a code first" }, { status: 400 });
    const d = snap.data();
    if (Date.now() > d.expiresAt) {
      await ref.delete();
      return NextResponse.json({ ok: false, error: "Code expired — resend" }, { status: 400 });
    }
    if (String(code).trim() !== String(d.code)) {
      return NextResponse.json({ ok: false, error: "Incorrect code" }, { status: 400 });
    }
    await ref.delete();
    try {
      await db.collection("otpDebug").doc("+" + p).set(
        { used: true, usedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true },
      );
    } catch (_) {}

    const phoneE164 = "+" + p;
    let user;
    try {
      user = await admin.auth().getUserByPhoneNumber(phoneE164);
    } catch {
      user = await admin.auth().createUser({ phoneNumber: phoneE164 });
    }
    const token = await admin.auth().createCustomToken(user.uid);
    return NextResponse.json({ ok: true, token, uid: user.uid });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
