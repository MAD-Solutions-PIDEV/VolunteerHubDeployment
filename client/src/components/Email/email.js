import React from "react";
import styles from "./reset.module.css";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AuthService from "services/ResetPasswordService";

function Email() {
  const fasUser = classNames(styles.fas, styles.faUser);
  const fasLock = classNames(styles.fas, styles.faLock);
  const btnSolid = classNames(styles.btn, styles.solid);
  const fasEnvelope = classNames(styles.fas, styles.faEnvelope);
  const leftPanel = classNames(styles.panel, styles.leftPanel);
  const rightPanel = classNames(styles.panel, styles.rightPanel);
  const btnTransparent = classNames(styles.btn, styles.transparent);
  const containerMode = classNames(styles.container, styles.signUpMode);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const required = (value) => {
    if (!value) {
      return <div>This field is required!</div>;
    }
  };
  const navigates = useNavigate();

  const handleReset = (event) => {
    event.preventDefault();

    setLoading(true);

    AuthService.passwordResetRequest(email)
      .then((response) => {
        setNotification(response.data.message);
        setNotificationType("success");
      })
      .catch((error) => {
        setNotification("Oops! Something went wrong. Please try again.");
        setNotificationType("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
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
                type="text"
                name="text"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, email]}
              />
            </div>
            <input
              onClick={handleReset}
              type="submit"
              value="Search"
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

export default Email;
