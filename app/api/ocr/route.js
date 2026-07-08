import { NextResponse } from "next/server";

// AI Scan for the app. Two stages for accuracy:
//   1) Mistral OCR reads the card → exact text (great at spelling dates/names).
//   2) A VISION model (mistral-medium, multimodal) sees the ACTUAL image + the
//      OCR text and returns structured event fields. Seeing the layout fixes the
//      "which line is the title vs date vs venue" mis-mapping that plain
//      text-parsing gets wrong.
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

    // 1) OCR the invitation image → markdown text (best-effort; non-fatal).
    let markdown = "";
    try {
      const ocrRes = await fetch("https://api.mistral.ai/v1/ocr", {
        method: "POST",
        headers: auth,
        body: JSON.stringify({
          model: "mistral-ocr-latest",
          document: { type: "image_url", image_url: image },
        }),
      });
      if (ocrRes.ok) {
        const ocr = await ocrRes.json();
        markdown = (ocr.pages || []).map((p) => p.markdown || "").join("\n").trim();
      }
    } catch (_) {
      // OCR failed — the vision model can still read the image directly.
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const system =
      "You extract event details from an invitation card. You are given the card IMAGE and (maybe) its OCR text. " +
      "Read the card's layout to decide which text is the event name, the date, the start time, and the venue. " +
      "Return ONLY a JSON object with these keys:\n" +
      "- title: the event name (for a wedding, the couple's names + ' Wedding').\n" +
      "- type: exactly one of wedding | meeting | birthday | appointment | travel | other.\n" +
      "- date: the EVENT (start) date as YYYY-MM-DD. If only day+month are shown, use the year that makes it upcoming relative to today (" +
      today +
      "). Ignore any 'RSVP by' date. Empty string if truly unknown.\n" +
      "- endDate: the last day as YYYY-MM-DD if it's a multi-day event, else same as date.\n" +
      "- time: the EVENT start time as 24-hour HH:MM (ignore RSVP/contact times). Empty string if unknown.\n" +
      "- venue: the event place/hall/address. Empty string if unknown.\n" +
      "- host: the host/contact PHONE NUMBER printed on the card (with country code if shown), or empty string.\n" +
      "- description: one short line summarising the event, or empty string.\n" +
      "For WEDDINGS also fill (empty strings/array otherwise):\n" +
      "- bride: the bride's given name only.\n" +
      "- groom: the groom's given name only.\n" +
      "- family: the families text if shown (e.g. 'Das & Singh Families').\n" +
      "- functions: array of each ceremony/function listed (Haldi, Mehndi, Sangeet, Wedding, Reception, etc.), each an object {name, date (YYYY-MM-DD), time (24h HH:MM)}. Use [] if none are individually listed.\n" +
      "Never invent details that aren't on the card. Output valid JSON only.";

    const userContent = [
      {
        type: "text",
        text:
          "Extract the event details from this invitation." +
          (markdown ? "\n\nOCR text of the card:\n" + markdown : ""),
      },
      { type: "image_url", image_url: image },
    ];

    const chatRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        // Small 3.2 is multimodal + fast + cheap; with the image + OCR text + a
        // strong prompt it's accurate here. Bump to medium/large only if needed.
        model: "mistral-small-latest",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
      }),
    });
    const chat = await chatRes.json();
    if (!chatRes.ok) {
      return NextResponse.json(
        { ok: false, error: chat?.message || chat?.error?.message || "Extraction failed" },
        { status: 502 },
      );
    }
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
