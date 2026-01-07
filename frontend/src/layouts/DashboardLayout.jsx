import { Outlet, NavLink } from "react-router-dom";
import COLORS from "../styles/colors";

/* ===============================
   Dashboard Layout
=============================== */

export default function DashboardLayout() {
  return (
    <div style={layout}>
      {/* =========================
          SIDEBAR
      ========================== */}
      <aside style={sidebar}>
        <div style={logo}>LineContext</div>

        <nav style={nav}>
          <NavItem to="/teams">🏀 NBA</NavItem>
        </nav>
      </aside>

      {/* =========================
          CONTEÚDO
      ========================== */}
      <main style={main}>
        {/* HEADER */}
        <header style={header}>
          <span style={headerTitle}>NBA Dashboard</span>
        </header>

        {/* PÁGINAS */}
        <div style={content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ===============================
   Sidebar Item
=============================== */

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...navItem,
        backgroundColor: isActive
          ? "rgba(255,255,255,0.2)"
          : "transparent",
      })}
    >
      {children}
    </NavLink>
  );
}

/* ===============================
   Styles
=============================== */

const layout = {
  display: "flex",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  backgroundColor: COLORS.primary, // elimina “linha branca”
  fontFamily: "Arial, sans-serif",
};

const sidebar = {
  width: 220,
  backgroundColor: COLORS.primary,
  color: "#fff",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
};

const logo = {
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 32,
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const navItem = {
  color: "#fff",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 6,
  fontSize: 14,
};

const main = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#F9FAFB",
  margin: 0,
  padding: 0,
};

const header = {
  height: 56,
  backgroundColor: COLORS.primary, // 👈 mesma cor do sidebar
  display: "flex",
  alignItems: "center",
  padding: "0 24px",
};

const headerTitle = {
  fontSize: 14,
  fontWeight: 600,
  color: "#fff", // texto branco no header
};

const content = {
  padding: "24px 32px",
  margin: 0,
};
