import { num, pct } from "../../utils/format";

export default function FgaBlock({ data }) {
  const fga = data?.scenarios?.offensive_volume;
  if (!fga) return null;

  return (
    <div style={card}>
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

const card = {
  border: "1px solid #e5e7eb",
  padding: 16,
  borderRadius: 8,
  marginTop: 16,
};
