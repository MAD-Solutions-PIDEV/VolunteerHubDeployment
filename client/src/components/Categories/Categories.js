import Title from "components/Reuseable/Title";
import { categoriesSection } from "data/categories";
import React, { useEffect, useState } from "react";
import { CardGroup, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns'
import Card from 'react-bootstrap/Card';
const { bg, tagline, title, text, categoriesUser, signIn, categories } =
  categoriesSection;

const CategoriesBoxItem = ({ categories = [], mission = {}  }) => {
  const { Title , Image ,Location,StartDate, _id} = mission;
  const startDate = new Date(StartDate);

  const formattedDate = startDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="categories-box-item">
      {categories.map(({ id, icon, title }) => (
        <div key={id} className="item">
          <a href="#">
            <i className={icon}></i>
            <br />
            <span>{title}</span>
          </a>
        </div>
      ))}
    </div>
  );
};
const SingleExchangeMission = ({ project = {}, mission = {} }) => {
  const { tagline, date, title, raised } = project;
  const { Title , Image ,Location,StartDate, _id} = mission;


    const startDate = new Date(StartDate);
    const [missionData, setMissionData] = useState({
      Title: '',
      Category: '',
      Description: '',
      SkillsRequired: '',
      LanguageRequired: '',
      StartDate: '',
      EndDate: '',
      Location: '',
      Image:null,
    });

    const formattedDate = startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  // const importAll = (r) => {
  //   let images = {};
  //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  //   return images;
  // };
  //  const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
 
};
const Categories = (mission= {}) => {
  const [missions, setMissions] = useState([]);
  const { _id} = mission;

  useEffect(() => {
    async function fetchMissions() {
      try {
       const skillsList = localStorage.getItem("skills"); 
        const response = await fetch(`http://localhost:4000/missions/search/skill?skills=${skillsList}`);
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMissions();
  }, []);
  const skillsList = localStorage.getItem("skills"); 
  
  return (
    <section
      className="categories-area bg_cover"
      style={{ 
        backgroundImage: `url(${bg})`
       }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={5}>
            <div className="categories-content">
              <span>{tagline}</span>
              <h3 className="title">{title}</h3>
              <p>{text}</p>
              <div className="align-items-center">
                <div className="">
                  <Image />
                </div>
                <Image/>
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <div className="categories-box">
              <CategoriesBoxItem categories={categories.slice(0, 3)} />
              <CategoriesBoxItem categories={categories.slice(3)} />
            </div>
          </Col>
        </Row>
      </Container>
      

      <Container className="mt-100">
      
      {skillsList ? (
      <>
        <h3 className="categories-content mb-50">
          <i class="fa-regular fa-solid fa-heart"></i> Recommended Missions for you

        </h3>
        
        
     <Row xs={1} md={3} className="g-4">
      
      {missions.map((mission)=> (
        <Col>
             
          <Card>

               
          <img src={`http://localhost:4000/uploads/${Image}`} alt="" />

        
            <Card.Body>
              
            <Card.Title className="text-center"> <a href=""> Category : {mission.Category} </a></Card.Title>
            <a href={`/${mission._id}/single-mission/`}>
              <Card.Title className="text-center">{mission.Title}</Card.Title>
              </a>
              <Card.Text>
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer className='text-muted'>{format(mission.StartDate, 'D-MM-YYYY')} - {format(mission.EndDate, 'D-MM-YYYY')}</Card.Footer> */}
          </Card>
        </Col>
      ))}
    </Row>
    </>
    ) : null}
    </Container>
    </section>
    
  );
};

export default Categories;
