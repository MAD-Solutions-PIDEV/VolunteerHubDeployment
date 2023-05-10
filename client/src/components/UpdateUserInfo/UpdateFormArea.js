import handleSubmit from "utils/handleSubmit";
import React, { useState, useEffect } from "react";
import { exploreskills } from "data/UpdateArea";

import {
  updateUser,
  getUserById,
} from "../../BackEnd/Modules/services/userService";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
function NotificationBar({ message }) {
  return message ? (
    <div className="alert alert-success mt-3" role="alert">
      {message}
    </div>
  ) : null;
}
function sendNotification(newPhone) {
  axios
    .post("https://volunteerhub-backend.onrender.com/sms/sendNotification", {
      phone: newPhone,
    })
    .then((response) => {
      console.log("SMS notification sent");
    })
    .catch((error) => {
      console.error("Error sending SMS notification:", error);
    });
}
function UpdateFormArea() {
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [firstAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [languageSpoken, setlanguageSpoken] = useState({
    language: "",
    level: "",
  });

  const [level, setLevel] = useState("");
  const [language, setlanguage] = useState("");
  const [languages, setLanguages] = useState([]);

  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const { skill } = exploreskills;

  const [Skills, setSkills] = useState([]);

  const [address, setAddress] = useState({
    firstAddress: "",
    secondAddress: "",
    country: "",
    zipCode: "",
    state: "",
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("userId", id); // set the id in local storage
    const storedId = localStorage.getItem("userId"); // get the id from local storage
    console.log("Stored Id:", storedId); // log the stored id to the console
    getUserById(storedId)
      .then((res) => {
        if (res) {
          const user = res;
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setPhone(res.phone);
          setBirthday(res.birthday);
          setEmail(res.email);
          setImage(res.image);
          setPassword(res.password);
          setlanguage(res.languageSpoken[0].language);
          setLevel(res.languageSpoken[0].level);
          setFirstAddress(res.address[0].firstAddress);
          setSecondAddress(res.address[0].secondAddress);
          setState(res.address[0].state);
          setZipCode(res.address[0].zipCode);
          setCountry(res.address[0].country);
          setSkills(res.Skills);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        const allLanguages = data.reduce((acc, country) => {
          return [
            ...acc,
            ...country.languages.map((language) => language.name),
          ];
        }, []);
        const uniqueLanguages = [...new Set(allLanguages)];
        setLanguages(uniqueLanguages);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);
  const handleUpdate = () => {
    const updatedUser = {
      email,
      firstName,
      lastName,
      phone,
      gender,
      status,
      image,
      birthday,
      password,
      Skills,
      languageSpoken: [
        {
          language,
          level,
        },
      ],
      address: { firstAddress, secondAddress, country, zipCode, state },
    };

    updateUser(id, updatedUser)
      .then((res) => {
        console.log(res.data);
        const skillsSelected = [];
        for (let i = 0; i < res.data.Skills[0].selectedList.length; i++) {
          if (res.data.Skills[0].selectedList[i].skill) {
            skillsSelected.push(res.data.Skills[0].selectedList[i].skill);
          }
        }
        localStorage.setItem("skills", skillsSelected);
        window.scrollTo(0, 0);
        if (res.data.phone) {
          sendNotification(res.data.phone);
        }
        setNotification("Profile updated successfully"); // Set notification message on success
      })
      .catch((error) => {
        console.log(error.response.data);
        setNotification("An error occurred while updating profile"); // Set notification message on error
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };
  const handleSelectionChange = (event) => {
    const options = event.target.options;
    const Skills = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        Skills.push(options[i].value);
      }
    }
    setSkills(Skills);
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
              <form onSubmit={handleSubmit}>
                <div className="conact-form-item">
                  <Row>
                    <div className="input-box mt-0 mt-0 text-center form-label fw-bold">
                      <h1 class="display-8"> Profile Information</h1>
                    </div>

                    <Col className="form-label form-control form-group">
                      <div className="input-box mt-20">
                        <label htmlFor="firstname" className="form-label">
                          First Name :
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="lastname">Last Name :</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="email">Email Address :</label>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="phone">Phone Number :</label>
                        <input
                          type="phone"
                          placeholder="(xxx) xxx-xxxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="birthday">Birthday Date :</label>
                        <input
                          type="date"
                          placeholder="Birthday Date"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </div>

                      <div className="input-box mt-20">
                        <label htmlFor="language">Language Spoken :</label>
                        <select
                          value={language}
                          className="selectMissionLocation"
                          onChange={(e) => setlanguage(e.target.value)}
                          name="Language"
                        >
                          <option value="">Select a Language</option>
                          {languages.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className=" mt-20">
                        <label htmlFor="skills">Skills :</label>

                        <Multiselect
                          selectedValues={Skills.skill}
                          options={exploreskills}
                          displayValue="skill"
                          onSelect={(selectedList, selectedItem) => {
                            console.log(selectedList); // check the value of selectedList
                            setSkills({ selectedList });
                            console.log(Skills.SkillsRequired); // check the value of mission.SkillsRequired
                          }}
                          onRemove={(selectedList, removedItem) => {
                            console.log(selectedList); // check the value of selectedList
                            setSkills({ selectedList });
                            console.log(Skills); // check the value of mission.SkillsRequired
                          }}
                          onChange={handleSelectionChange}
                        />
                      </div>

                      <div className="input-box mt-20">
                        <label htmlFor="firstAddress">First Address :</label>
                        <input
                          type="text"
                          placeholder="First Address"
                          value={firstAddress}
                          onChange={(e) => setFirstAddress(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="secondAdress">Second Address :</label>
                        <input
                          type="text"
                          placeholder="Second Address"
                          value={secondAddress}
                          onChange={(e) => setSecondAddress(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="country">Country :</label>
                        <input
                          type="text"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="state">State :</label>
                        <input
                          type="text"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="zipcode">Zip Code :</label>
                        <input
                          type="number"
                          placeholder="Zip Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="zipcode">Password :</label>
                        <input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="input-box mt-20 custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile04"
                          aria-describedby="inputGroupFileAddon04"
                          onChange={(e) =>
                            setImage(URL.createObjectURL(e.target.files[0]))
                          }
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
                            onInput={(e) =>
                              setImage(URL.createObjectURL(e.target.files[0]))
                            }
                          />
                          Update Profile Picture
                        </label>
                      </div>
                      {image && <img src={image} alt="Selected image" />}
                    </Col>

                    <Col lg={12}>
                      <div className="input-box mt-20 mt-80 text-center">
                        <button className="main-btn" type="submit">
                          Update Profile
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
}

export default UpdateFormArea;
