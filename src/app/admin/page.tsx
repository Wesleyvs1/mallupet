"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, Package, Star, Settings, LogOut, Plus, Search,
  MoreVertical, TrendingUp, Users, Bell, Eye, EyeOff, Pencil, Trash2, GripVertical
} from "lucide-react";
import LoginForm from "./LoginForm";
import ProductFormModal from "./ProductFormModal";
import type { Product } from "@/lib/supabase";

type ProductFormData = Omit<Product, "id" | "created_at" | "updated_at">;

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
    setCheckingAuth(false);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data || []);
      }
    } catch { /* fallback silently */ }
  }, []);

  useEffect(() => { if (token) fetchProducts(); }, [token, fetchProducts]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  const handleSaveProduct = async (data: ProductFormData, id?: string) => {
    const url = id ? `/api/products/${id}` : "/api/products";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleToggleActive = async (prod: Product) => {
    await fetch(`/api/products/${prod.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ativo: !prod.ativo }),
    });
    fetchProducts();
  };

  // Drag & Drop reorder
  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = async (targetId: string) => {
    if (!draggedId || draggedId === targetId) { setDraggedId(null); return; }
    const items = [...products];
    const dragIdx = items.findIndex(p => p.id === draggedId);
    const dropIdx = items.findIndex(p => p.id === targetId);
    const [moved] = items.splice(dragIdx, 1);
    items.splice(dropIdx, 0, moved);
    setProducts(items);
    setDraggedId(null);
    // Update order in DB
    for (let i = 0; i < items.length; i++) {
      await fetch(`/api/products/${items[i].id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordem: i }),
      });
    }
  };

  const filtered = products.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = products.filter(p => p.ativo).length;

  if (checkingAuth) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a1628" }}><div style={{ color: "white" }}>Carregando...</div></div>;
  if (!token) return <LoginForm onLogin={setToken} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: "#0f172a", color: "white", display: "flex", flexDirection: "column", padding: "2rem 1.5rem", position: "fixed", height: "100vh", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "3rem" }}>
          <div style={{ width: 40, height: 40, background: "white", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <Image src="/logo1_transparent.png" alt="Logo" width={30} height={30} style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.2rem" }}>Mallu <span style={{ color: "#2BBCD4" }}>Pet</span></span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "products", label: "Produtos", icon: Package },
            { id: "reviews", label: "Avaliações", icon: Star },
            { id: "settings", label: "Configurações", icon: Settings },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem 1rem", borderRadius: 12, background: activeTab === item.id ? "rgba(43,188,212,0.2)" : "transparent", color: activeTab === item.id ? "#2BBCD4" : "rgba(255,255,255,0.6)", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.2s" }}>
              <item.icon size={20} />{item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#2BBCD4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>👨‍⚕️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Administrador</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Admin Panel</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600 }}>
            <LogOut size={18} /> Sair do Painel
          </button>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "1rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.8rem", marginTop: "0.8rem" }}>
            ← Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 280, padding: "2rem 3rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>
              {activeTab === "dashboard" ? "Resumo Geral" : activeTab === "products" ? "Gerenciar Produtos" : activeTab === "reviews" ? "Avaliações" : "Configurações"}
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Painel de administração Mallu Pet</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ width: 42, height: 42, borderRadius: 12, background: "white", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", cursor: "pointer" }}><Bell size={20} /></button>
            {activeTab === "products" && (
              <button onClick={() => { setEditingProduct(null); setShowForm(true); }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", borderRadius: 12, background: "#2BBCD4", color: "white", border: "none", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(43,188,212,0.25)" }}>
                <Plus size={18} /> Novo Produto
              </button>
            )}
          </div>
        </header>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { label: "Total Produtos", value: products.length, icon: Package, color: "#3b82f6" },
                { label: "Ativos", value: activeCount, icon: Eye, color: "#22c55e" },
                { label: "Inativos", value: products.length - activeCount, icon: EyeOff, color: "#f59e0b" },
                { label: "Categorias", value: [...new Set(products.map(p => p.categoria))].length, icon: TrendingUp, color: "#8b5cf6" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "white", padding: "1.5rem", borderRadius: 20, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}><stat.icon size={24} /></div>
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.2rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", padding: "1.5rem", borderRadius: 24, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Produtos Recentes</h3>
                <button onClick={() => setActiveTab("products")} style={{ color: "#2BBCD4", background: "none", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Ver todos</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {products.slice(0, 5).map(prod => (
                  <div key={prod.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem", borderRadius: 14, background: "#f8fafc" }}>
                    <div style={{ width: 50, height: 50, borderRadius: 10, background: "white", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <Image src={prod.imagem} alt={prod.nome} fill style={{ objectFit: "cover" }} unoptimized />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{prod.nome}</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{prod.categoria}</div>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: prod.ativo ? "#22c55e" : "#f59e0b", flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div style={{ background: "white", borderRadius: 24, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
              <div style={{ position: "relative", width: 300 }}>
                <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} size={18} />
                <input type="text" placeholder="Buscar produto..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem 1rem 0.6rem 2.5rem", borderRadius: 10, border: "1px solid #e2e8f0", outline: "none", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748b" }}>
                <Package size={16} /> {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                  <th style={{ padding: "1rem 1.5rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 700, width: 40 }}></th>
                  <th style={{ padding: "1rem 1.5rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Produto</th>
                  <th style={{ padding: "1rem 1.5rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Categoria</th>
                  <th style={{ padding: "1rem 1.5rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Status</th>
                  <th style={{ padding: "1rem 1.5rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 700, width: 100 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(prod => (
                  <tr key={prod.id}
                    draggable
                    onDragStart={() => handleDragStart(prod.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(prod.id)}
                    style={{ borderBottom: "1px solid #f1f5f9", opacity: draggedId === prod.id ? 0.4 : prod.ativo ? 1 : 0.5, transition: "opacity 0.2s" }}>
                    <td style={{ padding: "1rem 0.5rem 1rem 1.5rem", cursor: "grab" }}>
                      <GripVertical size={16} color="#cbd5e1" />
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f1f5f9", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                          <Image src={prod.imagem} alt={prod.nome} fill style={{ objectFit: "cover" }} unoptimized />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 250 }}>{prod.nome}</div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{prod.fabricante}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{ padding: "0.25rem 0.7rem", borderRadius: 999, background: "rgba(43,188,212,0.1)", color: "#0d7b8a", fontSize: "0.8rem", fontWeight: 600 }}>{prod.categoria}</span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <button onClick={() => handleToggleActive(prod)}
                        style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", borderRadius: 999, background: prod.ativo ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", color: prod.ativo ? "#16a34a" : "#d97706", border: "none", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
                        {prod.ativo ? <><Eye size={14} /> Ativo</> : <><EyeOff size={14} /> Inativo</>}
                      </button>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", position: "relative" }}>
                      <button onClick={() => setMenuOpenId(menuOpenId === prod.id ? null : prod.id)}
                        style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "0.3rem" }}>
                        <MoreVertical size={20} />
                      </button>
                      {menuOpenId === prod.id && (
                        <>
                          <div onClick={() => setMenuOpenId(null)} style={{ position: "fixed", inset: 0, zIndex: 30 }} />
                          <div style={{ position: "absolute", right: 0, top: "100%", background: "white", borderRadius: "0.8rem", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0", padding: "0.4rem", zIndex: 40, minWidth: 160 }}>
                            <button onClick={() => { setEditingProduct(prod); setShowForm(true); setMenuOpenId(null); }}
                              style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
                              <Pencil size={15} color="#3b82f6" /> Editar
                            </button>
                            <button onClick={() => { handleDeleteProduct(prod.id); setMenuOpenId(null); }}
                              style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#ef4444" }}>
                              <Trash2 size={15} /> Excluir
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div style={{ padding: "4rem", textAlign: "center", color: "#94a3b8" }}>
                <Package size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                <p>Nenhum produto encontrado.</p>
              </div>
            )}
          </div>
        )}

        {/* REVIEWS / SETTINGS PLACEHOLDER */}
        {(activeTab === "reviews" || activeTab === "settings") && (
          <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", background: "white", borderRadius: 24, border: "1px dashed #cbd5e1" }}>
            <div style={{ textAlign: "center", color: "#64748b" }}>
              <Settings size={48} style={{ marginBottom: "1rem", opacity: 0.2 }} />
              <p>Módulo de {activeTab === "reviews" ? "Avaliações" : "Configurações"} em desenvolvimento.</p>
            </div>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}
