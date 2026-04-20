"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--navy)",
      color: "rgba(255,255,255,0.75)",
      padding: "3rem 1.5rem 1.5rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem",
          marginBottom: "2.5rem"
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <Image src="/logo_clean.png" alt="Mallu Pet" width={100} height={100}
                style={{ objectFit: "contain" }} />
            </div>
            <p style={{ lineHeight: 1.7, fontSize: "0.9rem", maxWidth: "260px" }}>
              Cuidado veterinário com amor e dedicação. Onde seu pet é tratado com carinho de verdade!
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.2rem" }}>
              <a href="https://www.instagram.com/vet.eri_mallupet/" target="_blank" rel="noopener noreferrer"
                style={socialStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://wa.me/5519999545724" target="_blank" rel="noopener noreferrer"
                style={socialStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>Navegação</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[["#sobre", "Sobre Nós"], ["#servicos", "Serviços"], ["#catalogo", "Catálogo"], ["#galeria", "Galeria"]].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>Serviços</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Consultas", "Vacinação", "Exames Lab.", "Preventivo", "Nutrição"].map(s => (
                <li key={s} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>Contato</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div style={{ fontSize: "0.85rem" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>WhatsApp</div>
                <a href="https://wa.me/5519999545724" target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--teal-light)", fontWeight: 600, textDecoration: "none" }}>
                  (19) 99954-5724
                </a>
              </div>
              <div style={{ fontSize: "0.85rem" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Instagram</div>
                  @vet.eri_mallupet
              </div>
              <div style={{ fontSize: "0.85rem" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Horário</div>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>Seg–Sex: 8h–18h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "0.5rem"
        }}>
          <p style={{ fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Mallu Pet. Todos os direitos reservados. 🐾
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
            "Onde seu pet é tratado com amor e cuidado!"
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

const socialStyle: React.CSSProperties = {
  width: "36px", height: "36px",
  borderRadius: "50%",
  background: "rgba(43,188,212,0.15)",
  border: "1px solid rgba(43,188,212,0.3)",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "var(--teal-light)",
  textDecoration: "none",
  transition: "all 0.3s ease"
};
