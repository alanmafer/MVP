import COLORS from "@/styles/colors";

export default function Header() {
  return (
    <header style={header}>
      <span style={sport}>NBA · Player Props</span>

      <div style={user}>
        <span style={name}>Usuário</span>
        <div style={avatar}>U</div>
      </div>
    </header>
  );
}

/* ===============================
   Styles
=============================== */

const header = {
  height: 56,
  backgroundColor: "#FFFFFF",
  borderBottom: `1px solid ${COLORS.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
};

const sport = {
  fontSize: 13,
  color: COLORS.muted,
};

const user = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const name = {
  fontSize: 13,
  color: COLORS.text,
};

const avatar = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: COLORS.primary,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
};
