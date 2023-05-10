import React from "react";
import { Col, Image } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { format } from "date-fns";
const date = new Date();
const formattedDate = format(date, "YYYY-MM-DD");
console.log(formattedDate, "aaa"); // output: "2023-04-05"
const CampaignItem = ({ campaign = {}, index = 0, campaignTwo = false }) => {
  const { title, description, goalAmount, deadline, image } = campaign;
  const isEven = (index + 1) % 2 === 0;

  return (
    <Col lg={campaignTwo ? 4 : 3} md={campaignTwo ? 7 : 6}>
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
          />
        </div>
        <div className="campaign-content">
          <span>
            Deadline: {deadline ? format(new Date(deadline), "YYYY-MM-DD") : ""}
          </span>
          <ul>
            <li>
              <i className="fa fa-user-circle"></i> {description}
            </li>
            <li>
              <i className="fa fa-comments-o"></i> {goalAmount} euros
            </li>
          </ul>
          <h3 className="title">{title}</h3>
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
export default CampaignItem;
