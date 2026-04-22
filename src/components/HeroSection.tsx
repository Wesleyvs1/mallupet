"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PAWS = [
  { top: "10%", left: "5%",  delay: "0s",   size: "2rem", rotate: "20deg"  },
  { top: "20%", left: "90%", delay: "0.8s", size: "1.5rem", rotate: "-15deg" },
  { top: "55%", left: "3%",  delay: "1.5s", size: "1.8rem", rotate: "10deg"  },
  { top: "70%", left: "92%", delay: "0.4s", size: "2.2rem", rotate: "-25deg" },
  { top: "85%", left: "15%", delay: "2s",   size: "1.4rem", rotate: "30deg"  },
  { top: "40%", left: "88%", delay: "1.2s", size: "1.6rem", rotate: "-10deg" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 40%, var(--teal-dark) 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "7rem 1.5rem 6rem",
      }}>

      {/* Floating Paw Prints */}
      {PAWS.map((paw, i) => (
        <div key={i} className="paw-float" style={{
          top: paw.top, left: paw.left,
          animationDelay: paw.delay, fontSize: paw.size,
          transform: `rotate(${paw.rotate})`,
          color: "rgba(43, 188, 212, 0.3)",
        }}>🐾</div>
      ))}

      {/* Glowing circles */}
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(43,188,212,0.18) 0%, transparent 70%)",
        top: "-100px", right: "-100px", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: "300px", height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(43,188,212,0.12) 0%, transparent 70%)",
        bottom: "50px", left: "-80px", pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto", width: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0, 480px)",
        gap: "3rem",
        alignItems: "center",
      }}
        className="hero-grid">

        {/* Text Content */}
        <div className="animate-fade-up" style={{ zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(43, 188, 212, 0.2)",
            border: "1px solid rgba(43, 188, 212, 0.4)",
            borderRadius: "9999px",
            padding: "0.4rem 1rem",
            marginBottom: "1.5rem",
            color: "var(--teal-light)",
            fontWeight: 700, fontSize: "0.85rem"
          }}>
            🐱 Consultório Veterinário de Confiança
          </div>

          <h1 style={{
            fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
            fontWeight: 900,
            color: "white",
            lineHeight: 1.15,
            marginBottom: "1.2rem"
          }}>
            Cuidado Veterinário{" "}<br />
            <span style={{ color: "var(--teal-light)" }}>com Amor</span>{" "}e{" "}<br />
            <span style={{ color: "var(--teal-light)" }}>Dedicação!</span>
          </h1>

          <p style={{
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.8,
            marginBottom: "2rem",
            maxWidth: "520px"
          }}>
            Seu pet merece saúde, carinho e atenção de verdade!
            Na Mallu Pet, cada animal é tratado com todo o amor do mundo. 🐾
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="https://wa.me/5519981185783?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor."
              target="_blank" rel="noopener noreferrer" className="btn-consultor">
              Fale com um Consultor
            </a>
            <a href="#servicos" className="btn-primary" style={{ background: "rgba(255,255,255,0.12)", boxShadow: "none", border: "2px solid rgba(43,188,212,0.5)" }}>
              Ver Serviços ↓
            </a>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{
            display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap",
            paddingBottom: "2rem"
          }}>
            {[
              { num: "500+", label: "Pets Atendidos" },
              { num: "5", label: "Avaliação Média", icon: "⭐" },
              { num: "10+", label: "Anos de Serviço" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ 
                  fontSize: "1.8rem", 
                  fontWeight: 900, 
                  color: "var(--teal-light)",
                  display: "flex",
                  alignItems: "center",
                  gap: s.icon ? "0.6rem" : "0"
                }}>
                  {s.num}{s.icon}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot + Logo */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* Glow ring */}
          <div className="glow-ring" style={{
            position: "absolute",
            width: "420px", height: "420px",
            borderRadius: "50%",
            background: "rgba(43,188,212,0.1)",
            animation: "pulse-ring 2.5s ease-out infinite",
          }} />

          {/* Organic blob shape with mascot */}
          <div className="animate-float-mascot mascot-container" style={{
            position: "relative", zIndex: 2,
            width: "420px", height: "480px",
          }}>
            {/* SVG clip path for organic shape */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <clipPath id="organic-blob" clipPathUnits="objectBoundingBox">
                  <path d="M0.5,0.02 C0.75,0.0,0.95,0.12,0.97,0.35 C0.99,0.55,0.92,0.72,0.85,0.85 C0.75,0.95,0.6,1.0,0.45,0.98 C0.28,0.96,0.12,0.88,0.06,0.72 C0.0,0.55,0.02,0.35,0.08,0.2 C0.15,0.07,0.3,0.02,0.5,0.02" />
                </clipPath>
              </defs>
            </svg>

            <div style={{
              width: "100%", height: "100%",
              clipPath: "url(#organic-blob)",
              background: "var(--off-white)",
              boxShadow: "0 25px 60px rgba(43,188,212,0.15)",
              position: "relative",
              overflow: "hidden"
            }}>
              <Image
                src="/mascote.png.jpeg"
                alt="Mascote Mallu Pet - Dr. Gato"
                fill
                sizes="(max-width: 768px) 180px, 420px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
                {...({ fetchPriority: "high" } as any)}
              />
            </div>

            {/* Logo badge floating */}
            <div className="mascot-logo" style={{
              position: "absolute", bottom: "30px", right: "-15px",
              width: "80px", height: "80px",
              overflow: "hidden",
              zIndex: 3
            }}>
              <Image 
                src="/logo1_transparent.png" 
                alt="Logo" 
                fill 
                sizes="(max-width: 768px) 45px, 80px"
                style={{ objectFit: "contain" }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave shape divider */}
      <div style={{
        position: "absolute", bottom: "-2px", left: 0, width: "100%", overflow: "hidden", lineHeight: 0, zIndex: 3
      }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ position: "relative", display: "block", width: "calc(100% + 1.3px)", height: "95px" }}>
          <path d="M0,64 C120,90 240,100 360,88 C480,76 600,40 720,32 C840,24 960,48 1080,64 C1200,80 1320,88 1440,80 L1440,120 L0,120 Z" fill="#FFFFFF"></path>
        </svg>
      </div>


      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 1.5rem !important;
          }
          .hero-grid > div:last-child {
            order: -1;
            margin-bottom: 0;
          }
          .mascot-container {
            width: 180px !important;
            height: 200px !important;
            margin: 0 auto;
          }
          .glow-ring {
            width: 200px !important;
            height: 200px !important;
          }
          .mascot-logo {
            width: 45px !important;
            height: 45px !important;
            bottom: 15px !important;
            right: -5px !important;
          }
          h1 {
            font-size: 1.8rem !important;
            padding: 0 10px;
            overflow-wrap: normal;
            word-wrap: normal;
            hyphens: none;
            line-height: 1.2 !important;
            margin: 0 auto 1.2rem !important;
            max-width: 90%;
          }
          p {
            font-size: 0.95rem !important;
            padding: 0 10px;
            margin: 0 auto 2rem !important;
            line-height: 1.6 !important;
            max-width: 90% !important;
          }
          .animate-fade-up {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 10px;
          }
          .hero-stats {
            margin-bottom: 4rem !important;
            justify-content: center;
            gap: 1.5rem !important;
          }
          .btn-consultor, .btn-primary {
            width: 100% !important;
            justify-content: center;
          }
          h1 br {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

