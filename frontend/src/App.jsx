import { useState, useEffect } from "react";
import appRoutes from "./routes";

import Login from "./pages/Login";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import SummaryBlock from "./components/blocks/SummaryBlock";
import HomeAwayBlock from "./components/blocks/HomeAwayBlock";
import RecencyBlock from "./components/blocks/RecencyBlock";
import FgaBlock from "./components/blocks/FgaBlock";

import COLORS from "./styles/colors";

import PlayerHeader from "./components/player/PlayerHeader";

/* ===============================
   App
=============================== */

export default function App() {
  // -----------------------------
  // Controle de tela
  // -----------------------------
  const [view, setView] = useState("login");

  // -----------------------------
  // Dados
  // -----------------------------
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [data, setData] = useState(null);

  // -----------------------------
  // Estados de UI
  // -----------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------------
  // Carregar jogadores
  // -----------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/players")
      .then((res) => res.json())
      .then((json) => setPlayers(json.players || []))
      .catch(() => setPlayers([]));
  }, []);

  // -----------------------------
  // Buscar análise do jogador
  // -----------------------------
  async function fetchPlayer() {
    if (!playerId) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/players/${playerId}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar jogador");
      }

      const json = await res.json();
      setData(json);
    } catch {
      setError("Erro ao buscar dados do jogador");
    } finally {
      setLoading(false);
    }
  }

  // ==================================================
  // LOGIN (tela inicial)
  // ==================================================
  if (view === "login") {
    return <Login onSuccess={() => setView("app")} />;
  }

  // ==================================================
  // DASHBOARD
  // ==================================================
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.background,
        color: COLORS.text,
        fontFamily: "Arial",
      }}
    >
      <Header onLogout={() => setView("login")} />

      <main style={{ padding: 24, flex: 1 }}>
        {/* Seleção de jogador */}
        <div style={{ marginBottom: 24 }}>
          <select
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: `1px solid ${COLORS.border}`,
              minWidth: 260,
            }}
          >
            <option value="">Selecione um jogador</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchPlayer}
            style={{
              marginLeft: 8,
              padding: "8px 14px",
              borderRadius: 6,
              border: "none",
              backgroundColor: COLORS.primary,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Analisar
          </button>
        </div>

        {/* Estados */}
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Blocos */}
      
        {data && (
          <>
            <PlayerHeader
              playerId={data.player_id}
              playerName={data.player_name}
              teamId={data.team_id}
              teamName={data.team_name}
            />

            <SummaryBlock data={data} />
            <HomeAwayBlock data={data} />
            <RecencyBlock data={data} />
            <FgaBlock data={data} />
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
