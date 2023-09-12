import Sidebar from "../Sidebar";
import Footer from "../Footer";

import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  return (
    <div className="home-grid">
      <Sidebar />
      <>
        <Outlet />
      </>
      <Footer />
    </div>
  );
}
