"use client";

import Image from "next/image";

const valores = [
  { icon: "💙", title: "Atendimento Humanizado", desc: "Tratamos cada pet como membro da família, com paciência e carinho." },
  { icon: "🏥", title: "Ambiente Seguro", desc: "Clínica limpa, organizada e acolhedora para o conforto do seu animal." },
  { icon: "🎓", title: "Profissionais Qualificados", desc: "Nossa equipe é especializada e constantemente atualizada." },
  { icon: "❤️", title: "Amor pelos Animais", desc: "Mais do que um serviço — é uma paixão pelo bem-estar animal." },
];

export default function SobreSection() {
  return (
    <section id="sobre" className="section-pad" style={{
      background: "white",
      position: "relative", overflow: "hidden"
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(43,188,212,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center"
        }} className="sobre-grid">

          {/* Doctor Card - Inspired by reference design */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, #e8f5f7 0%, #d0f0f4 50%, #c5ece8 100%)",
              borderRadius: "2rem",
              padding: "2.5rem 2rem 2rem",
              display: "flex", flexDirection: "column",
              alignItems: "center",
              position: "relative",
              maxWidth: "380px", width: "100%",
              boxShadow: "0 20px 60px rgba(43,188,212,0.15)"
            }}>

              {/* Doctor Photo */}
              <div style={{
                width: "220px", height: "220px",
                borderRadius: "1.2rem",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                marginBottom: "1.5rem",
                border: "4px solid rgba(255,255,255,0.8)"
              }}>
                <Image src="/doutor2.jpeg" alt="Dr. Erivaldo José da Silva"
                  width={220} height={220}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </div>

              {/* Google Reviews badge - floating */}
              <div style={{
                position: "absolute", top: "45%", right: "-15px",
                background: "white",
                borderRadius: "0.8rem",
                padding: "0.5rem 0.8rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                display: "flex", alignItems: "center", gap: "0.4rem",
                zIndex: 2
              }}>
                <span style={{ fontSize: "1.2rem" }}>⭐</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--navy)" }}>5.0</div>
                  <div style={{ fontSize: "0.65rem", color: "#888", fontWeight: 600 }}>Google Reviews</div>
                </div>
              </div>

              {/* Doctor Info */}
              <h3 style={{
                fontWeight: 800, fontSize: "1.2rem",
                color: "var(--navy)",
                margin: "0 0 0.3rem 0",
                textAlign: "center"
              }}>
                Dr. Erivaldo José da Silva
              </h3>
              <p style={{
                fontSize: "0.85rem", fontWeight: 700,
                color: "var(--teal-dark)",
                margin: "0 0 0.2rem 0"
              }}>
                Médico Veterinário
              </p>
              <p style={{
                fontSize: "0.85rem", fontWeight: 600,
                color: "var(--navy)",
                margin: "0 0 0.4rem 0"
              }}>
                CRMV-SP 38163
              </p>
              <p style={{
                fontSize: "0.75rem",
                color: "#7a9aaa",
                margin: 0,
                textAlign: "center",
                fontWeight: 500
              }}>
                Clínica médica de pequenos animais
              </p>

              {/* Logo badge */}
              <div style={{
                position: "absolute", top: "-15px", left: "-15px",
                width: "70px", height: "70px",
                overflow: "hidden",
                zIndex: 2
              }}>
                <Image src="/logo_clean.png" alt="Logo" fill style={{ objectFit: "contain" }} />
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "rgba(43,188,212,0.1)",
              border: "1px solid rgba(43,188,212,0.3)",
              borderRadius: "9999px", padding: "0.35rem 0.9rem",
              color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
              marginBottom: "1rem"
            }}>
              🐾 Quem Somos
            </div>

            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              Onde seu pet é tratado com <span className="gradient-text">amor e cuidado!</span>
            </h2>

            <p style={{ color: "#5a7a8a", lineHeight: 1.8, marginBottom: "1.2rem", fontSize: "1.05rem" }}>
              A <strong>Mallupet</strong> é um serviço de atendimento veterinário dedicada ao bem-estar e saúde integral dos seus animais de estimação.
              Acreditamos que pets saudáveis fazem famílias felizes.
            </p>

            <p style={{ color: "#5a7a8a", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              ✅ Atendemos o plano de saúde <strong>Pet Mais Vida</strong><br />
              🤝 Somos associado ao <strong>Planet Vet Hospital Veterinário</strong> em Campinas
            </p>

            <p style={{ color: "#5a7a8a", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1.05rem" }}>
              📍 Atendemos cães e gatos com consultas, vacinação, exames laboratoriais e muito mais.
              <strong style={{ color: "var(--teal-dark)" }}> &ldquo;Onde seu pet é tratado com amor e cuidado!&rdquo;</strong>
            </p>

            {/* Valores */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem"
            }}>
              {valores.map(v => (
                <div key={v.title} className="valor-card" style={{
                  background: "var(--off-white)",
                  borderRadius: "1rem",
                  padding: "1rem",
                  border: "1px solid rgba(43,188,212,0.15)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{v.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy)", marginBottom: "0.3rem" }}>{v.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#7a9aaa", lineHeight: 1.5 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .valor-card:hover {
          border-color: var(--teal) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(43,188,212,0.12);
        }
        @media (max-width: 768px) {
          .sobre-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
