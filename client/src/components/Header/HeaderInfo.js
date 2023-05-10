import { useRootContext } from "context/context";
import React from "react";
import { Image } from "react-bootstrap";
import SearchIcon from "./SearchIcon";
import Social from "./Social";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const currentUser = AuthService.getCurrentUser();
const gender=""
const HeaderInfo = ({ socials, icon, phone = "", searchColor }) => {
  const { toggleMenu, toggleSearch } = useRootContext();
  const navigate = useNavigate();
  function handleGender(gender) {
    if (gender==="Male"){
        return "Mr"
    }else if(gender==="Female"){
      return "Mrs"
    }else{
      return "Mx"
    }
  }
  function handleClick() {
    navigate("/login");
  }
  const storedId = localStorage.getItem("storedId");

  function handleClickNavigate() {
    navigate(`/${storedId}/viewprofile`);

  }

  return (
    <div className="header-info d-flex align-items-center">
      
     
      {currentUser ? (
      <div className="info d-none d-sm-block" 
      onClick={handleClickNavigate}
      
      >

        <Image src={currentUser.image} alt="" style={{ width: "4rem",left: "-2rem" }}/>
        <span>Hi, {handleGender(currentUser.gender)} </span>
        <h5 className="title">{phone}</h5>
      </div>
      ):(
      <div className="input-box ms-20 text-center">
      <button to className="main-btn" type="submit" onClick={handleClick}>
        Sign-in | Sign-up
      </button>
      </div>)}
      <div
        onClick={toggleMenu}
        className="toggle-btn ml-30 canvas_open d-lg-none d-block"
      >
        <i className="fa fa-bars"></i>
      </div>
    </div>
  );
};

export default HeaderInfo;
