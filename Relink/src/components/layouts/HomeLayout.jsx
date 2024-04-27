import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { useState } from "react";
import { SortingContext } from "../SortingContext";

import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  const [sortOrder, setSortOrder] = useState({
    pinYin: true,
    definition: true,
    createdAt: true,
    type: true,
    title: true,
  });

  return (
    <SortingContext.Provider value={{ sortOrder, setSortOrder }}>
      <div className="home-grid">
        <Sidebar />
        <>
          <Outlet />
        </>
        <Footer />
      </div>
    </SortingContext.Provider>
  );
}
