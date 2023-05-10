import { exploreProjects } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleExchangeMission from "./SingleExchangeMission";
import  {useState,useEffect} from "react";
import { getMissionByCateogry } from "BackEnd/Modules/services/missionService";
import { useParams } from "react-router-dom";


const ExchangeMissionsThree = () => {
  const [description, setDescription] = useState("");
  const [missions, setMissions] = useState([]);
  const { category } = useParams();
  

  useEffect(() => {
    getMissionByCateogry(category)
      .then((res) => {
        if (res) {
          setMissions(res);
        }
      })
      .catch((error) => console.log(error));
  }, [category]);

     
  return (
    <section className="explore-projects-3-area explore-v2-page pt-90 pb-120">
      <Container>
        <div className="explore-margin">
          <Row className="justify-content-center">
            {missions.map((mission) => (
              <Col lg={6} md={6} sm={9} key={mission.MissionID}>
                <SingleExchangeMission mission={mission}  />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ExchangeMissionsThree;