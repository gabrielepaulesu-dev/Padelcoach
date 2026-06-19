"use client";
import { useState, useRef, useEffect } from "react";

const BG = "#0A0E1A";
const CARD = "#141829";
const ACCENT = "#84CC16";
const MUTED = "#94A3B8";

export default function Profilo() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [nome, setNome] = useState("Luca Bianchi");
  const [showSheet, setShowSheet] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("juego_avatar");
    if (savedAvatar) setAvatar(savedAvatar);
    const savedNome = localStorage.getItem("juego_nome");
    if (savedNome) setNome(savedNome);
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

  const handleSalvaNome = () => {
    localStorage.setItem("juego_nome", nome);
    alert("Nome aggiornato! ✓");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF", maxWidth: 430, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "32px 20px 16px" }}>
        <a href="/" style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, fontSize: 18, textDecoration: "none" }}>←</a>
        <span style={{ fontWeight: 800, fontSize: 20 }}>Profilo</span>
      </div>

      {/* Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 24px" }}>
        <div
          onClick={() => setShowSheet(true)}
          style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid ${ACCENT}`, overflow: "hidden", cursor: "pointer", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
        >
          {avatar
            ? <img src={avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: 56 }}>👨‍🏫</span>
          }
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#00000080", padding: "6px 0", textAlign: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FFF", letterSpacing: "0.08em" }}>MODIFICA</span>
          </div>
        </div>
        <p style={{ color: MUTED, fontSize: 13, marginTop: 12 }}>Tocca la foto per cambiarla</p>
      </div>

      {/* Nome maestro */}
      <div style={{ padding: "0 20px 32px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 8 }}>NOME MAESTRO</p>
        <input
          style={{ width: "100%", backgroundColor: CARD, border: "1px solid #94A3B830", borderRadius: 14, padding: "14px 16px", color: "#FFF", fontSize: 16, outline: "none", boxSizing: "border-box" }}
          placeholder="Il tuo nome..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button
          onClick={handleSalvaNome}
          style={{ width: "100%", marginTop: 12, backgroundColor: ACCENT, color: "#0A0E1A", fontWeight: 800, fontSize: 16, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}
        >
          Conferma ✓
        </button>
      </div>

      {/* Input nascosti */}
      <input ref={cameraInputRef} type="file" accept="image/*" capture="user" onChange={handleFile} style={{ display: "none" }} />
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

      {/* Bottom Sheet */}
      {showSheet && (
        <div onClick={() => setShowSheet(false)} style={{ position: "fixed", inset: 0, backgroundColor: "#00000080", zIndex: 10, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 430, backgroundColor: CARD, borderRadius: "24px 24px 0 0", padding: "20px 20px 48px" }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: MUTED, margin: "0 auto 24px", opacity: 0.4 }} />
            <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Cambia foto profilo</p>
            <button onClick={() => cameraInputRef.current?.click()} style={{ width: "100%", backgroundColor: BG, border: "1px solid #94A3B830", borderRadius: 16, padding: "16px 20px", color: "#FFF", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>📷</span><span>Scatta foto</span>
            </button>
            <button onClick={() => fileInputRef.current?.click()} style={{ width: "100%", backgroundColor: BG, border: "1px solid #94A3B830", borderRadius: 16, padding: "16px 20px", color: "#FFF", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🖼️</span><span>Carica da libreria</span>
            </button>
            <button onClick={() => setShowSheet(false)} style={{ width: "100%", backgroundColor: "#94A3B815", border: "none", borderRadius: 16, padding: "16px", color: MUTED, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Annulla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}