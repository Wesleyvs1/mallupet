"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Check, ZoomIn, ZoomOut } from "lucide-react";

type Area = { x: number; y: number; width: number; height: number };

async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob> {
  const image = new window.Image();
  image.src = imageSrc;
  await new Promise(r => { image.onload = r; });
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  return new Promise(r => canvas.toBlob(b => r(b!), "image/jpeg", 0.9));
}

export default function ImageCropModal({ imageSrc, onConfirm, onCancel }: {
  imageSrc: string;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (croppedArea) {
      const blob = await getCroppedImg(imageSrc, croppedArea);
      onConfirm(blob);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, position: "relative" }}>
        <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={4 / 3} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
      </div>
      <div style={{ background: "#1a1a2e", padding: "1.2rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ZoomOut size={18} color="#aaa" />
          <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={e => setZoom(Number(e.target.value))}
            style={{ width: 150, accentColor: "#2BBCD4" }} />
          <ZoomIn size={18} color="#aaa" />
        </div>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button onClick={onCancel} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.5rem", borderRadius: "0.7rem", background: "rgba(255,255,255,0.1)", color: "white", border: "none", fontWeight: 700, cursor: "pointer" }}>
            <X size={18} /> Cancelar
          </button>
          <button onClick={handleConfirm} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.5rem", borderRadius: "0.7rem", background: "#2BBCD4", color: "white", border: "none", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(43,188,212,0.3)" }}>
            <Check size={18} /> Recortar
          </button>
        </div>
      </div>
    </div>
  );
}
