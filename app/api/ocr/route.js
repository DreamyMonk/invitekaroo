import { NextResponse } from "next/server";

// AI Scan for the app: OCR an invitation-card image with Mistral, then have a
// small chat model turn the extracted text into structured event fields.
// Requires MISTRAL_API_KEY in the Vercel env.
export async function POST(req) {
  try {
    const { image } = await req.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ ok: false, error: "image (data URL) required" }, { status: 400 });
    }
    const key = process.env.MISTRAL_API_KEY;
    if (!key) {
      return NextResponse.json({ ok: false, error: "MISTRAL_API_KEY not set on the server" }, { status: 501 });
    }
    const auth = { "Content-Type": "application/json", Authorization: `Bearer ${key}` };

    // 1) OCR the invitation image → markdown text.
    const ocrRes = await fetch("https://api.mistral.ai/v1/ocr", {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        model: "mistral-ocr-latest",
        document: { type: "image_url", image_url: image },
      }),
    });
    const ocr = await ocrRes.json();
    if (!ocrRes.ok) {
      return NextResponse.json({ ok: false, error: ocr?.message || "OCR request failed" }, { status: 502 });
    }
    const markdown = (ocr.pages || []).map((p) => p.markdown || "").join("\n").trim();
    if (!markdown) {
      return NextResponse.json({ ok: false, error: "Couldn't read any text on the card" }, { status: 422 });
    }

    // 2) Structure the text into event fields.
    const chatRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        model: "mistral-small-latest",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You extract event details from the OCR text of an invitation card. Return ONLY a JSON object with these keys: " +
              "title (short event name), " +
              "type (exactly one of: wedding, meeting, birthday, appointment, travel, other), " +
              "date (YYYY-MM-DD, or \"\" if unknown), " +
              "time (24-hour HH:MM, or \"\" if unknown), " +
              "venue (place/address, or \"\"), " +
              "host (organizer, host, or couple names, or \"\"), " +
              "description (one short line, or \"\"). " +
              "Infer the current or next plausible year if only a day/month is given. For weddings set title to the couple's names + \" Wedding\". Never invent details that aren't implied by the text.",
          },
          { role: "user", content: markdown },
        ],
      }),
    });
    const chat = await chatRes.json();
    let fields = {};
    try {
      fields = JSON.parse(chat?.choices?.[0]?.message?.content || "{}");
    } catch (_) {
      fields = {};
    }
    return NextResponse.json({ ok: true, fields, text: markdown });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
