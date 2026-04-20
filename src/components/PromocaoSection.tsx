"use client";

export default function PromocaoSection() {
  return (
    <section id="promocao" style={{
      background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 50%, var(--teal-dark) 100%)",
      padding: "5rem 1.5rem",
      position: "relative", overflow: "hidden"
    }}>
      {/* Floating paws */}
      {["5%","85%","20%","70%"].map((l, i) => (
        <div key={i} className="paw-float" style={{
          top: `${20 + i * 20}%`, left: l,
          animationDelay: `${i * 0.5}s`,
          color: "rgba(43,188,212,0.25)", fontSize: "1.8rem"
        }}>🐾</div>
      ))}

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(255,209,102,0.2)", border: "2px solid rgba(255,209,102,0.6)",
          borderRadius: "9999px", padding: "0.5rem 1.2rem",
          color: "var(--gold)", fontWeight: 800, fontSize: "0.9rem",
          marginBottom: "1.5rem",
          animation: "heartbeat 2s ease-in-out infinite"
        }}>
          🎉 PROMOÇÃO ESPECIAL
        </div>

        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 900, color: "white", lineHeight: 1.2,
          marginBottom: "1rem"
        }}>
          Primeira Consulta com<br />
          <span style={{ color: "var(--gold)" }}>Condições Especiais!</span>
        </h2>

        <p style={{
          fontSize: "1.15rem", color: "rgba(255,255,255,0.8)",
          lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem"
        }}>
          Seu pet merece o melhor cuidado desde o início!
          Aproveite nossa promoção para a primeira consulta e garanta o bem-estar do seu companheiro.
        </p>

        {/* Benefits */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem", marginBottom: "3rem"
        }} className="promo-grid">
          {[
            { icon: "✅", text: "Exame clínico completo" },
            { icon: "✅", text: "Orientações personalizadas" },
            { icon: "✅", text: "Plano de saúde preventivo" },
          ].map(b => (
            <div key={b.text} style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "1rem", padding: "1.2rem",
              color: "white", fontWeight: 600
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{b.icon}</div>
              {b.text}
            </div>
          ))}
        </div>

        <a href="https://wa.me/5519999545724?text=Olá!%20Quero%20falar%20com%20um%20consultor%20sobre%20a%20promoção%20da%20primeira%20consulta."
          target="_blank" rel="noopener noreferrer"
          className="btn-consultor" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
          Fale com um Consultor
        </a>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", marginTop: "1rem" }}>
          (19) 99954-5724 · Sujeito à disponibilidade de horários
        </p>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .promo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

