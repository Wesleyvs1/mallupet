"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Galeria", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar" className={`navbar ${scrolled ? "scrolled" : ""}`}
      style={{ padding: scrolled ? "0.5rem 1.5rem" : "1rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="#hero" className="navbar-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none", position: "relative" }}>
          <Image src="/logo_clean.png" alt="Mallu Pet Logo" width={80} height={80}
            style={{ objectFit: "contain", width: "100%", height: "100%" }} />
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", alignItems: "center" }}
          className="hidden-mobile">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} style={{
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: scrolled ? "var(--navy)" : "white",
                transition: "color 0.3s ease",
                padding: "0.25rem 0.1rem",
                borderBottom: "2px solid transparent",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "var(--teal)")}
                onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "transparent")}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a href="https://wa.me/5519999545724?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor."
          target="_blank" rel="noopener noreferrer"
          className="btn-consultor hidden-mobile"
          style={{ fontSize: "0.85rem", padding: "0.6rem 1.3rem" }}>
          Fale com um Consultor
        </a>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: scrolled ? "var(--navy)" : "white", fontSize: "1.8rem"
          }}
          className="show-mobile">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "white", boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem"
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ textDecoration: "none", fontWeight: 700, color: "var(--navy)", fontSize: "1rem" }}>
              {link.label}
            </a>
          ))}
          <a href="https://wa.me/5519999545724?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor." target="_blank" rel="noopener noreferrer"
            className="btn-consultor" style={{ textAlign: "center" }}>
            Fale com um Consultor
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .navbar-logo {
            width: 60px !important;
            height: 60px !important;
          }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

