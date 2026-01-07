import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlayerHeader from "@/components/player/PlayerHeader";
import COLORS from "@/styles/colors";

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
   Player Page
=============================== */

export default function Player() {
  const { playerId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/players/${playerId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar jogador");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError("Não foi possível carregar os dados do jogador"))
      .finally(() => setLoading(false));
  }, [playerId]);

  /* ===============================
     Estados
  =============================== */

  if (loading) {
    return <p>Carregando jogador...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!data) {
    return <p>Nenhum dado encontrado</p>;
  }

  const { player_name, team_id, line, scenarios } = data;

  /* ===============================
     Render
  =============================== */

  return (
    <div>
      {/* Header do jogador */}
      <PlayerHeader
        playerId={playerId}
        playerName={player_name}
        teamId={team_id}
      />

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {/* Resumo Geral */}
        {scenarios?.overall && (
          <Card title="Resumo Geral">
            <p>Média: {num(scenarios.overall.average)}</p>
            <p>Mediana: {scenarios.overall.median ?? "-"}</p>
            <p>
              Over {line}:{" "}
              {pct(scenarios.overall?.over?.percentage)}
            </p>
          </Card>
        )}

        {/* Casa vs Fora */}
        {scenarios?.home_away && (
          <Card title="Casa vs Fora">
            <p>
              Casa — Média:{" "}
              {num(scenarios.home_away.home?.average)} | Over:{" "}
              {pct(scenarios.home_away.home?.over_pct)}
            </p>
            <p>
              Fora — Média:{" "}
              {num(scenarios.home_away.away?.average)} | Over:{" "}
              {pct(scenarios.home_away.away?.over_pct)}
            </p>
          </Card>
        )}

        {/* Recência */}
        {scenarios?.recency && (
          <Card title="Recência">
            <p>
              Últimos 5 — Média:{" "}
              {num(scenarios.recency.last_5?.average)} | Over:{" "}
              {pct(scenarios.recency.last_5?.over_pct)}
            </p>
            <p>
              Últimos 10 — Média:{" "}
              {num(scenarios.recency.last_10?.average)} | Over:{" "}
              {pct(scenarios.recency.last_10?.over_pct)}
            </p>
          </Card>
        )}

        {/* Volume Ofensivo */}
        {scenarios?.offensive_volume && (
          <Card title="Volume Ofensivo (FGA)">
            <p>
              FGA alto — Média:{" "}
              {num(scenarios.offensive_volume.high_fga?.average)} | Over:{" "}
              {pct(scenarios.offensive_volume.high_fga?.over_pct)}
            </p>
            <p>
              FGA baixo — Média:{" "}
              {num(scenarios.offensive_volume.low_fga?.average)} | Over:{" "}
              {pct(scenarios.offensive_volume.low_fga?.over_pct)}
            </p>
            <p style={{ fontSize: 12, color: COLORS.muted }}>
              FGA médio:{" "}
              {num(scenarios.offensive_volume.fga_average, 1)}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ===============================
   Card Component
=============================== */

function Card({ title, children }) {
  return (
    <div
      style={{
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: 16,
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );
}
