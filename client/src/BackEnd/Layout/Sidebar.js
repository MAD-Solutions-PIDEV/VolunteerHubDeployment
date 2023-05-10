import React from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sidebar">
      <div className="logo d-flex justify-content-between">
        <a className="large_logo" href="index-2.html">
          <img src={process.env.PUBLIC_URL + "/assets/img/logo1.png"} alt="" />
        </a>
        <a className="small_logo" href="index-2.html">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            alt=""
          />
        </a>
        <div className="sidebar_close_icon d-lg-none">
          <i className="ti-close"></i>
        </div>
      </div>
      <ul id="sidebar_menu">
        <li className="">
          <a className="has-arrow" href="#" aria-expanded="false">
            <div className="nav_icon_small">
              <i className="ti-dashboard"></i>
            </div>
            <div className="nav_title">
              <span>Dashboard</span>
            </div>{" "}
          </a>
        </li>
        <li className="">
          <a
            className="has-arrow"
            href="#"
            onClick={() => navigate("/dashboard/users/list")}
            aria-expanded="false"
          >
            <div className="nav_icon_small">
              <i className="ti-user"></i>
            </div>
            <div className="nav_title">
              <span>Users</span>
            </div>
          </a>
        </li>
        <li className="">
          <a
            className="has-arrow"
            href="#"
            onClick={() => navigate("/dashboard/organizations/all")}
            aria-expanded="false"
          >
            <div className="nav_icon_small">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/menu-icon/org.svg"}
                alt=""
              />{" "}
            </div>
            <div className="nav_title">
              <span>Organizations</span>
            </div>
          </a>
        </li>
        <li className="">
          <a className="has-arrow"  aria-expanded="false"
          onClick={() => navigate("/dashboard/events/list")}>
            <div className="nav_icon_small">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/menu-icon/4.svg"}
                alt=""
              />
            </div>
            <div className="nav_title">
              <span>Events</span>
            </div>
          </a>
        </li>
        
        <li className="">
          <a
            className="has-arrow"
            href="#"
            onClick={() => navigate("/dashboard/campaigns/list")}
            aria-expanded="false"
          >
            <div className="nav_icon_small">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/menu-icon/11.svg"}
                alt=""
              />
            </div>
            <div className="nav_title">
              <span>Campaigns</span>
            </div>
          </a>
        </li>

        <li className="">
          <a className="has-arrow" href="#" 
          onClick={() => navigate("/dashboard/missions/list")}
          aria-expanded="false">
            <div className="nav_icon_small">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/menu-icon/5.svg"}
                alt=""
              />
            </div>
            <div className="nav_title">
              <span>Missions</span>
            </div>
          </a>
        </li>
        <li className="">
          <a
            className="has-arrow"
            href="#"
            onClick={() => navigate("/dashboard/news/lists")}
            aria-expanded="false"
          >
            <div className="nav_icon_small">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/menu-icon/11.svg"}
                alt=""
              />
            </div>
            <div className="nav_title">
              <span>News</span>
            </div>
          </a>
        </li>
        
      </ul>
    </nav>
  );
};

export default Sidebar;
