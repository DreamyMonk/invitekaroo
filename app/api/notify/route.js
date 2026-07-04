import { NextResponse } from "next/server";

// Sends an FCM push to every app install subscribed to the "programs" topic.
// Requires the FIREBASE_SERVICE_ACCOUNT env var on Vercel: the full JSON of a
// Firebase service-account key (Console → Project settings → Service accounts
// → Generate new private key), pasted as one line.
export async function POST(req) {
  try {
    const { title, body, cid } = await req.json();
    if (!title) {
      return NextResponse.json({ ok: false, error: "title required" }, { status: 400 });
    }
    // Scope the push to this community's subscribers only. Fall back to the
    // legacy global topic if no community id was supplied.
    const topic = cid ? `community_${cid}` : "programs";
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
    const id = await admin.messaging().send({
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
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
