"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const petPhotos = [
  "WhatsApp Image 2026-04-17 at 12.41.50 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.30.51 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.31.34 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.32.58 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.33.40 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.34.06 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.35.11 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.35.53 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.36.26 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.38.02 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.38.23 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.39.03 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.40.03 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.40.22 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.41.32 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.42.08 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.43.06 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.45.06 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.45.24 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.45.47 PM.jpeg",
  "WhatsApp Image 2026-04-17 at 2.46.28 PM.jpeg"
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const petChunks = chunkArray(petPhotos, 6);

export default function GaleriaSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="galeria" className="section-pad" style={{ background: "var(--off-white)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(43,188,212,0.1)", border: "1px solid rgba(43,188,212,0.3)",
            borderRadius: "9999px", padding: "0.35rem 0.9rem",
            color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
            marginBottom: "1rem"
          }}>
            📸 Galeria
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.8rem" }}>
            Nossos <span className="gradient-text">Pacientinhos</span>
          </h2>
          <p className="section-subtitle">
            Cada visita é especial! Veja alguns dos nossos pacientes que passaram pela Mallu Pet. 💙
          </p>
        </div>

        {/* Navigation arrows */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "1rem" }}>
          <button 
            type="button"
            onClick={() => scroll('left')}
            style={{ padding: "0.5rem", borderRadius: "50%", background: "white", border: "1px solid var(--teal-light)", cursor: "pointer", color: "var(--teal-dark)", transition: "all 0.2s" }}>
            <ChevronLeft size={24} />
          </button>
          <button 
            type="button"
            onClick={() => scroll('right')}
            style={{ padding: "0.5rem", borderRadius: "50%", background: "white", border: "1px solid var(--teal-light)", cursor: "pointer", color: "var(--teal-dark)", transition: "all 0.2s" }}>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Horizontal Slider */}
        <div 
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: "1rem",
            paddingBottom: "1rem",
            scrollbarWidth: "none" // mostly for Firefox
          }} 
          className="gallery-container">
          {petChunks.map((chunk, i) => (
            <div key={i} style={{ 
              flex: "0 0 100%", // each slide takes full width
              scrollSnapAlign: "center",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "1rem"
            }} className="gallery-slide">
              {chunk.map((photo) => (
                <div key={photo}
                  style={{
                    borderRadius: "1.5rem",
                    aspectRatio: "1/1",
                    position: "relative", 
                    overflow: "hidden",
                    border: "2px solid transparent",
                    transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1.02)";
                    el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                    el.style.zIndex = "10";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1)";
                    el.style.boxShadow = "none";
                    el.style.zIndex = "1";
                  }}>
                   <Image src={`/pets/${photo}`} alt={`Pacientinho ${photo}`} fill sizes="(max-width: 768px) 33vw, 300px" style={{ objectFit: "cover" }} />
                   
                   {/* Paw stamp */}
                   <div style={{
                     position: "absolute", top: "0.5rem", right: "0.5rem",
                     fontSize: "1rem", opacity: 0.8,
                     background: "rgba(255,255,255,0.7)",
                     borderRadius: "50%",
                     width: "30px", height: "30px",
                     display: "flex", alignItems: "center", justifyContent: "center"
                   }}>🐾</div>
                   
                   {/* Gradient Overlay */}
                   <div style={{
                     position: "absolute", inset: 0,
                     background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 30%)",
                     pointerEvents: "none"
                   }} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div style={{
          textAlign: "center", marginTop: "2.5rem",
          padding: "2rem",
          background: "linear-gradient(135deg, rgba(43,188,212,0.08), rgba(26,154,176,0.12))",
          borderRadius: "1.5rem",
          border: "1px solid rgba(43,188,212,0.2)"
        }}>
          <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "1.1rem", marginBottom: "1rem" }}>
            📱 Siga a Mallu Pet no Instagram!
          </p>
          <a href="https://www.instagram.com/vet.eri_mallupet/" target="_blank" rel="noopener noreferrer"
            className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @vet.eri_mallupet
          </a>
        </div>
      </div>

      <style>{`
        .gallery-container::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .gallery-slide { 
            grid-template-columns: repeat(2, 1fr) !important; 
            grid-template-rows: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-slide { 
            grid-template-columns: 1fr !important; 
            grid-template-rows: repeat(6, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
