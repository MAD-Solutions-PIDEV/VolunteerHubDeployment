import Title from "components/Reuseable/Title";
import React, { Fragment, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { findById, deleteCompaign } from "services/campaignService";
import Link from "../Reuseable/Link";
import { format } from "date-fns";
import DonationList from "./CommentOne";

import ProgressBar from "react-bootstrap/ProgressBar";
const date = new Date();
const formattedDate = format(date, "YYYY-MM-DD");
console.log(formattedDate, "aaa"); // output: "2023-04-05"

const DonationCampaignDetailsMain = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState();
  const [goalAmount, setGoalAmount] = useState();
  const [image, setImage] = useState();
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
          setTitle(res.data.title);
          setGoalAmount(res.data.goalAmount);
          setCurrentAmount(res.data.currentAmount);
          setImage(res.data.image);
          console.log(campaign);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <div className="blog-details__main">
      <div className="team-thumb">
        <Image
          src={`https://volunteerhub-backend.onrender.com/uploads/${image}`}
          fluid
          width="400px"
          height="300px"
        />
      </div>
      <div className="explore-projects-item mt-30">
        <div className="explore-projects-thumb"></div>
        <div className="explore-projects-content">
          <div className="item  align-items-center">
            <span style={{ fontSize: "20px" }}>
              {deadline ? format(new Date(deadline), "YYYY-MM-DD") : ""}
            </span>
            <br></br>
            <h3>{title}</h3>
          </div>
          <br></br>
          <div className="projects-range">
            <div className="projects-range-content">
              <ul>
                <li>
                  <h5>Raised:</h5>
                </li>
                <li>{Math.floor((currentAmount / goalAmount) * 100)}%</li>
              </ul>
              <div className="ProgressBar">
                <ProgressBar
                  now={Math.floor((currentAmount / goalAmount) * 100)}
                />
              </div>
            </div>
          </div>
          <div className="projects-goal">
            <span>
              Goal: <span>{goalAmount} USD</span>
            </span>
            <br></br>
            <span>
              Current Amount: <span>{currentAmount} USD</span>
            </span>
          </div>
          <Link href="/single-project">
            <p className="title">{description}</p>
          </Link>
        </div>
      </div>
      <br></br>
      <div>
        <button
          className="main-btn "
          onClick={() => handleDonateforCampaign(id)}
        >
          <i className="flaticon-next"></i>Donate
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <DonationList campaignId={id} />
    </div>
  );
};
function handleDonateforCampaign(id) {
  // Navigate to the campaign details page for the specified ID
  window.location.href = `/payment/${id}`;
}

export default DonationCampaignDetailsMain;
