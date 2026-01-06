import { useState, useEffect } from "react";

const COLORS = {
  primary: "#2563EB",
  text: "#1F2937",
  muted: "#6B7280",
  positive: "#16A34A",
  border: "#E5E7EB",
  bg: "#FFFFFF",
};

/* ===============================
   Helpers defensivos
=============================== */

function num(value, decimals = 2) {
  if (typeof value !== "number" || isNaN(value)) return "-";
  return value.toFixed(decimals);
}

function pct(value) {
  if (typeof value !== "number" || isNaN(value)) return "-";
  return `${value.toFixed(1)}%`;
}

/* ===============================
   Blocos de UI
=============================== */

function SummaryBlock({ data }) {
  const overall = data?.scenarios?.overall;
  if (!overall) return null;

  return (
    <div style={{ border: `1px solid ${COLORS.border}`, padding: 16 }}>
      <h3>📊 Resumo Geral</h3>
      <p style={{ fontSize: 12, color: COLORS.muted }}>
        Visão geral do desempenho do jogador
      </p>
      <p>Média: {num(overall.average)}</p>
      <p>Mediana: {overall.median ?? "-"}</p>
      <p>Over {data.line}: {pct(overall?.over?.percentage)}</p>
    </div>
  );
}

function HomeAwayBlock({ data }) {
  const home = data?.scenarios?.home_away?.home;
  const away = data?.scenarios?.home_away?.away;
  if (!home || !away) return null;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>🏠 Casa vs ✈️ Fora</h3>
      <p>Casa — Média: {num(home.average)} | Over: {pct(home.over_pct)}</p>
      <p>Fora — Média: {num(away.average)} | Over: {pct(away.over_pct)}</p>
    </div>
  );
}

function RecencyBlock({ data }) {
  const last5 = data?.scenarios?.recency?.last_5;
  const last10 = data?.scenarios?.recency?.last_10;
  if (!last5 || !last10) return null;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>⏳ Recência</h3>
      <p>Últimos 5 — Média: {num(last5.average)} | Over: {pct(last5.over_pct)}</p>
      <p>Últimos 10 — Média: {num(last10.average)} | Over: {pct(last10.over_pct)}</p>
    </div>
  );
}

function FgaBlock({ data }) {
  const fga = data?.scenarios?.offensive_volume;
  if (!fga) return null;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>🔥 Volume Ofensivo (FGA)</h3>
      <p>
        FGA alto — Média: {num(fga.high_fga?.average)} | Over:{" "}
        {pct(fga.high_fga?.over_pct)}
      </p>
      <p>
        FGA baixo — Média: {num(fga.low_fga?.average)} | Over:{" "}
        {pct(fga.low_fga?.over_pct)}
      </p>
      <p style={{ fontSize: 12 }}>
        FGA médio: {num(fga.fga_average, 1)}
      </p>
    </div>
  );
}

/* ===============================
   Home / Header / Footer
=============================== */

function Home({ onStart }) {
  return (
    <div
      style={{
        padding: 48,
        fontFamily: "Arial",
        maxWidth: 900,
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 8 }}>
        LineContext
      </h1>

      <p style={{ fontSize: 20, color: "#333", marginBottom: 8 }}>
        Contexto estatístico para decisões mais conscientes sobre linhas esportivas
      </p>

      <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
        Atualmente focado em NBA
      </p>

      <button
        onClick={onStart}
        style={{
          padding: "12px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Começar análise
      </button>

      <div style={{ marginTop: 32, color: "#444" }}>
        <ul>
          <li>Contexto acima do achismo</li>
          <li>Cenários reais: recência, mando e volume</li>
          <li>Sem promessas — apenas dados</li>
        </ul>
      </div>
    </div>
  );
}
function Logo({ onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <strong style={{ color: COLORS.primary }}>Line</strong>
      <strong>Context</strong>
    </div>
  );
}

function Header({ onHome }) {
  return (
    <div
      style={{
        padding: "16px 24px",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h2
        style={{
          margin: 0,
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={onHome}
      >
        LineContext
      </h2>

      <span style={{ fontSize: 12, color: "#666" }}>
        NBA
      </span>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ marginTop: 48, padding: 24, fontSize: 12 }}>
      © {new Date().getFullYear()} LineContext
    </div>
  );
}

/* ===============================
   App
=============================== */

export default function App() {
  const [view, setView] = useState("home");
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/players")
      .then((r) => r.json())
      .then((j) => setPlayers(j.players || []));
  }, []);

  async function fetchPlayer() {
    if (!playerId) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/players/${playerId}`);
      const json = await res.json();
      setData(json);
    } catch {
      setError("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  }

  if (view === "home") return <Home onStart={() => setView("app")} />;

  return (
    <div>
      <Header onHome={() => setView("home")} />

      <div style={{ padding: 24 }}>
        <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
          <option value="">Selecione um jogador</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button onClick={fetchPlayer} style={{ marginLeft: 8 }}>
          Analisar
        </button>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <>
            <SummaryBlock data={data} />
            <HomeAwayBlock data={data} />
            <RecencyBlock data={data} />
            <FgaBlock data={data} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
