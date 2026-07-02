# Deploying the Host Dashboard

**Live host:** https://invitekaroo.vercel.app (primary — used until host.invitekaroo.com DNS is connected)

## Vercel (primary)
1. Import the repo in Vercel, set **Root Directory = `host-dashboard`** (framework: Next.js).
2. Push to `main` → auto-deploys.
3. **Enable real push notifications** (works even when the app is killed):
   - Firebase Console → Project settings → **Service accounts** → *Generate new private key* (downloads a JSON).
   - Vercel → Project → Settings → **Environment Variables** → add
     `FIREBASE_SERVICE_ACCOUNT` = the entire JSON, pasted as one line.
   - Redeploy. Now every programme published in the dashboard calls `/api/notify`,
     which sends an FCM push to the `programs` topic — every app install is subscribed.
4. When `host.invitekaroo.com` DNS is ready, add it under Vercel → Domains.

## Firebase console settings (required)
1. **Authentication → Sign-in method → Anonymous → Enable** (dashboard writes are authenticated with it).
2. **Authentication → Settings → Authorized domains →** add `invitekaroo.vercel.app`
   (and later `host.invitekaroo.com`; keep `localhost` for dev).
3. **Firestore → Rules →** publish `../firestore.rules`.

## What syncs where
| Dashboard action | Firestore | App |
|---|---|---|
| Publish/edit programme | `programs/fn_<id>` | Home feed, Today's Programmes, calendars — live |
| Community profile | `communities/main` | Venue page, community page, search, subscriptions |
| Publish programme (with env var set) | — | **Push notification** to all installs (`programs` topic) |

## Local dev
```bash
cd host-dashboard
npm install
npm run dev   # http://localhost:3000  (push API returns 501 until the env var is set)
```
