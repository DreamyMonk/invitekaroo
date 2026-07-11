import { NextResponse } from "next/server";
import { sendWhatsAppBulk } from "@/lib/whatsapp";

// Sends an FCM push to every app install subscribed to the "programs" topic.
// Requires the FIREBASE_SERVICE_ACCOUNT env var on Vercel: the full JSON of a
// Firebase service-account key (Console → Project settings → Service accounts
// → Generate new private key), pasted as one line.
export async function POST(req) {
  try {
    const { title, body, cid, wa, push } = await req.json();
    if (!title) {
      return NextResponse.json({ ok: false, error: "title required" }, { status: 400 });
    }
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "FIREBASE_SERVICE_ACCOUNT env var not set on Vercel" },
        { status: 501 },
      );
    }
    const admin = (await import("firebase-admin")).default;
    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(JSON.parse(raw)) });
    }
    // Send the FCM push unless the caller asked for WhatsApp-only (push:false).
    // Scope to this community's subscribers; fall back to the legacy global
    // topic only if no community id was supplied.
    let id = null;
    if (push !== false) {
      const topic = cid ? `community_${cid}` : "programs";
      id = await admin.messaging().send({
        topic,
        notification: { title, body: body || "" },
        android: {
          priority: "high",
          notification: {
            channelId: "ik_default",
            sound: "default",
            defaultSound: true,
            notificationPriority: "PRIORITY_HIGH",
            defaultVibrateTimings: true,
            visibility: "PUBLIC",
          },
        },
        apns: { payload: { aps: { sound: "default" } } },
        data: { type: "program" },
      });
    }

    // Also fan out a WhatsApp template to this community's subscribers.
    let waResult = null;
    if (wa && wa.template && cid) {
      try {
        const subs = await admin.firestore().collection("communities").doc(cid).collection("subscribers").get();
        const numbers = subs.docs.map((d) => d.data().mobile).filter(Boolean);
        waResult = await sendWhatsAppBulk(numbers, () => ({
          template: wa.template,
          language: wa.language || "en",
          bodyVars: wa.bodyVars || [],
        }));
      } catch (e) {
        waResult = { error: String(e?.message || e) };
      }
    }
    return NextResponse.json({ ok: true, id, wa: waResult });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
