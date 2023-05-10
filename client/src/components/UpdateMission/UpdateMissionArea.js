import React, { useState, useEffect } from "react";
import styles from "./mission.css";
import { useParams } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import axios from "axios";
import classNames from "classnames";
import { getMissionById, updateMission } from "BackEnd/Modules/services/missionService";
import { exploreskills } from "data/UpdateArea";
import Multiselect from "multiselect-react-dropdown";
function NotificationBar({ message }) {
  return message ? (
    <div className="alert alert-success mt-3" role="alert">
      {message}
    </div>
  ) : null;
}
const { skill } = exploreskills;

const UpdateMissionArea = () => {

  const { id } = useParams();
  const [mission, setMission] = useState({
    Title: "",
    Category: "",
    Description: "",
    SkillsRequired: [],
    LanguageRequired: "",
    StartDate: "",
    EndDate: "",
    Location: "",
    Image: "",
  });

  const selectview = classNames(styles.selectview);
  const [countries, setCountries] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const getMission = async () => {
      const response = await axios.get(`http://localhost:4000/missions/${id}`);
      setMission(response.data);
    };

    getMission();
  }, [id]);

  useEffect(() => {
    async function LocMission() {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    }
    LocMission();
  }, []);


  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        const allLanguages = data.reduce((acc, country) => {
          return [...acc, ...country.languages.map((language) => language.name)];
        }, []);
        const uniqueLanguages = [...new Set(allLanguages)];
        setLanguages(uniqueLanguages);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  const handleSelectionChange = (event) => {
    const options = event.target.options;
    const SkillsRequired = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        SkillsRequired.push(options[i].value);
      }
    }
    setMission(SkillsRequired);
  }

  const handleUpdate = () => {
    const updatedMission = {

      ...mission


    };

    updateMission(id, updatedMission)
      .then((res) => {
        console.log(res.data);
        window.scrollTo(0, 0);
        setNotification("Information updated successfully"); // Set notification message on success
      })
      .catch((error) => {
        console.log(error.response.data);
        setNotification("An error occurred while updating information"); // Set notification message on error
      });
  };
  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    handleUpdate();
  };

  return (
    <>
    
      <section className="contact-form-area">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Title className="text-center" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <NotificationBar message={notification} />{" "}
              {/* Render notification bar */}
              <form onSubmit={handleSubmit} >
                <div className="conact-form-item">
                  <Row>
                    <div className="input-box mt-0 mt-0 text-center form-label fw-bold">
                      <h1 className="display-8"> Mission Information</h1>
                    </div>

                    <Col className="form-label form-control form-group">
                      <div className="input-box mt-20">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Title"
                          defaultValue={mission.Title}
                          onChange={(e) => setMission({ ...mission, Title: e.target.value })}
                        />
                      </div>

                      <div className="input-box mt-20">
                        <label htmlFor="description">Description :</label>
                        <input
                          type="text"
                          placeholder="description"
                          defaultValue={mission.Description}
                          onChange={(e) => setMission({ ...mission, Description: e.target.value })}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="startDate">Start Date :</label>
                        <input
                          type="date"
                          placeholder="startDate"
                          defaultValue={mission.StartDate ? mission.StartDate.substring(0, 10) : ''}
                          onChange={(e) => setMission({ ...mission, StartDate: e.target.value })}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="EndDate">End Date :</label>
                        <input
                          type="date"
                          placeholder="End date"
                          defaultValue={mission.EndDate ? mission.EndDate.substring(0, 10) : ''}
                          onChange={(e) => setMission({ ...mission, EndDate: e.target.value })}
                        />
                      </div>
                      {/* <div className="input-box mt-20">
                        <label htmlFor="location">Location :</label>
                        <input
                          type="text"
                          placeholder="location"
                          defaultValue={mission.Location}
                          onChange={(e) => setMission({ ...mission, Location: e.target.value })}
                        />
                      </div> */}


                      <div className="input-box mt-20">

                        <label htmlFor="location">Location :</label>
                        <select

                          value={mission.Location}
                          className="selectMissionLocation"
                          onChange={(e) => setMission({ ...mission, Location: e.target.value })}
                          name="Location"

                        >
                          <option value="">Select a Location</option>
                          {countries.map((country) => (
                            <option
                              key={country.alpha2Code}
                              value={country.alpha2Code}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>



                      <div className="input-box mt-20">
                        <label htmlFor="language">Language Required :</label>
                        <select
                          value={mission.LanguageRequired}
                          className="selectMissionLocation"
                          onChange={(e) => setMission({ ...mission, LanguageRequired: e.target.value })}
                          name="Language"
                        >
                          <option value="">Select a Language</option>
                          {languages.map((language) => (
                            <option key={language} value={language}>{language}</option>
                          ))}
                        </select>
                      </div>



                      {/* <div className="input-box mt-20">
                        <label htmlFor="languageRequired"> Language Required :</label>
                        <input
                          type="text"
                          placeholder="languageRequired"
                          defaultValue={mission.LanguageRequired}
                          onChange={(e) => setMission({ ...mission, LanguageRequired: e.target.value })}
                        />
                      </div> */}
                      <div className=" mt-20">
                        <label htmlFor="skills">Skills :</label>
                        {/* <select
                          multiple={true}
                          // onChange={(e) => setMission({ ...mission, SkillsRequired: [e.target.value] })}
                          // onChange={handleSelectionChange}
                        >
                     {exploreskills?.map((skillname, index) => {
                        return (
                          <option key={index}>
                            <h2> {skillname.skill}</h2>
                            <hr />
                          </option>
                        );})}
                        </select> */}
                        <Multiselect
                          selectedValues={mission.SkillsRequired.skill}
                          options={exploreskills}
                          displayValue="skill"
                          onSelect={(selectedList, selectedItem) => {
                            console.log(selectedList); // check the value of selectedList
                            setMission({ ...mission, SkillsRequired: selectedList });
                            console.log(mission.SkillsRequired); // check the value of mission.SkillsRequired
                          }}
                          onRemove={(selectedList, removedItem) => {
                            console.log(selectedList); // check the value of selectedList
                            setMission({ ...mission, SkillsRequired: selectedList });
                            console.log(mission.SkillsRequired); // check the value of mission.SkillsRequired
                          }}
                          onChange={handleSelectionChange}
                        // onChange={(e) => {
                        //   setMission((...mission) => {
                        //     return { ...mission, SkillsRequired: e.target.value };
                        //   });
                        // }}
                        />
                        {/* {exploreskills?.map((skillname, index) => {
                        return (
                          <option key={index}>
                            <h2> {skillname.skill}</h2>
                            <hr />
                          </option>
                        );})} */}

                      </div>
                      <div className="input-box mt-20 ">

                        <label htmlFor="category">Category:</label>
                        <select
                          className="selectview"
                          placeholder="Category"
                          value={mission.Category}
                          onChange={(e) => setMission({ ...mission, Category: e.target.value })}
                        >
                          <option value="School">School</option>
                          <option value="Family">Family</option>
                          <option value="NGO">NGO</option>
                          <option value="Nature">Nature</option>
                          <option value="Communities">Communities</option>
                          <option value="Sustainable Projects">Sustainable Projects</option>

                        </select>

                      </div>
                      <div className="input-box mt-20 custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile04"
                          aria-describedby="inputGroupFileAddon04"
                          onChange={(e) => setMission({ ...mission, Image: (URL.createObjectURL(e.target.files[0])) })}

                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="file-input"
                          className="custom-file-upload custom-file-label btn_3"
                        >
                          <input
                            id="file-input"
                            type="file"
                            style={{ display: "none" }}
                            onInput={(e) => setMission({ ...mission, Image: (URL.createObjectURL(e.target.files[0])) })}

                          />
                          Update Profile Picture
                        </label>
                      </div>   
                      <Image
            src={`http://localhost:4000/uploads/${mission.Image}`}
            alt="orgLogo"
            fluid
          />

                    </Col>

                    <Col lg={12}>
                      <div className="input-box mt-20 mt-80 text-center">
                        <button className="main-btn" type="submit">
                          Update Mission
                        </button>
                      </div>




                    </Col>
                  </Row>
                </div>
              </form>
              <p className="form-message"></p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UpdateMissionArea;
