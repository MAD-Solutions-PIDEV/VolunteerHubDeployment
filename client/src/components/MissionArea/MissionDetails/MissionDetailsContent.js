import { projectDetailsTabBtns } from "data/missionArea";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MissionDetailsSidebar from "./MissionDetailsSidebar";
import MissionDetailsStory from "./MissionDetailsStory";

const MissionDetailsContent = () => {
  const [current, setCurrent] = useState("pills-home");

  const getClassName = (id = "") => {
    const active = current === id;
    return `tab-pane animated${active ? " fadeIn show active" : ""}`;
  };

  return (
    <section className="project-details-content-area pb-110">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="tab-btns">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {projectDetailsTabBtns.map(({ id, name }) => (
                  <li key={id} className="nav-item" role="presentation">
                    <a
                      onClick={() => setCurrent(id)}
                      className={`nav-link cursor-pointer${
                        id === current ? " active" : ""
                      }`}
                      role="tab"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <MissionDetailsStory getClassName={getClassName} />
            </div>
          </Col>
          <Col lg={4} md={7} sm={9}>
            <MissionDetailsSidebar />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MissionDetailsContent;
