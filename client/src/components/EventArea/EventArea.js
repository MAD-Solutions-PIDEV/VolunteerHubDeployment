import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import EventItem from "./EventItem";
import EventService from 'services/event.service';

const EventArea = ({ className = "", eventTwo = false, eventPage = false }) => {
  const [events, setEvents] = useState([]);

  // Grap events list
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    // Fetch list of events
    fetch('http://localhost:4000/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
  
        // Check if user has joined each event
        data.forEach(event => {
          EventService.check(user.id, event._id)
            .then(
              (response) => {
                console.log(response.data.message)
                if (response.data.message === "true") {
                  
                } else {
                  
                }
              },
              (error) => {
                console.log(error);
              }
            );
        });
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <section className={`news-area ${className}`}>
      <Container>
        {!eventPage && (
          <Row className="justify-content-center">
            <Col lg={6}>
              <title className="text-center" >Upcoming event</title>
            </Col>
          </Row>
        )}
        <Row className={eventTwo ? "" : "no-gutters"}>
          {events
            .slice(0, eventPage ? undefined : eventTwo ? 3 : 4)
            .map((event, index) => (
              <EventItem
                key={event._id}
                event={event}
                index={index}
                eventTwo={eventTwo}
              />
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default EventArea;
