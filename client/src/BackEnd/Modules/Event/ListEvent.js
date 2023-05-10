import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EventService from "services/event.service";

function ListEvents() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState([{}]);

  useEffect(() => {
    document.title = "Event List"; // Set the title when the component mounts
    return () => {
      document.title = "Event Lis"; // Reset the title when the component unmounts
    };
  }, []);

  const onClickHandler = () => {
    fetch("https://volunteerhub-backend.onrender.com/shuffle")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process the fetched data here
      })
      .catch((error) => {
        console.error(error);
        // Display error message or take necessary action
      });
  };

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options).replace(",", " |");
  }

  useEffect(() => {
    EventService.fetchEvents()
      .then(async (res) => {
        setEvents(res);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleApprovalChange = async (eventId, newStatus) => {
    try {
      if (newStatus === "approved") {
        await EventService.approveEvent(eventId);
      } else if (newStatus === "rejected") {
        await EventService.cancelEvent(eventId);
      }
      const updateList = await EventService.fetchEvents();
      setEvents(updateList);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Start date",
      selector: "startDate",
      sortable: true,
      format: (row) => formatDate(row.startDate),
    },
    {
      name: "End Date",
      selector: "endDate",
      sortable: true,
      format: (row) => formatDate(row.endDate),
    },
    {
      name: "organization",
      selector: "organization.name",
      sortable: true,
    },
    {
      name: "Country",
      selector: "location[0].country",
      sortable: true,
    },
    {
      name: "Location",
      selector: () => (
        <a
          href={`https://www.google.com/maps/dir//${location[0].latitude},${location[0].longitude}/@${location[0].latitude},${location[0].longitude},10.5z`}
        >
          View on google maps
        </a>
      ),
      sortable: true,
    },
    {
      name: "Approval",
      selector: "approve",
      sortable: true,
      cell: (row) => {
        return (
          <select
            value={row.status}
            onChange={(e) => handleApprovalChange(row._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approve">Approve</option>
            <option value="rejected">Rejected</option>
          </select>
        );
      },
    },
  ];

  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">Events</h3>
                  </div>
                  <button onClick={onClickHandler}>Shuffle</button>
                </div>
              </div>
              <div className="white_card_body">
                {events.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={events}
                    pagination
                    highlightOnHover
                  />
                ) : (
                  <p>Loading events...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListEvents;
