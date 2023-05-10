
import React, { useState, useEffect } from "react";
import { updateUser, getUserById } from "../../BackEnd/Modules/services/userService";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import { exploreskills } from "data/UpdateArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addMission, getMissionById } from "BackEnd/Modules/services/missionService";
import styles from '../MissionArea/MissionDetails/mission.module.css'
import Multiselect from "multiselect-react-dropdown";
function NotificationBar({ message, isError }) {
  if (message) {
    return (
      <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
        {message}
      </div>
    );
  }
  return null;
}

const storedId = localStorage.getItem("storedId"); // get the id from local storage


const AddMissionArea = () => {


 




  const [missionData, setMissionData] = useState({
    Title: '',
    Category: '',
    Description: '',
    SkillsRequired: [],
    LanguageRequired: '',
    StartDate: '',
    EndDate: '',
    Location: '',
    AddedBy: storedId,
  });
  
  const formData = new FormData();
  formData.append("Title", missionData.Title);
  formData.append("Category", missionData.Category);
  formData.append("Description", missionData.Description);
  formData.append("SkillsRequired", JSON.stringify(missionData.SkillsRequired));
  formData.append("LanguageRequired", missionData.LanguageRequired);
  formData.append("StartDate", missionData.StartDate);

  formData.append("EndDate", missionData.EndDate);
  formData.append("Image", missionData.Image);

  formData.append("Location", missionData.Location);
  formData.append("AddedBy", missionData.AddedBy);

  
  const [Image, setImage] = useState(null);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    // Create a FileReader object
    const reader = new FileReader();
    // Set up a callback function to run when the FileReader loads the file
    reader.onload = function (event) {
      setImage(selectedFile);
      setPreviewUrl(event.target.result);
    };
    // Read the file as a data URL
    reader.readAsDataURL(selectedFile);
  }


  const [notification, setNotification] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();



  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    // Create a FileReader object
    const reader = new FileReader();
    // Set up a callback function to run when the FileReader loads the file
    reader.onload = function (event) {
      setMissionData({...missionData, Image: selectedFile});
      setPreviewUrl(event.target.result);
    };
    // Read the file as a data URL
    reader.readAsDataURL(selectedFile);
  }

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
        console.log("skill", SkillsRequired);
      }
    }
    setMissionData(SkillsRequired);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date();


    if (new Date(missionData.StartDate) < currentDate) {

      window.scrollTo(0, 0);
      setNotification({ message: "Start Date must be after today's date", isError: true });
      return;
    }
    if (new Date(missionData.EndDate) < new Date(missionData.StartDate)) {

      window.scrollTo(0, 0);
      setNotification({ message: "End Date must be after Start Date", isError: true });
      return;
    }

    const lettersRegex = /^[a-zA-Z\s]*$/;

   

    if (!missionData.Title.match(lettersRegex) || missionData.Title.length < 3 || missionData.Title.length > 50) {
      window.scrollTo(0, 0);
      let message;
      if (!missionData.Title.match(lettersRegex)) {
        message = "Title can only contain letters and spaces";
      } else if (missionData.Title.length < 3) {
        message = "Title must be at least 10 characters long";
      } else {
        message = "Title must be at most 50 characters long";
      }
      setNotification({ message, isError: true });
      return;
    }

    if (missionData.Description.length > 800) {
      window.scrollTo(0, 0);
      setNotification({ message: "Description must not exceed 800 characters", isError: true });
      return;
    }

    if (!missionData.Location.match(/^[a-zA-Z\s]*$/)) {
      window.scrollTo(0, 0);
      setNotification({ message: "Location can only contain letters and spaces", isError: true });
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/missions', formData);
      console.log(res.data);
      window.scrollTo(0, 0);
      setNotification({ message: 'Mission created successfully!', isError: false });
      // handle successful submission
    } catch (err) {
      console.log(err);
      setNotification({ message: 'Failed to create mission!', isError: true });
      // handle error
    }
  };
  useEffect(() => {
    const storedId = localStorage.getItem("storedId"); // check if user id exists
    if (storedId) {
      setAuthenticated(true);
    } else {
      navigate("/login"); // redirect to login page if user is not authenticated
    }
  }, [navigate]);

  if (!authenticated) {
    navigate("/login");
    return null;
  }
  const handleChange = (e) => {
    setMissionData({
      ...missionData
    });
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
              <NotificationBar message={notification?.message} isError={notification?.isError} />{" "}
              {/* Render notification bar */}
              <form onSubmit={handleSubmit}>
                <div className="conact-form-item">
                  <Row>
                    <div className="input-box mt-0 mt-0 text-center form-label fw-bold">
                      <h1 className="display-8"> Mission Information</h1>
                    </div>

                    <Col className="form-label form-control form-group">
                      <div className="input-box mt-20">
                        <label htmlFor="title" className="form-label">
                          Title :</label>

                        <input
                          type="text"
                          placeholder="Title"
                          defaultValue={missionData.Title}

                          onChange={(e) => setMissionData({ ...missionData, Title: e.target.value })}
                        />

                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="description">Description :</label>
                        <input
                          name="description"
                          type="text"
                          placeholder="Description" defaultValue={missionData.Description}
                          onChange={(e) => setMissionData({ ...missionData, Description: e.target.value })}
                        />
                      </div>

                      {/* <div className="input-box mt-20">
                        <label htmlFor="languageRequired">Language Required :</label>
                        <input
                          name="languageRequired"
                          type="text"
                          placeholder="Language required" defaultValue={missionData.LanguageRequired}
                          onChange={(e) => setMissionData({ ...missionData, LanguageRequired: e.target.value })}
                        />
                      </div> */}
                      

                      <div className="input-box mt-20">
                        <label htmlFor="skills">Skills :</label>
                        <Multiselect
                          selectedValues={missionData.SkillsRequired.skill}
                          options={exploreskills}
                          displayValue="skill"
                          onSelect={(selectedList, selectedItem) => {
                            console.log(selectedList); // check the value of selectedList
                            setMissionData({ ...missionData, SkillsRequired: selectedList });
                            console.log(missionData.SkillsRequired); // check the value of mission.SkillsRequired
                          }}
                          onRemove={(selectedList, removedItem) => {
                            console.log(selectedList); // check the value of selectedList
                            setMissionData({ ...missionData, SkillsRequired: selectedList });
                            console.log(missionData.SkillsRequired); // check the value of mission.SkillsRequired
                          }}
                          onChange={handleSelectionChange}
                        // onChange={(e) => {
                        //   setMission((...mission) => {
                        //     return { ...mission, SkillsRequired: e.target.value };
                        //   });
                        // }}
                        />
                      </div>


                      <div className="input-box mt-20">
                        <label htmlFor="startDate">Start Date :</label>
                        <input
                          name="startdate"
                          type="date"
                          placeholder="Start Date" defaultValue={missionData.StartDate}
                          onChange={(e) => setMissionData({ ...missionData, StartDate: e.target.value })}
                        />
                      </div>

                      <div className="input-box mt-20">
                        <label htmlFor="endDate">End Date :</label>
                        <input
                          name="enddate"
                          type="date"
                          placeholder="End Date" defaultValue={missionData.EndDate}
                          onChange={(e) => setMissionData({ ...missionData, EndDate: e.target.value })}
                        />
                      </div>


                     


                        <div className="input-box mt-20">

                          <label htmlFor="location">Location :</label>
                          <select
                            className={styles.selectMission}
                            onChange={(e) => setMissionData({ ...missionData, Location: e.target.value })}
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

                        <div className="input-box mt-7">
                        <label htmlFor="language">Language Required :</label>
                        <select
                          className={styles.selectMission} defaultValue={missionData.LanguageRequired}
                          onChange={(e) => setMissionData({ ...missionData, LanguageRequired: e.target.value })}
                          name="Language"
                        >
                          <option value="">Select a Language</option>
                          {languages.map((language) => (
                            <option key={language} value={language}>{language}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input-box mt-7">


                        <label htmlFor="category">Category:</label>
                        <select
                          className="selectview"
                          placeholder="Category"
                          value={missionData.Category}
                          onChange={(e) => setMissionData({ ...missionData, Category: e.target.value })}
                        >
                          <option value="School">School</option>
                          <option value="Family">Family</option>
                          <option value="NGO">NGO</option>
                          <option value="Nature">Nature</option>
                          <option value="Communities">Communities</option>
                          <option value="Sustainable Projects">Sustainable Projects</option>

                        </select>

                      </div>
                      
                       {/* <div className="input-box mb-30 mt-40 custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile04"
                          aria-describedby="inputGroupFileAddon04"
                          onChange={(e) => setMissionData({ ...missionData, Image:(URL.createObjectURL(e.target.files[0]))})}
  
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="file-input"
                          className="custom-file-upload"
                          class="custom-file-label btn_3"
                        >
                          <input
                            id="file-input"
                            type="file"
                            style={{ display: "none" }}
                            onInput={(e) => setMissionData({ ...missionData, Image:(URL.createObjectURL(e.target.files[0]))})}
                            
                          />
                          Upload Mission Picture
                        </label>
                      </div>
                      {missionData.Image && <img src={missionData.Image} alt="Selected Image" />} */}
                      <div>
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        )}
                        <label htmlFor="image-upload">
                          Upload an image:
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            name="image"
                          />
                        </label>
                      </div>

                      {/* {previewUrl && !missionData.Image && (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                      {!previewUrl && missionData.Image && (
                        <img
                          src={`http://localhost:4000/images/${missionData.Image}`}
                          alt="Current Image"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                      <label htmlFor="image-upload">
                        {missionData.Image ? "Update Image" : "Upload an image"}
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          name="Image"
                        />
                      </label>
                      {formErrors.Image && (
                        <div className="text-danger">{formErrors.Image}</div>
                      )}*/}


                    </Col> 

                    <Col lg={12}>
                      <div className="input-box mt-20 mt-80 text-center">
                        <button className="main-btn" type="submit"  >
                          Add Mission
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

export default AddMissionArea;
