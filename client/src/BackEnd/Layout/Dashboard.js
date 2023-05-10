import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dasboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.roles.includes("ROLE_ADMIN")) {
    return (
      <div className="crm_body_bg">
        <Sidebar />
        <section className="main_content dashboard_part large_header_bg">
          <div>
            <Header />
          </div>
          <Outlet />
        </section>
      </div>
    );
  } else if (user) {
    return <Navigate to="/" replace />;
  } else if (!user) {
    return <Navigate to="/login" replace />;
  }
};

export default Dasboard;
