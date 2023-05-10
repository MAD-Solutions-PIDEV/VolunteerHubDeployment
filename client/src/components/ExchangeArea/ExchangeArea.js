import ExploreArea from "components/ProjectsArea/ExploreArea";
import { projectsArea } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleProject from "./SimilarMission";

const { projects } = projectsArea;

const ExchangeArea = () => {
  return (
    <section className="explore-area pt-90 pb-120">
      <Container>
        <Row className="justify-content-center">
          {projects.map((project) => (
            <Col lg={4} md={6} sm={7} key={project.id}>
              <SingleProject project={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ExploreArea;
