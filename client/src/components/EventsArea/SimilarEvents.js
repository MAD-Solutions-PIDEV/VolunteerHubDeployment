import { similarProjects } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import SingleProject from "./SingleProject";
import SingleEvent from "./SingleEvent";

const { tagline, title, projects } = similarProjects;

const SimilarEvents = () => {
  return (
    <section className="explore-projects-area explore-projects-page-area">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Title title={title} tagline={tagline} className="text-center" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {projects.map((project) => (
            <Col lg={4} md={6} sm={9} key={project.id}>
              <SingleEvent project={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SimilarEvents;
