import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
console.log("🚀 MainLayout-4-> Outlet =>", Outlet);

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
