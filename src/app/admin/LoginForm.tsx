"use client";
import { useState } from "react";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");
      localStorage.setItem("admin_token", data.session.access_token);
      onLogin(data.session.access_token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0a1628 0%, #1a2a44 50%, #0d3b4f 100%)", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 80, height: 80, margin: "0 auto 1rem", background: "white", borderRadius: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <Image src="/logo1_transparent.png" alt="Logo" width={60} height={60} style={{ objectFit: "contain" }} />
          </div>
          <h1 style={{ color: "white", fontWeight: 900, fontSize: "1.8rem", marginBottom: "0.3rem" }}>Mallu <span style={{ color: "#2BBCD4" }}>Pet</span></h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2.5rem" }}>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.5rem" }}>Entrar</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "2rem" }}>Acesse o painel de gerenciamento</p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.8rem", padding: "0.8rem 1rem", marginBottom: "1.5rem", color: "#fca5a5", fontSize: "0.85rem" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.5rem" }}>E-mail</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@mallupet.com" required
                style={{ width: "100%", padding: "0.9rem 1rem 0.9rem 2.8rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.8rem", color: "white", fontSize: "0.95rem", outline: "none" }} />
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.5rem" }}>Senha</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: "100%", padding: "0.9rem 3rem 0.9rem 2.8rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.8rem", color: "white", fontSize: "0.95rem", outline: "none" }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "1rem", background: "var(--teal)", color: "white", border: "none", borderRadius: "0.8rem", fontWeight: 800, fontSize: "1rem", cursor: loading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 10px 30px rgba(43,188,212,0.3)", transition: "all 0.3s" }}>
            {loading ? <><Loader2 size={20} className="spin" /> Entrando...</> : "Entrar no Painel"}
          </button>
        </form>
      </div>
      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
