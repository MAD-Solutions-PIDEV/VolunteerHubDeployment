import CommentForm from "components/NewsArea/BlogDetails/CommentForm";
import CommentOne from "components/NewsArea/BlogDetails/CommentOne";
import { projectDetailsComments } from "data/projectsArea";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import OrganizationService from "services/organizationService";
import EventsChart from "./eventsChart";

const ProjectDetailsSettings = ({ getClassName, organization }) => {
  const { id, comments } = projectDetailsComments;
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const getProfileImage = (gender) => {
    if (!gender) {
      return "";
    }
    //const letter = firstName.charAt(0).toUpperCase();
    const imageSrc = `https://volunteerhub-backend.onrender.com/uploads/Alphabet/${gender}.png`;
    return imageSrc;
  };

  const archiveOrg = async (id) => {
    await OrganizationService.archiveOrganization(id);
    navigate("/");
  };

  useEffect(() => {
    if (organization && organization.members) {
      //console.log(organization);
      setParticipants(organization.members);
    }
  }, [organization]);

  return (
    <div className={getClassName(id)} id="pills-4" role="tabpanel">
      <div className="mt-20">
        <h2>Members</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }} className="mt-20">
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <div key={participant._id}>
                <Link to={`/${participant._id}/viewprofile`}>
                  <img
                    src={getProfileImage(participant.gender)}
                    alt={`${participant.firstName} ${participant.lastName}`}
                    title={`${participant.firstName} ${participant.lastName}`}
                    width={70}
                    className="img-fluid"
                  />
                </Link>
              </div>
            ))
          ) : (
            <div>No members found.</div>
          )}
        </div>
      </div>
      <div className="mt-20">
        <h2>Actions</h2>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <div style={{ flexBasis: "50%" }}>
            <div className="mt-25">
              <a
                style={{
                  textDecoration: "none",
                  color: "#464646",
                  fontSize: "1.5rem",
                }}
                href="/create-event"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fa fa-solid fa-calendar-plus"
                    style={{ color: "#2bf1b4", marginRight: "10px" }}
                  ></i>
                  <h4> ADD EVENT</h4>
                </div>
              </a>
            </div>
          </div>

          <div style={{ flexBasis: "50%" }}>
            <div className="mt-25">
              <a
                style={{
                  textDecoration: "none",
                  color: "#464646",
                  fontSize: "1.5rem",
                }}
                href="/newcampaign"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fa fa-solid fa-hand-holding-dollar"
                    style={{ color: "#2bf1b4", marginRight: "10px" }}
                  ></i>
                  <h4> ADD CAMPAIGN</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2>Other Settings</h2>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {/* <div style={{ flexBasis: "50%" }}>
            <div className="mt-25">
              <a
                style={{
                  textDecoration: "none",
                  color: "#464646",
                  fontSize: "1.5rem",
                }}
                href="/"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fa fa-solid fa-pen-to-square"
                    style={{ color: "#2bf1b4", marginRight: "10px" }}
                  ></i>

                  <h4> UPDATE INFO</h4>
                </div>
              </a>
            </div>
          </div> */}

          <div style={{ flexBasis: "50%" }}>
            <div className="mt-25">
              <a
                style={{
                  textDecoration: "none",
                  color: "#464646",
                  fontSize: "1.5rem",
                }}
                onClick={() => setShowModal(true)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fa fa-solid fa-trash"
                    style={{ color: "#2bf1b4", marginRight: "10px" }}
                  ></i>

                  <h4>DELETE ORGANIZATION</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          overlay: {
            zIndex: 9999,
          },
          content: {
            width: "53rem",
            height: "20rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div>
          <h2>Oups :(</h2>
          <h4> Are you sure you want to leave?</h4>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button onClick={() => archiveOrg(organization._id)}>Yes</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
      <EventsChart events={organization.events} />
    </div>
  );
};

export default ProjectDetailsSettings;
