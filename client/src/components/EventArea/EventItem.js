import React from "react";
import { Col, Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { useState } from "react";
import { useEffect } from "react";

const EventItem = ({ event = {}, index = 0, eventTwo = false }) => {
  const { comments } = event;
  const isEven = (index + 1) % 2 === 0;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [event.startDate]);

  // CountDown event
  function calculateTimeLeft() {
    const difference = new Date(event.startDate) - new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }
  return (
    <Col lg={eventTwo ? 4 : 3} md={eventTwo ? 7 : 6}>
      <div
        className={`news-item mt-30${
          !eventTwo && isEven
            ? " d-flex flex-column flex-md-column-reverse"
            : ""
        }`}
      >
        <div className="news-thumb">
          <Image
            src={`https://volunteerhub-backend.onrender.com/uploads/${event.image}`}
            alt="news"
          />
        </div>
        <div className="news-content">
          <span>
            Still: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s{" "}
          </span>
          <ul>
            <li>
              <i className="fa fa-user-circle"></i>{" "}
              {event ? event.organization?.name : "Loading..."}
            </li>
            <li>
              <i className="fa fa-comments-o"></i> {comments} Comments
            </li>
          </ul>
          <h3 className="title">{event.name}</h3>
          <Link href={`/event?id=${event._id}`}>
            <i className="fa fa-external-link-alt"></i>
          </Link>
          <Link href="/single-news">
            <i className="flaticon-like"></i>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default EventItem;
