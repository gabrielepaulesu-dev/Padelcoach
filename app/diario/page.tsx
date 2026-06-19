"use client";
import { useState } from "react";

const LIVELLI = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
const ICONE = ["🎾", "⚡", "🏆", "🔥", "💪", "🌟", "🦁", "🐯", "🦅", "🎯"];

const BG = "#0A0E1A";
const CARD = "#141829";
const ACCENT = "#84CC16";
const MUTED = "#94A3B8";

type Membro = { nome: string; livello: string; eta: string };
type Gruppo = { id: number; nome: string; icona: string; membri: Membro[] };
type Lezione = { id: number; gruppoId: number; titolo: string; data: string; club: string; note: string };

export default function Diario() {
  const [club, setClub] = useState(["Club Milano Nord", "Club Lambrate", "Club Navigli"]);
  const [gruppi, setGruppi] = useState<Gruppo[]>([
    { id: 1, nome: "Gruppo 1", icona: "🎾", membri: [{ nome: "Marco", livello: "Silver", eta: "32" }] },
    { id: 2, nome: "Gruppo 2", icona: "🏆", membri: [{ nome: "Laura", livello: "Gold", eta: "28" }] },
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
  const [nomeGruppo, setNomeGruppo] = useState("");
  const [iconaGruppo, setIconaGruppo] = useState(ICONE[0]);
  const [membri, setMembri] = useState<Membro[]>([{ nome: "", livello: "Silver", eta: "" }]);
  const [showFormLezione, setShowFormLezione] = useState(false);
  const [formLezione, setFormLezione] = useState({ titolo: "", data: new Date().toISOString().split("T")[0], club: "", nuovoClub: "", note: "" });

  const gruppoCorrente = typeof vista === "number" ? gruppi.find((g) => g.id === vista) : null;
  const lezioniGruppo = typeof vista === "number" ? lezioni.filter((l) => l.gruppoId === vista) : [];

  const inputStyle = { width: "100%", backgroundColor: "#0A0E1A", border: "1px solid #94A3B830", borderRadius: 12, padding: "12px 16px", color: "#FFFFFF", fontSize: 15, outline: "none" };
  const selectStyle = { ...inputStyle };

  const apriModificaGruppo = (g: Gruppo) => {
    setGruppoEditId(g.id);
    setNomeGruppo(g.nome);
    setIconaGruppo(g.icona);
    setMembri(g.membri.length > 0 ? g.membri : [{ nome: "", livello: "Silver", eta: "" }]);
    setVista("modifica-gruppo");
  };

  const handleSalvaGruppo = () => {
    if (!nomeGruppo.trim()) return;
    const membriValidi = membri.filter((m) => m.nome.trim());
    if (vista === "modifica-gruppo" && gruppoEditId) {
      setGruppi(gruppi.map((g) => g.id === gruppoEditId ? { ...g, nome: nomeGruppo.trim(), icona: iconaGruppo, membri: membriValidi } : g));
    } else {
      setGruppi([...gruppi, { id: Date.now(), nome: nomeGruppo.trim(), icona: iconaGruppo, membri: membriValidi }]);
    }
    setVista(null);
    setNomeGruppo(""); setIconaGruppo(ICONE[0]); setMembri([{ nome: "", livello: "Silver", eta: "" }]); setGruppoEditId(null);
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
    setEditNuovoClub("");
  };

  const Header = ({ onBack, title, onEdit }: { onBack: () => void; title: string; onEdit?: () => void }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: CARD, border: "none", color: MUTED, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#FFF" }}>{title}</span>
      </div>
      {onEdit && <button onClick={onEdit} style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: CARD, border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✏️</button>}
    </div>
  );

  const BtnPrimary = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <button onClick={onClick} style={{ width: "100%", backgroundColor: ACCENT, color: "#0A0E1A", fontWeight: 800, fontSize: 16, padding: "16px", borderRadius: 16, border: "none", cursor: "pointer" }}>{label}</button>
  );

  const BtnSecondary = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <button onClick={onClick} style={{ flex: 1, backgroundColor: CARD, color: "#FFF", fontWeight: 700, fontSize: 15, padding: "14px", borderRadius: 14, border: "1px solid #94A3B830", cursor: "pointer" }}>{label}</button>
  );

  const Label = ({ text }: { text: string }) => (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: MUTED, marginBottom: 8, textTransform: "uppercase" }}>{text}</p>
  );

  const livelloColore: Record<string, string> = { Bronze: "#CD7F32", Silver: "#94A3B8", Gold: "#F59E0B", Platinum: "#60A5FA", Diamond: "#A78BFA" };

  // ── VISTA: dettaglio lezione ──
  if (lezioneAperta) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
        <Header onBack={() => { setLezioneAperta(null); setEditing(false); }} title={editing ? "Modifica Lezione" : lezioneAperta.titolo} onEdit={!editing ? () => { setEditing(true); setEditForm(lezioneAperta); } : undefined} />
        <div style={{ padding: "0 20px 40px" }}>
          {!editing ? (
            <>
              <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", marginBottom: 16 }}>{gruppoCorrente?.nome?.toUpperCase()}</p>
              <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #94A3B820" }}>
                  <span style={{ color: MUTED, fontSize: 14 }}>📅 Data</span>
                  <span style={{ fontWeight: 600 }}>{lezioneAperta.data.split("-").reverse().join("/")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: MUTED, fontSize: 14 }}>🏟 Club</span>
                  <span style={{ fontWeight: 600 }}>{lezioneAperta.club}</span>
                </div>
              </div>
              <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 10 }}>NOTE</p>
                <p style={{ color: lezioneAperta.note ? "#FFF" : MUTED, fontStyle: lezioneAperta.note ? "normal" : "italic" }}>{lezioneAperta.note || "Nessuna nota"}</p>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><Label text="Titolo" /><input style={inputStyle} value={editForm!.titolo} onChange={(e) => setEditForm({ ...editForm!, titolo: e.target.value })} /></div>
              <div><Label text="Data" /><input type="date" style={inputStyle} value={editForm!.data} onChange={(e) => setEditForm({ ...editForm!, data: e.target.value })} /></div>
              <div>
                <Label text="Club" />
                <select style={selectStyle} value={editForm!.club} onChange={(e) => setEditForm({ ...editForm!, club: e.target.value })}>
                  {club.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="__nuovo__">+ Aggiungi nuovo club</option>
                </select>
                {editForm!.club === "__nuovo__" && <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Nome club..." value={editNuovoClub} onChange={(e) => setEditNuovoClub(e.target.value)} />}
              </div>
              <div><Label text="Note" /><textarea style={{ ...inputStyle, resize: "none" } as React.CSSProperties} rows={3} value={editForm!.note} onChange={(e) => setEditForm({ ...editForm!, note: e.target.value })} /></div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <BtnSecondary onClick={() => setEditing(false)} label="Annulla" />
                <button onClick={handleSalvaEdit} style={{ flex: 1, backgroundColor: ACCENT, color: "#0A0E1A", fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>Salva ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── VISTA: lezioni dentro un gruppo ──
  if (typeof vista === "number" && gruppoCorrente) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
        <Header onBack={() => { setVista(null); setShowFormLezione(false); }} title={gruppoCorrente.nome} onEdit={() => apriModificaGruppo(gruppoCorrente)} />
        <div style={{ padding: "0 20px 40px" }}>
          {/* Membri pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {gruppoCorrente.membri.map((m, i) => (
              <div key={i} style={{ backgroundColor: CARD, borderRadius: 100, padding: "6px 12px", display: "flex", alignItems: "center", gap: 8, border: "1px solid #94A3B820" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{m.nome}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: livelloColore[m.livello] || MUTED }}>{m.livello}</span>
                {m.eta && <span style={{ fontSize: 11, color: MUTED }}>{m.eta}a</span>}
              </div>
            ))}
          </div>

          {/* Lezioni */}
          <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 12 }}>LEZIONI</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {lezioniGruppo.length === 0 && (
              <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 30, textAlign: "center" }}>
                <p style={{ color: MUTED, fontSize: 14 }}>Nessuna lezione ancora — aggiungine una!</p>
              </div>
            )}
            {lezioniGruppo.map((l) => (
              <div key={l.id} style={{ backgroundColor: CARD, borderRadius: 20, padding: 20 }}>
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
            <BtnPrimary onClick={() => setShowFormLezione(true)} label="+ Nuova Lezione" />
          ) : (
            <div style={{ backgroundColor: CARD, borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>📝 Nuova Lezione</p>
              <div><Label text="Titolo" /><input style={inputStyle} placeholder="es. Lavoro al muro..." value={formLezione.titolo} onChange={(e) => setFormLezione({ ...formLezione, titolo: e.target.value })} /></div>
              <div><Label text="Data" /><input type="date" style={inputStyle} value={formLezione.data} onChange={(e) => setFormLezione({ ...formLezione, data: e.target.value })} /></div>
              <div>
                <Label text="Club" />
                <select style={selectStyle} value={formLezione.club} onChange={(e) => setFormLezione({ ...formLezione, club: e.target.value })}>
                  <option value="">— Seleziona club —</option>
                  {club.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="__nuovo__">+ Aggiungi nuovo club</option>
                </select>
                {formLezione.club === "__nuovo__" && <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Nome club..." value={formLezione.nuovoClub} onChange={(e) => setFormLezione({ ...formLezione, nuovoClub: e.target.value })} />}
              </div>
              <div><Label text="Note veloci" /><textarea style={{ ...inputStyle, resize: "none" } as React.CSSProperties} rows={3} placeholder="es. Oggi poco vento, campo 3..." value={formLezione.note} onChange={(e) => setFormLezione({ ...formLezione, note: e.target.value })} /></div>
              <div style={{ display: "flex", gap: 12 }}>
                <BtnSecondary onClick={() => setShowFormLezione(false)} label="Annulla" />
                <button onClick={handleSalvaLezione} style={{ flex: 1, backgroundColor: ACCENT, color: "#0A0E1A", fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>Salva ✓</button>
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
        <Header onBack={() => setVista(null)} title={isModifica ? "Modifica Gruppo" : "Nuovo Gruppo"} />
        <div style={{ padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Icona */}
          <div>
            <Label text="Icona gruppo" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {ICONE.map((ic) => (
                <button key={ic} onClick={() => setIconaGruppo(ic)} style={{ width: 52, height: 52, borderRadius: 14, border: iconaGruppo === ic ? `2px solid ${ACCENT}` : "1px solid #94A3B830", backgroundColor: iconaGruppo === ic ? "#84CC1620" : CARD, fontSize: 24, cursor: "pointer" }}>{ic}</button>
              ))}
            </div>
          </div>
          <div><Label text="Nome gruppo" /><input style={inputStyle} placeholder="es. Gruppo Avanzati, Mattina..." value={nomeGruppo} onChange={(e) => setNomeGruppo(e.target.value)} /></div>
          <div>
            <Label text="Membri" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {membri.map((m, i) => (
                <div key={i} style={{ backgroundColor: CARD, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <input style={inputStyle} placeholder="Nome allievo" value={m.nome} onChange={(e) => { const n = [...membri]; n[i].nome = e.target.value; setMembri(n); }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <select style={{ ...selectStyle, flex: 1 }} value={m.livello} onChange={(e) => { const n = [...membri]; n[i].livello = e.target.value; setMembri(n); }}>
                      {LIVELLI.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
                    </select>
                    <input style={{ ...inputStyle, width: 70 }} placeholder="Età" value={m.eta} onChange={(e) => { const n = [...membri]; n[i].eta = e.target.value; setMembri(n); }} />
                    {membri.length > 1 && (
                      <button onClick={() => setMembri(membri.filter((_, j) => j !== i))} style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#FF444420", border: "none", color: "#FF4444", fontSize: 18, cursor: "pointer" }}>✕</button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => setMembri([...membri, { nome: "", livello: "Silver", eta: "" }])} style={{ background: "none", border: `1px dashed ${ACCENT}40`, borderRadius: 14, padding: "12px", color: ACCENT, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>+ Aggiungi membro</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <BtnSecondary onClick={() => setVista(null)} label="Annulla" />
            <button onClick={handleSalvaGruppo} style={{ flex: 1, backgroundColor: ACCENT, color: "#0A0E1A", fontWeight: 800, fontSize: 15, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>{isModifica ? "Salva ✓" : "Crea Gruppo ✓"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── VISTA: lista gruppi ──
  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: "#FFF" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, fontSize: 18, textDecoration: "none" }}>←</a>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#FFF" }}>📓 Diario</span>
        </div>
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", marginBottom: 16 }}>I TUOI GRUPPI</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {gruppi.map((g) => (
            <div key={g.id} style={{ backgroundColor: CARD, borderRadius: 20, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div onClick={() => setVista(g.id)} style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: "#84CC1615", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{g.icona}</div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 17, marginBottom: 3 }}>{g.nome}</p>
                  <p style={{ fontSize: 13, color: MUTED }}>{g.membri.length} {g.membri.length === 1 ? "allievo" : "allievi"} · {lezioni.filter((l) => l.gruppoId === g.id).length} lezioni</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => apriModificaGruppo(g)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, opacity: 0.6 }}>✏️</button>
                <span onClick={() => setVista(g.id)} style={{ color: ACCENT, fontSize: 22, cursor: "pointer", fontWeight: 700 }}>›</span>
              </div>
            </div>
          ))}
        </div>
        <BtnPrimary onClick={() => { setVista("nuovo-gruppo"); setNomeGruppo(""); setIconaGruppo(ICONE[0]); setMembri([{ nome: "", livello: "Silver", eta: "" }]); }} label="+ Crea Nuovo Gruppo" />
      </div>
    </div>
  );
}