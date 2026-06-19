"use client";
import { useEffect, useState } from "react";

const video = [
  { id: 1, titolo: "Dritto perfetto", durata: "12:30", categoria: "Tecnica", thumb: "/download.jpg" },
  { id: 2, titolo: "Smorzata + lob", durata: "8:45", categoria: "Tattica", thumb: "/F4LUCJ4JARLCDESPQBZMW3LBTY.jpg" },
  { id: 3, titolo: "Allenamento completo", durata: "45:00", categoria: "Allenamento", thumb: "/e-padel-mania-ci-si-diverte-subito-e-si-socializza.webp" },
  { id: 4, titolo: "Rovescio slice", durata: "10:15", categoria: "Tecnica", thumb: "/download.jpg" },
  { id: 5, titolo: "Posizione in campo", durata: "6:20", categoria: "Tattica", thumb: "/F4LUCJ4JARLCDESPQBZMW3LBTY.jpg" },
];

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
      <div style={{ margin: "0 20px 20px", borderRadius: 20, padding: 20, backgroundColor: "#141829", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "0 20px 24px" }}>
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

      {/* Rail video lezioni */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#94A3B8" }}>VIDEO LEZIONI</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#84CC16" }}>Vedi tutto</p>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingLeft: 20, paddingRight: 20, paddingBottom: 8, scrollbarWidth: "none" }}>
          {video.map((v) => (
            <div key={v.id} style={{ flexShrink: 0, width: 160, borderRadius: 16, overflow: "hidden", backgroundColor: "#141829", cursor: "pointer", position: "relative" }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", height: 100 }}>
                <img src={v.thumb} alt={v.titolo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
                {/* Play button */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, marginLeft: 2 }}>▶</span>
                </div>
                {/* Durata */}
                <div style={{ position: "absolute", bottom: 6, right: 6, backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 6, padding: "2px 6px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#FFF" }}>{v.durata}</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#FFF", marginBottom: 4, lineHeight: 1.3 }}>{v.titolo}</p>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#84CC16", backgroundColor: "#84CC1615", padding: "2px 8px", borderRadius: 6 }}>{v.categoria}</span>
              </div>
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