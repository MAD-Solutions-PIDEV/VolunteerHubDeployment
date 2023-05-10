import { projectDetailsStory } from "data/projectsArea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./mission.module.css"

const {  items } =
  projectDetailsStory;



const MissionDetailsStory = () => {




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
const [MySkill , setMySkill] = useState("")
const SkillsSelected = [];

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:4000/missions/${id}`);
    const data = await response.json();
    setMissionData(data);

    const skillsSelected = [];
    for (let i = 0; i < data.SkillsRequired.length; i++) {
      if (data.SkillsRequired[i].skill) {
        console.log("true");
        skillsSelected.push(data.SkillsRequired[i].skill  + " " );
        console.log("log", data.SkillsRequired[i].skill);
      }
    }
    setMySkill(skillsSelected);


  };

  fetchData();
}, [id]);



  return (
    <div id={id} role="tabpanel">
      <div className="project-details-content-top">
        <div className="mt-150 ">
        <h4 >Mission Description</h4>
          <p className={styles.fieldt}>{missionData.Description}</p>
        </div>

        {/* <ul>
          {lists.map((list, i) => (
            <li key={i}>
              <i className="flaticon-check"></i> {list}
            </li>
          ))}
        </ul> */}

        <div className="project-details-item">

          {items.map(({ className = "" }) => (
            <div className={`item ${className}`} key={id}>
              <i className="flaticon-checkmark "></i>


            </div>

          ))}
          <div className="ml-100 pt-20">
            
           <h5 >Language Required : {missionData.LanguageRequired} </h5>  </div> 
          
        </div>
        
        <div className="project-details-item">

          {items.map(({ className = "" }) => (
            <div className={`item ${className}`} key={id}>
              <i className="flaticon-checkmark "></i>


            </div>

          ))}
          <ul>
          <ul className="ml-100 pt-20"> 
          <h5 >
          Skills Required : {MySkill}
          </h5>   
          
       
          </ul>
          </ul>
       </div>
      </div>
    </div>
  );
};

export default MissionDetailsStory;
