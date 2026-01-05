import { useState, useEffect } from "react";

/* ===============================
   Blocos de UI
=============================== */

function SummaryBlock({ data }) {
  const overall = data.scenarios.overall;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>📊 Resumo Geral</h3>
      <p>Média: {overall.average.toFixed(2)}</p>
      <p>Mediana: {overall.median}</p>
      <p>
        Over {data.line}: {overall.over.percentage.toFixed(1)}%
      </p>
    </div>
  );
}

function HomeAwayBlock({ data }) {
  const { home, away } = data.scenarios.home_away;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>🏠 Casa vs ✈️ Fora</h3>
      <p>
        Casa — Média: {home.average.toFixed(2)} | Over:{" "}
        {home.over_pct.toFixed(1)}%
      </p>
      <p>
        Fora — Média: {away.average.toFixed(2)} | Over:{" "}
        {away.over_pct.toFixed(1)}%
      </p>
    </div>
  );
}

function RecencyBlock({ data }) {
  const { last_5, last_10 } = data.scenarios.recency;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>⏳ Recência</h3>
      <p>
        Últimos 5 — Média: {last_5.average.toFixed(2)} | Over:{" "}
        {last_5.over_pct.toFixed(1)}%
      </p>
      <p>
        Últimos 10 — Média: {last_10.average.toFixed(2)} | Over:{" "}
        {last_10.over_pct.toFixed(1)}%
      </p>
    </div>
  );
}

function FgaBlock({ data }) {
  const fga = data.scenarios.offensive_volume;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
      <h3>🔥 Volume Ofensivo (FGA)</h3>
      <p>
        FGA alto — Média: {fga.high_fga.average.toFixed(2)} | Over:{" "}
        {fga.high_fga.over_pct.toFixed(1)}%
      </p>
      <p>
        FGA baixo — Média: {fga.low_fga.average.toFixed(2)} | Over:{" "}
        {fga.low_fga.over_pct.toFixed(1)}%
      </p>
      <p style={{ fontSize: 12 }}>
        FGA médio: {fga.fga_average.toFixed(1)}
      </p>
    </div>
  );
}

/* ===============================
   App
=============================== */

function App() {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // carregar lista de jogadores ao abrir a página
  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    try {
      const response = await fetch("http://127.0.0.1:8000/players");
      const json = await response.json();
      setPlayers(json.players);
    } catch {
      setPlayers([]);
    }
  }

  async function fetchPlayer() {
    if (!playerId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/players/${playerId}`
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Erro ao buscar dados");
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>NBA Player Props Analytics</h1>

      <div style={{ marginBottom: 16 }}>
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        >
          <option value="">Selecione um jogador</option>
          {players.map((id) => (
            <option key={id} value={id}>
              Jogador {id}
            </option>
          ))}
        </select>

        <button onClick={fetchPlayer} style={{ marginLeft: 8 }}>
          Analisar
        </button>
      </div>

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
  );
}

export default App;
