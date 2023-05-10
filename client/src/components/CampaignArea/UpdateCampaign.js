

import React, { useState, useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";


import { findById, updateCompaign } from "services/campaignService";
import {  useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';

const date = new Date();
const formattedDate = format(date, 'YYYY-MM-DD');
console.log(formattedDate); // output: "2023-04-05"

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

function UpdateCampaignForm() {
  const [notification, setNotification] = useState(null);

    const navigate = useNavigate();
    const {id}=useParams();
  const [campaign,setCampaign]=useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [cause, setCause] = useState('');
  useEffect(() => {
    document.title = "Update Campaign"; // set new title
    findById(id)
        .then((res) => {
            if (res) {
                setCampaign(res.data);
                setTitle(res.data.title);
                setDeadline(res.data.deadline);
                setDescription(res.data.description);
                setGoalAmount(res.data.goalAmount);
                setImage(res.data.image);
                setCause(res.data.cause);
                console.log(campaign)
            }
        })
        .catch((error) => console.log(error));
}, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateTitle(title)) {
     console.log(title) // Afficher un message d'erreur pour le champ de titre
      return;
    }
    // if (!validateDescription(description)) {
    //   console.log(description)
    //   // Afficher un message d'erreur pour le champ de description
    //   return;
    // }
    if (!validateDate(deadline)) {
      console.log(deadline)
      // Afficher un message d'erreur pour le champ de date
      return;
    }
    if (!validateGoal(goalAmount)) {
      console.log(goalAmount)
      // Afficher un message d'erreur pour le champ d'objectif
      return;
    }
   
    const campaign = {
      title,
      goalAmount,
      deadline,
      description,
      image,
      cause
    };
    updateCompaign(id,campaign)
    .then((res) => {
      console.log(res)
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
                      <h1 class="display-8"> Update  Campaign</h1>
                    </div>

                    <Col className="form-label form-control form-group">
                      <div className="input-box mt-20">

                        <label htmlFor="title" className="form-label">Title:</label>
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <input
                          type="text"
                          id="description"
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                        />
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
                        <label htmlFor="goalAmount" className="form-label">Goal Amount:</label>
                        <input
                          type="number"
                          id="goalAmount"
                          value={goalAmount}
                          onChange={(event) => setGoalAmount(event.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="deadline" className="form-label">Deadline:</label>
                        <input
                          type="date"
                          id="deadline"
                          value={ deadline ? format(new Date(deadline), 'YYYY-MM-DD') : '' }
                          onChange={(event) => setDeadline(event.target.value)}
                        />
                      </div>
                      
                    </Col>

                    <Col lg={12}>
                    <NotificationBar message={notification} />{" "}
                      {/* Render notification bar */}
                      <div className="input-box mt-20 mt-80 text-center">
                        <button className="main-btn" type="submit">
                        Update Campaign
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
};

export default UpdateCampaignForm;
