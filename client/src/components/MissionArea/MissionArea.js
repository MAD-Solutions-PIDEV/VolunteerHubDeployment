import { projectArea } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const MissionProject = ({ project = {} }) => {
  const {
    bg,
    title,
    text,
    linkText,
    btnClassName = "",
    className = "",
  } = project;

  return (
    <Col lg={6}>
      <div
        className={`project-explore bg_cover text-center${className}`}
        style={{ 
          backgroundImage: `url(${bg})`
         }}
      >
        <h3 className="title">{title}</h3>
        <p>{text}</p>
        <a className={`main-btn${btnClassName}`} href="#">
          {linkText}
        </a>
      </div>
    </Col>
  );
};

const MissionArea = () => {
  return (
    <section className="project-area">
      <Container>
        <Row className="no-gutters">
          {projectArea.map((project) => (
            <MissionProject key={project.id} project={project} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MissionArea;
