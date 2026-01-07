import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import COLORS from "../styles/colors";
import { getPlayerPhoto, getTeamLogo } from "../utils/nba";

/* ===============================
   Team Players Page
=============================== */

export default function TeamPlayers() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/players")
      .then((res) => res.json())
      .then((json) => {
        const filtered = (json.players || []).filter(
          (p) => String(p.team_id) === String(teamId)
        );
        setPlayers(filtered);
      })
      .finally(() => setLoading(false));
  }, [teamId]);

  return (
    <div>
      {/* ===============================
          Header
      =============================== */}
      <div style={header}>
        <img
          src={getTeamLogo(teamId)}
          alt="Team logo"
          style={teamLogo}
        />

        <div>
          <h1 style={title}>Jogadores</h1>
          <p style={subtitle}>
            Selecione um jogador para análise detalhada
          </p>
        </div>
      </div>

      {/* ===============================
          Content
      =============================== */}
      {loading && <p>Carregando jogadores...</p>}

      {!loading && players.length === 0 && (
        <p style={{ color: COLORS.muted }}>
          Nenhum jogador processado para este time ainda.
        </p>
      )}

      <div style={grid}>
        {players.map((player) => (
          <div
            key={player.id}
            style={card}
            onClick={() => navigate(`/players/${player.id}`)}
          >
            <img
              src={getPlayerPhoto(player.id)}
              alt={player.name}
              style={avatar}
              onError={(e) => {
                e.target.src = "/avatar-placeholder.png";
              }}
            />

            <span style={playerName}>{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===============================
   Styles
=============================== */

const header = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 24,
};

const teamLogo = {
  width: 64,
  height: 64,
  objectFit: "contain",
};

const title = {
  fontSize: 26,
  fontWeight: 600,
  color: COLORS.text,
  margin: 0,
};

const subtitle = {
  fontSize: 14,
  color: COLORS.muted,
  marginTop: 4,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: 20,
};

const card = {
  backgroundColor: "#fff",
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: 16,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
  transition: "transform 0.15s ease",
};

const avatar = {
  width: 72,
  height: 72,
  borderRadius: 10,
  objectFit: "cover",
  border: `1px solid ${COLORS.border}`,
  backgroundColor: "#f3f4f6",
};

const playerName = {
  fontSize: 13,
  fontWeight: 500,
  color: COLORS.text,
  textAlign: "center",
};
