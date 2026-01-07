import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Teams from "@/pages/Teams";
import TeamPlayers from "@/pages/TeamPlayers";
import Player from "@/pages/Player";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function RoutesApp() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* APP COM SIDEBAR + HEADER */}
      <Route element={<DashboardLayout />}>
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamPlayers />} />
        <Route path="/players/:playerId" element={<Player />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
