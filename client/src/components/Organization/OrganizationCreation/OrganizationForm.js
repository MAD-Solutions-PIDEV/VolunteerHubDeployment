import handleSubmit from "utils/handleSubmit";
import React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Title from "components/Reuseable/Title";
import styles from "./organization.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import * as yup from "yup";

const OrganizationFormArea = () => {
  //validation schema

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    website: yup
      .string()
      .url("Invalid URL format")
      .required("Website is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be at most 1000 characters"),
    phone: yup
      .string()
      .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number")
      .required("Phone number is required"),

    firstAddress: yup.string().required("Address is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup.string().required("Zip code is required"),
    state: yup.string().required("State is required"),

    issues: yup.array().min(2, "At least two issues are required"),
    logo: yup.mixed().test("file-selected", "Please select a file", (value) => {
      if (logo) {
        return true;
      }
      return !!value && !!value.length;
    }),
  });

  // Validate Wallet Address
  const checkWallet = async ({ setError, addr }) => {
    try {
      ethers.utils.getAddress(addr);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  let errorCheck = "";
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(wallet);
    if (isWallet) {
      await checkWallet({
        setError,
        addr: wallet,
      });
    } else {
      setError("");
    }
    console.log("error", error);
    errorCheck = error;
    console.log("errorCheck", errorCheck);

    // Validate the form data using Yup
    try {
      await validationSchema.validate(
        {
          name,
          email,
          website,
          description,
          phone,
          firstAddress,
          country,
          zipCode,
          state,
          issues,
        },
        { abortEarly: false } // Validate all fields and return all errors
      );

      // Submit the form data to the server...
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const formData = new FormData();
      console.log(email);
      formData.append("email", email);
      formData.append("website", website);
      formData.append("name", name);
      formData.append("logo", logo);
      formData.append("description", description);
      formData.append(
        "address",
        JSON.stringify({ firstAddress, secondAddress, country, zipCode, state })
      );
      formData.append("issues", JSON.stringify(issues));
      formData.append("category", category);
      formData.append("phone", phone);
      formData.append("owner", userId);
      formData.append("wallet", wallet || "");
      if (errorCheck === "") {
        axios
          .post(
            "https://volunteerhub-backend.onrender.com/organizations/addOrg",
            formData
          )
          .then((res) => {
            console.log(res.data);
            if (res.status == "201") {
              navigate("/organization/pending");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      // Handle the validation errors
      const errors = {};
      err.inner.forEach((e) => (errors[e.path] = e.message));
      setFormErrors(errors);
    }
  };

  const [formErrors, setFormErrors] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("NGO");
  const [phone, setPhone] = useState();
  const [issues, setIssues] = useState([]);
  const [firstAddress, setFirstAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [isWallet, setIsWallet] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false); // new state to track success

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    // Create a FileReader object
    const reader = new FileReader();
    // Set up a callback function to run when the FileReader loads the file
    reader.onload = function (event) {
      setLogo(selectedFile);
      setPreviewUrl(event.target.result);
    };
    // Read the file as a data URL
    reader.readAsDataURL(selectedFile);
  }
  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    }
    fetchCountries();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentTag.trim() !== "") {
        setIssues([...issues, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const handleTagDelete = (index) => {
    const newTags = [...issues];
    newTags.splice(index, 1);
    setIssues(newTags);
  };

  const handleWalletChange = (event) => {
    setIsWallet(event.target.value === "wallet");
    if (isWallet) {
      setError("");
    }
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    validationSchema
      .validateAt("state", { state: event.target.value })
      .then(() => setFormErrors((prevErrors) => ({ ...prevErrors, state: "" })))
      .catch((error) =>
        setFormErrors((prevErrors) => ({ ...prevErrors, state: error.message }))
      );
  };

  return (
    <section className="contact-form-area">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Title tagline="Join our organizations"></Title>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
            <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
              <div className="conact-form-item">
                <Row>
                  <Col>
                    <div className="input-box mt-20">
                      <input
                        type="text"
                        placeholder="Organization Name"
                        name="name"
                        onChange={(e) => {
                          setName(e.target.value);
                          handleStateChange(e);
                        }}
                      />
                      {formErrors.name && name == "" && (
                        <div className="text-danger">{formErrors.name}</div>
                      )}
                    </div>
                    <div className="input-box mt-20">
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          handleStateChange(e);
                        }}
                      />
                      {formErrors.email && (
                        <div className="text-danger">{formErrors.email}</div>
                      )}
                    </div>
                    <div className="input-box mt-20">
                      <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        onChange={(e) => {
                          setWebsite(e.target.value);
                          handleStateChange(e);
                        }}
                      />
                      {formErrors.website && (
                        <div className="text-danger">{formErrors.website}</div>
                      )}
                    </div>
                    <div className="input-box mt-20">
                      <textarea
                        id="#"
                        cols="30"
                        rows="10"
                        placeholder="Description"
                        name="description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                          handleStateChange(e);
                        }}
                      ></textarea>
                      {formErrors.description && (
                        <div className="text-danger">
                          {formErrors.description}
                        </div>
                      )}
                    </div>
                    <div className="input-box mt-20">
                      <PhoneInput
                        placeholder="Phone number"
                        value={phone}
                        name="phone"
                        onChange={(value, country, event) => {
                          setPhone(value);
                        }}
                      />
                      {formErrors.phone && phone !== "" && (
                        <div className="text-danger">{formErrors.phone}</div>
                      )}
                    </div>

                    <div className="input-box mt-20">
                      <input
                        type="text"
                        placeholder="First address"
                        name="firstAddress"
                        required
                        onChange={(e) => {
                          setFirstAddress(e.target.value);
                          handleStateChange(e);
                        }}
                      />
                      {formErrors.firstAddress && (
                        <div className="text-danger">
                          {formErrors.firstAddress}
                        </div>
                      )}
                    </div>
                    <div className="input-box mt-20">
                      <input
                        type="text"
                        placeholder="Second address"
                        name="secondAddress"
                        onChange={(e) => {
                          setSecondAddress(e.target.value);
                          handleStateChange(e);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <div className="input-box mt-20">
                    <input
                      type="text"
                      placeholder="state"
                      name="state"
                      required
                      onChange={(e) => {
                        setState(e.target.value);
                        handleStateChange(e);
                      }}
                    />
                    {formErrors.state && (
                      <div className="text-danger">{formErrors.state}</div>
                    )}
                  </div>
                </Row>
                <Row className="justify-content-center">
                  <Col>
                    <div className="input-box mt-20">
                      <input
                        type="number"
                        placeholder="Zip Code"
                        name="zipCode"
                        required
                        onChange={(e) => {
                          setZipCode(e.target.value);
                          handleStateChange(e);
                        }}
                      />
                      {formErrors.zipCode && (
                        <div className="text-danger">{formErrors.zipCode}</div>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {country && (
                        <img
                          src={countries.find((c) => c.name === country).flag}
                          alt="Selected country flag"
                          style={{ marginRight: "10px", width: "30px" }}
                        />
                      )}
                      <select
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          handleStateChange(e);
                        }}
                        name="country"
                        style={{
                          width: "100%",
                          height: "70px",
                          background: "#f7f7f9",
                          borderRadius: "0px",
                          border: "0",
                          paddingLeft: "30px",
                          color: "#838694",
                          fontWeight: "400",
                          fontSize: "16px",
                          textTransform: "capitalize",
                          marginTop: "20px",
                        }}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.alpha2Code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formErrors.country && (
                      <div className="text-danger">{formErrors.country}</div>
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col>
                    <div className="input-box mt-20">
                      <table>
                        <tr>
                          <td>
                            <label>Wallet</label>
                            <div
                              style={{
                                display: "flex",
                                fontSize: "30px",
                                top: "14px",
                                position: "relative",
                              }}
                            >
                              <input
                                align="right"
                                type="radio"
                                name="wallet"
                                value="nowallet"
                                data-icon=""
                                onChange={handleWalletChange}
                                style={{ backgroundColor: "#ffffff00" }}
                              />
                              <input
                                type="radio"
                                name="wallet"
                                value="wallet"
                                data-icon=""
                                onChange={handleWalletChange}
                                style={{ backgroundColor: "#ffffff00" }}
                              />
                            </div>
                          </td>
                          <td
                            style={{
                              height: "50px",
                              verticalAlign: "bottom",
                            }}
                            align="right"
                          >
                            {isWallet && (
                              <>
                                <label htmlFor="price"></label>
                                <input
                                  style={{ width: "18.5rem" }}
                                  type="text"
                                  placeholder="Wallet Address"
                                  name="addr"
                                  onChange={(e) => {
                                    setWallet(e.target.value);
                                    setError("");
                                    handleStateChange(e);
                                  }}
                                />
                              </>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="50%"
                            style={{
                              height: "50px",
                              verticalAlign: "top",
                              textAlign: "left",
                            }}
                          >
                            {formErrors.wallet && (
                              <div className="text-danger">
                                {formErrors.wallet}
                              </div>
                            )}
                          </td>
                          <td
                            width="50%"
                            style={{
                              height: "50px",
                              verticalAlign: "top",
                              textAlign: "left",
                            }}
                            align="center"
                          >
                            {error && (
                              <div
                                className="text-danger"
                                style={{
                                  right: "-0.7rem",
                                  position: "relative",
                                }}
                              >
                                {error
                                  .substring(0, 15)
                                  .charAt(0)
                                  .toUpperCase() +
                                  error.substring(0, 15).slice(1)}
                              </div>
                            )}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Col>
                </Row>
                <div className={styles.tagInputContainer}>
                  <div className="input-box mt-20">
                    <input
                      type="text"
                      placeholder="Enter an issue as a tag and press Enter"
                      value={currentTag}
                      onChange={(e) => {
                        setCurrentTag(e.target.value);
                      }}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className={styles.tagList}>
                    {issues.map((tag, index) => (
                      <span
                        key={index}
                        className={styles.tag}
                        onClick={() => handleTagDelete(index)}
                      >
                        {tag} x
                      </span>
                    ))}
                  </div>
                  {formErrors.issues && issues.length < 2 && (
                    <div className="text-danger">
                      {2 - issues.length} remaining issue(s) required
                    </div>
                  )}
                </div>
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
                      name="logo"
                    />
                  </label>
                  {formErrors.logo && (
                    <div className="text-danger">{formErrors.logo}</div>
                  )}
                </div>
              </div>
            </form>
          </Col>
          <Col lg={12}>
            <div className="input-box mt-20 text-center">
              <button
                id="submit"
                className="main-btn"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OrganizationFormArea;
