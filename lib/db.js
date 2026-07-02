// Production data layer — all reads/writes go to Firestore. No dummy data.
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

/* ─────────── Auth ─────────── */
export const watchAuth = (cb) => onAuthStateChanged(auth, cb);
export const signIn = (email, pass) => signInWithEmailAndPassword(auth, email.trim(), pass);
export const logout = () => signOut(auth);

export async function signUp({ email, pass, hostName }) {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  await setDoc(doc(db, "hosts", cred.user.uid), {
    hostName: hostName || "",
    email: email.trim(),
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

/* ─────────── Host + Community ─────────── */
export async function getHost(uid) {
  const s = await getDoc(doc(db, "hosts", uid));
  return s.exists() ? { id: uid, ...s.data() } : null;
}

// A host owns exactly one community (communities where ownerUid == uid).
export async function getMyCommunity(uid) {
  const q = query(collection(db, "communities"), where("ownerUid", "==", uid));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function createCommunity(uid, data) {
  const ref = await addDoc(collection(db, "communities"), {
    ...data,
    ownerUid: uid,
    editionStatus: data.editionStatus || "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await setDoc(doc(db, "hosts", uid), { communityId: ref.id }, { merge: true });
  return ref.id;
}

export async function updateCommunity(cid, data) {
  await updateDoc(doc(db, "communities", cid), { ...data, updatedAt: serverTimestamp() });
}

/* ─────────── Programmes (top-level `programs`, read live by the app) ─────────── */
export function watchPrograms(cid, cb) {
  const q = query(collection(db, "programs"), where("communityId", "==", cid));
  return onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      rows.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
      cb(rows);
    },
    () => cb([]),
  );
}

export async function addProgram(community, p) {
  return addDoc(collection(db, "programs"), {
    ...p,
    communityId: community.id,
    communityName: community.name || "",
    published: p.published !== false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
export const updateProgram = (id, p) =>
  updateDoc(doc(db, "programs", id), { ...p, updatedAt: serverTimestamp() });
export const deleteProgram = (id) => deleteDoc(doc(db, "programs", id));

/* ─────────── Generic subcollection under a community ─────────── */
// Used for subscribers / attendance / rsvps / donations / rewards / reminders / team.
export function watchSub(cid, name, cb, opts = {}) {
  let q = collection(db, "communities", cid, name);
  if (opts.orderByField) q = query(q, orderBy(opts.orderByField, opts.desc ? "desc" : "asc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    () => cb([]),
  );
}
export const addSub = (cid, name, data) =>
  addDoc(collection(db, "communities", cid, name), { ...data, createdAt: serverTimestamp() });
export const updateSubDoc = (cid, name, id, data) =>
  updateDoc(doc(db, "communities", cid, name, id), data);
export const deleteSubDoc = (cid, name, id) => deleteDoc(doc(db, "communities", cid, name, id));

/* ─────────── Push (server route) ─────────── */
export async function pushNotify(title, body) {
  try {
    const r = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    return await r.json();
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/* ─────────── Helpers ─────────── */
export const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
export function fmtDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  if (!m) return iso || "";
  const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${+m[3]} ${mo[+m[2] - 1]} ${m[1]}`;
}
export function fmtWindow(a, b) {
  if (a && b) return `${fmtDate(a).replace(/ \d{4}$/, "")} – ${fmtDate(b)}`;
  return a ? fmtDate(a) : b ? fmtDate(b) : "";
}
