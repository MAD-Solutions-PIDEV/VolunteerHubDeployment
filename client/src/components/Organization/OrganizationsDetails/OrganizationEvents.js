import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventService from "services/event.service";

const Event = ({ e, current, handleCurrent }) => {
  const [event, setEvent] = useState();

  useEffect(() => {
    if (e) {
      EventService.getEventById(e)
        .then((data) => {
          setEvent(data);
          //console.log(data);
        })
        .catch((error) => console.error(error));
    }
  }, [e]);

  if (!event) {
    return null;
  } else {
    const active = current === event._id;

    return (
      <div className={`accrodion overflow-hidden${active ? " active" : ""}`}>
        <div className="accrodion-inner">
          <div
            onClick={() => handleCurrent(event._id)}
            className="accrodion-title"
          >
            <h4>
              <span>
                <i className="fa fa-duotone fa-calendar-days"></i>.
              </span>{" "}
              <Link
                to={`/event?id=${event._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {event.name}
              </Link>
            </h4>
          </div>
          <div className={`accrodion-content${active ? "" : " d-none"}`}>
            <div className={`inner animated${active ? " fadeInUp" : ""}`}>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const Events = ({ events = [], className = "" }) => {
  const [current, setCurrent] = useState(1);

  const handleCurrent = (current) => {
    setCurrent(current);
  };

  return (
    <div className={`faq-accordion overflow-hidden ${className}`}>
      <div
        className={`accrodion-grp${
          !className ? " animated fadeInLeft" : ""
        } faq-accrodion`}
      >
        {events.map((event) => (
          <Event
            e={event}
            key={event.id}
            current={current}
            handleCurrent={handleCurrent}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
