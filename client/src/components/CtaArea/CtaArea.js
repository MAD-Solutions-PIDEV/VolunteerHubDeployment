import { ctaArea } from "data/ctaArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const { bg, title } = ctaArea;

const CtaArea = () => {
  const storedId = localStorage.getItem("userId");
  return (
    <section className="cta-area">
      <Container>
        <Row>
          <Col lg={12}>
            <div
              className="cta-item bg_cover"
              style={{ 
                backgroundImage: `url(${bg})`
               }}
            >
              <div className="cta-content d-block d-lg-flex justify-content-between align-items-center">
                <h3 className="title">{title}</h3>
                <a className="main-btn main-btn-2" href={`${storedId}/updatehost/`}>
                 Join As A Host
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaArea;
