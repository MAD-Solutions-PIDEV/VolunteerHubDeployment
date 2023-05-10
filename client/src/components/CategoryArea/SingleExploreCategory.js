import Title from "components/Reuseable/Title";
import { exploreProjects } from "data/projectsArea";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const SingleExploreCategory = ({ project = {}  }) => {
  const { image, tagline, date, title, raised } = project;
  const { title1 }= exploreProjects;
console.log('category', tagline);
  return (

    <div className="explore-projects-item mt-30">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Title title={title1} className="text-center" />
        </Col>
      </Row>
      <Image src={require(`assets/images/${image}`)} alt="" />
      <div className="icon">
        <a href="#">
          <i className="fa fa-heart"></i>
        </a>
      </div>
      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <span>{tagline}</span>
          <p>
            <i className=""></i>
          </p>
        </div>
        <Link href={`/exchange/${tagline}`}>
          <h3 className="title">{title}</h3>
        </Link>
        <div className="projects-range">
          <div className="">
            <ul>
             
            </ul>
            <div className="range"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleExploreCategory;
