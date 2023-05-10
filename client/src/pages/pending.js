import PageTitle from "components/Reuseable/PageTitle";
import Title from "components/Reuseable/Title";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const Pending = ({ match }) => {
  document.title = "Organization Pending";

  return (
    <section
      className="categories-area bg_cover"
      style={{
        backgroundImage: `url(require("assets/images/categories-bg.jpg"))`,
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={5}>
            <div className="categories-content">
              <span>Welcome to VolunteerHub</span>
              <h3 className="title">Pending Approval</h3>
              <p>
                {" "}
                Your organization is now pending approval. You will receive an
                email notification once it has been approved.
              </p>
              <div className="item d-flex align-items-center">
                <Link className="main-btn" to="/">
                  Go to Home Page
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <Image
              src="https://volunteerhub.onrender.com/assets/img/pending.svg"
              alt="pending"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Pending;
