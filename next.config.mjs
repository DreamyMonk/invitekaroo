/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed on Vercel (https://invitekaroo.vercel.app) as a normal Next.js app
  // so the /api/notify serverless route can send FCM push notifications.
  // (For a pure-static host, set `output: "export"` — but the API route
  // won't exist there.)
  images: { unoptimized: true },
};

export default nextConfig;
