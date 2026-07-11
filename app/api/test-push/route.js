import { NextResponse } from "next/server";

// Debug endpoint: push a notification straight to ONE device's FCM token,
// bypassing topics entirely. The app's Settings → "Send test push to this
// device" calls this to isolate whether FCM delivery to a specific device
// works, independent of any topic subscription.
// Body: { token, title?, body? }
export async function POST(req) {
  try {
    const { token, title, body } = await req.json();
    if (!token) {
      return NextResponse.json({ ok: false, error: "token required" }, { status: 400 });
    }
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "FIREBASE_SERVICE_ACCOUNT env var not set" },
        { status: 501 },
      );
    }
    const admin = (await import("firebase-admin")).default;
    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(JSON.parse(raw)) });
    }
    const id = await admin.messaging().send({
      token,
      notification: { title: title || "Test push", body: body || "" },
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
      data: { type: "test" },
    });
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    // A bad/stale token surfaces here as messaging/registration-token-not-registered
    // — that itself is a useful diagnostic (the device's token is invalid).
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
