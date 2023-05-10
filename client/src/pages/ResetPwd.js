import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import "../styles/index.css";
import "../styles/login.css";
import { useParams } from "react-router-dom";
import axios from "axios";

//import NewPassword from "../services/NewPasswordService";
import NewPasswordService from "services/NewPasswordService";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const move = keyframes`
0%{
    opacity:0;

}
95%{
    opacity:1;

}
`;
const BackgroundBox = styled.div`
  background-color: #755ef2;
  height: 50vh;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border: 1px solid #053271;

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }

  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .text3 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? "translateX(-10%)" : "translateX(10%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-65%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

const Box1 = styled.div`
  background-color: white;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(10%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border: 4px solid #053271;
  }

  &::after {
    bottom: 3rem;
    border-top: 4px solid #053271;
    border-right: 4px solid #053271;
    border-left: 4px solid #053271;
  }
`;

const Box2 = styled.div`
  background-color: #053271;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) => (props.clicked ? "0px 0 0 0px" : "0 0px 0px 0")};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;

  /* z-index: 100; */
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

const Button = styled.button`
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.clicked ? "52%" : "42%")};

  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "";
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;
const API_URL = "http://localhost:4000/";

class NewPassword {
  resetPassword(resetPasswordCode, email, password) {
    return axios.post(`${API_URL}reset/${resetPasswordCode}`, {
      email,
      password,
    });
  }
}
const ResetPwd = () => {
  const [resetPasswordCode, setResetPasswordCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigates = useNavigate();

  const { token } = useParams();
  const handleChangeResetPasswordCode = (event) =>
    setResetPasswordCode(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleReset = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const newPassword = new NewPassword();
      const response = await newPassword.resetPassword(
        resetPasswordCode,
        email,
        password
      );

      setLoading(false);
      navigates("/login");
      // Handle success
    } catch (error) {
      setLoading(false);

      // Handle error
      setError(error.response.data.message);
    }
  };
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <img
        id="myVideo"
        autoPlay
        loop
        muted
        src="http://localhost:3000/assets/img/bg.png"
        type="video/mp4"
      />
      <div>
        <button onClick={() => navigates(-1)}>Back</button>{" "}
      </div>{" "}
      <BackgroundBox clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>

        <Form className="signin" onSubmit={handleReset}>
          <Title>Reset Password</Title>
          <Input
            type="email"
            name="text"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            validations={[required]}
          />
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            onChange={handleChangePassword}
            validations={[required]}
          />
          <Input
            type="text"
            name="text"
            placeholder="Reset Password Code"
            value={resetPasswordCode}
            onChange={handleChangeResetPasswordCode}
            validations={[required]}
          />

          <Button disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Reset Your Password</span>
          </Button>
          <br></br>
        </Form>
        <Box1 clicked={click} />
        <Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
};

export default ResetPwd;
