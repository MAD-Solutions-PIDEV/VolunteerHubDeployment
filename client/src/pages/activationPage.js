import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Signup from "components/LoginArea/signup";
import { FaCheck } from "react-icons/fa";

export default function ActivationPage() {
  const { activationcode } = useParams();
  console.log(activationcode);
  axios
    .post(
      `https://volunteerhub-backend.onrender.com/api/verifyuser/${activationcode}`
    )
    .then((response) => {
      console.log(response.data.message); // handle success response
    })
    .catch((error) => {
      console.log(error.message); // handle error response
    });

  return (
    <div>
      <div
        style={{
          backgroundColor: "#29F0B5",
          height: "1.5cm",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaCheck style={{ color: "white", marginRight: "10px" }} />
        <span style={{ color: "white" }}>
          The account is successfully activated.
        </span>
      </div>
      <Signup />;
    </div>
  );
}
