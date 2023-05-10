import handleSubmit from "utils/handleSubmit";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "components/Reuseable/Title";
import axios from "axios";
import styles from "./style.module.css";
import classNames from "classnames";
import Select from 'react-select';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import EventService from "services/event.service";
import {  useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Style
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "26.7rem",
    height: "70px",
    background: "#f7f7f9",
    borderRadius: "0px",
    border: "0",
    paddingLeft: "30px",
    color: "#838694",
    fontWeight: 400,
    fontSize: "16px",
    textTransform: "capitalize"
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#838694",
    background: state.isSelected ? "#2083ff" : "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    textTransform: "capitalize",
    cursor: "pointer"
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#838694",
    fontWeight: 400,
    fontSize: "16px",
    textTransform: "capitalize"
  })
};

const SDGList = [
  {
    value: 'SDG1',
    label: 'No Poverty',
    description: 'End poverty in all its forms everywhere',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/Goal%201%20Box%20fr.png'
  },
  {
    value: 'SDG2',
    label: 'Zero Hunger',
    description: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
    image: '	https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-02.png'
  },
  {
    value: 'SDG3',
    label: 'Good Health and Well-being',
    description: 'Ensure healthy lives and promote well-being for all at all ages',
    image: '	https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-03.png'
  },
  {
    value: 'SDG4',
    label: 'Quality Education',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-04.png'
  },
  {
    value: 'SDG5',
    label: 'Gender Equality',
    description: 'Achieve gender equality and empower all women and girls',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F_SDG_PRINT-05.jpg'
  },
  {
    value: 'SDG6',
    label: 'Clean Water and Sanitation',
    description: 'Ensure availability and sustainable management of water and sanitation for all',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-06.png'
  },
  {
    value: 'SDG7',
    label: 'Affordable and Clean Energy',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
    image: '	https://sdgs.un.org/sites/default/files/2020-10/F_SDG_PRINT-07.jpg'
  },
  {
    value: 'SDG8',
    label: 'Decent Work and Economic Growth',
    description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F_SDG_PRINT-08.jpg'
  },
  {
    value: 'SDG9',
    label: 'Industry, Innovation and Infrastructure',
    description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
    image: '	https://sdgs.un.org/sites/default/files/2020-10/F_SDG_PRINT-09.jpg'
  },
  {
    value: 'SDG10',
    label: 'Reduced Inequalities',
    description: 'Reduce inequality within and among countries',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-10.png'
  },
  {
    value: 'SDG11',
    label: 'Sustainable Cities and Communities',
    description: 'Make cities and human settlements inclusive, safe, resilient and sustainable',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F_SDG_PRINT-11.jpg'
  },
  {
    value: 'SDG12',
    label: 'Responsible Consumption and Production',
    description: 'Ensure sustainable consumption and production patterns',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-12_0.png'
  },
  {
    value: 'SDG13',
    label: 'Climate Action',
    description: 'Take urgent action to combat climate change and its impacts',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-13.png'
  },
  {
    value: 'SDG14',
    label: 'Life Below Water',
    description: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-14.png'
  },
  {
    value: 'SDG15',
    label: 'Life on Land',
    description: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-15.png'
  },
  {
    value: 'SDG16',
    label: 'Peace, Justice and Strong Institutions',
    description: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-16.png'
  },
  {
    value: 'SDG17',
    label: 'Partnerships for the Goals',
    description: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development',
    image: 'https://sdgs.un.org/sites/default/files/2020-10/F-WEB-Goal-17.png'
  },
];

// Validator
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
  startDate: yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date must be in the future'),
  endDate: yup.date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after start date')
    .test(
      'is-same-day-or-later',
      'End date must be the same day or a later day than start date',
      function (value) {
        const startDate = this.resolve(yup.ref('startDate'));
        if (!startDate || !value) {
          return true;
        }
        return startDate <= value;
      }
    ),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  org: yup.string().required('Organization is required'),
  country: yup.string().required('Country is required'),
  sdgs: yup.string().required('please select causes'),
  city: yup.string().required("city is required"),
  image: yup.mixed().required('Please select an image'),
  lat: yup.mixed().required('Drag marker on map'),
  status: yup.string()
    .oneOf(['public', 'private'], 'Please select a valid status')
    .required('Please select a status'),
    nbParticipant: yup.number()
    .positive("Number participants must be a positive number")
    .required("Number participants is required"),
  subscribe: yup.string()
    .oneOf(['paid', 'free'], 'Please select a valid subscribe')
    .required('Please select a Payment method'),
})

