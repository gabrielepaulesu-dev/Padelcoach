"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [nome, setNome] = useState("Luca Bianchi");

  useEffect(() => {
    const savedAvatar = localStorage.getItem("juego_avatar");
    if (savedAvatar) setAvatar(savedAvatar);
    const savedNome = localStorage.getItem("juego_nome");
    if (savedNome) setNome(savedNome);
  }, []);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 100, backgroundColor: "#0A0E1A", color: "#FFFFFF" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#84CC16", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontWeight: 900, fontSize: 12, color: "#0A0E1A" }}>J</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: "0.15em", color: "#FFF" }}>JUEGO</span>
            <div style={{ width: 1, height: 16, backgroundColor: "#94A3B8" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.1em", fontWeight: 600, color: "#94A3B8" }}>MAESTRO <span style={{ color: "#84CC16" }}>PADEL</span></span>
          </div>
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#141829", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18 }}>🔔</span>
          </div>
          <div style={{ position: "absolute", top: -2, right: -2, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#84CC16", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#0A0E1A" }}>3</div>
        </div>
      </div>

      {/* Hero profilo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 20px" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94A3B8", marginBottom: 6 }}>BENTORNATO, MAESTRO</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "#FFF", margin: 0 }}>{nome}</h1>
            <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#84CC16", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0E1A" }}>★</div>
          </div>
          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Maestro Nazionale</p>
        </div>
        <a href="/profilo" style={{ textDecoration: "none" }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", border: "2.5px solid #84CC16", backgroundColor: "#141829", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {avatar
              ? <img src={avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: 36 }}>👨‍🏫</span>
            }
          </div>
        </a>
      </div>

      {/* Prossima lezione */}
      <div style={{ margin: "0 20px 16px", borderRadius: 20, padding: 20, backgroundColor: "#141829", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#84CC16", marginBottom: 10 }}>PROSSIMA LEZIONE</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: "#FFF" }}>16:00</span>
            <div style={{ width: 1, height: 36, backgroundColor: "#94A3B820" }} />
            <div>
              <p style={{ fontWeight: 700, color: "#FFF", marginBottom: 2 }}>Giovanni Rossi</p>
              <p style={{ fontSize: 13, color: "#94A3B8" }}>Campo 2 • Padel</p>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 44 }}>🎾</span>
      </div>

      {/* Griglia 3 sezioni */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "0 20px 16px" }}>
        <a href="/calendario" style={{ textDecoration: "none" }}>
          <div style={{ borderRadius: 20, padding: 16, backgroundColor: "#141829", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "#3B82F620", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 22 }}>📅</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>Calendario</span>
          </div>
        </a>
        <a href="/diario" style={{ textDecoration: "none" }}>
          <div style={{ borderRadius: 20, padding: 16, backgroundColor: "#141829", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "#84CC1620", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 22 }}>📓</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>Diario</span>
          </div>
        </a>
        <a href="/arena" style={{ textDecoration: "none" }}>
          <div style={{ borderRadius: 20, padding: 16, backgroundColor: "#141829", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "#F9731620", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 22 }}>🏟️</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>Arena</span>
          </div>
        </a>
      </div>

      {/* Panoramica di oggi */}
      <div style={{ margin: "0 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94A3B8" }}>PANORAMICA DI OGGI</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#84CC16" }}>Vedi tutto</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Lezioni", value: "12", delta: "+20%" },
            { label: "Ore totali", value: "7h30", delta: "+15%" },
            { label: "Allievi", value: "24", delta: "+10%" },
          ].map((s) => (
            <div key={s.label} style={{ borderRadius: 16, padding: 14, backgroundColor: "#141829" }}>
              <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#84CC16" }}>{s.delta} vs ieri</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banner FITP */}
      <div style={{ margin: "0 20px 16px", borderRadius: 20, padding: 20, backgroundColor: "#141829", border: "1px solid #84CC1630", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#84CC16", marginBottom: 8 }}>FITP</p>
          <p style={{ fontSize: 17, fontWeight: 900, color: "#FFF", lineHeight: 1.3, marginBottom: 4 }}>Le risorse per<br />i Maestri FITP</p>
          <p style={{ fontSize: 12, color: "#94A3B8" }}>Scopri contenuti, strumenti e news</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 44 }}>🎾</span>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#84CC16", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#0A0E1A", fontWeight: 700 }}>›</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px 28px", backgroundColor: "#0A0E1Aee" }}>
        <div style={{ borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "12px 0", backgroundColor: "#141829" }}>
          <a href="/calendario" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Calendario</span>
          </a>
          <a href="/diario" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 20 }}>📓</span>
            <span style={{ fontSize: 11, color: "#84CC16" }}>Diario</span>
          </a>
          <a href="/arena" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 20 }}>🏟️</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>Arena</span>
          </a>
        </div>
      </div>

    </div>
  );
}