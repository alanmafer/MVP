import COLORS from "../../styles/colors";

export default function Logo() {
  return (
    <div style={{ fontWeight: 700, fontSize: 22 }}>
      <span style={{ color: COLORS.primary }}>Line</span>
      <span style={{ color: COLORS.text }}>Context</span>
    </div>
  );
}
