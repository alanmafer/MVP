import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout() {
  return (
    <div style={layout}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <div style={main}>
        <Header />

        <div style={content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Styles
=============================== */

const layout = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F9FAFB",
};

const main = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const content = {
  padding: 24,
};
