import { aboutIntroduction } from "data/aboutArea";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./profile.module.css";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";

import { getUserById } from "../../BackEnd/Modules/services/userService";
import { Col, Container, Image, Row, TabContainer } from "react-bootstrap";
import VisibilityCountUp from "../Reuseable/VisibilityCountUp";
import UserRank from "components/UserRank/userRank";
import axios from "axios";

import OrganizationService from "services/organizationService";
import OrganizationItem from "components/Organization/OrganizationArea/OrganizationItem";

const { thumb } = aboutIntroduction;

const ProfileIntroduction = () => {
  const { id } = useParams();

  const [hasOrganizationRole, setHasOrganizationRole] = useState(false);
  //for rank

  const [userId, setUserId] = useState("");
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
  const [languageSpoken, setlanguageSpoken] = useState("");
  const [musicAllowed, setMusicAllowed] = useState(false);
  const [doesSmoke, setDoesSmoke] = useState(false);
  const [hasAnimals, setHasAnimals] = useState(false);
  const [level, setLevel] = useState("");
  const [availableServices, setAvailableServices] = useState({
    accommodations: "",
    food: "",
    internet: false,
  });

  const [skillsSelected, setSkills] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [roles, setRole] = useState("");

  const [accommodations, setAccommodation] = useState("");
  const [food, setFood] = useState("");
  const [isInternetAvailable, setIsInternetAvailable] = useState(false);
  const [address, setAddress] = useState({
    firstAddress: "",
    secondAddress: "",
    country: "",
    zipCode: "",
    state: "",
  });

  const [authenticated, setAuthenticated] = useState(false);

  const [notification, setNotification] = useState(null);
  const [organizations, setOrganizations] = useState();
  const navigate = useNavigate();
  const navigateToUpdate = () => {
    window.scrollTo(0, 0);
    navigate(`/${id}/profile`);
  };
  const navigateToUpdatehost = () => {
    window.scrollTo(0, 0);
    navigate(`/${id}/updatehost`);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.roles.includes("ROLE_ORGANIZATION") && user.id == id) {
        setHasOrganizationRole(true);
      }
    }
  }, []);
  console.log(hasOrganizationRole);
  useEffect(() => {
    if (availableServices) {
      setAccommodation(availableServices.accommodations);
      setFood(availableServices.food);
      setIsInternetAvailable(availableServices.internet);
    }
  }, [availableServices]);

  useEffect(() => {
    async function fetchOrg() {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      console.log(loggedUser.id);
      const response = await axios.get(
        `https://volunteerhub-backend.onrender.com/org/${loggedUser.id}`
      );
      //console.log("resp" + response.data.organizations);
      setOrganizations(response.data.organizations);
    }
    fetchOrg();
  }, []);
  useEffect(() => {
    localStorage.setItem("userId", id); // set the id in local storage
    const storedId = localStorage.getItem("userId"); // get the id from local storage
    console.log("Stored Id:", storedId); // log the stored id to the console
    getUserById(storedId)
      .then((res) => {
        if (res) {
          if (res.Skills[0] != null) {
            const skillsSelected = [];
            for (let i = 0; i < res.Skills[0].selectedList.length; i++) {
              if (res.Skills[0].selectedList[i].skill) {
                skillsSelected.push(res.Skills[0].selectedList[i].skill + " ");
              }
            }
            console.log("skillsSelected", skillsSelected);
            setSkills(skillsSelected);
          }

          const user = res;
          setUserId(res._id);
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setPhone(res.phone);
          setBirthday(res.birthday);
          setEmail(res.email);
          setImage(res.image);
          setHasAnimals(res.hasAnimals);
          setDoesSmoke(res.doesSmoke);
          setMusicAllowed(res.musicAllowed);
          setPassword(res.password);
          setFirstAddress(res.address[0].firstAddress);
          setSecondAddress(res.address[0].secondAddress);
          setState(res.address[0].state);
          setZipCode(res.address[0].zipCode);
          setCountry(res.address[0].country);
          setRole(res.roles[0].name);
          setlanguageSpoken(res.languageSpoken[0].language);
          setLevel(res.languageSpoken[0].level);
          const { accommodations, food, internet } = res.availableServices[0];
          setAvailableServices({ accommodations, food, internet });
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  const roleCheck = roles;
  const userRole = "ROLE_HOST";
  const storedRole = localStorage.getItem("role");
  const storedId = localStorage.getItem("storedId");
  const [MySkill, setMySkill] = useState("");

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
      address: {
        firstAddress,
        secondAddress,
        state,
        zipCode,
        country,
      },
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
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

  return (
    <Container className="mt-100 mr-55 pb-100">
      <Col lg={4}>
        <h4 className={styles.left}>Profile Image</h4>
        {image && (
          <img
            src={image}
            alt="Selected image"
            style={{
              width: "250px",
              height: "250px",
              padding: "10px",
            }}
          />
        )}
        <div className="mr-100 mb-20 mt-0  text-center col-lg-6">
          {/* <img  src={`https://volunteerhub-backend.onrender.com/uploads/${image}`} /> */}

          {/* <div className="project-details-thumb">
              <Image
                src={`https://volunteerhub-backend.onrender.com/uploads/${image}`}
                alt=""
              />
            </div> */}
          <div> </div>
        </div>
      </Col>
      <Col lg={8}>
        <div className="box mr-10">
          <div className="css-kss74r">
            <div className="css-g1xqnr">
              <div className="css-gloz19">
                <div className="MuiBox-root css-1fvlgvw">
                  <div className="MuiContainer-root MuiContainer-maxWidthLg css-1qsxih2">
                    <div className="MuiGrid-root MuiGrid-container css-z4nnce">
                      <div className="MuiGrid-root MuiGrid-container MuiGrid-grid-sm-6 css-pihdmr">
                        <div className="MuiGrid-root MuiGrid-item css-1wxaqej"></div>
                        <div className="MuiGrid-root MuiGrid-item css-z3igbn"></div>
                      </div>
                      <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">
                        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 css-iol86l">
                          <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-i3zds5">
                            <div className="MuiCardHeader-root css-10m27lh">
                              <div className="MuiCardHeader-content css-11qjisw">
                                <h4 className={styles.left}>About</h4>
                              </div>
                              <div className={styles.left}>
                                <div className="MuiCardContent-root css-1gwtzwe">
                                  <section className="container about col-lg-12">
                                    <div className="row align-items-start">
                                      <div className="col">
                                        <table className="MuiTable-root css-1hw5bcm">
                                          <tbody className="MuiTableBody-root css-1xnox0e">
                                            <tr className="MuiTableRow-root css-1wcs08e">
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  First Name
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {firstName}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Last Name
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {lastName}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Date of birth
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {birthday}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Email
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {email}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Phone Number
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {phone}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr>
                                              <td>
                                                <div>
                                                  {roleCheck === "volunteer" ? (
                                                    <tr className={styles.left}>
                                                      <td
                                                        className={styles.left}
                                                      >
                                                        <h6
                                                          className={
                                                            styles.left
                                                          }
                                                        >
                                                          Skills
                                                        </h6>
                                                      </td>
                                                      <td
                                                        className={styles.left}
                                                      >
                                                        <p
                                                          className={
                                                            styles.display
                                                          }
                                                        >
                                                          <div>
                                                            {" "}
                                                            {
                                                              skillsSelected
                                                            }{" "}
                                                          </div>
                                                        </p>
                                                      </td>
                                                    </tr>
                                                  ) : (
                                                    <p></p>
                                                  )}
                                                </div>
                                              </td>
                                            </tr>
                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Language Spoken
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {languageSpoken}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  First Address
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  <input
                                                    type="text"
                                                    id="firstAddress"
                                                    name="firstAddress"
                                                    value={firstAddress}
                                                    onChange={(e) =>
                                                      setAddress({
                                                        ...address,
                                                        firstAddress:
                                                          e.target.value,
                                                      })
                                                    }
                                                  />
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Second Address
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  <input
                                                    type="text"
                                                    id="secondAddress"
                                                    name="secondAddress"
                                                    value={secondAddress}
                                                    onChange={(e) =>
                                                      setAddress({
                                                        ...address,
                                                        secondAddress:
                                                          e.target.value,
                                                      })
                                                    }
                                                  />
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Country
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {country}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  State
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {state}
                                                </p>
                                              </td>
                                            </tr>

                                            <tr className={styles.left}>
                                              <td className={styles.left}>
                                                <h6 className={styles.left}>
                                                  Zip Code
                                                </h6>
                                              </td>
                                              <td className={styles.left}>
                                                <p className={styles.left}>
                                                  {zipCode}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>

                                        <tr>
                                          <td>
                                            <div>
                                              {roleCheck === "host" ? (
                                                <tbody className="MuiTableBody-root css-1xnox0e">
                                                  <tr>
                                                    <td className={styles.left}>
                                                      <h6
                                                        className={styles.left}
                                                      >
                                                        Accommodations Services
                                                      </h6>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.profileacc
                                                      }
                                                    >
                                                      <p
                                                        className={
                                                          styles.profileacc
                                                        }
                                                      >
                                                        {accommodations}
                                                      </p>
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <td className={styles.left}>
                                                      <h6
                                                        className={styles.left}
                                                      >
                                                        Food Services
                                                      </h6>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.profileacc
                                                      }
                                                    >
                                                      <p
                                                        className={
                                                          styles.profileacc
                                                        }
                                                      >
                                                        {food}
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td className={styles.left}>
                                                      <h6
                                                        className={styles.left}
                                                      >
                                                        Internet
                                                      </h6>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.profileacc
                                                      }
                                                    >
                                                      <p
                                                        className={
                                                          styles.profileacc
                                                        }
                                                      >
                                                        {availableServices.internet
                                                          ? "Available"
                                                          : "Not available"}
                                                      </p>
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <td className={styles.left}>
                                                      <h6
                                                        className={styles.left}
                                                      >
                                                        Animals
                                                      </h6>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.profileacc
                                                      }
                                                    >
                                                      <p
                                                        className={
                                                          styles.profileacc
                                                        }
                                                      >
                                                        {hasAnimals
                                                          ? "Has pets"
                                                          : "Does not have pets"}
                                                      </p>
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <td className={styles.left}>
                                                      <h6
                                                        className={styles.left}
                                                      >
                                                        Music
                                                      </h6>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.profileacc
                                                      }
                                                    >
                                                      <p
                                                        className={
                                                          styles.profileacc
                                                        }
                                                      >
                                                        {musicAllowed
                                                          ? "Allowed"
                                                          : "Not allowed"}
                                                      </p>
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <td className={styles.left}>
                                                      <h6
                                                        className={styles.left}
                                                      >
                                                        Smoking habits
                                                      </h6>
                                                    </td>
                                                    <td
                                                      className={
                                                        styles.profileacc
                                                      }
                                                    >
                                                      <p
                                                        className={
                                                          styles.profileacc
                                                        }
                                                      >
                                                        {doesSmoke
                                                          ? "Does smoke"
                                                          : "Does not smoke"}
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              ) : (
                                                <p></p>
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <form onSubmit={handleSubmit}> */}
                          {/* <Container>
          <Row className="ml-150"> */}
                          {/* <Col lg={8}> */}
                          {hasOrganizationRole && <h4>My Organizations</h4>}
                          {hasOrganizationRole && (
                            <div className="mt-200">
                              <div className={`team-main-area ${""}`}>
                                {organizations ? (
                                  <Container>
                                    <Row className="justify-content-center">
                                      {organizations.map((org) => (
                                        <OrganizationItem
                                          key={org._id}
                                          organization={org}
                                        />
                                      ))}
                                    </Row>
                                  </Container>
                                ) : (
                                  <div>Loading organizations...</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Col lg={5}>
                  <div> </div>
                  {storedId === userId ? (
                    roleCheck === "host" ? (
                      <button
                        className="btn btn-primary mt-100 "
                        type="submit"
                        onClick={navigateToUpdatehost}
                      >
                        <i className="fa fa-edit mr-10"></i>
                        Update Profile
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mt-100 "
                        type="submit"
                        onClick={navigateToUpdate}
                      >
                        <i className="fa fa-edit mr-10"></i>
                        Update Profile
                      </button>
                    )
                  ) : null}
                </Col>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default ProfileIntroduction;
