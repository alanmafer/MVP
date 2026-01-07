import { useEffect, useState } from "react";
import TeamCard from "../components/teams/TeamCard";
import { NBA_TEAMS } from "../utils/nba";

export default function Teams() {
  const east = NBA_TEAMS.filter(
    (team) => team.conference === "East"
  );

  const west = NBA_TEAMS.filter(
    (team) => team.conference === "West"
  );

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Times da NBA</h1>

      {/* EAST */}
      <Section title="Conferência Leste">
        <div style={grid}>
          {east.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </Section>

      {/* WEST */}
      <Section title="Conferência Oeste">
        <div style={grid}>
          {west.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ===============================
   Section
=============================== */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

/* ===============================
   Styles
=============================== */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: 20,
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
};