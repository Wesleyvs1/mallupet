"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Star, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  MoreVertical,
  TrendingUp,
  Users,
  ShoppingCart,
  Bell
} from "lucide-react";
import { produtos } from "@/data/products";
import { avaliacoes } from "@/data/reviews";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "#f8fafc",
      color: "var(--navy)"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: "280px",
        background: "var(--navy)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 1.5rem",
        position: "fixed",
        height: "100vh",
        zIndex: 50
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "3rem" }}>
          <div style={{ 
            width: "40px", height: "40px", background: "white", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
          }}>
            <Image src="/logo_clean.png" alt="Logo" width={30} height={30} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.5px" }}>Mallu <span style={{ color: "var(--teal-light)" }}>Pet</span></span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "products", label: "Produtos", icon: Package },
            { id: "reviews", label: "Avaliações", icon: Star },
            { id: "settings", label: "Configurações", icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "0.8rem 1rem", borderRadius: "12px",
                background: activeTab === item.id ? "rgba(43, 188, 212, 0.2)" : "transparent",
                color: activeTab === item.id ? "var(--teal-light)" : "rgba(255,255,255,0.6)",
                border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem",
                transition: "all 0.2s ease"
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User / Logout */}
        <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>👨‍⚕️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Dr. Ricardo</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Administrador</div>
            </div>
          </div>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "1rem",
            color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600
          }}>
            <LogOut size={18} />
            Sair do Painel
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: "280px", padding: "2rem 3rem" }}>
        {/* Header */}
        <header style={{ 
          display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" 
        }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy)" }}>
              {activeTab === "dashboard" ? "Resumo Geral" : activeTab === "products" ? "Gerenciar Produtos" : activeTab === "reviews" ? "Avaliações dos Clientes" : "Configurações"}
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Bem-vindo de volta, Dr. Ricardo!</p>
          </div>
          
          <div style={{ display: "flex", gap: "1rem" }}>
             <button style={{
               width: "42px", height: "42px", borderRadius: "12px", background: "white", border: "1px solid #e2e8f0",
               display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", cursor: "pointer"
             }}>
               <Bell size={20} />
             </button>
             <button className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
               <Plus size={18} /> Novo Item
             </button>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { label: "Total Produtos", value: produtos.length, icon: Package, color: "#3b82f6", trend: "+12%" },
                { label: "Avaliações", value: avaliacoes.length, icon: Star, color: "#eab308", trend: "+5%" },
                { label: "Novos Clientes", value: "48", icon: Users, color: "#22c55e", trend: "+18%" },
                { label: "Clicks WhatsApp", value: "324", icon: TrendingUp, color: "#ef4444", trend: "+24%" },
              ].map((stat, i) => (
                <div key={i} style={{ 
                  background: "white", padding: "1.5rem", borderRadius: "20px", border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ 
                      width: "48px", height: "48px", borderRadius: "14px", background: `${stat.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center", color: stat.color
                    }}>
                      <stat.icon size={24} />
                    </div>
                    <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "0.85rem" }}>{stat.trend}</span>
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.2rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity / Content */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
              {/* Products Preview */}
              <div style={{ 
                background: "white", padding: "1.5rem", borderRadius: "24px", border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Produtos Recentes</h3>
                  <button onClick={() => setActiveTab("products")} style={{ color: "var(--teal)", background: "none", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Ver todos</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {produtos.slice(0, 5).map(prod => (
                    <div key={prod.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem", borderRadius: "14px", background: "#f8fafc" }}>
                      <div style={{ width: "50px", height: "50px", borderRadius: "10px", background: "white", overflow: "hidden", position: "relative" }}>
                         <Image src={`/produtos/${prod.imagem}`} alt={prod.nome} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{prod.nome}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{prod.categoria} · {prod.indicacao}</div>
                      </div>
                      <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}><MoreVertical size={20} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Preview */}
              <div style={{ 
                background: "white", padding: "1.5rem", borderRadius: "24px", border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Últimas Avaliações</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {avaliacoes.slice(0, 3).map((av, i) => (
                    <div key={i} style={{ borderBottom: i === 2 ? "none" : "1px solid #f1f5f9", paddingBottom: i === 2 ? 0 : "1.2rem" }}>
                       <div style={{ display: "flex", gap: "0.8rem", marginBottom: "0.6rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>{av.avatar}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{av.nome}</div>
                            <div style={{ display: "flex", color: "#eab308", gap: "2px" }}>{"★".repeat(av.estrelas)}</div>
                          </div>
                       </div>
                       <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5 }}>"{av.texto.length > 80 ? av.texto.substring(0, 80) + "..." : av.texto}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "products" && (
           <div style={{ background: "white", borderRadius: "24px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
                  <div style={{ position: "relative", width: "300px" }}>
                    <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} size={18} />
                    <input 
                      type="text" 
                      placeholder="Buscar produto..." 
                      style={{ width: "100%", padding: "0.6rem 1rem 0.6rem 2.5rem", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid #e2e8f0", background: "white", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Filtros</button>
                    <button style={{ padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid #e2e8f0", background: "white", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Exportar</button>
                  </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={{ padding: "1rem 1.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>Produto</th>
                    <th style={{ padding: "1rem 1.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>Categoria</th>
                    <th style={{ padding: "1rem 1.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>Indicação</th>
                    <th style={{ padding: "1rem 1.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>Preço</th>
                    <th style={{ padding: "1rem 1.5rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(prod => (
                    <tr key={prod.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem 1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                           <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f1f5f9", overflow: "hidden", position: "relative" }}>
                              <Image src={`/produtos/${prod.imagem}`} alt={prod.nome} fill style={{ objectFit: "cover" }} />
                           </div>
                           <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{prod.nome}</span>
                        </div>
                      </td>
                      <td style={{ padding: "1rem 1.5rem", fontSize: "0.85rem" }}>{prod.categoria}</td>
                      <td style={{ padding: "1rem 1.5rem", fontSize: "0.85rem" }}>{prod.indicacao}</td>
                      <td style={{ padding: "1rem 1.5rem", fontSize: "0.85rem", fontWeight: 700 }}>{prod.preco}</td>
                      <td style={{ padding: "1rem 1.5rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button style={{ padding: "0.3rem 0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>Editar</button>
                          <button style={{ padding: "0.3rem 0.8rem", borderRadius: "8px", border: "none", background: "#fee2e2", color: "#ef4444", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        )}

        {(activeTab === "reviews" || activeTab === "settings") && (
          <div style={{ 
            height: "400px", display: "flex", alignItems: "center", justifyContent: "center",
            background: "white", borderRadius: "24px", border: "1px dashed #cbd5e1"
          }}>
             <div style={{ textAlign: "center", color: "#64748b" }}>
                <Settings size={48} style={{ marginBottom: "1rem", opacity: 0.2 }} />
                <p>Módulo de {activeTab === "reviews" ? "Avaliações" : "Configurações"} em desenvolvimento.</p>
                <p style={{ fontSize: "0.8rem" }}>Em breve você poderá gerenciar tudo por aqui!</p>
             </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        main {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
