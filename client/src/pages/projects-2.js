import ExploreEventsThree from "components/EventsArea/ExploreEventsThree";
import Header from "components/Header/Header";
import Layout from "components/Layout/Layout";
import ExploreProjectsThree from "components/ProjectsArea/ExploreProjectsThree";
import PageTitle from "components/Reuseable/PageTitle";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Projects2 = () => {
  const [countdown, setCountdown] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/competition");
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  document.title = "Upcoming events";
  return (
    <Layout>
      <Header />
      <section
        className="page-title-area bg_cover"
        style={{
          backgroundImage: `url(${require("assets/images/page-title-bg.jpg")})`
        }}
      >
        <Container>
          <Row>
            <Col lg={6}>
              <div className="page-title-content">
                <h3 className="title">Upcomming event...</h3>
                <nav aria-label="breadcrumb" style={{ textAlign: "right" }}>
                  <ol className="breadcrumb" style={{
                    marginLeft: "40rem",
                    width: "34rem"
                  }}>
                    <h5 className="title" style={{ fontSize: "3.5rem" }}> Drop will start after </h5>

                    <table>
                      <tr><td>
                        <h3 className="title">{countdown}</h3>
                      </td>
                        <td>
                          <button style={{
                            position: "relative",
                            top: "30%"
                          }} class="main-btn" onClick={handleClick} title="You need to participate at least one event per day to join the drop!">Join now</button>
                        </td>
                      </tr>
                    </table>
                  </ol>
                </nav>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
      <ExploreEventsThree />
    </Layout>
  );
};

export default Projects2;
