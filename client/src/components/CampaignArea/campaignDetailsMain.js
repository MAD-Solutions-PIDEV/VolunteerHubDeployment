import Title from "components/Reuseable/Title";
import React, { Fragment, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { findById, deleteCompaign } from "services/campaignService";
import DonationList from "./CommentOne";
import { format } from "date-fns";

const date = new Date();
const formattedDate = format(date, "YYYY-MM-DD");
console.log(formattedDate, "aaa"); // output: "2023-04-05"

const CampaignDetailsMain = () => {
  const navigate = useNavigate();
  function handleDeleteCampaign(id) {
    deleteCompaign(id)
      .then((res) => {
        if (res) {
          navigate("/allcampaigns");
        }
      })
      .catch((error) => console.log(error));
  }
  const { id } = useParams();
  const [campaign, setCampaign] = useState();
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState();
  const [image, setImage] = useState();
  const [goalAmount, setGoalAmount] = useState();
  const [currentAmount, setCurrentAmount] = useState();
  console.log(id);
  useEffect(() => {
    document.title = "Campain Details"; // set new title
    findById(id)
      .then((res) => {
        if (res) {
          setCampaign(res.data);
          setDeadline(res.data.deadline);
          setDescription(res.data.description);
          setGoalAmount(res.data.goalAmount);
          setImage(res.data.image);
          setCurrentAmount(res.data.currentAmount);
          console.log(campaign);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <div className="blog-details__main">
      <div width="100px" height="50px">
        <Image
          src={`https://volunteerhub-backend.onrender.com/uploads/${image}`}
          fluid
          width="400px"
          height="300px"
        />
      </div>
      <div className="blog-details__content">
        <span style={{ fontSize: "20px" }}>
          {deadline ? format(new Date(deadline), "YYYY-MM-DD") : ""}
        </span>
        <div className="blog-one__meta">
          <a href="#"></a>

          <a href="#">
            <h5>
              <i class="fa fa-bullseye"></i> Goal Amount :{goalAmount} USD
            </h5>
          </a>
          <a href="#">
            <h5>
              {" "}
              <i class="fa fa-money"></i> current Amount :{currentAmount} USD{" "}
            </h5>
          </a>
        </div>
        <h3>{Title}</h3>
        <p>{description}</p>
      </div>
      <br></br>
      <div>
        <button className="main-btn " onClick={() => handleUpdateCampaign(id)}>
          <i className="flaticon-next"></i>Update Campaign
        </button>

        <button
          className="main-btn main-btn-2"
          onClick={() => handleDeleteCampaign(id)}
        >
          {" "}
          Delete Campaign{" "}
        </button>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <DonationList campaignId={id} />
    </div>
  );
};
function handleUpdateCampaign(id) {
  // Navigate to the campaign details page for the specified ID
  window.location.href = `/updateCampaign/${id}`;
}

export default CampaignDetailsMain;
