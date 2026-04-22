"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Upload, Loader2, ImageIcon } from "lucide-react";
import ImageCropModal from "./ImageCropModal";
import type { Product } from "@/lib/supabase";

type ProductFormData = Omit<Product, "id" | "created_at" | "updated_at">;

const CATEGORIAS = ["Antibioticos", "Anti-inflamatorios", "Bem-estar Gastrointestinal", "Acessorios"];

export default function ProductFormModal({ product, onSave, onCancel }: {
  product?: Product | null;
  onSave: (data: ProductFormData, id?: string) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductFormData>({
    nome: product?.nome || "",
    categoria: product?.categoria || CATEGORIAS[0],
    descricao: product?.descricao || "",
    preco: product?.preco || "Consulte preço",
    imagem: product?.imagem || "",
    indicacao: product?.indicacao || "Cães e Gatos",
    fabricante: product?.fabricante || "UCBVET",
    ativo: product?.ativo !== undefined ? product.ativo : true,
    ordem: product?.ordem || 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(product?.imagem || "");
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleCropConfirm = async (blob: Blob) => {
    setCropSrc(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", blob, "cropped.jpg");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm(f => ({ ...f, imagem: data.url }));
      setPreviewUrl(data.url);
    } catch (err) {
      alert("Erro ao fazer upload: " + (err instanceof Error ? err.message : "desconhecido"));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.descricao || !form.imagem) {
      alert("Preencha todos os campos obrigatórios (nome, descrição, imagem).");
      return;
    }
    setSaving(true);
    try {
      await onSave(form, product?.id);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "0.8rem 1rem", borderRadius: "0.7rem", border: "1px solid #e2e8f0", fontSize: "0.9rem", outline: "none", background: "#f8fafc", transition: "border 0.2s" };
  const labelStyle: React.CSSProperties = { fontWeight: 700, fontSize: "0.8rem", color: "#475569", display: "block", marginBottom: "0.4rem" };

  return (
    <>
      {cropSrc && <ImageCropModal imageSrc={cropSrc} onConfirm={handleCropConfirm} onCancel={() => setCropSrc(null)} />}
      <div onClick={onCancel} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "1.5rem", width: "100%", maxWidth: 600, maxHeight: "90vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.2)" }}>
          {/* Header */}
          <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "white", zIndex: 2, borderRadius: "1.5rem 1.5rem 0 0" }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a" }}>{product ? "Editar Produto" : "Novo Produto"}</h2>
            <button onClick={onCancel} style={{ width: 36, height: 36, borderRadius: "50%", background: "#f1f5f9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
            {/* Image Upload / Drag & Drop */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Imagem do Produto *</label>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{ border: `2px dashed ${dragOver ? "#2BBCD4" : "#e2e8f0"}`, borderRadius: "1rem", padding: "2rem", textAlign: "center", cursor: "pointer", background: dragOver ? "rgba(43,188,212,0.05)" : "#fafbfc", transition: "all 0.3s", position: "relative", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                {uploading ? (
                  <><Loader2 size={32} className="spin" style={{ color: "#2BBCD4" }} /><p style={{ marginTop: "0.8rem", color: "#64748b", fontSize: "0.85rem" }}>Enviando imagem...</p></>
                ) : previewUrl ? (
                  <div style={{ position: "relative", width: "100%", height: 180, borderRadius: "0.8rem", overflow: "hidden" }}>
                    <Image src={previewUrl} alt="Preview" fill style={{ objectFit: "contain" }} unoptimized />
                    <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "white", padding: "0.3rem 0.8rem", borderRadius: "0.5rem", fontSize: "0.7rem", fontWeight: 700 }}>Clique para trocar</div>
                  </div>
                ) : (
                  <>
                    <div style={{ width: 56, height: 56, borderRadius: "1rem", background: "rgba(43,188,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.8rem" }}>
                      {dragOver ? <Upload size={28} color="#2BBCD4" /> : <ImageIcon size={28} color="#94a3b8" />}
                    </div>
                    <p style={{ fontWeight: 700, color: "#334155", fontSize: "0.95rem" }}>Arraste uma imagem ou clique para selecionar</p>
                    <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: "0.3rem" }}>JPG, PNG · Máx 5MB</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }} />
              </div>
            </div>

            {/* Nome */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>Nome do Produto *</label>
              <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Ex: Infectrat UCBVET 100mg" required style={inputStyle} />
            </div>

            {/* Categoria + Fabricante */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={labelStyle}>Categoria</label>
                <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
                  {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Fabricante</label>
                <input value={form.fabricante} onChange={e => setForm(f => ({ ...f, fabricante: e.target.value }))} style={inputStyle} />
              </div>
            </div>

            {/* Descrição */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>Descrição *</label>
              <textarea value={form.descricao} onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))} placeholder="Descreva o produto..." required rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Indicação + Preço */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Indicação</label>
                <input value={form.indicacao} onChange={e => setForm(f => ({ ...f, indicacao: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Preço</label>
                <input value={form.preco} onChange={e => setForm(f => ({ ...f, preco: e.target.value }))} style={inputStyle} />
              </div>
            </div>

            {/* Ativo Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", padding: "1rem", background: "#f8fafc", borderRadius: "0.8rem" }}>
              <button type="button" onClick={() => setForm(f => ({ ...f, ativo: !f.ativo }))}
                style={{ width: 48, height: 26, borderRadius: 13, background: form.ativo ? "#2BBCD4" : "#cbd5e1", border: "none", cursor: "pointer", position: "relative", transition: "background 0.3s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: form.ativo ? 25 : 3, transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </button>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>Produto Ativo</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{form.ativo ? "Visível no catálogo" : "Oculto do catálogo"}</div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="button" onClick={onCancel} style={{ flex: 1, padding: "0.9rem", borderRadius: "0.8rem", border: "1px solid #e2e8f0", background: "white", fontWeight: 700, cursor: "pointer", color: "#475569" }}>Cancelar</button>
              <button type="submit" disabled={saving} style={{ flex: 2, padding: "0.9rem", borderRadius: "0.8rem", border: "none", background: "#2BBCD4", color: "white", fontWeight: 800, cursor: saving ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 8px 25px rgba(43,188,212,0.25)" }}>
                {saving ? <><Loader2 size={18} className="spin" /> Salvando...</> : product ? "Salvar Alterações" : "Cadastrar Produto"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
