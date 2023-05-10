import React from "react";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

const currentUser = AuthService.getCurrentUser();
const logOut = () => {
  AuthService.logout();
};
const Social = ({ socials = [] }) => {
  return (
    <div className="social">
      <ul>
        {socials.map(({ id, icon, href }) => (
          <li key={id}>
            <a href={href}>
              <i className={icon}></i>
            </a>
          </li>
        ))}
        {currentUser ? (
          <li className="social">
            <Link to="/login" className="nav-link" onClick={logOut}>
              Logout
            </Link>
          </li>
        ) : (
          <li className="social"></li>
        )}
      </ul>
    </div>
  );
};

export default Social;
