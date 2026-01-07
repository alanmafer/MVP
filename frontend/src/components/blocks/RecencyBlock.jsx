import { num, pct } from "../../utils/format";

export default function RecencyBlock({ data }) {
  const last5 = data?.scenarios?.recency?.last_5;
  const last10 = data?.scenarios?.recency?.last_10;
  if (!last5 || !last10) return null;

  return (
    <div style={card}>
      <h3>⏳ Recência</h3>
      <p>Últimos 5 — Média: {num(last5.average)} | Over: {pct(last5.over_pct)}</p>
      <p>Últimos 10 — Média: {num(last10.average)} | Over: {pct(last10.over_pct)}</p>
    </div>
  );
}

const card = {
  border: "1px solid #e5e7eb",
  padding: 16,
  borderRadius: 8,
  marginTop: 16,
};
