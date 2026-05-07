import React from "react";
import NavBar from "../components/Layouts/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
