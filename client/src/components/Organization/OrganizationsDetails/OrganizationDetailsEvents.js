import React, { useEffect, useState } from "react";
import Events from "./OrganizationEvents";
import OrganizationService from "services/organizationService";

const OrganizationDetailsEvents = ({ getClassName, organization }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (organization.events) {
      setEvents(organization.events);
    }
  }, [organization]);

  if (events && events.length > 0) {
    console.log(events);

    return (
      <div
        className={getClassName("pills-profile")}
        id={"pills-profile"}
        role="tabpanel"
      >
        <Events events={events} className="mt-70" />
      </div>
    );
  } else {
    return (
      <div
        className={getClassName("pills-profile")}
        id={"pills-profile"}
        role="tabpanel"
      >
        <h3 className="mt-100">No events available!</h3>
      </div>
    );
  }
};

export default OrganizationDetailsEvents;
