import { exploreProjects } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleExploreProject from "./SingleExploreHost";
import SingleHostProject from "./SingleExploreHost";
import { useState } from "react";
import { useEffect } from "react";
import { getListUser } from "BackEnd/Modules/services/userService";


const ExploreHostsThree = () => {
  const [users, setUsers] = useState([]);

   

  return (
    <section className="explore-projects-3-area explore-v2-page pt-90 pb-120">
      <Container>
        <div className="explore-margin">
          <Row className="justify-content-center">
            {users.map((user) => (
              <Col lg={6} md={6} sm={9} key={user.id}>
                <SingleHostProject user={user} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ExploreHostsThree;
