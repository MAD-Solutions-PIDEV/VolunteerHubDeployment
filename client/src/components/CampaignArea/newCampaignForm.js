import React, { useState, useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";

import { newCompaign, getOrganizationsByUser } from "services/campaignService";
import { useNavigate } from "react-router-dom";
function NotificationBar({ message }) {
  return message ? (
    <div className="alert alert-danger mt-3" role="alert">
      {message}
    </div>
  ) : null;
}
function validateTitle(title) {
  return !/\d/.test(title); // Vérifie si le titre ne contient pas de chiffres
}

function validateDate(deadline) {
  const date = new Date(deadline);
  const currentDate = new Date();
  return date > currentDate; // Vérifie si la date de la campagne est supérieure à la date actuelle
}

function validateGoal(goalAmount) {
  return goalAmount >= 500; // Vérifie si l'objectif est > 500
}

function validateDescription(description) {
  return description.length >= 10 && description.length <= 50; // Vérifie si la description a entre 10 et 50 caractères
}

function CampaignForm() {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [cause, setCause] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  useEffect(() => {
    document.title = "New Campaign"; // set new title
    getOrganizationsByUser(userId)
      .then((res) => {
        setOrganizations(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);
  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    // Create a FileReader object
    const reader = new FileReader();
    // Set up a callback function to run when the FileReader loads the file
    reader.onload = function (event) {
      setImage(selectedFile);
      setPreviewUrl(event.target.result);
    };
    // Read the file as a data URL
    reader.readAsDataURL(selectedFile);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goalAmount", goalAmount); // Fixed typo here
    formData.append("deadline", deadline);
    formData.append("cause", cause);
    formData.append("image", image);
    formData.append("organizationId", organizationId); // Add selected organization to the form data
    console.log(deadline);
    console.log(formData);
    if (!validateTitle(title)) {
      console.log(title); // Afficher un message d'erreur pour le champ de titre
      setNotification("The title must not exceed 10 characters");
      return;
    }
    if (!validateDescription(description)) {
      console.log(description);
      setNotification("The description must be between 10 and 50 characters");
      // Afficher un message d'erreur pour le champ de description
      return;
    }
    if (!validateGoal(goalAmount)) {
      console.log(goalAmount);
      setNotification("The goal amount must be greater than 500");
      // Afficher un message d'erreur pour le champ d'objectif
      return;
    }
    if (!validateDate(deadline)) {
      console.log(deadline);
      setNotification("The deadline must be greater than today's date");
      // Afficher un message d'erreur pour le champ de date
      return;
    }

    const campaign = {
      title,
      goalAmount,
      deadline,
      description,
      image,
      organizationId,
      cause
    };
    console.log(campaign);
    console.log(organizationId);
    newCompaign(formData, console.log(formData))
      .then((res) => {
        console.log(res);
        navigate("/organization/all");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="contact-form-area">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Title className="text-center" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <form onSubmit={handleSubmit}>
                <div className="conact-form-item">
                  <Row>
                    <div className="input-box mt-0 mt-0 text-center form-label fw-bold">
                      <h1 class="display-8"> New Campaign</h1>
                    </div>

                    <Col className="form-label form-control form-group">
                      <div className="input-box mt-20">
                        <label htmlFor="organization" className="form-label">
                          Organization:
                        </label>
                        <select
                          id="organization"
                          value={organizationId}
                          onChange={(event) =>
                            setOrganizationId(event.target.value)
                          }
                          class="form-select"
                        >
                          <option value="">Select an organization</option>
                          {organizations.map((org) => (
                            <option key={org.id} value={org._id}>
                              {org.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="cause" className="form-label">
                          Campaign Cause:
                        </label>
                        <select
                          id="cause"
                          value={cause}
                          onChange={(event) => setCause(event.target.value)}
                          className="form-select"
                        >
                          <option value="">Select campaign cause</option>
                          {['Education', 'Sport', 'Urgence', 'Environment', 'Animal Protection', 'Human Help', 'Health', 'Social', 'Economic Development', 'Culture'].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="title" className="form-label">
                          Title:
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="description" className="form-label">
                          Description:
                        </label>
                        <input
                          type="text"
                          id="description"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="goalAmount" className="form-label">
                          Goal Amount:
                        </label>
                        <input
                          type="number"
                          id="goalAmount"
                          value={goalAmount}
                          onChange={(event) =>
                            setGoalAmount(event.target.value)
                          }
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="deadline" className="form-label">
                          Deadline:
                        </label>
                        <input
                          type="date"
                          id="deadline"
                          value={deadline}
                          onChange={(event) => setDeadline(event.target.value)}
                        />
                      </div>

                      <div>
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        )}
                        <label htmlFor="image-upload">
                          Upload an image:
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            name="image"
                          />
                        </label>
                      </div>
                    </Col>

                    <Col lg={12}>
                      <NotificationBar message={notification} />{" "}
                      {/* Render notification bar */}
                      <div className="input-box mt-20 mt-80 text-center">
                        <button className="main-btn" type="submit">
                          Create Campaign
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </form>
              <p className="form-message"></p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CampaignForm;
