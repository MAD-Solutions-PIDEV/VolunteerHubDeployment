import { missionDetailsArea } from "data/missionArea";
import { projectDetailsArea } from "data/projectsArea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";





const MissionDetailsArea = ()  => {
  
  const { id } = useParams();
  
  const [missionData, setMissionData] = useState({
    Title: '',
    Category: '',
    Description: '',
    SkillsRequired: '',
    LanguageRequired: '',
    StartDate: '',
    EndDate: '',
    Location: '',
    Image,
  });
  const userRole = "ROLE_HOST";
  const storedRole = localStorage.getItem("role"); 
  const storedId = localStorage.getItem("storedId"); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/missions/${id}`);
      const data = await response.json();
      setMissionData(data);
      window.AddedBy = data.AddedBy
    };
  
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/missions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
    console.log('Mission deleted successfully');
      window.location.href = '/category';
    } catch (error) {
      console.error('Error deleting mission:', error);
       alert('Failed to delete mission');
    }
  };
  

  return (
    <section className="project-details-area pt-10 pb-40">
      <Container>
        <Row>
          <Col lg={7}>
            <div className="project-details-thumb">
            <Image
            src={`http://localhost:4000/uploads/${missionData.Image}`}
            alt="orgLogo"
            fluid
          />
              <div className="">
                <i className=""></i>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="project-details-content  mt-30">
              <div className="projects-range-content">
              
                <div className="fa fa-map-marker mr-10">
                <span className="ml-10"> <p>{missionData.Location}</p></span>
                </div>
                  <Image  alt="" />
                  
               
              </div>
              <h3 className="title">{missionData.Title}</h3>
              <div className="project-details-item">
  
              </div>
              <div className="projects-range">
                <div className="">
                  <ul>
                  </ul>
                  <div className="range"></div>
                </div>
              </div>
              <div className="projects-goal">
                <span>
                Category : {missionData.Category}
                </span>
              </div>
              {storedId == window.AddedBy ? (
              <div className="project-btn mt-25">
                
            <Link className="main-btn " to={`/${id}/updateMission`}>
            <i className="fa fa-edit" ></i> 
                  Edit Mission
                  </Link>
                  <button className="main-btn ml-5" onClick={handleDelete}>
                  <i className="fa fa-trash" ></i> Delete 
                    
                  </button>
              </div>
              )
              : (

                <p></p>)}
              <div className="project-share d-flex align-items-center">
         
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MissionDetailsArea;
