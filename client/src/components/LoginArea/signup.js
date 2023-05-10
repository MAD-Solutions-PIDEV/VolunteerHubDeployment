import React from "react";
import styles from "./signup.module.css";
import classNames from "classnames";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Captcha from "components/Captcha/captcha";
import axios from "axios";

// JoinMessages
var join = [
  "Join us and make a difference in the lives of others through volunteering!",
  "Be the change you wish to see in the world. Join our community of volunteers today!",
  "Volunteering is not just about giving, it's also about receiving. Join us and experience the joy of giving back!",
  "Looking for a meaningful way to give back to your community? Join our team of volunteers today!",
  "Join us in making the world a better place, one act of kindness at a time.",
  '"Volunteering is the ultimate exercise in democracy. You vote in elections once a year, but when you volunteer, you vote every day about the kind of community you want to live in." - VolunteerHub Team',
  '"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi',
  '"Volunteers do not necessarily have the time; they just have the heart." - Elizabeth Andrew',
  '"No act of kindness, no matter how small, is ever wasted." - Aesop',
  '"The greatest gift you can give someone is your time because when you give your time, you are giving a portion of your life that you will never get back." - Unknown',
];

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};
function sendNotification(Phone) {
  axios
    .post("http://localhost:4000/sms/sendNotification", {
      phone: Phone,
    })
    .then((response) => {
      console.log("SMS notification sent");
    })
    .catch((error) => {
      console.error("Error sending SMS notification:", error);
    });
}
function Signup() {
  const [text, setText] = useState(
    join[Math.floor(Math.random() * join.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setText(join[Math.floor(Math.random() * join.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const btnSolid = classNames(styles.btn, styles.solid);
  const leftPanel = classNames(styles.panel, styles.leftPanel);
  const rightPanel = classNames(styles.panel, styles.rightPanel);
  const btnTransparent = classNames(styles.btn, styles.transparent);
  const containerMode = classNames(styles.container, styles.signUpMode);
  const [agreement, setAgreement] = useState(false);
  const [captchaRes, setCaptchaRes] = useState(false);

  const handleTermsChange = (event) => {
    setAgreement(event.target.checked);
  };
  const signInBtnRef = useRef(null);
  const signUpBtnRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const signupBtn = signUpBtnRef.current;
    const signinBtn = signInBtnRef.current;
    const switchDiv = document.getElementById("switchDiv");
    console.log("before click " + container.classList);

    signupBtn.addEventListener("click", () => {
      container.classList.add(styles.signUpMode);
      console.log("after click " + container.classList);
      switchDiv.className = containerMode;
    });

    signinBtn.addEventListener("click", () => {
      container.classList.remove(styles.signUpMode);
      switchDiv.className = styles.container;
    });

    // Clean up the event listeners on unmount
    return () => {
      signupBtn.removeEventListener("click", () => {
        container.classList.add(styles.signUpMode);
        switchDiv.className = "{containerMode}";
      });

      signinBtn.removeEventListener("click", () => {
        container.classList.remove(styles.signUpMode);
      });
    };
  }, []);

  // Log-in
  const form = useRef();
  const checkBtn = useRef();

  // Declare variables with theirs satates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Intercept inputs changes
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    //validation form
    if (!validateFormSignIn()) {
      return;
    }

    // Check if error else proceed to login
    if (checkBtn.current.context._errors.length === 0 && captchaRes === true) {
      // Call loginService
      AuthService.login(username, password).then(
        () => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user.phone) {
            sendNotification(user.phone);
          }
          console.log(user.roles);
          if (user.roles.includes("ROLE_ADMIN")) {
            // assuming your API response includes the user's role
            navigate("/dashboard/users/list"); // redirect to dashboard for admin
          } else {
            navigate("/");
            window.location.reload(); // redirect to homepage for volunteer
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  // Handle Captcha check

  const handleCaptchaCheck = (result) => {
    setCaptchaRes(result);
    console.log(captchaRes);
  };
  //Sign-up

  // References
  const checkBtnSignup = useRef();
  const formSignup = useRef();

  // Declare variables with their states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [usernameUp, setUsernameUp] = useState("");
  const [email, setEmail] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [terms, setTerms] = useState("");
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  const [messageSignUp, setMessageSignUp] = useState("");

  // Intercept data
  const onChangeUsernameUp = (e) => {
    const username = e.target.value;
    setUsernameUp(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePasswordUp = (e) => {
    const password = e.target.value;
    setPasswordUp(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeBirthdate = (e) => {
    const birthdate = e.target.value;
    setBirthdate(birthdate);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // OnSubmit
  const handleRegister = (e) => {
    e.preventDefault();
    setMessageSignUp("");
    setSuccessfulSignUp(false);

    //validation form
    if (!validateForm()) {
      return;
    }

    // Check for errors
    if (checkBtn.current.context._errors.length === 0) {
      // Call SigupService
      AuthService.register(
        firstName,
        lastName,
        birthdate,
        usernameUp,
        email,
        passwordUp,
        confirmPassword,
        gender
      ).then(
        (response) => {
          setMessageSignUp(response.data.message);
          setSuccessfulSignUp(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessageSignUp(resMessage);
          setSuccessfulSignUp(false);
        }
      );
    }
  };

  // Social media Integration
  let navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  // Google Authentification
  const googleAuth = () => {
    window.open("http://localhost:4000/auth/google/callback", "_self");
  };

  function handleSuccessfulAuthentication(data) {
    // Save the token and user data in local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("userId", data.user.id);

    // Redirect to home page or do any other actions
    window.location.href = "/home";
  }
  // Facebook Authentification
  const facebookAuth = () => {
    window.open("http://localhost:4000/auth/facebook/callback", "_self");
  };

  //vadlidate sign in
  const [usernameSignInError, setUsernameSignInError] = useState("");
  const [passwordSignInError, setPasswordSignInError] = useState("");
  const validateFormSignIn = () => {
    let isValid = true;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // validate username
    if (!username) {
      setUsernameSignInError("Username is required.");
      isValid = false;
    } else {
      setUsernameSignInError("");
    }

    // validate password

    if (!password) {
      setPasswordSignInError("Password is required.");
      isValid = false;
    } else {
      setPasswordSignInError("");
    }

    return isValid;
  };

  // validate sign up

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameUpError, setUsernameUpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [selectedOption, setSelectedOption] = useState(-1);

  const validateForm = () => {
    let isValid = true;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const Nameregex = /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,1}$/;
    // validate first name
    if (!firstName) {
      setFirstNameError("First name is required.");
      isValid = false;
    } else if (!Nameregex.test(firstName)) {
      setFirstNameError(
        "First name must contain only letters (a-z, A-Z) and be at least 3 characters long."
      );
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // validate last name
    if (!lastName) {
      setLastNameError("Last name is required.");
      isValid = false;
    } else if (!Nameregex.test(lastName)) {
      setLastNameError(
        "Last name must contain only letters (a-z, A-Z) and be at least 3 characters long."
      );
      isValid = false;
    } else {
      setLastNameError("");
    }

    // validate username
    const regexUsernameUp = /^[a-zA-Z0-9._-]{3,}$/;

    if (!usernameUp) {
      setUsernameUpError("Username is required.");
      isValid = false;
    } else if (!regexUsernameUp.test(usernameUp)) {
      setUsernameUpError(
        "Username must be at least 3 characters long and contain only letters and numbers."
      );
      isValid = false;
    } else {
      setUsernameUpError("");
    }

    // validate password

    if (!passwordUp) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!passwordRegex.test(passwordUp)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    // validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      isValid = false;
    } else if (confirmPassword !== passwordUp) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // validate gender
    if (!gender) {
      setGenderError("Please select Gender");
      isValid = false;
    } else {
      setGenderError("");
    }

    // validate terms
    if (!agreement) {
      setTerms("Please confirm terms");
      isValid = false;
    } else {
      setTerms("");
    }
    // validate birthdate
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (!birthdate) {
      setBirthdateError("Birthdate is required.");
      isValid = false;
    } else if (new Date(birthdate) > minAgeDate) {
      setBirthdateError("You must be at least 18 years old to register.");
      isValid = false;
    } else {
      setBirthdateError("");
    }

    // validate email
    const emailRegex = /^[a-zA-Z0-9._-]{3,}@[\S]+\.\S+$/;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };
  function handleSelectedOptionChange(newOption) {
    setSelectedOption(newOption);
  }
  return (
    <div className={styles.container} ref={containerRef} id="switchDiv">
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <Form onSubmit={handleLogin} ref={form} className={styles.signInForm}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles.inputField}>
              <i class="fa fa-user"></i>{" "}
              <input
                type="text"
                name="username"
                placeholder={
                  usernameSignInError
                    ? usernameSignInError
                    : "username or email"
                }
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
                className={
                  usernameSignInError
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </div>
            <div className={styles.inputField}>
              <i class="fa fa-lock"></i>{" "}
              <input
                type="password"
                name="password"
                placeholder={
                  passwordSignInError ? passwordSignInError : "password"
                }
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                className={
                  passwordSignInError
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </div>
            {message && (
              <div className="text-danger" role="alert">
                {message}
              </div>
            )}

            <label className="resetPwd">
              <a href="http://localhost:3000/email">Reset Password</a>
            </label>
            <Captcha
              onCheck={handleCaptchaCheck}
              selectedOption={selectedOption}
              onSelectedOptionChange={handleSelectedOptionChange}
            />
            <button disabled={loading} className={btnSolid}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>

            <p className={styles.socialText}>
              Or Sign in with social platforms
            </p>
            <div className={styles.socialMedia}>
              <a onClick={facebookAuth} className={styles.socialIcon}>
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a onClick={googleAuth} className={styles.socialIcon}>
                <i class="fa fa-google" aria-hidden="true"></i>
              </a>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
          <Form
            onSubmit={handleRegister}
            ref={form}
            className={styles.signUpForm}
          >
            <h2 className={styles.title}>Sign up</h2>
            <table>
              <tr>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-user"></i>{" "}
                    <input
                      type="text"
                      placeholder={
                        firstNameError ? firstNameError : "First name"
                      }
                      name="fname"
                      value={firstName}
                      onChange={onChangeFirstName}
                      className={
                        firstNameError
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-user"></i>
                    <input
                      type="text"
                      placeholder={lastNameError ? lastNameError : "Last name"}
                      name="lname"
                      value={lastName}
                      onChange={onChangeLastName}
                      className={
                        lastNameError
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-calendar"></i>{" "}
                    <input
                      type="date"
                      placeholder={
                        birthdateError ? birthdateError : "birthdate"
                      }
                      name="birthdate"
                      value={birthdate}
                      onChange={onChangeBirthdate}
                      className={
                        birthdateError
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-user"></i>{" "}
                    <input
                      type="text"
                      placeholder={
                        usernameUpError ? usernameUpError : "Username"
                      }
                      name="usernameUp"
                      value={usernameUp}
                      onChange={onChangeUsernameUp}
                      className={
                        usernameUpError
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-envelope"></i>{" "}
                    <input
                      type="text"
                      placeholder={emailError ? emailError : "Email"}
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      className={
                        emailError ? "form-control is-invalid" : "form-control"
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-lock"></i>{" "}
                    <input
                      type="password"
                      placeholder={passwordError ? passwordError : "Password"}
                      name="passwordUp"
                      value={passwordUp}
                      onChange={onChangePasswordUp}
                      className={
                        passwordError
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.inputField}>
                    <i class="fa fa-lock"></i>{" "}
                    <input
                      type="password"
                      placeholder={
                        confirmPasswordError
                          ? confirmPasswordError
                          : "Confirm Password"
                      }
                      name="password"
                      value={confirmPassword}
                      onChange={onChangeConfirmPassword}
                      className={
                        confirmPasswordError
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                </td>
                <td align="right">
                  &nbsp;&nbsp;&nbsp;Gender :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    data-icon=""
                    onChange={handleGenderChange}
                  />
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    data-icon=""
                    onChange={handleGenderChange}
                  />
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    data-icon=""
                    onChange={handleGenderChange}
                  />
                  {genderError && (
                    <div className="text-danger">{genderError}</div>
                  )}
                </td>
              </tr>

              <tr>
                <td align="left" colspan="2">
                  <label className="terms">
                    <input
                      type="checkbox"
                      class="option-input checkbox"
                      onChange={handleTermsChange}
                    />
                    &nbsp;&nbsp;By signing up, I agree to VolunteerHub's{" "}
                    <a
                      href="http://localhost:3000/terms"
                      target="_blank"
                      rel="Terms volunteerHub"
                    >
                      Terms and Conditions
                    </a>{" "}
                    of Use.
                  </label>
                  {terms && <div className="text-danger">{terms}</div>}
                </td>
              </tr>
            </table>

            <input type="submit" className={styles.btn} value="Sign up" />

            {firstNameError !== "First name is required." && firstNameError && (
              <div className="text-danger">{firstNameError}</div>
            )}
            {lastNameError !== "Last name is required." &&
              lastNameError &&
              !firstNameError && (
                <div className="text-danger">{lastNameError}</div>
              )}
            {birthdateError !== "Birthdate is required." &&
              !lastNameError &&
              !firstNameError &&
              birthdateError && (
                <div className="text-danger">{birthdateError}</div>
              )}
            {usernameUpError !== "Username is required." &&
              !lastNameError &&
              usernameUpError &&
              !firstNameError &&
              !birthdateError && (
                <div className="text-danger">{usernameUpError}</div>
              )}
            {emailError !== "Email is required." &&
              !usernameUpError &&
              emailError &&
              !lastNameError &&
              !firstNameError &&
              !birthdateError && (
                <div className="text-danger">{emailError}</div>
              )}
            {passwordError &&
              !usernameUpError &&
              !emailError &&
              passwordError !== "Password is required." &&
              !lastNameError &&
              !firstNameError &&
              !birthdateError && (
                <div className="text-danger">{passwordError}</div>
              )}
            {confirmPasswordError &&
              !passwordError &&
              !usernameUpError &&
              !emailError &&
              confirmPasswordError !== "Confirm password is required." &&
              !lastNameError &&
              !firstNameError &&
              !birthdateError && (
                <div className="text-danger">{confirmPasswordError}</div>
              )}

            {!passwordError &&
              !usernameUpError &&
              !emailError &&
              messageSignUp &&
              !birthdateError && (
                <div className="form-group" align="center">
                  <div
                    className={
                      successfulSignUp ? "alert alert-success" : "text-danger"
                    }
                    role="alert"
                  >
                    {messageSignUp}
                  </div>
                </div>
              )}
            <p className={styles.socialText}>
              Or Sign up with social platforms
            </p>
            <div className={styles.socialMedia}>
              <a
                onClick={facebookAuth}
                className={styles.socialIcon}
                disabled={!agreement}
              >
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a onClick={googleAuth} className={styles.socialIcon}>
                <i
                  class="fa fa-google"
                  aria-hidden="true"
                  disabled={!agreement}
                ></i>
              </a>
            </div>
          </Form>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={leftPanel}>
          <div className={styles.content}>
            <h3>New here ?</h3>
            <p className={styles.white} id="join">
              {text}
            </p>
            <button
              className={btnTransparent}
              id="sign-up-btn"
              ref={signUpBtnRef}
            >
              Sign up
            </button>
          </div>
          <img
            src="http://localhost:3000/assets/img/login.svg"
            className={styles.image}
            alt=""
          />
        </div>
        <div className={rightPanel}>
          <div className={styles.content}>
            <h3>One of us ?</h3>
            <p className={styles.white} id="join">
              {text}
            </p>
            <button
              className={btnTransparent}
              id="sign-in-btn"
              ref={signInBtnRef}
            >
              Sign in
            </button>
          </div>
          <img
            src="http://localhost:3000/assets/img/signup.svg"
            className={styles.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
