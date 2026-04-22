"use client";

export default function ContatoSection() {
  return (
    <section id="contato" className="section-pad" style={{ background: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(43,188,212,0.1)", border: "1px solid rgba(43,188,212,0.3)",
            borderRadius: "9999px", padding: "0.35rem 0.9rem",
            color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
            marginBottom: "1rem"
          }}>
            📍 Localização & Contato
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.8rem" }}>
            Venha nos <span className="gradient-text">Visitar</span>
          </h2>
          <p className="section-subtitle">
            Estamos aqui para atender seu pet com todo o amor e cuidado que ele merece!
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start"
        }} className="contato-grid">

          {/* Info Side */}
          <div>
            {/* Contact cards */}
            {[
              {
                icon: "📱", title: "WhatsApp",
                value: "(19) 98118-5783",
                link: "https://wa.me/5519981185783?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.",
                linkText: "Enviar mensagem"
              },
              {
                icon: "📍", title: "Endereço",
                value: "Atendemos na região de Campinas/SP",
                link: "https://maps.google.com/?q=Campinas+SP",
                linkText: "Ver no mapa"
              },
              {
                icon: "🕐", title: "Horário",
                value: "Seg – Sex: 8h às 18h | Sáb: 9h às 13h",
                link: null, linkText: ""
              },
              {
                icon: "📸", title: "Instagram",
                value: "@vet.eri_mallupet",
                link: "https://www.instagram.com/vet.eri_mallupet/",
                linkText: "Seguir"
              },
            ].map((info, i) => (
              <div key={i} style={{
                display: "flex", gap: "1rem", alignItems: "flex-start",
                padding: "1.2rem",
                background: "var(--off-white)",
                borderRadius: "1rem",
                border: "1px solid rgba(43,188,212,0.12)",
                marginBottom: "1rem",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--teal)";
                  el.style.transform = "translateX(5px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(43,188,212,0.12)";
                  el.style.transform = "translateX(0)";
                }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "0.75rem",
                  background: "linear-gradient(135deg, var(--teal)22, var(--teal)44)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", flexShrink: 0
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9rem" }}>{info.title}</div>
                  <div style={{ color: "#7a9aaa", fontSize: "0.85rem", margin: "0.2rem 0" }}>{info.value}</div>
                  {info.link && (
                    <a href={info.link} target="_blank" rel="noopener noreferrer"
                      style={{ color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none" }}>
                      {info.linkText} →
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Big WhatsApp CTA */}
            <a href="https://wa.me/5519981185783?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor."
              target="_blank" rel="noopener noreferrer"
              className="btn-consultor" style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "1.5rem" }}>
              Fale com um Consultor
            </a>
          </div>

          {/* Map Side */}
          <div>
            <div style={{
              borderRadius: "1.5rem", overflow: "hidden",
              border: "3px solid rgba(43,188,212,0.2)",
              boxShadow: "0 20px 50px rgba(43,188,212,0.15)"
            }}>
              <iframe
                title="Localização Mallu Pet - Campinas SP"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117832.53388574786!2d-47.1080803!3d-22.9064024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8ece4e7d7b9%3A0x6a33f1a1e3dbf6aa!2sCampinas%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1718123456789!5m2!1spt-BR!2sbr"
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Slogan card */}
            <div style={{
              background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginTop: "1rem",
              textAlign: "center", color: "white"
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🐾</div>
              <p style={{ fontWeight: 700, fontStyle: "italic", fontSize: "1.05rem" }}>
                "Onde seu pet é tratado com amor e cuidado!"
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contato-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