const EventForm = () => {

  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [organizations, setOrganizations] = useState([]);

  // Get connected user

  if (user != null && user.roles.includes("ROLE_ORGANIZATION")) {
  } else {
    navigate("/");
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setDescription(editorState.getCurrentContent().getPlainText())
    console.log(data.subscribe)
    // Validate the form befor submiting
    try {
      // Capture selected sdgs
      let sdgs = selectedSDGs.map(option => option.value);
      let sdg = sdgs[0]
      await validationSchema.validate(
        {
          name: data.name,
          description: description,
          startDate: data.startDate,
          startTime: data.startTime,
          endDate: data.endDate,
          endTime: data.endTime,
          country: country,
          sdgs: sdg,
          image: image,
          city: data.city,
          status: data.status,
          lat: latitude,
          org: org,
          nbParticipant: data.nbParticipant,
          subscribe: data.subscribe,
        },
        { abortEarly: false } // Validate all fields and return all errors
      );

      // Call Service 
      EventService.create(
        data.name,
        editorState.getCurrentContent().getPlainText(),
        data.status,
        data.startDate,
        data.startTime,
        data.endDate,
        data.endTime,
        country,
        sdgs,
        image,
        latitude,
        longitude,
        selectedOrg.orgId,
        data.nbParticipant,
        data.price||0,
        data.subscribe,
        
      ).then(
        (eventIdd) => {
          navigate(`/event?id=${eventIdd}`);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessfulEvent(false);
          console.log(successfulEvent)
        }
      );
    } catch (err) {
      // Handle the validation errors
      const errors = {};
      err.inner.forEach((e) => (errors[e.path] = e.message));
      setFormErrors(errors);
      console.log(err.errors[0])
      setInvalid(errors.message)
    }
  }
  
  const select = classNames(styles.select);
  const tag = classNames(styles.tag);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [invalid, setInvalid] = useState("");
  const [description, setDescription] = useState("");
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [successfulEvent, setSuccessfulEvent] = useState(false);
  const [messageEvent, setMessageEvent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(process.env.PUBLIC_URL + "/assets/img/blank.png");
  const [selectedSDGs, setSelectedSDGs] = useState([]);
  const [address, setAddress] = React.useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [selectedOrg, setSelectedOrg] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('');
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  const mapRef = useRef(null);
  let marker = null;

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    }
    fetchCountries();
  }, []);

  const handleStateChange = (event) => {
    setCountry(event.target.value);
    console.log(country)
    validationSchema
      .validateAt("country", { country: event.target.value })
      .then(() => setFormErrors((prevErrors) => ({ ...prevErrors, state: "" })))
      .catch((error) =>
        setFormErrors((prevErrors) => ({ ...prevErrors, state: error.message }))
      );
      console.log(event.target.value)
      switch (event.target.value) {
        case 'US':
          setCurrencySymbol('$');
          break;
        case 'UK':
          setCurrencySymbol('£');
          break;
        case 'EU':
          setCurrencySymbol('€');
          break;
        case 'FR':
          setCurrencySymbol('€');
          break;
        // Add cases for other countries as needed
        default:
          setCurrencySymbol('$');
      }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSelectChange = (selectedOption) => {
    setSelectedCountry(selectedOption.label);
    console.log(selectedCountry)
  };

  const handleSubscribeChange = (event) => {
    if(selectedOrg.orgId){
      if(wallet){
        setIsSubscribe(event.target.value === "paid")
      }else{
        setIsSubscribe(false)
        alert("Your organization should have a wallet address to ensure transactions.!")
      }
    }else{
      alert("Please select an Organization!")
    }
  };

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  function handleSDGSelect(selectedOptions) {
    setSelectedSDGs(selectedOptions);

  }

  useEffect(() => {
    console.log(selectedSDGs);
  }, [selectedSDGs]);

  useEffect(() => {
    const google = window.google;

    // Create map
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 8,
    });

    // Create marker
    marker = new google.maps.Marker({
      position: { lat: 37.7749, lng: -122.4194 },
      map,
      draggable: true,
    });

    // Add click event listener to marker
    google.maps.event.addListener(marker, 'dragend', function (event) {
      setLatitude(event.latLng.lat());
      setLongitude(event.latLng.lng());
    });
  }, []);

  const handleCityChange = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const google = window.google;

      fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
        .then((response) => response.json())
        .then((data) => {
          const lat = data[0].lat;
          const lon = data[0].lon;

          // Set coordiantes
          setLatitude(lat);
          setLongitude(lon);

          // Update map
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            zoom: 12,
          });
          const marker = new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map,
            draggable: true,
          });
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    }
  };

  useEffect(() => {
    async function fetchCities() {
      axios.get(`http://api.openweathermap.org/data/2.5/find?q=tunisia&type=like&sort=population&appid=a423008808d021cced1573c3489aabf6`)
        .then(response => setCities(response.data.list));
    } fetchCities();
  },
    []);

  useEffect(() => {
    async function fetchOrg() {
      if (user) {
        const response = await axios.get(`http://localhost:4000/org/${user.id}`);
        setOrganizations(response.data.organizations);
      }
    }
    fetchOrg();
  }, [user]);

  function handleSelectOrganization(selectedOption) {
    setSelectedOrg(selectedOption);
    setOrg(selectedOption.label)
    setWallet(selectedOption.wallet)
  }
  useEffect(() => {
    console.log(selectedOrg);
  }, [selectedOrg]);


  useEffect(() => {
    console.log(country);
  }, [country]);

  return (
    <>
      <section
        className="page-title-area bg_cover"
        style={{
          backgroundImage: `url(${require("assets/images/page-title-bg.jpg")})`
        }}
      >
        <Container>
          <Row>
            <Col lg={12}>
              <div className="page-title-content">
                <h3 className="title">Create Event</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    </li>
                    <li className="breadcrumb-item " aria-current="page">
                      <label>Your organization(s) : </label>
                      <Select
                        value={selectedOrg}
                        onChange={handleSelectOrganization}
                        options={organizations.map(org => ({
                          label: org.name,
                          orgId: org._id,
                          wallet:org.wallet
                        }))}
                        isClearable
                        isSearchable
                        placeholder="Select Orginazation"
                        styles={customStyles}
                      />
                      {formErrors.org && (
                        <div className="text-danger">{formErrors.org}</div>
                      )}
                    </li>
                  </ol>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contact-form-area">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Title tagline="Create Event"></Title>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
                <div className="conact-form-item">
                  <Row>
                    <Col lg={6}>
                      <div className="input-box mt-20">
                      </div>
                    </Col>
                  </Row>
                  <Col>
                    <div className="input-box mt-20">
                      <input
                        type="text"
                        placeholder="Event Name"
                        name="name"
                      />
                    </div>
                    {formErrors.name && (
                      <div className="text-danger">{formErrors.name}</div>
                    )}
                  </Col>
                  <Col>
                    <div className="input-box mt-20">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                      />
                    </div>
                    {formErrors.description && (
                      <div className="text-danger">{formErrors.description}</div>
                    )}
                  </Col>
                  <Row>
                    <Col >
                      <div className="input-box mt-20">
                        <label>
                          Start date
                          <input
                            style={{ width: "26.7rem" }}
                            type="date"
                            placeholder="Start date"
                            name="startDate"
                          />
                        </label>
                      </div>
                      {formErrors.startDate && (
                        <div className="text-danger">{formErrors.startDate}</div>
                      )}
                    </Col>
                    <Col >
                      <div className="input-box mt-20">
                        <label>
                          Start at
                          <input
                            style={{ width: "26.7rem" }}
                            type="time"
                            placeholder="Start date"
                            name="startTime"
                          />
                        </label>
                      </div>
                      {formErrors.startTime && (
                        <div className="text-danger">{formErrors.startTime}</div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col >
                      <div className="input-box mt-20">
                        <label>
                          End date
                          <input
                            style={{ width: "26.7rem" }}
                            type="date"
                            placeholder="End date"
                            name="endDate"
                          />
                        </label>
                      </div>
                      {formErrors.endDate && (
                        <div className="text-danger">{formErrors.endDate}</div>
                      )}
                    </Col>
                    <Col >
                      <div className="input-box mt-20">
                        <label>
                          End at
                          <input
                            style={{ width: "26.7rem" }}
                            type="time"
                            placeholder="End time"
                            name="endTime"
                          />
                        </label>
                      </div>
                      {formErrors.endTime && (
                        <div className="text-danger">{formErrors.endTime}</div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label style={{
                        position: "relative",
                        top: "1.1rem"
                      }}>Country</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {country && (
                          <img style={{
                            position: "relative",
                            top: "0.6rem",
                            height: "4.39rem",
                            marginRight: "0px",
                            width: "3.5rem"
                          }}
                            src={
                              countries.find((c) => c.alpha2Code === country).flag
                            }
                            alt="Selected country flag"
                          />
                        )}
                        <select
                          value={country}
                          onChange={(e) => {
                            setCountry();
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
                            <option
                              key={country.alpha2Code}
                              value={country.alpha2Code}
                            >
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.country && (
                        <div className="text-danger">{formErrors.country}</div>
                      )}
                    </Col>
                    <Col lg={6}>
                      <div className="input-box mt-20">
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          name="city"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          onKeyPress={handleCityChange}
                        />
                      </div>
                      {formErrors.city && (
                        <div className="text-danger">{formErrors.city}</div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <div className="input-box mt-20">
                      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
                      {formErrors.lat && (
                        <div className="text-danger">{formErrors.lat}</div>
                      )}
                    </div>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <div className="input-box mt-20">
                        <label>Select Cause(s)</label>
                        <Select
                          options={SDGList}
                          value={selectedSDGs}
                          onChange={handleSDGSelect}
                          isMulti
                          placeholder="Select SDG(s)"
                          getOptionLabel={(option) => `${option.label} - ${option.description}`}
                          getOptionValue={(option) => option.value}
                          formatOptionLabel={({ label, description, image }) => (
                            <div>
                              <img src={image} alt={label} style={{ width: '50px', marginRight: '10px' }} />
                              <div style={{ display: 'inline-block' }}>
                                <div style={{ fontWeight: 'bold' }}>{label}</div>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                      {formErrors.sdgs && (
                        <div className="text-danger">{formErrors.sdgs}</div>
                      )}
                    </Col>
                    <Col lg={6}>
                      <div className="input-box mt-20" >
                        <label>Privacy</label>
                        <div style={{
                          display: "flex",
                          fontSize: "30px",
                          top: "14px",
                          position: "relative"
                        }}>
                          Private
                          <input align="right"
                            type="radio"
                            name="status"
                            value="private"
                            data-icon=""
                            style={{ backgroundColor: "#ffffff00" }}
                          />
                          Public <input
                            type="radio"
                            name="status"
                            value="public"
                            data-icon=""
                            style={{ backgroundColor: "#ffffff00" }}
                          />
                        </div>
                      </div>
                      {formErrors.status && (
                        <div className="text-danger">{formErrors.status}</div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                  <Col lg={6}>
                  <div className="input-box mt-20">
                    <label>
                      Choose an image:
                      <input type="file" onChange={handleInputChange} />
                    </label>
                    <img align="center" src={imagePreview} alt="Selected Image" width="500"
                      style={{
                        position: "relative",
                        left: "10%"
                      }}
                    />
                  </div>
                  {formErrors.image && (
                    <div className="text-danger">{formErrors.image}</div>
                  )}
                  </Col>
                    <Col lg={6}>
                      <div className="input-box mt-20">
                        <label>
                          Number participants
                          <input
                            style={{ width: "26.7rem" }}
                            min="0"
                            type="number"
                            placeholder="Number participants"
                            name="nbParticipant"
                          />
                        </label>
                      </div>
                    </Col>
                  </Row>
                 <Row>
                    <Col>
                      <div className="input-box mt-20" >
                        <table>
                          <tr>
                            <td>
                              <label>Privacy</label>
                              <div style={{
                                display: "flex",
                                fontSize: "30px",
                                top: "14px",
                                position: "relative",
                              }}>
                                Free
                                <input align="right"
                                  type="radio"
                                  name="subscribe"
                                  value="free"
                                  data-icon=""
                                  onChange={handleSubscribeChange}
                                  style={{ backgroundColor: "#ffffff00" }}
                                />
                                Paid <input
                                  type="radio"
                                  name="subscribe"
                                  value="paid"
                                  data-icon=""
                                  onChange={handleSubscribeChange}
                                  style={{ backgroundColor: "#ffffff00" }}
                                />
                              </div>
                            </td>
                            <td>
                              {isSubscribe && (
                                <div>
                                  <label htmlFor="price">Price:</label>
                                  
                                  <input style={{ width: "26.7rem" }}
                                    min="0"
                                    type="number"
                                    placeholder="Enter amount"
                                    name="price"
                                    id="id" />
                                    <span style={{fontSize:"1.8rem",
                                                  position:"relative",
                                                  top:"0.4rem"}}>
                                    {currencySymbol}</span>
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {formErrors.subscribe && (
                                <div className="text-danger">{formErrors.subscribe}</div>
                              )}
                            </td>
                            <td>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </Col>
                  </Row> 
                  <Col lg={12}>
                    <div className="input-box mt-20 text-center">
                      <button className="main-btn" type="submit" onSubmit={handleSubmit(onSubmit)}  >
                        CREATE
                      </button>
                      {successfulEvent && (
                        <div className="form-group">
                          <div
                            className="alert alert-success">pass</div>
                        </div>
                      )}
                    </div>
                  </Col>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );

};

export default EventForm;