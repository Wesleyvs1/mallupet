"use client";

import Image from "next/image";

import { blogPosts } from "@/data/blog";

export default function BlogSection() {
  return (
    <section id="blog" className="section-pad" style={{ background: "var(--off-white)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(43,188,212,0.1)", border: "1px solid rgba(43,188,212,0.3)",
            borderRadius: "9999px", padding: "0.35rem 0.9rem",
            color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
            marginBottom: "1rem"
          }}>
            📱 Blog & Instagram
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.8rem" }}>
            Dicas & <span className="gradient-text">Conteúdo</span>
          </h2>
          <p className="section-subtitle">
            Fique por dentro das melhores dicas para cuidar do seu pet. Siga também no Instagram!
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem"
        }} className="blog-grid">
          {blogPosts.map((post, i) => (
            <a key={i} href={post.link}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", textDecoration: "none",
                background: "white", borderRadius: "1.5rem", overflow: "hidden",
                border: "1px solid rgba(43,188,212,0.12)",
                transition: "all 0.35s ease"
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 20px 50px rgba(43,188,212,0.2)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}>

              {/* Image area */}
              <div style={{
                height: "200px",
                position: "relative",
                overflow: "hidden"
              }}>
                <Image
                  src={post.imagem}
                  alt={post.titulo}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", top: "1rem", right: "1rem",
                  background: "var(--teal)", color: "white",
                  padding: "0.25rem 0.7rem", borderRadius: "9999px",
                  fontSize: "0.7rem", fontWeight: 700,
                  zIndex: 2
                }}>
                  {post.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, color: "var(--navy)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                  {post.titulo}
                </h3>
                <p style={{ color: "#7a9aaa", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {post.desc}
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.85rem"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Ver no Instagram
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://www.instagram.com/vet.eri_mallupet/" target="_blank" rel="noopener noreferrer"
            className="btn-primary">
            Seguir @vet.eri_mallupet no Instagram
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
