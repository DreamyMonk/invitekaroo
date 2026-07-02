"use client";
import { useState } from "react";
import { signIn, signUp } from "@/lib/db";
import Icon from "./Icon";

export default function AuthGate() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hostName, setHostName] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (mode === "login") await signIn(email, pass);
      else await signUp({ email, pass, hostName });
      // onAuthStateChanged in the parent swaps to the dashboard.
    } catch (e2) {
      setErr(String(e2.message || e2).replace("Firebase:", "").trim());
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 11, marginBottom: 18 }}>
          <div className="logo"><Icon name="flower" size={22} stroke="#fff" /></div>
          <div>
            <div className="name">Invite <b>Karoo</b></div>
            <div className="sub">Community Host</div>
          </div>
        </div>
        <div className="card">
          <div className="tabs">
            <div className={`tab ${mode === "login" ? "on" : ""}`} onClick={() => setMode("login")}>Sign In</div>
            <div className={`tab ${mode === "signup" ? "on" : ""}`} onClick={() => setMode("signup")}>Create Account</div>
          </div>
          <form onSubmit={submit}>
            {mode === "signup" && (
              <>
                <label className="label">Your name</label>
                <input className="input" value={hostName} onChange={(e) => setHostName(e.target.value)} placeholder="e.g. Mahesh Ranka" />
              </>
            )}
            <label className="label">Email</label>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="host@example.com" />
            <label className="label">Password</label>
            <input className="input" type="password" required minLength={6} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" />
            {err && <div className="err">{err}</div>}
            <button className="btn btn-p btn-block" style={{ marginTop: 16 }} disabled={busy}>
              {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Create Host Account"}
            </button>
          </form>
        </div>
        <p style={{ textAlign: "center", marginTop: 14, fontSize: ".74rem", color: "rgba(255,255,255,.5)" }}>
          Programmes you publish appear live in the Invite Karoo app.
        </p>
      </div>
    </div>
  );
}
