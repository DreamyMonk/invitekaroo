# Invite Karoo — Host Dashboard (production)

Real Next.js + React app backed by Firestore. No prototype/SPA, no dummy data —
every view reads/writes live Firebase.

**Live:** https://invitekaroo.vercel.app  (host domain: host.invitekaroo.com once DNS is added)

## Deploy (Vercel)
Repo root **is** this Next.js app, so Vercel needs no Root Directory setting.
Push to `main` → auto-deploys.

### One required env var (for push notifications)
`/api/notify` sends FCM pushes when programmes are published.
- Firebase Console → ⚙ Project settings → **Service accounts → Generate new private key** (JSON).
- Vercel → Project → Settings → **Environment Variables** → `FIREBASE_SERVICE_ACCOUNT` = that JSON on one line → redeploy.
(See `.env.example`.)

## Firebase console — the only steps to go fully live
1. **Authentication → Sign-in method → enable “Email/Password”** (dashboard host login) and **“Phone”** (the app).
2. **Authentication → Settings → Authorized domains →** add `invitekaroo.vercel.app` (and `localhost`).
3. **Firestore → Rules →** publish the repo-root `firestore.rules` (in the app project).

## How everything connects (all live, no dummy)
| Host does (dashboard) | Firestore | App shows |
|---|---|---|
| Publish/edit programme | `programs/*` | Home, Today's Programmes, calendars + **push** |
| Edit community / edition | `communities/{cid}` | Venue page, community page, search, subscriptions |
| Send alert (Reminders) | — (FCM) | Push + in-app notification |
| — | `communities/{cid}/subscribers` ← app subscribe | **Subscribers** view |
| — | `communities/{cid}/attendance` ← app QR check-in | **Attendance** view |
| Record donations / rewards / team | `communities/{cid}/{coll}` | Dashboard views |

## Local dev
```bash
npm install
npm run dev   # http://localhost:3000
```
