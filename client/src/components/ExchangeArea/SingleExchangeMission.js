import React from "react";
import { Container, Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const SingleExchangeMission = ({ project = {}, mission = {} }) => {
  const { tagline, date, title, raised } = project;
  const { Title, Image, Location, StartDate, _id } = mission;
  const logo = "family.jpg";

  const startDate = new Date(StartDate);
  const [missionData, setMissionData] = useState({
    Title: "",
    Category: "",
    Description: "",
    SkillsRequired: "",
    LanguageRequired: "",
    StartDate: "",
    EndDate: "",
    Location: "",
    Image: null,
  });

  const formattedDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // const importAll = (r) => {
  //   let images = {};
  //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  //   return images;
  // };
  //  const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
  return (
    <Container className="mt-50 mr-55 pb-100">
      <div className="explore-projects-item mt-30">
        {/* <img src={images['family.jpg']} alt="" /> */}
        {/* <Image src={image} alt="" /> */}

        <img
          src={`https://volunteerhub-backend.onrender.com/uploads/${Image}`}
          alt=""
        />

        <div className="icon">
          <a href="#">
            <i className="fa fa-heart"></i>
          </a>
        </div>
        <div className="explore-projects-content">
          <div className="item d-flex align-items-center">
            <span>{formattedDate}</span>
            <p>
              <i className="fa fa-map-marker"></i> {Location}
            </p>
          </div>
          <a href={`/${_id}/single-mission/`}>
            <h3 className="title">{Title}</h3>
          </a>
          <div className="projects-range">
            <div className="">
              <ul>
                <li></li>
                <li></li>
              </ul>
              <div className="range"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleExchangeMission;
