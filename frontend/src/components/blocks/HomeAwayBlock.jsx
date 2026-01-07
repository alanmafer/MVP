import { num, pct } from "../../utils/format";

export default function HomeAwayBlock({ data }) {
  const home = data?.scenarios?.home_away?.home;
  const away = data?.scenarios?.home_away?.away;
  if (!home || !away) return null;

  return (
    <div style={card}>
      <h3>🏠 Casa vs ✈️ Fora</h3>
      <p>Casa — Média: {num(home.average)} | Over: {pct(home.over_pct)}</p>
      <p>Fora — Média: {num(away.average)} | Over: {pct(away.over_pct)}</p>
    </div>
  );
}

const card = {
  border: "1px solid #e5e7eb",
  padding: 16,
  borderRadius: 8,
  marginTop: 16,
};
