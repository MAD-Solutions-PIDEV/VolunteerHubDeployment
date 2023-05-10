import React, { useRef } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { useState } from "react";
import { useEffect } from "react";
import {
  addFavoriteHost,
  getListHost,
  getListUser,
  getUserById,
} from "BackEnd/Modules/services/userService";
import { useNavigate, useParams } from "react-router-dom";
import "./host.css";
import { FaHeart } from "react-icons/fa";
import Title from "components/Reuseable/Title";
import axios from "axios";
const SingleHost = ({ project = {}, user = {} }) => {
  const {
    tagline,
    firstName,
    lastName,
    country,
    availableServices,
    languageSpoken,
    _id,
    address,
    image,
  } = user;
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    address: [
      {
        firstAddress: "",
        secondAddress: "",
        country: "",
        zipCode: "",
        state: "",
      },
    ],
    availableServices: "",
    languageSpoken: [],
    image: "",
  });
  const ref = useRef(null);
  const { id } = useParams();

  const [idHost, setidHost] = useState("");
  const [roles, setRole] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const storedId = localStorage.getItem("storedId");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the state of the button from local storage on component mount
    const storedIsClicked = localStorage.getItem(`host-${_id}`);
    setIsClicked(storedIsClicked === "true");
  }, [_id]);

  const Host = {
    idHost: _id,
  };

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };
  const images = importAll(
    require.context("../../assets/images", false, /\.(png|jpe?g|svg)$/)
  );

  const handleClick = async (e) => {
    try {
      if (isClicked) {
        // Call the API to remove the host from the user's favorite list
        const res = await axios.post(
          `https://volunteerhub-backend.onrender.com/user/removefavoritehost/${storedId}`,
          Host
        );
        console.log(res.data);
      } else {
        // Call the API to add the host to the user's favorite list
        const res = await axios.post(
          `https://volunteerhub-backend.onrender.com/user/favoriteHost/${storedId}`,
          Host
        );
        console.log(res.data);
      }
      setIsClicked(!isClicked); // Toggle the isClicked state
      localStorage.setItem(`host-${_id}`, !isClicked);
    } catch (err) {
      console.log(err);
      setError("Error adding/removing host from favorite list");
    }
  };

  const navigateTohost = () => {
    window.scrollTo(0, 0);
    navigate(`/${_id}/viewprofile`);
  };

  return (
    <div
      className="explore-projects-item mt-50 ml-70 mr-160 "
      style={{ border: "1px dotted " }}
    >
      <div className="explore-projects-thumb ">
        <div
          className="explore-projects-content "
          style={{ border: "1px dotted " }}
        >
          <div className="item d-flex align-items-center  ">
            {/*         
      {image && <img src={image} alt="" style={{ width: '500px', height: '300px', }} fluid /> }    */}
            <img src={images["profilepicture.jpg"]} alt="" className="mr-100" />
            {/* <img src={`data:image/png;base64,${image}`} alt="Model Image" /> */}
            {/* <Image src={images['profilepicture.jpg']} alt="" />
             */}
            <a href="#">
              <i className=""> </i>
            </a>
          </div>
        </div>
      </div>

      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <button
            className={`btn custom-btn ${isClicked ? "btn-primary" : ""}`}
            onClick={handleClick}
          >
            <FaHeart className="mr-5" />
            {isClicked
              ? "Remove from favorite host list"
              : "Add to favorite host list"}
          </button>
          {error && <p>{error}</p>}
          <p>
            <i className=""></i>
          </p>
        </div>
        <div href="">
          <h3 className="title">
            {" "}
            {firstName} {lastName}{" "}
          </h3>
        </div>
        <div className="">
          <div className="">
            <Button className="btn btn-primary" onClick={navigateTohost}>
              View Details
              <div className="mr-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHost;
