import React from "react";
import "./wheel.css";
import SpinWheel from "./SpinWheel";
import { useEffect } from "react";
import { useState } from "react";
import Header from "components/Header/Header";
import Modal from "react-modal";
import CreatePost from "./CreatePost";
import EventService from "services/event.service";

function Wheel() {
  const [usernames, setUsernames] = useState([]);
  const [checkWinner, setCheckWinner] = useState(false);
  const [winner, setWinner] = useState("");
  const [countdown, setCountdown] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        10,
        0,
        0
      );
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log("user:", user?.username);
    console.log("winner:", winner);
    if (user?.username == winner) {
      setCheckWinner(true);
    }
  }, [winner]);

  useEffect(() => {
    // fetch winner data from API endpoint
    fetch("https://volunteerhub-backend.onrender.com/checkGame")
      .then((response) => response.json())
      .then((data) => {
        console.log("data1", data);
        setWinner(data); // set Winner
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  }, []);
  useEffect(() => {
    // fetch winner data from API endpoint
    fetch("https://volunteerhub-backend.onrender.com/getWinner")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setUsernames(data); // set the list of usernames in the state
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {winner ? (
        <>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <div
                style={{
                  height: "35%",
                  width: " 40%",
                  borderRadius: "22px",
                  backgroundColor: "#2b36310f",
                }}
              >
                <div className="promptDiv">
                  <form id="imagePrompt">
                    <br />
                    <h3>🏆 We have a winner 🏆</h3>
                    <h1>{winner}</h1>
                    <br />
                    {checkWinner ? (
                      <button
                        class="main-btn"
                        type="button"
                        onClick={handleClick}
                      >
                        CLAIM REWARD
                      </button>
                    ) : (
                      <p></p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            contentLabel={
              <div className="d-flex justify-content-between align-items-center"></div>
            }
            style={{
              overlay: {
                zIndex: 9999,
              },
              content: {
                width: "53rem",
                height: "35rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              },
            }}
          >
            <button onClick={handleCloseModal}>Close</button>
            <CreatePost username={winner}></CreatePost>
          </Modal>
        </>
      ) : (
        <SpinWheel items={usernames} />
      )}
    </>
  );
}

export default Wheel;
