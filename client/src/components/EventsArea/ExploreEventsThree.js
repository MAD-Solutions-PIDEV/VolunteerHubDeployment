import { exploreProjects } from "data/projectsArea";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingleExploreEvent from "./SingleExploreEvent";
import { useEffect } from "react";
import { useState } from "react";
import MarkerClusterer from "@google/markerclustererplus";
import { useRef } from "react";
import EventService from "services/event.service";
import styles from "./style.module.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Popup } from "semantic-ui-react";

const { projects } = exploreProjects;

const ExploreEventsThree = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [events, setEvents] = useState([]);
  const [heartColor, setHeartColor] = useState("grey");
  const [selectedOption, setSelectedOption] = useState("");

  // Action when SDG checked
  const handleOptionChange = (event, id) => {
    setSelectedOption(event.target.value);
    if (event.target.checked) {
      // call function with id here
      fetchSdgList(id);
    }
  };

  const fetchSdgList = (id) => {
    EventService.fetchBySdg(id)
      .then(async (res) => {
        setEvents(res);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  // Grap events list
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Fetch list of events
    fetch("https://volunteerhub-backend.onrender.com/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);

        // Check if user has joined each event
        data.forEach((event) => {
          EventService.check(user.id, event._id).then(
            (response) => {
              console.log(response.data.message);
              if (response.data.message === "true") {
                // Update heart color for event that user has joined
                setHeartColor("red");
              } else {
                // Update heart color for event that user has not joined
                setHeartColor("grey");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const google = window.google;

    // Create map
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
    });

    // Create bounds object
    const bounds = new google.maps.LatLngBounds();

    // Create marker clusterer
    const markerCluster = new MarkerClusterer(map, [], {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });

    // Add markers to clusterer
    events.forEach((ev) => {
      const location = ev.location[0];
      if (location) {
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
          },
          map,
        });
        const content = `
          <div>
            <h3>${ev.name}</h3>
            <a align="center" href="https://www.google.com/maps/dir//${parseFloat(
              location.latitude
            )},${parseFloat(location.longitude)}/@${parseFloat(
          location.latitude
        )},${parseFloat(location.longitude)}" target="_blank">Go to</a>
          </div>
        `;
        // Add an info window to the marker
        const infoWindow = new google.maps.InfoWindow({
          content: content, // Set the description of the event as the content of the info window
        });
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        markerCluster.addMarker(marker);
        bounds.extend(marker.getPosition());
      }
    });

    // Fit bounds to show all markers
    map.fitBounds(bounds);
  }, [events]);
  return (
    <>
      <section
        className="explore-projects-3-area explore-v2-page pt-90 pb-120"
        style={{ paddingTop: "28px" }}
      >
        <Container>
          <div className="explore-margin" style={{ margin: "0 -4rem" }}>
            <ul className={styles.thumbnails}>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏: 𝐍𝐨 𝐏𝐨𝐯𝐞𝐫𝐭𝐲
                                                    Economic growth must be inclusive to provide sustainable jobs and promote equality."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG1"
                  onChange={(event) => handleOptionChange(event, "SDG1")}
                />
                <div className={styles.itemhugger}>
                  <div className={styles.imageContainer}>
                    <img
                      className={styles.thumbimage}
                      src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG1.png"
                    />
                    <div className={styles.tooltip}>
                      This is the dialogue text
                    </div>
                  </div>
                  <label for="SDG1"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟐: 𝐙𝐞𝐫𝐨 𝐇𝐮𝐧𝐠𝐞𝐫
                The food and agriculture sector offers key solutions for development, and is central for hunger and poverty eradication."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG2"
                  onChange={(event) => handleOptionChange(event, "SDG2")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG2.png"
                  />
                  <label for="SDG2"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟑: 𝐆𝐨𝐨𝐝 𝐇𝐞𝐚𝐥𝐭𝐡 𝐚𝐧𝐝 𝐖𝐞𝐥𝐥-𝐁𝐞𝐢𝐧𝐠
                                                      Ensuring healthy lives and promoting the well-being for all at all ages is essential to sustainable development."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG3"
                  onChange={(event) => handleOptionChange(event, "SDG3")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG3.png"
                  />
                  <label for="SDG3"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟒: 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧
                Obtaining a quality education is the foundation to improving people’s lives and sustainable development."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG4"
                  onChange={(event) => handleOptionChange(event, "SDG4")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG4.png"
                  />
                  <label for="SDG4"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟓: 𝐆𝐞𝐧𝐝𝐞𝐫 𝐄𝐪𝐮𝐚𝐥𝐢𝐭𝐲
                Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world.
                "
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG5"
                  onChange={(event) => handleOptionChange(event, "SDG5")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG5.png"
                  />
                  <label for="SDG5"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟔: 𝐂𝐥𝐞𝐚𝐧 𝐖𝐚𝐭𝐞𝐫 𝐚𝐧𝐝 𝐒𝐚𝐧𝐢𝐭𝐚𝐭𝐢𝐨𝐧
                Clean, accessible water for all is an essential part of the world we want to live in."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG6"
                  onChange={(event) => handleOptionChange(event, "SDG6")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG6.png"
                  />
                  <label for="SDG6"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟕: 𝐀𝐟𝐟𝐨𝐫𝐝𝐚𝐛𝐥𝐞 𝐚𝐧𝐝 𝐂𝐥𝐞𝐚𝐧 𝐄𝐧𝐞𝐫𝐠𝐲
                Energy is central to nearly every major challenge and opportunity."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG7"
                  onChange={(event) => handleOptionChange(event, "SDG7")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG7.png"
                  />
                  <label for="SDG7"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟖: 𝐃𝐞𝐜𝐞𝐧𝐭 𝐖𝐨𝐫𝐤 𝐚𝐧𝐝 𝐄𝐜𝐨𝐧𝐨𝐦𝐢𝐜 𝐆𝐫𝐨𝐰𝐭𝐡
                Sustainable economic growth will require societies to create the conditions that allow people to have quality jobs."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG8"
                  onChange={(event) => handleOptionChange(event, "SDG8")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG8.png"
                  />
                  <label for="SDG8"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟗: 𝐈𝐧𝐝𝐮𝐬𝐭𝐫𝐲, 𝐈𝐧𝐧𝐨𝐯𝐚𝐭𝐢𝐨𝐧, 𝐚𝐧𝐝 𝐈𝐧𝐟𝐫𝐚𝐬𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞
                Investments in infrastructure are crucial to achieving sustainable development.
                "
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG9"
                  onChange={(event) => handleOptionChange(event, "SDG9")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG9.png"
                  />
                  <label for="SDG9"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟎: 𝐑𝐞𝐝𝐮𝐜𝐞𝐝 𝐈𝐧𝐞𝐪𝐮𝐚𝐥𝐢𝐭𝐢𝐞𝐬
                To reduce inequalities, policies should be universal in principle, paying attention to the needs of disadvantaged and marginalized populations."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG10"
                  onChange={(event) => handleOptionChange(event, "SDG10")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG10.png"
                  />
                  <label for="SDG10"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟏: 𝐒𝐮𝐬𝐭𝐚𝐢𝐧𝐚𝐛𝐥𝐞 𝐂𝐢𝐭𝐢𝐞𝐬 𝐚𝐧𝐝 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐢𝐞𝐬
                There needs to be a future in which cities provide opportunities for all, with access to basic services, energy, housing, transportation and more."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG11"
                  onChange={(event) => handleOptionChange(event, "SDG11")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG11.png"
                  />
                  <label for="SDG11"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟐: 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐛𝐥𝐞 𝐂𝐨𝐧𝐬𝐮𝐦𝐩𝐭𝐢𝐨𝐧 𝐚𝐧𝐝 𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧
                Responsible Production and Consumption"
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG12"
                  onChange={(event) => handleOptionChange(event, "SDG12")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG12.png"
                  />
                  <label for="SDG12"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟑: 𝐂𝐥𝐢𝐦𝐚𝐭𝐞 𝐀𝐜𝐭𝐢𝐨𝐧
                Climate change is a global challenge that affects everyone, everywhere."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG13"
                  onChange={(event) => handleOptionChange(event, "SDG13")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG13.png"
                  />
                  <label for="SDG13"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟒: 𝐋𝐢𝐟𝐞 𝐁𝐞𝐥𝐨𝐰 𝐖𝐚𝐭𝐞𝐫
                Careful management of this essential global resource is a key feature of a sustainable future."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG14"
                  onChange={(event) => handleOptionChange(event, "SDG14")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG14.png"
                  />
                  <label for="SDG14"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟓: 𝐋𝐢𝐟𝐞 𝐨𝐧 𝐋𝐚𝐧𝐝
                Sustainably manage forests, combat desertification, halt and reverse land degradation, halt biodiversity loss"
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG15"
                  onChange={(event) => handleOptionChange(event, "SDG15")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG15.png"
                  />
                  <label for="SDG15"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟔: 𝐏𝐞𝐚𝐜𝐞, 𝐉𝐮𝐬𝐭𝐢𝐜𝐞 𝐚𝐧𝐝 𝐒𝐭𝐫𝐨𝐧𝐠 𝐈𝐧𝐬𝐭𝐢𝐭𝐮𝐭𝐢𝐨𝐧𝐬
                Access to justice for all, and building effective, accountable institutions at all levels."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG16"
                  onChange={(event) => handleOptionChange(event, "SDG16")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG16.png"
                  />
                  <label for="SDG16"></label>
                </div>
              </li>
              <li
                className={styles.isactive}
                title="𝐆𝐨𝐚𝐥 𝟏𝟕: 𝐏𝐚𝐫𝐭𝐧𝐞𝐫𝐬𝐡𝐢𝐩𝐬
                Revitalize the global partnership for sustainable development."
              >
                <input
                  type="radio"
                  name="select"
                  id="SDG17"
                  onChange={(event) => handleOptionChange(event, "SDG17")}
                />
                <div className={styles.itemhugger}>
                  <img
                    className={styles.thumbimage}
                    src="https://volunteerhub-backend.onrender.com/uploads/sdgs/SDG17.png"
                  />
                  <label for="SDG17"></label>
                </div>
              </li>
            </ul>
            <div className={styles.whitebox}></div>
            <Row className="justify-content-center">
              {events.map((event) => (
                <Col lg={4} md={1} sm={2} key={event.id}>
                  <SingleExploreEvent event={event} heartColor={heartColor} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
      <div style={{ width: "100%", height: "600px" }}>
        {<div ref={mapRef} style={{ width: "100%", height: "100%" }} />}
      </div>
    </>
  );
};

export default ExploreEventsThree;
