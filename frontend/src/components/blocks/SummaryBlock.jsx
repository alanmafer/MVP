import COLORS from "../../styles/colors";
import { num, pct } from "../../utils/format";

export default function SummaryBlock({ data }) {
  const overall = data?.scenarios?.overall;
  if (!overall) return null;

  return (
    <div style={card}>
      <h3 style={{ color: COLORS.text }}>📊 Resumo Geral</h3>

      <p style={{ color: COLORS.muted, fontSize: 12 }}>
        Visão geral do desempenho do jogador
      </p>

      <p>Média: <strong>{num(overall.average)}</strong></p>
      <p>Mediana: <strong>{overall.median}</strong></p>

      <p>
        Over {data.line}:{" "}
        <strong style={{ color: COLORS.success }}>
          {pct(overall.over.percentage)}
        </strong>
      </p>
    </div>
  );
}

const card = {
  border: `1px solid ${COLORS.border}`,
  borderRadius: 8,
  padding: 16,
  marginTop: 16,
  backgroundColor: COLORS.background,
};
