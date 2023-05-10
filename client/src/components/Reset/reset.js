import React from "react";
import styles from "./reset.module.css";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";

import NewPassword from "services/NewPasswordService";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import NewPasswordService from "services/NewPasswordService";

function Reset() {
  const fasUser = classNames(styles.fas, styles.faUser);
  const fasLock = classNames(styles.fas, styles.faLock);
  const btnSolid = classNames(styles.btn, styles.solid);
  const fasEnvelope = classNames(styles.fas, styles.faEnvelope);
  const leftPanel = classNames(styles.panel, styles.leftPanel);
  const rightPanel = classNames(styles.panel, styles.rightPanel);
  const btnTransparent = classNames(styles.btn, styles.transparent);
  const containerMode = classNames(styles.container, styles.signUpMode);

  const [resetPasswordCode, setResetPasswordCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const navigates = useNavigate();
  const { token } = useParams();
  const handleChangeResetPasswordCode = (event) =>
    setResetPasswordCode(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleReset = async (event) => {
    event.preventDefault();
    if (
      resetPasswordCode.length < 40 ||
      resetPasswordCode.length > 40 ||
      !/\d/.test(resetPasswordCode)
    ) {
      setNotification("Oops! The reset password code is invalid.");
      setNotificationType("error");
      return;
    }
    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      setNotification(
        "Password must be at least 8 characters and contain a capital letter and a number."
      );
      setNotificationType("error");
      return;
    }

    setLoading(true);

    NewPassword.resetPassword(resetPasswordCode, email, password)
      .then((response) => {
        setNotification(response.data.message);
        setNotificationType("success");

        setTimeout(() => {
          navigates("/login");
        }, 1000);
      })

      // Handle success
      .catch((error) => {
        setNotification("Oops! Something went wrong. Please try again.");
        setNotificationType("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const signInBtnRef = useRef(null);
  const signUpBtnRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const signupBtn = signUpBtnRef.current;
    const signinBtn = signInBtnRef.current;

    console.log("before click " + container.classList);

    signupBtn.addEventListener("click", () => {
      container.classList.add("signup_signUpMode__mk+NW");
      console.log("after click " + container.classList);
    });

    signinBtn.addEventListener("click", () => {
      container.classList.remove("signup_signUpMode__mk+NW");
    });

    // Clean up the event listeners on unmount
    return () => {
      signupBtn.removeEventListener("click", () => {
        container.classList.add("signup_signUpMode__mk+NW");
      });

      signinBtn.removeEventListener("click", () => {
        container.classList.remove("signup_signUpMode__mk+NW");
      });
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {notification && (
        <div className={`${styles.notification} ${styles[notificationType]}`}>
          <p>{notification}</p>
        </div>
      )}

      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <form action="#" className={styles.signInForm} onSubmit={handleReset}>
            <h2 className={styles.title}> Reset Password </h2>
            <div className={styles.inputField}>
              <i className={fasUser}></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div className={styles.inputField}>
              <i className={fasLock}></i>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>
            <div className={styles.inputField}>
              <i className={fasLock}></i>
              <input
                type="text"
                name="text"
                placeholder="Reset Password Code"
                value={resetPasswordCode}
                onChange={handleChangeResetPasswordCode}
                required
              />
            </div>
            <input
              onClick={handleReset}
              type="submit"
              value="Reset Your Password"
              className={btnSolid}
            />
            <p className={styles.socialText}></p>
          </form>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={leftPanel}>
          <div className={styles.content}>
            <p></p>
            <button id="sign-up-btn" ref={signUpBtnRef}></button>
          </div>
          <img
            src="https://volunteerhub.onrender.com/assets/img/login.svg"
            className={styles.image}
            alt=""
          />
        </div>
        <div className={rightPanel}>
          <div className={styles.content}>
            <button
              className={btnTransparent}
              id="sign-in-btn"
              ref={signInBtnRef}
            >
              Reset Password
            </button>
          </div>
          <img className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Reset;
