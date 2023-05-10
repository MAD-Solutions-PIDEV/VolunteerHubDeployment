import { projectsArea } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleProject from "./SingleHost";
import SingleHost from "./SingleHost";
import { useEffect } from "react";
import { getListHost, getListUser } from "BackEnd/Modules/services/userService";
import { useState } from "react";

const { projects } = projectsArea;

const HostArea = () => {
  const [users, setUsers] = useState([]);
  

     
  useEffect(() => {
    getListHost()
      .then((res) => {
        setUsers(res.data);
        console.log("users", users);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="explore-area pt-40 pb-120 ">
      <Container>
      <Row className="justify-content-center">
            {users.map((user) => (
              <Col lg={6} md={6} sm={9} key={user._id}>
                <SingleHost user={user} />
              </Col>
            ))}
          </Row>
      </Container>
    </section>
  );
};

export default HostArea;
