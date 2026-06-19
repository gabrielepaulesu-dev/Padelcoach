"use client";
import { useState, useRef, useEffect } from "react";

const BG = "#0A0E1A";
const CARD = "#141829";
const ACCENT = "#84CC16";
const MUTED = "#94A3B8";

export default function Profilo() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("juego_avatar");
    if (saved) setAvatar(saved);
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
      localStorage.setItem("juego_avatar", result);
    };
    reader.readAsDataURL(file);
    setShowSheet(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF", maxWidth: 430, margin: "0 auto", position: "relative" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "32px 20px 16px" }}>
        <a href="/" style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, fontSize: 18, textDecoration: "none" }}>←</a>
        <span style={{ fontWeight: 800, fontSize: 20 }}>Foto del profilo</span>
      </div>

      {/* Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px 32px" }}>
        <div
          onClick={() => setShowSheet(true)}
          style={{ width: 140, height: 140, borderRadius: "50%", border: `3px solid ${ACCENT}`, overflow: "hidden", cursor: "pointer", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
        >
          {avatar
            ? <img src={avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: 64 }}>👨‍🏫</span>
          }
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#00000080", padding: "8px 0", textAlign: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#FFF", letterSpacing: "0.08em" }}>MODIFICA</span>
          </div>
        </div>
        <p style={{ color: MUTED, fontSize: 14, marginTop: 16 }}>Tocca la foto per cambiarla</p>
      </div>

      {/* Input nascosti */}
      <input ref={cameraInputRef} type="file" accept="image/*" capture="user" onChange={handleFile} style={{ display: "none" }} />
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

      {/* Bottom Sheet */}
      {showSheet && (
        <div
          onClick={() => setShowSheet(false)}
          style={{ position: "fixed", inset: 0, backgroundColor: "#00000080", zIndex: 10, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 430, backgroundColor: CARD, borderRadius: "24px 24px 0 0", padding: "20px 20px 48px" }}
          >
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: MUTED, margin: "0 auto 24px", opacity: 0.4 }} />
            <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Cambia foto profilo</p>

            <button
              onClick={() => cameraInputRef.current?.click()}
              style={{ width: "100%", backgroundColor: BG, border: "1px solid #94A3B830", borderRadius: 16, padding: "16px 20px", color: "#FFF", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}
            >
              <span style={{ fontSize: 24 }}>📷</span>
              <span>Scatta foto</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ width: "100%", backgroundColor: BG, border: "1px solid #94A3B830", borderRadius: 16, padding: "16px 20px", color: "#FFF", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}
            >
              <span style={{ fontSize: 24 }}>🖼️</span>
              <span>Carica da libreria</span>
            </button>

            <button
              onClick={() => setShowSheet(false)}
              style={{ width: "100%", backgroundColor: "#94A3B815", border: "none", borderRadius: 16, padding: "16px", color: MUTED, fontSize: 16, fontWeight: 700, cursor: "pointer" }}
            >
              Annulla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}