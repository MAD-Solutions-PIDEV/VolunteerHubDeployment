import React from "react";
import { Col, Image } from "react-bootstrap";
import { format } from "date-fns";
const date = new Date();
const formattedDate = format(date, "YYYY-MM-DD");
console.log(formattedDate, "aaa"); // output: "2023-04-05"
const CampaignCard = ({ campaign = {}, index = 0, campaignTwo = false }) => {
  const { title, goalAmount, deadline, image } = campaign;
  const isEven = (index + 1) % 2 === 0;

  return (
    <Col lg={campaignTwo ? 7 : 5} md={campaignTwo ? 7 : 5}>
      <div
        className={`campaign-item mt-30${
          !campaignTwo && isEven
            ? " d-flex flex-column flex-md-column-reverse"
            : ""
        }`}
      >
        <div className="campaign-thumb">
          <Image
            src={`https://volunteerhub-backend.onrender.com/uploads/${image}`}
            fluid
            width="400px"
            height="200px"
          />
        </div>
        <div className="campaign-content">
          <span>
            Deadline: {deadline ? format(new Date(deadline), "YYYY-MM-DD") : ""}
          </span>
          <ul>
            <li>
              <h6>{goalAmount} USD</h6>
            </li>
          </ul>
          <h3 className="title">{title}</h3>
          <br></br>
          <button onClick={() => handleViewCampaign(campaign._id)}>
            <i className="flaticon-next"></i> View Details
          </button>
        </div>
        <br></br>
      </div>
    </Col>
  );
};
function handleViewCampaign(id) {
  // Navigate to the campaign details page for the specified ID
  window.location.href = `/CampaignDetails/${id}`;
}
export default CampaignCard;
