"use client";
import { useState } from "react";

const BG = "#050B1D";
const ACCENT = "#84CC16";
const MUTED = "#94A3B8";

const LIVELLI = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

type Membro = { nome: string; livello: string; eta: string };
type Gruppo = { id: number; nome: string; cover: string; sport: string; descrizione: string; membri: Membro[] };
type Lezione = { id: number; gruppoId: number; titolo: string; data: string; club: string; note: string };

export default function Diario() {
  const [club, setClub] = useState(["Club Milano Nord", "Club Lambrate", "Club Navigli"]);
  const [gruppi, setGruppi] = useState<Gruppo[]>([
    { id: 1, nome: "Gruppo 1", cover: "/download.jpg", sport: "Padel", descrizione: "", membri: [{ nome: "Marco", livello: "Silver", eta: "32" }] },
    { id: 2, nome: "Gruppo 2", cover: "/F4LUCJ4JARLCDESPQBZMW3LBTY.jpg", sport: "Padel", descrizione: "", membri: [{ nome: "Laura", livello: "Gold", eta: "28" }] },
    { id: 3, nome: "Gruppo 3", cover: "/e-padel-mania-ci-si-diverte-subito-e-si-socializza.webp", sport: "Padel", descrizione: "", membri: [] },
  ]);
  const [lezioni, setLezioni] = useState<Lezione[]>([
    { id: 1, gruppoId: 1, titolo: "Lavoro al muro", data: "2026-06-15", club: "Club Milano Nord", note: "Buona intensità" },
    { id: 2, gruppoId: 2, titolo: "Smorzate + lob", data: "2026-06-18", club: "Club Lambrate", note: "" },
  ]);

  const [vista, setVista] = useState<null | number | "nuovo-gruppo" | "modifica-gruppo">(null);
  const [gruppoEditId, setGruppoEditId] = useState<number | null>(null);
  const [lezioneAperta, setLezioneAperta] = useState<Lezione | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Lezione | null>(null);
  const [editNuovoClub, setEditNuovoClub] = useState("");
  const [showFormLezione, setShowFormLezione] = useState(false);
  const [formLezione, setFormLezione] = useState({ titolo: "", data: new Date().toISOString().split("T")[0], club: "", nuovoClub: "", note: "" });

  // Form nuovo/modifica gruppo
  const [nomeGruppo, setNomeGruppo] = useState("");
  const [coverGruppo, setCoverGruppo] = useState("");
  const [sportGruppo, setSportGruppo] = useState("Padel");
  const [descGruppo, setDescGruppo] = useState("");
  const [membri, setMembri] = useState<Membro[]>([{ nome: "", livello: "Silver", eta: "" }]);

  const gruppoCorrente = typeof vista === "number" ? gruppi.find((g) => g.id === vista) : null;
  const lezioniGruppo = typeof vista === "number" ? lezioni.filter((l) => l.gruppoId === vista) : [];

  const inputStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0E1A", border: "1px solid #94A3B830", borderRadius: 12, padding: "12px 16px", color: "#FFF", fontSize: 15, outline: "none", boxSizing: "border-box" };

  const apriModificaGruppo = (g: Gruppo) => {
    setGruppoEditId(g.id);
    setNomeGruppo(g.nome);
    setCoverGruppo(g.cover);
    setSportGruppo(g.sport);
    setDescGruppo(g.descrizione);
    setMembri(g.membri.length > 0 ? g.membri : [{ nome: "", livello: "Silver", eta: "" }]);
    setVista("modifica-gruppo");
  };

  const handleSalvaGruppo = () => {
    if (!nomeGruppo.trim()) return;
    const membriValidi = membri.filter((m) => m.nome.trim());
    if (vista === "modifica-gruppo" && gruppoEditId) {
      setGruppi(gruppi.map((g) => g.id === gruppoEditId ? { ...g, nome: nomeGruppo.trim(), cover: coverGruppo, sport: sportGruppo, descrizione: descGruppo, membri: membriValidi } : g));
    } else {
      setGruppi([...gruppi, { id: Date.now(), nome: nomeGruppo.trim(), cover: coverGruppo, sport: sportGruppo, descrizione: descGruppo, membri: membriValidi }]);
    }
    setVista(null);
    setNomeGruppo(""); setCoverGruppo(""); setSportGruppo("Padel"); setDescGruppo(""); setMembri([{ nome: "", livello: "Silver", eta: "" }]); setGruppoEditId(null);
  };

  const handleSalvaLezione = () => {
    if (!formLezione.titolo || typeof vista !== "number") return;
    const clubScelto = formLezione.club === "__nuovo__" ? formLezione.nuovoClub.trim() : formLezione.club;
    if (!clubScelto) return;
    if (formLezione.club === "__nuovo__" && !club.includes(clubScelto)) setClub([...club, clubScelto]);
    setLezioni([...lezioni, { id: Date.now(), gruppoId: vista, titolo: formLezione.titolo, data: formLezione.data, club: clubScelto, note: formLezione.note }]);
    setShowFormLezione(false);
    setFormLezione({ titolo: "", data: new Date().toISOString().split("T")[0], club: "", nuovoClub: "", note: "" });
  };

  const handleSalvaEdit = () => {
    if (!editForm) return;
    const clubScelto = editForm.club === "__nuovo__" ? editNuovoClub.trim() : editForm.club;
    if (!clubScelto) return;
    if (editForm.club === "__nuovo__" && !club.includes(clubScelto)) setClub([...club, clubScelto]);
    const updated = { ...editForm, club: clubScelto };
    setLezioni(lezioni.map((l) => l.id === updated.id ? updated : l));
    setLezioneAperta(updated);
    setEditing(false);
  };

  const livelloColore: Record<string, string> = { Bronze: "#CD7F32", Silver: "#94A3B8", Gold: "#F59E0B", Platinum: "#60A5FA", Diamond: "#A78BFA" };

  // ── VISTA: dettaglio lezione ──
  if (lezioneAperta) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 16px" }}>
          <button onClick={() => { setLezioneAperta(null); setEditing(false); }} style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#141829", border: "none", color: MUTED, fontSize: 18, cursor: "pointer" }}>←</button>
          {!editing && <button onClick={() => { setEditing(true); setEditForm(lezioneAperta); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✏️</button>}
        </div>
        <div style={{ padding: "0 20px 40px" }}>
          {!editing ? (
            <>
              <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", marginBottom: 8 }}>{gruppoCorrente?.nome?.toUpperCase()}</p>
              <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20 }}>{lezioneAperta.titolo}</h1>
              <div style={{ backgroundColor: "#141829", borderRadius: 20, padding: 20, marginBottom: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: MUTED }}>📅 Data</span><span style={{ fontWeight: 600 }}>{lezioneAperta.data.split("-").reverse().join("/")}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: MUTED }}>🏟 Club</span><span style={{ fontWeight: 600 }}>{lezioneAperta.club}</span></div>
              </div>
              <div style={{ backgroundColor: "#141829", borderRadius: 20, padding: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 10 }}>NOTE</p>
                <p style={{ color: lezioneAperta.note ? "#FFF" : MUTED, fontStyle: lezioneAperta.note ? "normal" : "italic" }}>{lezioneAperta.note || "Nessuna nota"}</p>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>✏️ Modifica Lezione</h2>
              <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>TITOLO</p><input style={inputStyle} value={editForm!.titolo} onChange={(e) => setEditForm({ ...editForm!, titolo: e.target.value })} /></div>
              <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>DATA</p><input type="date" style={inputStyle} value={editForm!.data} onChange={(e) => setEditForm({ ...editForm!, data: e.target.value })} /></div>
              <div>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>CLUB</p>
                <select style={inputStyle} value={editForm!.club} onChange={(e) => setEditForm({ ...editForm!, club: e.target.value })}>
                  {club.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="__nuovo__">+ Aggiungi nuovo club</option>
                </select>
                {editForm!.club === "__nuovo__" && <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Nome club..." value={editNuovoClub} onChange={(e) => setEditNuovoClub(e.target.value)} />}
              </div>
              <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>NOTE</p><textarea style={{ ...inputStyle, resize: "none" }} rows={3} value={editForm!.note} onChange={(e) => setEditForm({ ...editForm!, note: e.target.value })} /></div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button onClick={() => setEditing(false)} style={{ flex: 1, backgroundColor: "#141829", color: "#FFF", fontWeight: 700, padding: "14px", borderRadius: 14, border: "1px solid #94A3B830", cursor: "pointer" }}>Annulla</button>
                <button onClick={handleSalvaEdit} style={{ flex: 1, backgroundColor: ACCENT, color: "#050B1D", fontWeight: 800, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>Salva ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── VISTA: lezioni dentro gruppo ──
  if (typeof vista === "number" && gruppoCorrente) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
        {/* Hero cover gruppo */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img src={gruppoCorrente.cover} alt={gruppoCorrente.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,11,29,0.3) 0%, rgba(5,11,29,0.95) 100%)" }} />
          <button onClick={() => { setVista(null); setShowFormLezione(false); }} style={{ position: "absolute", top: 52, left: 20, width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.5)", border: "none", color: "#FFF", fontSize: 18, cursor: "pointer" }}>←</button>
          <button onClick={() => apriModificaGruppo(gruppoCorrente)} style={{ position: "absolute", top: 52, right: 20, width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.5)", border: "none", fontSize: 18, cursor: "pointer" }}>✏️</button>
          <div style={{ position: "absolute", bottom: 16, left: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", marginBottom: 4 }}>{gruppoCorrente.sport.toUpperCase()}</p>
            <h1 style={{ fontSize: 26, fontWeight: 900 }}>{gruppoCorrente.nome}</h1>
          </div>
        </div>

        <div style={{ padding: "16px 20px 40px" }}>
          {/* Membri */}
          {gruppoCorrente.membri.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {gruppoCorrente.membri.map((m, i) => (
                <div key={i} style={{ backgroundColor: "#141829", borderRadius: 100, padding: "6px 12px", display: "flex", alignItems: "center", gap: 8, border: "1px solid #94A3B820" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{m.nome}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: livelloColore[m.livello] || MUTED }}>{m.livello}</span>
                  {m.eta && <span style={{ fontSize: 11, color: MUTED }}>{m.eta}a</span>}
                </div>
              ))}
            </div>
          )}

          {/* Lezioni */}
          <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 12 }}>LEZIONI</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {lezioniGruppo.length === 0 && (
              <div style={{ backgroundColor: "#141829", borderRadius: 20, padding: 30, textAlign: "center" }}>
                <p style={{ color: MUTED, fontSize: 14 }}>Nessuna lezione ancora</p>
              </div>
            )}
            {lezioniGruppo.map((l) => (
              <div key={l.id} style={{ backgroundColor: "#141829", borderRadius: 20, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: MUTED }}>{l.data.split("-").reverse().join("/")}</span>
                  <button onClick={() => { setLezioneAperta(l); setEditing(true); setEditForm(l); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>✏️</button>
                </div>
                <div onClick={() => setLezioneAperta(l)} style={{ cursor: "pointer" }}>
                  <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{l.titolo}</p>
                  <p style={{ fontSize: 13, color: MUTED }}>🏟 {l.club}</p>
                  {l.note && <p style={{ fontSize: 13, color: MUTED, marginTop: 8, fontStyle: "italic" }}>"{l.note}"</p>}
                </div>
              </div>
            ))}
          </div>

          {!showFormLezione ? (
            <button onClick={() => setShowFormLezione(true)} style={{ width: "100%", backgroundColor: ACCENT, color: "#050B1D", fontWeight: 800, fontSize: 16, padding: "16px", borderRadius: 16, border: "none", cursor: "pointer" }}>+ Nuova Lezione</button>
          ) : (
            <div style={{ backgroundColor: "#141829", borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontWeight: 800, fontSize: 18 }}>📝 Nuova Lezione</p>
              <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>TITOLO</p><input style={inputStyle} placeholder="es. Lavoro al muro..." value={formLezione.titolo} onChange={(e) => setFormLezione({ ...formLezione, titolo: e.target.value })} /></div>
              <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>DATA</p><input type="date" style={inputStyle} value={formLezione.data} onChange={(e) => setFormLezione({ ...formLezione, data: e.target.value })} /></div>
              <div>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>CLUB</p>
                <select style={inputStyle} value={formLezione.club} onChange={(e) => setFormLezione({ ...formLezione, club: e.target.value })}>
                  <option value="">— Seleziona club —</option>
                  {club.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="__nuovo__">+ Aggiungi nuovo club</option>
                </select>
                {formLezione.club === "__nuovo__" && <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Nome club..." value={formLezione.nuovoClub} onChange={(e) => setFormLezione({ ...formLezione, nuovoClub: e.target.value })} />}
              </div>
              <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>NOTE</p><textarea style={{ ...inputStyle, resize: "none" }} rows={3} placeholder="es. Oggi poco vento..." value={formLezione.note} onChange={(e) => setFormLezione({ ...formLezione, note: e.target.value })} /></div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setShowFormLezione(false)} style={{ flex: 1, backgroundColor: "#0A0E1A", color: "#FFF", fontWeight: 700, padding: "14px", borderRadius: 14, border: "1px solid #94A3B830", cursor: "pointer" }}>Annulla</button>
                <button onClick={handleSalvaLezione} style={{ flex: 1, backgroundColor: ACCENT, color: "#050B1D", fontWeight: 800, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>Salva ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── VISTA: form nuovo/modifica gruppo ──
  if (vista === "nuovo-gruppo" || vista === "modifica-gruppo") {
    const isModifica = vista === "modifica-gruppo";
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "52px 20px 16px" }}>
          <button onClick={() => setVista(null)} style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#141829", border: "none", color: MUTED, fontSize: 18, cursor: "pointer" }}>←</button>
          <span style={{ fontWeight: 800, fontSize: 20 }}>{isModifica ? "Modifica Gruppo" : "Nuovo Gruppo"}</span>
        </div>
        <div style={{ padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
  <p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>FOTO COPERTINA</p>
  <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", marginBottom: 8, backgroundColor: "#141829" }}>
    {coverGruppo && <img src={coverGruppo} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
    {!coverGruppo && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, fontSize: 14 }}>Nessuna foto</div>}
  </div>
  <label style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#141829", border: "1px solid #94A3B830", borderRadius: 14, padding: "14px 16px", cursor: "pointer" }}>
    <span style={{ fontSize: 20 }}>🖼️</span>
    <span style={{ color: "#FFF", fontWeight: 600, fontSize: 15 }}>Scegli foto da libreria</span>
    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setCoverGruppo(reader.result as string);
      reader.readAsDataURL(file);
    }} />
  </label>
</div>
          <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>NOME GRUPPO</p><input style={inputStyle} placeholder="es. Gruppo Avanzati..." value={nomeGruppo} onChange={(e) => setNomeGruppo(e.target.value)} /></div>
          <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>SPORT / CATEGORIA</p><input style={inputStyle} placeholder="es. Padel, Tennis..." value={sportGruppo} onChange={(e) => setSportGruppo(e.target.value)} /></div>
          <div><p style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>DESCRIZIONE</p><textarea style={{ ...inputStyle, resize: "none" }} rows={2} placeholder="Descrizione opzionale..." value={descGruppo} onChange={(e) => setDescGruppo(e.target.value)} /></div>

          {/* Membri */}
          <div>
            <p style={{ fontSize: 11, color: MUTED, marginBottom: 12 }}>MEMBRI</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {membri.map((m, i) => (
                <div key={i} style={{ backgroundColor: "#141829", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <input style={inputStyle} placeholder="Nome allievo" value={m.nome} onChange={(e) => { const n = [...membri]; n[i].nome = e.target.value; setMembri(n); }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <select style={{ ...inputStyle, flex: 1 }} value={m.livello} onChange={(e) => { const n = [...membri]; n[i].livello = e.target.value; setMembri(n); }}>
                      {LIVELLI.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
                    </select>
                    <input style={{ ...inputStyle, width: 70 }} placeholder="Età" value={m.eta} onChange={(e) => { const n = [...membri]; n[i].eta = e.target.value; setMembri(n); }} />
                    {membri.length > 1 && <button onClick={() => setMembri(membri.filter((_, j) => j !== i))} style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#FF444420", border: "none", color: "#FF4444", fontSize: 18, cursor: "pointer" }}>✕</button>}
                  </div>
                </div>
              ))}
              <button onClick={() => setMembri([...membri, { nome: "", livello: "Silver", eta: "" }])} style={{ background: "none", border: `1px dashed ${ACCENT}40`, borderRadius: 14, padding: "12px", color: ACCENT, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>+ Aggiungi membro</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button onClick={() => setVista(null)} style={{ flex: 1, backgroundColor: "#141829", color: "#FFF", fontWeight: 700, padding: "14px", borderRadius: 14, border: "1px solid #94A3B830", cursor: "pointer" }}>Annulla</button>
            <button onClick={handleSalvaGruppo} style={{ flex: 1, backgroundColor: ACCENT, color: "#050B1D", fontWeight: 800, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>{isModifica ? "Salva ✓" : "Crea Gruppo ✓"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── VISTA: lista gruppi (home diario) ──
  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#141829", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, fontSize: 18, textDecoration: "none" }}>←</a>
          <span style={{ fontWeight: 800, fontSize: 22 }}>Diario</span>
        </div>
        <button onClick={() => { setVista("nuovo-gruppo"); setNomeGruppo(""); setCoverGruppo(""); setSportGruppo("Padel"); setDescGruppo(""); setMembri([{ nome: "", livello: "Silver", eta: "" }]); }} style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: ACCENT, border: "none", color: "#050B1D", fontSize: 22, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
      </div>

      <div style={{ padding: "0 16px 40px" }}>
        {gruppi.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
            <span style={{ fontSize: 64 }}>🎾</span>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#FFF" }}>Non hai ancora creato gruppi</p>
            <p style={{ fontSize: 14, color: MUTED, textAlign: "center" }}>Crea il tuo primo gruppo per iniziare</p>
            <button onClick={() => setVista("nuovo-gruppo")} style={{ backgroundColor: ACCENT, color: "#050B1D", fontWeight: 800, fontSize: 16, padding: "14px 28px", borderRadius: 16, border: "none", cursor: "pointer", marginTop: 8 }}>Crea Gruppo</button>
          </div>
        ) : (
          <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 16 }}>I TUOI GRUPPI</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {gruppi.map((g) => (
            <div
              key={g.id}
              onClick={() => setVista(g.id)}
              style={{ position: "relative", borderRadius: 22, overflow: "hidden", cursor: "pointer", aspectRatio: "16/9", transition: "transform 120ms ease" }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Foto copertina */}
              <img src={g.cover} alt={g.nome} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

              {/* Overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.85) 100%)" }} />

              {/* Contenuto */}
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#FFF", marginBottom: 4 }}>{g.nome}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 4 }}>
                      👤 {g.membri.length} {g.membri.length === 1 ? "allievo" : "allievi"}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 4 }}>
                      📖 {lezioni.filter((l) => l.gruppoId === g.id).length} lezioni
                    </span>
                  </div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontSize: 18, fontWeight: 700, backdropFilter: "blur(4px)" }}>›</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}