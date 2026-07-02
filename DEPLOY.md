# Invite Karoo — Host Dashboard (production)

Real Next.js + React app backed by Firestore. No prototype/SPA, no dummy data.
Login is **email OTP** (one-time code emailed via Resend → Firebase custom token).

**Live host:** https://host.invitekaroo.com  (also on invitekaroo.vercel.app)

## Deploy (Vercel)
Repo root **is** this Next.js app — no Root Directory setting needed. Push `main` → auto-deploys.
Add `host.invitekaroo.com` under Vercel → Project → Domains (DNS: CNAME → Vercel).

### Environment variables (Vercel → Settings → Environment Variables)
| Var | Value | Used for |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | the service-account JSON (one line) | email-OTP custom tokens + push |
| `RESEND_API_KEY` | your Resend API key | sending the OTP email |
Redeploy after adding them.

## Firebase / Resend setup (one-time)
1. **Resend** → verify the domain **invitekaroo.com** (add its SPF/DKIM DNS records) so
   `noreply@invitekaroo.com` can send. Add `RESEND_API_KEY` to Vercel.
2. **Firebase** → Project settings → Service accounts → generate a private key →
   add JSON as `FIREBASE_SERVICE_ACCOUNT` on Vercel.
3. **Firebase → Firestore → Rules →** publish the app project's `firestore.rules`.
   > Email/Password provider is **NOT** required — login uses custom tokens.
4. (App) **Firebase → Authentication → Phone → Enable** for the mobile app's login.

## How everything connects (all live)
| Host does (dashboard) | Firestore | App |
|---|---|---|
| Publish/edit programme | `programs/*` | Home, Today's Programmes, calendars + **push** |
| Edit community / edition | `communities/{cid}` | Venue page, community page, search |
| Send alert (Reminders) | — (FCM) | Push + in-app notification |
| — | `communities/{cid}/subscribers` ← app subscribe | Subscribers view |
| — | `communities/{cid}/attendance` ← app QR check-in | Attendance view |
| Donations / rewards / team | `communities/{cid}/{coll}` | Dashboard views |

## Local dev
```bash
npm install
npm run dev   # http://localhost:3000  (OTP needs the two env vars in .env.local)
```
