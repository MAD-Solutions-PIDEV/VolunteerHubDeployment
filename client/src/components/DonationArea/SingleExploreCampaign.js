import Title from "components/Reuseable/Title";
import React from "react";
import { Col, Image, ProgressBar, Row } from "react-bootstrap";
import Link from "../Reuseable/Link";
import { format } from "date-fns";
import { useEffect } from "react";
const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};
const date = new Date();
const formattedDate = format(date, "YYYY-MM-DD");
console.log(formattedDate, "aaa"); // output: "2023-04-05"
const SingleExploreCampaign = ({ campaign = {} }) => {
  const { image, title, goalAmount, currentAmount, deadline } = campaign;
  console.log(campaign);
  useEffect(() => {
    //document.title = "Campaigns list"; // set new title
  }, []);
  return (
    <div className="explore-projects-item mt-30">
      <Row className="justify-content-center">
        <Title title={title} className="text-center" />
        <Image
          src={`https://volunteerhub-backend.onrender.com/uploads/${image}`}
          alt="orgLogo"
          fluid
          style={imageStyle}
        />
      </Row>

      <div className="explore-projects-content">
        <div className="item d-flex align-items-center">
          <span>
            Deadline: <br></br>
            {deadline ? format(new Date(deadline), "YYYY-MM-DD") : ""}
          </span>
        </div>
        <br></br>
        <div className="ProgressBar">
          <ProgressBar now={Math.floor((currentAmount / goalAmount) * 100)} />
        </div>
        <br></br>
        <Link href="#">
          <button
            className="main-btn main-btn-2"
            onClick={() => handleDonateforCampaign(campaign._id)}
          >
            {" "}
            Donate Now
          </button>
        </Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
function handleDonateforCampaign(id) {
  // Navigate to the campaign details page for the specified ID
  window.location.href = `/donationcampaign/${id}`;
}

export default SingleExploreCampaign;
