import React from "react";
import { Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { useState } from "react";
import { useEffect } from "react";
import { getListUser } from "BackEnd/Modules/services/userService";

const SingleHostProject = ({ project = {}, user = {} }) => {
  const { image, tagline, date, title, raised } = project;
 

  return (
    <div className="explore-projects-item mt-30">
      <Image src={require(`assets/images/${image}`)} alt="" />
      <div className="icon">
        <a href="#">
          <i className="fa fa-heart"></i>
        </a>
      </div>
      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <span></span>
          <p>
            <i className="fa fa-clock-o"></i>  
          </p>
        </div>
        <Link href="/single-project">
          <h3 className="title"> </h3>
        </Link>
        <div className="projects-range">
          <div className="projects-range-content">
            <ul>
              <li>Raised:</li>
              <li>{raised}%</li>
            </ul>
            <div className="range"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHostProject;
