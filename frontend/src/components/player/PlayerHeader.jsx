import COLORS from "../../styles/colors";
import { getPlayerPhoto, getTeamLogo } from "../../utils/nba";

export default function PlayerHeader({
   playerId,
   playerName,
   teamId, 
   teamName
  }) {
    if (!playerId || !playerName) return null;

    return (
      <div style={container}>
        <img
          src={getPlayerPhoto(playerId)}
          alt={playerName}
          style={avatar}
          onError={(e) => {
            e.target.src = "/avatar-placeholder.png";
          }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={name}>{playerName}</h2>
          <p style={subtitle}>{teamName ? teamName : "NBA"}</p>
        </div>

        {teamId && (
          <img
            src={getTeamLogo(teamId)}
            alt="Team logo"
            style={teamLogo}
          />
        )}
      </div>
    );
}

/* ===============================
   Styles
=============================== */

const container = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "16px 0",
  marginBottom: 16,
  borderBottom: `1px solid ${COLORS.border}`,
};

const avatar = {
  width: 96,
  height: 96,
  borderRadius: 12,
  objectFit: "cover",
  border: `1px solid ${COLORS.border}`,
  backgroundColor: "#f3f4f6",
};

const name = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  color: COLORS.text,
};

const subtitle = {
  margin: "4px 0 0",
  fontSize: 13,
  color: COLORS.muted,
};

const teamLogo = {
  width: 96,
  height: 96,
  objectFit: "contain",
  backgroundColor: "#f9fafb",
  borderRadius: 6,
};



