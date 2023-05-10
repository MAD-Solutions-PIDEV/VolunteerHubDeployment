import { togetherArea } from "data/togetherArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";

const { bg, tagline, title } = togetherArea;

const TogetherArea = ({ className = "" }) => {
  const storedId = localStorage.getItem("userId");
  return (
    <section
      className={`together-area bg_cover ${className}`}
      style={{ 
        backgroundImage: `url(${bg})`
       }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="together-content text-center">
              <span>{tagline}</span>
              <h3 className="title">{title}</h3>
              <Link className="main-btn" href={`${storedId}/updatehost/`}>
                JOIN AS A HOST
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TogetherArea;
