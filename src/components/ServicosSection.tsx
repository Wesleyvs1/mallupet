"use client";
import Image from "next/image";

const servicos = [
  {
    emoji: "🩺",
    title: "Consultas Veterinárias",
    desc: "Exame clínico completo com diagnóstico preciso e tratamento personalizado para cada pet.",
    color: "#2BBCD4"
  },
  {
    emoji: "💉",
    title: "Vacinação Completa",
    desc: "Protocolo de vacinação atualizado para cães e gatos, mantendo seu pet protegido.",
    color: "#4DD8EC"
  },
  {
    emoji: "🔬",
    title: "Exames Laboratoriais",
    desc: "Hemograma, bioquímica sérica, urina, fezes e muito mais com resultados rápidos.",
    color: "#1A9AB0"
  },
  {
    emoji: "🛡️",
    title: "Atendimento Preventivo",
    desc: "Check-ups regulares para prevenir doenças e garantir uma vida longa e saudável.",
    color: "#2BBCD4"
  },
  {
    emoji: "🥗",
    title: "Orientação Nutricional",
    desc: "Dieta balanceada e personalizada para as necessidades específicas do seu animal.",
    color: "#4DD8EC"
  },
  {
    emoji: "🐾",
    title: "Cuidados para Cães e Gatos",
    desc: "Atendimento especializado e carinhoso focado nas necessidades de cães e gatos.",
    color: "#1A9AB0"
  },
];

export default function ServicosSection() {
  return (
    <section id="servicos" className="section-pad" style={{
      background: "var(--off-white)",
      position: "relative", overflow: "hidden"
    }}>
      {/* BG decoration */}
      <div style={{
        position: "absolute", bottom: "-80px", right: "-80px",
        fontSize: "15rem", opacity: "0.03", pointerEvents: "none",
        fontFamily: "system-ui", userSelect: "none"
      }}>🐾</div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(43,188,212,0.1)", border: "1px solid rgba(43,188,212,0.3)",
            borderRadius: "9999px", padding: "0.35rem 0.9rem",
            color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
            marginBottom: "1rem"
          }}>
            🏥 Nossos Serviços
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.8rem" }}>
            Tudo que seu pet <span className="gradient-text">precisa</span>
          </h2>
          <p className="section-subtitle">
            Oferecemos uma gama completa de serviços veterinários para manter seu animal saudável, feliz e bem cuidado.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem"
        }} className="services-grid">
          {servicos.map((serv) => (
            <div key={serv.title}
              style={{
                background: "white",
                borderRadius: "1.5rem",
                padding: "2rem",
                border: "1px solid rgba(43,188,212,0.12)",
                transition: "all 0.35s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = `0 20px 50px rgba(43,188,212,0.2)`;
                el.style.borderColor = serv.color;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(43,188,212,0.12)";
              }}>

              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                background: `linear-gradient(90deg, ${serv.color}, transparent)`,
                borderRadius: "1.5rem 1.5rem 0 0"
              }} />

              {/* Icon */}
              <div style={{
                width: "70px", height: "70px",
                borderRadius: "1rem",
                background: `${serv.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.2rem",
                fontSize: "2.2rem"
              }}>
                {serv.emoji}
              </div>

              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--navy)", marginBottom: "0.6rem" }}>
                {serv.title}
              </h3>
              <p style={{ color: "#7a9aaa", fontSize: "0.9rem", lineHeight: 1.7 }}>
                {serv.desc}
              </p>

              {/* CTA */}
              <a href="https://wa.me/5519999545724?text=Olá!%20Tenho%20interesse%20no%20serviço%20de%20"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.3rem",
                  marginTop: "1.2rem",
                  color: serv.color, fontWeight: 700, fontSize: "0.85rem",
                  textDecoration: "none", transition: "gap 0.2s"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.gap = "0.6rem";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.gap = "0.3rem";
                }}>
                Agendar agora →
              </a>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

