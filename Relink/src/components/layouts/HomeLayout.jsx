import Sidebar from "../Sidebar";

import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  return (
    <div className="home-grid">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
