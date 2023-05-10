import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
const Header = () => {
  const admin = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-lg-12 p-0 ">
          <div className="header_iner d-flex justify-content-between align-items-center">
            <div className="sidebar_icon d-lg-none">
              <i className="ti-menu"></i>
            </div>
            <div className="line_icon open_miniSide d-none d-lg-block">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/line_img.png"}
                alt=""
              />
            </div>

            <div className="header_right d-flex justify-content-between align-items-center">
              <div className="profile_info">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/menu-icon/user.svg"
                  }
                  alt="#"
                />
                <div className="profile_info_iner">
                  <div className="profile_author_name">
                    <p>Admin</p>
                    <h5>
                      {admin.firstName} {admin.lastName}
                    </h5>
                  </div>
                  <div className="profile_info_details">
                    <Link to="/">Home</Link>
                    <Link onClick={AuthService.logout} to="/login">
                      {" "}
                      <a>log-out </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
