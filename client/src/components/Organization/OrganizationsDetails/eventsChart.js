import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import EventService from "services/event.service";
import Chart from "chart.js/auto";

function EventsChart({ events }) {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    if (events) {
      const eventDataPromises = events.map((e) =>
        EventService.getEventById(e).then((data) => data)
      );
      Promise.all(eventDataPromises)
        .then((eventData) => {
          const successfulEvents = eventData.filter(
            (e) => e.classification === "successful"
          );
          const unsuccessfulEvents = eventData.filter(
            (e) => e.classification === "unsuccessful"
          );
          const neutralEvents = eventData.filter(
            (e) => e.classification === "neutral"
          );

          setEventsData([
            successfulEvents.length,
            unsuccessfulEvents.length,
            neutralEvents.length,
          ]);
        })
        .catch((error) => console.error(error));
    }
  }, [events]);

  const data = {
    labels: ["Successful", "Unsuccessful", "Neutral"],
    datasets: [
      {
        data: eventsData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label;
            var value = context.parsed;

            if (value !== null) {
              value = value.toString();
              value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
              return label + ": " + value;
            } else {
              return label + ": " + 0;
            }
          },
        },
      },
    },
  };

  return (
    <div className="mt-20" style={{ width: "70%" }}>
      <h2 className="mb-20">Events Classification</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default EventsChart;
