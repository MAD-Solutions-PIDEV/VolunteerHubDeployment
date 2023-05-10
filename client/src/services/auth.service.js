import axios from "axios";
import { UAParser } from "ua-parser-js";
import { isExpired } from "react-jwt";

const API_URL = "https://volunteerhub-backend.onrender.com/api/auth/";
// [SignIn] get User information and send request to the BackEnd
const login = (identifier, password) => {
  return axios //
    .post(API_URL + "signin", {
      identifier,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        // Save logged user in the LocalStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("storedId", response.data.id);
        localStorage.setItem("role", response.data.roles);
        localStorage.setItem("token", response.headers["token"]);
        localStorage.setItem("token", response.headers["token"]);
        getLog("Logged-In: ", response.data.email);
      }
      console.log("test" + response.data);
      return response.data;
    });
};

// [SignOut] remove connected user from LocalStorage
const logout = () => {
  getLog("Log-Out: ", localStorage.user.email);
  localStorage.removeItem("user");
  localStorage.removeItem("storedId");
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("skills");
  return axios.post(API_URL + "signout").then((response) => {
    console.log("user logged out");
  });
};

// Save current user to LocalStorage
// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

const getCurrentUser = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (token) {
    // Check if tokenis expired
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired) {
      logout();
    }
    if (userData && userData.user && userData.token) {
      return userData.user;
    }
    return userData;
  }
};

const getLog = (msg, user) => {
  const parser = new UAParser();
  const uaString = window.navigator.userAgent;
  const ipAddress = window.location.hostname;
  const result = parser.getResult();
  const os = result.os.name + " " + result.os.version;
  const browser = result.browser.name + " " + result.browser.version;
  const device = result.device.model || result.device.type;
  console.log(os);
  const newDate = new Date();
  return axios.post(API_URL + "log", {
    ipAddress,
    os,
    browser,
    uaString,
    device,
    newDate,
    message: msg,
    user: user,
  });
};

const register = (
  firstName,
  lastName,
  birthday,
  username,
  email,
  password,
  confirmPassword,
  gender
) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    username,
    birthday,
    email,
    password,
    confirmPassword,
    gender,
  });
  getLog("Log-Up: ", email);
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  register,
};

export default AuthService;
