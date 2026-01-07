import { useState } from "react";
import { useNavigate } from "react-router-dom";
import COLORS from "../../styles/colors";
import { getTeamLogo } from "../../utils/nba";

export default function TeamCard({ team }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => navigate(`/teams/${team.id}`)}
      style={card}
    >
      <img
        src={getTeamLogo(team.id)}
        alt={team.name}
        style={logo}
      />

      <span style={name}>{team.name}</span>
    </div>
  );
}

/* ===============================
   Styles
=============================== */

const card = {
  cursor: "pointer",
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: 16,
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  transition: "all 0.2s ease",
};

const cardHover = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const logo = {
  width: 64,
  height: 64,
  objectFit: "contain",
};

const name = {
  fontSize: 14,
  fontWeight: 500,
  textAlign: "center",
  color: COLORS.text,
};
