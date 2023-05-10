
import handleSubmit from "utils/handleSubmit";
import React, { useState, useEffect } from "react";
import "./hostupdate.module.css";
import { updateUser, getUserById, updateHost, getRoleById } from "../../BackEnd/Modules/services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import axios from "axios";
function NotificationBar({ message }) {
    return message ? (
        <div className="alert alert-success mt-3" role="alert">
            {message}
        </div>
    ) : null;
}
function sendNotification(newPhone) {
    axios.post('http://localhost:4000/sms/sendNotification', {
        phone: newPhone
    })
        .then(response => {
            console.log('SMS notification sent');
        })
        .catch(error => {
            console.error('Error sending SMS notification:', error);
        });
}
function UpdateHostArea() {
    const { id } = useParams();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);

    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const [firstAddress, setFirstAddress] = useState("");
    const [secondAddress, setSecondAddress] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [languages, setLanguages] = useState([]);

    const [languageSpoken, setlanguageSpoken] = useState({
        language: "",
        level: ""
    });
    const [availableServices, setAvailableServices] = useState({
        accommodations: "",
        food: "",
        internet: false,
    });

    const [accommodations, setAccommodation] = useState('');
    const [food, setFood] = useState('');
    const [isInternetAvailable, setIsInternetAvailable] = useState(false);
    const [skills, setSkills] = useState("");
    const [level, setLevel] = useState("");
    const [language, setlanguage] = useState("");
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState({
        firstAddress: "",
        secondAddress: "",
        country: "",
        zipCode: "",
        state: "",
    });

    const [roles, setRole] = useState();
    const roleCheck = roles;
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [musicAllowed, setMusicAllowed] = useState(false);
    const [doesSmoke, setDoesSmoke] = useState(false);
    const [hasAnimals, setHasAnimals] = useState(false);
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
          const dataUrl = event.target.result;
          setImage(dataUrl); // convert the file object to a string
          setPreviewUrl(dataUrl);
        };
        reader.readAsDataURL(selectedFile);
      }
      
    useEffect(() => {
        if (availableServices) {
            setAccommodation(availableServices.accommodations);
            setFood(availableServices.food);
            setIsInternetAvailable(availableServices.internet);
        }
    }, [availableServices]);

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
                    setHasAnimals(res.hasAnimals);
                    setMusicAllowed(res.musicAllowed);
                    setDoesSmoke(res.doesSmoke);
                    setPassword(res.password);
                    setFirstAddress(res.address[0].firstAddress);
                    setSecondAddress(res.address[0].secondAddress);
                    setState(res.address[0].state);
                    setZipCode(res.address[0].zipCode);
                    setCountry(res.address[0].country);
                    //   setFood(res.availableServices[0].food);
                    //   setInternet(res.availableServices[0].internet);
                    const { accommodations, food, internet } = res.availableServices[0];
                    setAvailableServices({ accommodations, food, internet });
                    setlanguage(res.languageSpoken[0].language);
                    setLevel(res.languageSpoken[0].level);
                    setSkills(res.skills);
                    setRole(res.roles[0].name);

                }
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleUpdate = () => {
        const updatedHost = {
            email,
            firstName,
            lastName,
            phone,
            gender,
            status,
            image,
            birthday,
            password,
            musicAllowed,
            doesSmoke,
            hasAnimals,
            availableServices: [{
                accommodations,
                food,
                internet: isInternetAvailable,
            }],
            languageSpoken: [
                {
                    language,
                    level
                }
            ],
            skills,
            level,
            address: ({
                firstAddress,
                secondAddress,
                country,
                zipCode,
                state
            }),

        };

        updateHost(id, updatedHost)
            .then((res) => {

                console.log(res.data.roles[0]);
                window.scrollTo(0, 0);
                if (res.data.phone) { sendNotification(res.data.phone) }
                setNotification("Profile updated successfully");
                if (res) {
                    // const response =  fetch(`http://localhost:4000/user/role/${res.data.roles[0]}`); 
                    // const dataRole =  response;
                    // setRole(dataRole);
                    getRoleById(res.data.roles[0]).then((response) => {
                        localStorage.setItem("role", response.data.name);
                    })
                }

            })
            .catch((error) => {
                console.log(error);
                setNotification("An error occurred while updating profile");
            });

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
                                                    defaultValue={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-box mt-20">
                                                <label htmlFor="lastname">Last Name :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    defaultValue={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-box mt-20">
                                                <label htmlFor="email">Email Address :</label>
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    defaultValue={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>


                                            <div className="input-box mt-20">
                                                <label htmlFor="accomodation">Accommodations :</label>
                                                <textarea
                                                    type="text"
                                                    id="accommodation"
                                                    placeholder="Type of different Accomodation you provide"
                                                    value={accommodations}
                                                    // onChange={(e) =>
                                                    //     setAvailableServices({
                                                    //         ...availableServices,
                                                    //         accommodation: e.target.value,
                                                    //     })
                                                    // }
                                                    onChange={(e) => setAccommodation(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-box mt-20">
                                                <label htmlFor="food">Food:</label>
                                                <input
                                                    type="text"
                                                    id="food"
                                                    placeholder=""
                                                    value={food}
                                                    onChange={(e) =>
                                                        setAvailableServices({
                                                            ...availableServices,
                                                            food: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className=" mt-20">
                                                <label htmlFor="food">Internet :</label>
                                                <div className="my-checkbox">
                                                <label style={{ display: "block" }}>
                                                        <input
                                                            type="checkbox"
                                                            value="true"
                                                            className="my-checkbox"

                                                            checked={isInternetAvailable}
                                                            onChange={() => setIsInternetAvailable(true)}
                                                        />
                                                        Available
                                                    </label>
                                                    <label style={{ display: "block" }}>
                                                        <input
                                                            type="checkbox"
                                                            className="my-checkbox"


                                                            value="false"
                                                            checked={!isInternetAvailable}
                                                            onChange={() => setIsInternetAvailable(false)}
                                                        />
                                                        Not Available
                                                    </label>

                                                </div>
                                            </div>


                                            <div className="mt-20">
                                                <label htmlFor="others"> A little more information : </label>
                                                <div className="my-checkbox-x2">
                                                <label style={{ display: "block" }}>
                                                        <input
                                                            type="checkbox"
                                                            className="my-checkbox-x2"



                                                            checked={hasAnimals}
                                                            onChange={(e) => setHasAnimals(e.target.checked)}
                                                        />We have pets
                                                    </label>
                                                    <label style={{ display: "block" }}>
                                                        <input
                                                            type="checkbox"
                                                            className="my-checkbox-x2"


                                                            checked={doesSmoke}
                                                            onChange={(e) => setDoesSmoke(e.target.checked)}
                                                        />We are smokers
                                                      
                                                    </label>
                                                    <label style={{ display: "block" }}>
                                                        <input
                                                            className="my-checkbox-x2"


                                                            type="checkbox"
                                                            checked={musicAllowed}
                                                            onChange={(e) => setMusicAllowed(e.target.checked)}
                                                        />
                                                        Music is allowed
                                                    </label>


                                                </div>
                                            </div>



                                            {/* <div className="input-box mt-20">
                                                <label htmlFor="languageSpoken">Language Spoken :</label>
                                                <input
                                                    type="languageSpoken"
                                                    placeholder=""
                                                    value={language}
                                                    onChange={(e) => setlanguage(e.target.value)}
                                                />
                                            </div> */}
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
                                                        <option key={language} value={language}>{language}</option>
                                                    ))}
                                                </select>
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
                                            {/* <div className="input-box mt-20">
                                                <label htmlFor="zipcode">Password :</label>
                                                <input
                                                    type="password"
                                                    placeholder="Password"

                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div> */}

                                             <div className="input-box mt-20 custom-file">
                                                <input
                                                    type="file"
                                                    class="custom-file-input"
                                                    id="inputGroupFile04"
                                                    aria-describedby="inputGroupFileAddon04"
                                                    onChange={(e) => {
                                                        handleFileChange(e);} }
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
                                            {image && <img src={image} alt="Selected image"  />}  

{/* 
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
                                                        onChange={(e) => {
                                                            handleFileChange(e);
                                                        }}
                                                        name="image"
                                                    />
                                                </label>
                                            </div> */}
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
};

export default UpdateHostArea;
