import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Emails a donation receipt with a generated PDF invoice attached, via Resend.
// Body: { to, donorName, receiptNo, amount, date, mode, purpose, communityName }
// Note: PDF text uses "Rs." (StandardFonts can't encode the ₹ glyph).
export async function POST(req) {
  try {
    const b = await req.json();
    const to = (b.to || "").trim();
    if (!to || !/^\S+@\S+\.\S+$/.test(to)) {
      return NextResponse.json({ ok: false, error: "Valid donor email required" }, { status: 400 });
    }
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ ok: false, error: "RESEND_API_KEY not set on Vercel" }, { status: 501 });

    const community = b.communityName || "Community";
    const receiptNo = b.receiptNo || "IK/2026/0000";
    const donor = b.donorName || "Donor";
    const amount = Number(b.amount || 0);
    const amountStr = "Rs. " + amount.toLocaleString("en-IN");
    const date = b.date || "";
    const mode = b.mode || "-";
    const purpose = b.purpose || "General";

    // ── Build the PDF invoice ──
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595.28, 841.89]); // A4
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const purple = rgb(0.24, 0.15, 0.51);
    const ink = rgb(0.1, 0.06, 0.16);
    const gray = rgb(0.45, 0.45, 0.5);
    const W = 595.28;
    const M = 50;

    // Header band
    page.drawRectangle({ x: 0, y: 761, width: W, height: 81, color: purple });
    page.drawText(community, { x: M, y: 805, size: 22, font: bold, color: rgb(1, 1, 1) });
    page.drawText("OFFICIAL DONATION RECEIPT", { x: M, y: 782, size: 10, font, color: rgb(0.85, 0.82, 0.95) });

    let y = 720;
    const row = (label, value, yy) => {
      page.drawText(label, { x: M, y: yy, size: 10, font, color: gray });
      page.drawText(String(value), { x: 250, y: yy, size: 11, font: bold, color: ink });
    };
    row("Receipt No.", receiptNo, y); y -= 26;
    row("Date received", date, y); y -= 26;
    row("Received from", donor, y); y -= 26;
    row("Payment mode", mode, y); y -= 26;
    row("Purpose", purpose, y); y -= 40;

    // Amount box
    page.drawRectangle({ x: M, y: y - 44, width: W - 2 * M, height: 56, color: rgb(0.97, 0.96, 0.99) });
    page.drawText("Amount donated", { x: M + 16, y: y - 8, size: 10, font, color: gray });
    page.drawText(amountStr, { x: M + 16, y: y - 32, size: 22, font: bold, color: purple });
    y -= 84;

    const thanks = `With heartfelt gratitude for your generous contribution to ${community}.`;
    page.drawText(thanks, { x: M, y: y, size: 11, font, color: ink, maxWidth: W - 2 * M });
    page.drawText("May your kindness be blessed.", { x: M, y: y - 18, size: 11, font, color: ink });

    page.drawLine({ start: { x: M, y: 90 }, end: { x: W - M, y: 90 }, thickness: 0.5, color: rgb(0.85, 0.85, 0.88) });
    page.drawText("This is a computer-generated receipt and needs no signature.", { x: M, y: 74, size: 8, font, color: gray });
    page.drawText(community + " · via Invite Karoo", { x: M, y: 62, size: 8, font, color: gray });

    const pdfBytes = await pdf.save();
    const base64 = Buffer.from(pdfBytes).toString("base64");

    // ── Send via Resend with the PDF attached ──
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `${community} <noreply@invitekaroo.com>`,
        to: [to],
        subject: `Donation receipt ${receiptNo} — ${community}`,
        html: `<div style="font-family:Segoe UI,Arial,sans-serif;max-width:520px;margin:auto;padding:28px;border:1px solid #eee;border-radius:16px">
          <h2 style="font-family:Georgia,serif;color:#1A1028;margin:0 0 6px">${community}</h2>
          <p style="color:#555;margin:0 0 16px">Dear ${donor}, thank you for your generous donation. Your official receipt is attached as a PDF.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
            <tr><td style="padding:6px 0;color:#888">Receipt No.</td><td style="padding:6px 0;text-align:right;font-weight:700">${receiptNo}</td></tr>
            <tr><td style="padding:6px 0;color:#888">Date</td><td style="padding:6px 0;text-align:right;font-weight:700">${date}</td></tr>
            <tr><td style="padding:6px 0;color:#888">Amount</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#3D2582">${amountStr}</td></tr>
            <tr><td style="padding:6px 0;color:#888">Purpose</td><td style="padding:6px 0;text-align:right;font-weight:700">${purpose}</td></tr>
          </table>
          <p style="color:#888;font-size:13px;margin-top:18px">With gratitude,<br>${community} · via Invite Karoo</p>
        </div>`,
        attachments: [{ filename: `receipt-${receiptNo.replace(/[^\w-]/g, "-")}.pdf`, content: base64 }],
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return NextResponse.json({ ok: false, error: "Email send failed: " + t.slice(0, 200) }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
