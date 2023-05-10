import { teamArea } from "data/teamArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";

const { bg, tagline, title } = teamArea;

const TeamArea = () => {
  return (
    <section
      className="team-area bg_cover"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={7}>
            <Title
              title="Join our Organizations"
              tagline="For a Better Community"
              className="section-title-2 text-center"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TeamArea;
