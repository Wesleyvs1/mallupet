"use client";

import { avaliacoes } from "@/data/reviews";

export default function AvaliacoesSection() {
  return (
    <section id="avaliacoes" className="section-pad" style={{ background: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(43,188,212,0.1)", border: "1px solid rgba(43,188,212,0.3)",
            borderRadius: "9999px", padding: "0.35rem 0.9rem",
            color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
            marginBottom: "1rem"
          }}>
            ⭐ Avaliações
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.8rem" }}>
            O que nossos clientes <span className="gradient-text">dizem</span>
          </h2>
          <p className="section-subtitle">
            A satisfação dos tutores e o bem-estar dos pets é nossa maior recompensa.
          </p>

          {/* Overall rating */}
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {[
              { num: "5.0", label: "Nota Média" },
              { num: "200+", label: "Avaliações" },
              { num: "100%", label: "Recomendam" }
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--teal)" }}>{s.num}</div>
                <div style={{ fontSize: "0.8rem", color: "#888", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem"
        }} className="reviews-grid">
          {avaliacoes.map((av, i) => (
            <div key={i}
              style={{
                background: i % 2 === 0 ? "var(--off-white)" : "white",
                borderRadius: "1.5rem",
                padding: "1.8rem",
                border: "1px solid rgba(43,188,212,0.15)",
                position: "relative",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 12px 35px rgba(43,188,212,0.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}>

              {/* Quote mark */}
              <div style={{
                position: "absolute", top: "1rem", right: "1.5rem",
                fontSize: "3rem", color: "rgba(43,188,212,0.12)", fontFamily: "Georgia, serif",
                lineHeight: 1
              }}>"</div>

              {/* Stars */}
              <div className="stars" style={{ fontSize: "1rem", marginBottom: "0.8rem" }}>
                {"★".repeat(av.estrelas)}
              </div>

              {/* Text */}
              <p style={{ color: "#5a7a8a", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "0.95rem" }}>
                {av.texto}
              </p>

              {/* Reviewer */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{
                  width: "42px", height: "42px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem"
                }}>
                  {av.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy)" }}>{av.nome}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--teal-dark)", fontWeight: 600 }}>{av.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://wa.me/5519981185783?text=Olá!%20Quero%20agendar%20minha%20consulta%20na%20Mallu%20Pet!"
            target="_blank" rel="noopener noreferrer" className="btn-primary">
            Faça Parte dos Nossos Clientes Felizes 🐾
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
