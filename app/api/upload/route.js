import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

// Uploads media (images now; videos via presigned later) to Cloudflare R2 and
// returns the public URL. Credentials live in Vercel env — never in the client.
function r2() {
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

export async function POST(req) {
  try {
    if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_BUCKET) {
      return NextResponse.json({ ok: false, error: "R2 not configured on the server" }, { status: 501 });
    }
    const { data, contentType, folder, ext } = await req.json();
    if (!data) return NextResponse.json({ ok: false, error: "data required" }, { status: 400 });

    // Accept a raw base64 string or a full data URL.
    let b64 = data;
    let ct = contentType || "application/octet-stream";
    const m = /^data:([^;]+);base64,(.*)$/s.exec(data);
    if (m) {
      ct = m[1];
      b64 = m[2];
    }
    const buf = Buffer.from(b64, "base64");

    const safeExt = (ext || ct.split("/")[1] || "bin").replace(/[^a-z0-9]/gi, "").slice(0, 5) || "bin";
    const safeFolder = (folder || "media").replace(/[^a-z0-9/_-]/gi, "").replace(/^\/+|\/+$/g, "");
    const key = `${safeFolder}/${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${safeExt}`;

    await r2().send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: buf,
        ContentType: ct,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const base = (process.env.R2_PUBLIC_BASE || "").replace(/\/$/, "");
    return NextResponse.json({ ok: true, url: `${base}/${key}`, key });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
