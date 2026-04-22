"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, X, Menu } from "lucide-react";

import { produtos, categorias } from "@/data/products";

export default function CatalogoSection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState<typeof produtos[0] | null>(null);
  const [direction, setDirection] = useState(0);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    return produtos.filter(p => {
      const matchesCategory = categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;
      const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoriaAtiva, searchTerm]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  // Reset page when filtering
  const handleCategoryChange = (cat: string) => {
    setCategoriaAtiva(cat);
    setCurrentPage(0);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(0);
  };

  const paginate = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < totalPages) {
      setDirection(newDirection);
      setCurrentPage(newPage);
    }
  };

  const currentItems = filtered.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    })
  };

  return (
    <section id="catalogo" className="section-pad" style={{ background: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(43,188,212,0.1)", border: "1px solid rgba(43,188,212,0.3)",
            borderRadius: "9999px", padding: "0.35rem 0.9rem",
            color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.8rem",
            marginBottom: "1rem"
          }}>
            🛍️ Catálogo Digital
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.8rem" }}>
            Nossos <span className="gradient-text">Produtos</span>
          </h2>
          <p className="section-subtitle">
            Encontre os melhores produtos para o seu pet. Clique em qualquer item para mais informações.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ 
          maxWidth: "600px", 
          margin: "0 auto 2rem auto",
          position: "relative"
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "var(--off-white)",
            borderRadius: "2rem",
            padding: "0.2rem 0.5rem",
            border: "2px solid rgba(43,188,212,0.15)",
            boxShadow: "0 10px 25px rgba(43,188,212,0.08)",
            transition: "all 0.3s ease",
          }} className="search-container">
            <div style={{ padding: "0 0.8rem", color: "var(--teal)" }}>
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Pesquisar medicamentos (ex: Vitamina, Antibiótico...)"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 0.5rem",
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "1rem",
                color: "var(--navy)",
                fontWeight: 500
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => handleSearchChange("")}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                  color: "#aaa"
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter - Compact with Hamburger Style */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="category-toggle"
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.8rem 2rem", borderRadius: "9999px",
                background: "var(--teal)", color: "white",
                border: "none", 
                fontWeight: 800, cursor: "pointer",
                boxShadow: "0 8px 25px rgba(43,188,212,0.25)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "0.95rem"
              }}
            >
              <Menu size={20} strokeWidth={2.5} />
              <span>{categoriaAtiva === "Todos" ? "Filtrar por Categoria" : categoriaAtiva}</span>
            </button>
            
            <AnimatePresence>
              {isCategoryMenuOpen && (
                <>
                  {/* Backdrop to close menu */}
                  <div 
                    onClick={() => setIsCategoryMenuOpen(false)}
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{
                      position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                      marginTop: "0.8rem", background: "white", borderRadius: "1.2rem",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                      padding: "0.6rem", zIndex: 50,
                      minWidth: "240px", border: "1px solid rgba(43,188,212,0.1)"
                    }}
                  >
                    {categorias.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => {
                          handleCategoryChange(cat);
                          setIsCategoryMenuOpen(false);
                        }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "0.8rem 1.2rem", borderRadius: "0.8rem",
                          background: categoriaAtiva === cat ? "rgba(43,188,212,0.1)" : "transparent",
                          color: categoriaAtiva === cat ? "var(--teal-dark)" : "var(--navy)",
                          border: "none", fontWeight: categoriaAtiva === cat ? 700 : 500,
                          cursor: "pointer", transition: "all 0.2s",
                          fontSize: "0.9rem"
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Products Grid with Horizontal Slide */}
        <div style={{ position: "relative", minHeight: "800px" }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentPage + (filtered.length > 0 ? "has-results" : "no-results")}
              layout="position"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
                width: "100%"
              }} 
              className="catalog-grid"
            >
              {currentItems.length > 0 ? (
                currentItems.map(prod => (
                  <motion.div 
                    layout
                    key={prod.id}
                    id={`produto-${prod.id}`}
                    onClick={() => setProdutoSelecionado(prod)}
                    style={{
                      background: "var(--off-white)",
                      borderRadius: "1.5rem",
                      padding: "1.8rem",
                      border: "1px solid rgba(43,188,212,0.12)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      height: "fit-content"
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 16px 40px rgba(43,188,212,0.18)";
                      el.style.borderColor = "var(--teal)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                      el.style.borderColor = "rgba(43,188,212,0.12)";
                    }}>

                    {/* Imagem do Produto */}
                    <div style={{
                      width: "100%", height: "220px",
                      borderRadius: "1rem",
                      overflow: "hidden",
                      position: "relative",
                      marginBottom: "1.2rem",
                      background: "white",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                    }}>
                      <Image
                        src={`/produtos/${prod.imagem}`}
                        alt={prod.nome}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div style={{
                      display: "inline-block", background: "rgba(43,188,212,0.1)",
                      color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.7rem",
                      padding: "0.2rem 0.6rem", borderRadius: "9999px", marginBottom: "0.6rem"
                    }}>
                      {prod.categoria}
                    </div>

                    <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
                      {prod.nome}
                    </h3>
                    <p style={{ color: "#7a9aaa", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      {prod.descricao.substring(0, 80)}...
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "var(--teal-dark)", fontWeight: 800, fontSize: "0.85rem" }}>
                        {prod.preco}
                      </span>
                      <span style={{
                        background: "var(--teal)", color: "white",
                        padding: "0.3rem 0.8rem", borderRadius: "9999px",
                        fontSize: "0.75rem", fontWeight: 700
                      }}>
                        Ver detalhes
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{ 
                  gridColumn: "1 / -1", 
                  textAlign: "center", 
                  padding: "4rem 0",
                  color: "#8FA8B8"
                }}>
                  <Search size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                  <p>Nenhum produto encontrado com "{searchTerm}"</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              marginTop: "2.5rem"
            }}>
              <button 
                onClick={() => paginate(-1)}
                disabled={currentPage === 0}
                style={{
                  background: currentPage === 0 ? "#eee" : "var(--teal)",
                  color: "white",
                  border: "none",
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  cursor: currentPage === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(43,188,212,0.2)"
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      setDirection(i > currentPage ? 1 : -1);
                      setCurrentPage(i);
                    }}
                    style={{
                      width: i === currentPage ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === currentPage ? "var(--teal)" : "#cbd5e1",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </div>

              <button 
                onClick={() => paginate(1)}
                disabled={currentPage === totalPages - 1}
                style={{
                  background: currentPage === totalPages - 1 ? "#eee" : "var(--teal)",
                  color: "white",
                  border: "none",
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(43,188,212,0.2)"
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="https://wa.me/5519981185783?text=Olá!%20Gostaria%20de%20falar%20com%20um%20consultor%20sobre%20os%20produtos."
            target="_blank" rel="noopener noreferrer" className="btn-consultor">
            Fale com um Consultor
          </a>
          
          <p style={{ 
            fontSize: "0.75rem", 
            color: "#8FA8B8", 
            marginTop: "2.5rem", 
            maxWidth: "600px", 
            marginInline: "auto",
            lineHeight: 1.5,
            opacity: 0.8
          }}>
            ⚠️ <strong>Aviso Legal:</strong> Consulte sempre um médico veterinário antes de medicar seu animal de estimação. 
            Alguns produtos podem ter variações de dosagem (50mg/100mg) que influenciam no valor final.
          </p>
        </div>
      </div>

      {/* Modal */}
      {produtoSelecionado && (
        <div
          onClick={() => setProdutoSelecionado(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem"
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "white", borderRadius: "2rem",
              padding: "2.5rem", maxWidth: "500px", width: "100%",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
              position: "relative"
            }}>
            <button onClick={() => setProdutoSelecionado(null)}
              style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                background: "rgba(43,188,212,0.15)", border: "none",
                width: "36px", height: "36px", borderRadius: "50%",
                cursor: "pointer", fontSize: "1.1rem", color: "var(--navy)",
                zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                backdropFilter: "blur(4px)"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(43,188,212,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(43,188,212,0.15)")}>
              ✕
            </button>

            <div style={{
              width: "100%", height: "300px",
              borderRadius: "1.2rem",
              position: "relative",
              overflow: "hidden",
              marginBottom: "1.5rem",
              background: "#f8f9fa",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
            }}>
              <Image
                src={`/produtos/${produtoSelecionado.imagem}`}
                alt={produtoSelecionado.nome}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{
              display: "inline-block", background: "rgba(43,188,212,0.1)",
              color: "var(--teal-dark)", fontWeight: 700, fontSize: "0.75rem",
              padding: "0.2rem 0.7rem", borderRadius: "9999px", marginBottom: "0.8rem"
            }}>
              {produtoSelecionado.categoria}
            </div>
            <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--navy)", marginBottom: "0.8rem" }}>
              {produtoSelecionado.nome}
            </h3>
            <p style={{ color: "#5a7a8a", lineHeight: 1.7, marginBottom: "1.2rem" }}>
              {produtoSelecionado.descricao}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.9rem", color: "#5a7a8a" }}>
                <strong style={{ color: "var(--navy)" }}>🐾 Indicação:</strong> {produtoSelecionado.indicacao}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#5a7a8a" }}>
                <strong style={{ color: "var(--navy)" }}>🏢 Fabricante:</strong> {produtoSelecionado.fabricante}
                {produtoSelecionado.fabricante === "UCBVET" && (
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", background: "var(--teal)", color: "white", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>
                    Qualidade Premium
                  </span>
                )}
              </div>
            </div>

            <div style={{ 
              background: "#FFF9E6", border: "1px solid #FFE58F", 
              padding: "0.8rem", borderRadius: "1rem", marginBottom: "1.5rem",
              fontSize: "0.8rem", color: "#856404"
            }}>
              <strong>Importante:</strong> Consulte sempre um médico veterinário antes de medicar seu pet.
            </div>
            <a
              href={`https://wa.me/5519981185783?text=Olá!%20Tenho%20interesse%20no%20produto%20${encodeURIComponent(produtoSelecionado.nome)}.%20Gostaria%20de%20falar%20com%20um%20consultor.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-consultor" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
              Fale com um Consultor
            </a>
          </div>
        </div>
      )}

      <style>{`
        .search-container:focus-within {
          border-color: var(--teal) !important;
          box-shadow: 0 10px 30px rgba(43,188,212,0.15) !important;
          transform: translateY(-2px);
        }
        .category-toggle:hover {
          background: var(--teal-dark) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(43,188,212,0.35) !important;
        }
        @media (max-width: 900px) {
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

