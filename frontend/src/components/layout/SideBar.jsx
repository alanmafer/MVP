import { NavLink } from "react-router-dom";
import COLORS from "@/styles/colors";

export default function Sidebar() {
  return (
    <aside style={sidebar}>
      <Logo />

      <nav style={nav}>
        <NavItem to="/teams" label="Times" />
        <NavItem to="/favorites" label="Favoritos" disabled />
        <NavItem to="/settings" label="Configurações" disabled />
      </nav>
    </aside>
  );
}

/* ------------------------------- */

function NavItem({ to, label, disabled }) {
  if (disabled) {
    return <span style={{ ...item, opacity: 0.4 }}>{label}</span>;
  }

  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...item,
        backgroundColor: isActive ? "#EEF2FF" : "transparent",
        color: isActive ? COLORS.primary : COLORS.text,
      })}
    >
      {label}
    </NavLink>
  );
}

/* ------------------------------- */

function Logo() {
  return (
    <div style={logo}>
      <strong style={{ color: COLORS.primary }}>Line</strong>
      <strong>Context</strong>
    </div>
  );
}

/* ------------------------------- */

const sidebar = {
  width: 220,
  backgroundColor: "#FFFFFF",
  borderRight: `1px solid ${COLORS.border}`,
  padding: 20,
};

const nav = {
  marginTop: 32,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const item = {
  padding: "10px 12px",
  borderRadius: 8,
  textDecoration: "none",
  fontSize: 14,
};

const logo = {
  fontSize: 18,
  fontWeight: 700,
};
