import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../Reuseable/Title";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  newdonation,
  newdonationPaypal,
  donationPrediction,
} from "services/donationService";
import { useParams } from "react-router";
import {
  getCampaignNameById,
  getCampaignCauseById,
} from "services/campaignService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
  function sendNotification(Phone, username, amount) {
    axios
      .post("https://volunteerhub-backend.onrender.com/sms/sendNotification", {
        phone: Phone,
        amount: amount,
        username: username,
      })
      .then((response) => {
        console.log("SMS notification sent", response.data);
      })
      .catch((error) => {
        console.error("Error sending SMS notification:", error);
      });
  }
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);
  const [message, setMessage] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [cause, setCause] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  // const { campaignId } = useParams();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  console.log(userId);
  console.log(user.username);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [idUser, setIdUser] = useState(user?.id || "");
  const gender = user.gender;
  const donation_Times = user.donationTimes;
  const birthday = user.birthday;
  const parsedBirthday = Date.parse(birthday);
  const age = Math.floor(
    (Date.now() - parsedBirthday) / (365.25 * 24 * 60 * 60 * 1000)
  );

  console.log(user);
  console.log(birthday);
  console.log(donation_Times);
  console.log(gender);
  console.log(email);
  useEffect(() => {
    getCampaignNameById(id)
      .then((res) => {
        setCampaignName(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    document.title = "Donation Form"; // set new title
    const getCampaignCause = async () => {
      try {
        const response = await getCampaignCauseById(id);
        const causeData = response.data;
        setCause(causeData);

        const donor = {
          age: age,
          gender: gender,
          donation_times: donation_Times,
          donation_reason: causeData,
        };

        const res = await donationPrediction(donor);
        const predictedAmount = Number(res.data);
        setAmount(predictedAmount);
        console.log(res, predictedAmount);
      } catch (error) {
        console.log(error);
      }
    };

    getCampaignCause();
  }, [id, age, gender, donation_Times]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const donation = {
        amount,
        donor: {
          id: idUser,
          username: username,
          email: email,
        },
        campaign: {
          id: id,
        },
      };
      newdonation(donation)
        .then((res) => {
          console.log(res);
          sendNotification(
            "+21652942447",
            donation.donor.username,
            donation.amount
          );
          // navigate(`/donationcampaign/${id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMessage(error.message);
    }
  };
  const hundlePaypalSubmit = async () => {
    const donation = {
      amount,
      donor: {
        id: idUser,
        username: username,
        email: email,
      },
      campaign: {
        id: id,
      },
    };
    newdonationPaypal(donation)
      .then((res) => {
        console.log(res);
        sendNotification(
          "+21652942447",
          donation.donor.username,
          donation.amount
        );

        // navigate(`/donationcampaign/${id}`);
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
                      <h3 class="display-7 ">Donate for {campaignName}</h3>
                    </div>
                    <Col className="form-label form-control form-group">
                      <div className="input-box mt-20">
                        <label htmlFor="donor" className="form-label">
                          Donor Name:
                        </label>
                        <input
                          type="text"
                          id="donor"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="input-box mt-20">
                        <label htmlFor="amount" className="form-label">
                          Amount:
                        </label>
                        <p
                          style={{
                            color: "#6133FF",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Based on your profile information, we predict that
                          your optimal donation amount is {amount} USD.
                        </p>
                        <p style={{ color: "orange", fontSize: "16px" }}>
                          This suggestion is completely optional, and you can
                          enter any amount you'd like.
                        </p>

                        <input
                          type="number"
                          id="amount"
                          value={amount || ""}
                          onChange={(event) => setAmount(event.target.value)}
                        />
                      </div>
                      <div className="card-box mt-20">
                        <label htmlFor="card" className="form-label">
                          Card:
                        </label>
                        <CardElement />
                      </div>

                      <Col lg={12}>
                        <div className="input-box mt-20 mt-80 text-center">
                          <button
                            className="main-btn "
                            type="submit"
                            disabled={!stripe}
                          >
                            Donate
                          </button>
                        </div>
                        <div className="card-box mt-20">
                          <PayPalScriptProvider
                            options={{
                              "client-id":
                                "AQ9c5BHnew14oPL_01Qi2ux2GndYDgMdUirGnM-3aqTplYWqvCtaEjBKC5DTJg5gHbIk3OuWLBaqhw7l",
                            }}
                            key={amount}
                            idUser={idUser}
                            username={username}
                            email={email}
                            campaign={id}
                          >
                            {/* Replace YOUR_CLIENT_ID with your actual PayPal client ID */}
                            <div>
                              {/* Render PayPal buttons */}
                              <PayPalButtons
                                createOrder={(data, actions) => {
                                  // //(event) => setAmount(event.target.value)
                                  // Implement your createOrder function here
                                  // You can return an order ID or an object with the order details
                                  // For example:
                                  console.log(amount, idUser, email, username);
                                  return actions.order.create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          currency_code: "USD",
                                          value: amount, // Replace with the actual donation amount
                                        },
                                      },
                                    ],
                                  });
                                }}
                                onApprove={(data, actions) => {
                                  // Capture the funds from the transaction
                                  return actions.order
                                    .capture()
                                    .then(function (details) {
                                      hundlePaypalSubmit();
                                      console.log(
                                        "Transaction completed by " +
                                          details.payer.name.given_name
                                      );
                                      window.location.href = `/donationcampaign/${id}`;
                                    });
                                }}
                                onSuccess={hundlePaypalSubmit}
                              />
                            </div>
                          </PayPalScriptProvider>
                        </div>
                      </Col>
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
export default PaymentForm;
