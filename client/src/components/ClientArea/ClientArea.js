import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ClientArea = () => {
  const [countdown, setCountdown] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
      navigate("/competition");
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="client-area">
      <div className="client-top text-center">
        <Row><Col><h3>You need to participate for an event to join the drop!</h3>
          <h1>Drop will start after </h1>
        </Col></Row>
        <Row>

          <Col lg={6}><h3 className="title">{countdown}</h3></Col><Col lg={5}> <button style={{
            position: "relative",
            top: "30%"
          }} class="main-btn" onClick={handleClick}>Join now</button></Col></Row>



      </div>

    </section>
  );
};

export default ClientArea;
