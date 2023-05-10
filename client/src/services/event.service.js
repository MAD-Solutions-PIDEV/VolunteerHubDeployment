import axios from "axios";
import { UAParser } from "ua-parser-js";

const API_URL = "https://volunteerhub-backend.onrender.com/";

// Save Request
const create = (
  name,
  description,
  status,
  dateStart,
  startTime,
  dateEnd,
  endTime,
  country,
  sdgs,
  image,
  lat,
  long,
  org,
  nbParticipant,
  price,
  subscribe
) => {
  const startDate = new Date(`${dateStart}T${startTime}:00.000Z`).toISOString;
  const endDate = new Date(`${dateEnd}T${endTime}:00.000Z`).toISOString;
  console.log("image", image);
  console.log("subscribe", subscribe);
  console.log("nbParticipant", nbParticipant);
  console.log("price", price);
  // Preparing the form data...
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("dateStart", dateStart);
  formData.append("startTime", startTime);
  formData.append("dateEnd", dateEnd);
  formData.append("endTime", endTime);
  formData.append("country", country);
  formData.append("sdgs", sdgs);
  formData.append("image", image);
  formData.append("lat", lat);
  formData.append("long", long);
  formData.append("organization", org);
  formData.append("nbParticipant", nbParticipant);
  formData.append("price", price || "0");
  formData.append("subscribe", subscribe);
  console.log(formData);
  return axios
    .post(API_URL + "event", formData)
    .then((res) => {
      console.log(res.data);
      console.log(res.data._id);
      if (res.status === "201") {
      }
      return res.data._id;
    })
    .catch((err) => {
      console.log(err);
    });
};

const orgList = (userId) => {
  return axios.get(API_URL + "org", {
    userId,
  });
};

const follow = (userId, eventId) => {
  getLog("participate: ", userId);
  return axios.put(API_URL + "follow", {
    userId,
    eventId,
  });
};

const check = (userId, eventId) => {
  return axios.get(API_URL + `checkFollow/${userId}/${eventId}`);
};

const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL + "events");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchBySdg = async (sdg) => {
  try {
    const response = await axios.post(API_URL + "event/sdg", { sdg });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const approveEvent = async (id) => {
  try {
    const response = await axios.put(API_URL + id + "/approveEvent");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const cancelEvent = async (id) => {
  try {
    const response = await axios.put(API_URL + id + "/cancelEvent");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const user = JSON.parse(localStorage.getItem("user"));
const comment = (event, user, message) => {
  // Preparing the form data...
  return axios
    .post(API_URL + "comment", {
      user,
      event,
      message,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
      if (res.status === 201) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveWinner = () => {
  console.log(user.id);
  getLog("winner: ", user.id);
};

const winnerSaved = () => {
  getLog("getWinner: ", user.id);
};

const checkGame = () => {
  return axios.get(API_URL + `checkGame`);
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(API_URL + "event/" + id);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
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
  return axios.post(API_URL + "api/auth/log", {
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

const getNFT = (userId) => {
  return axios.get(API_URL + `getNFT/${userId}`);
};

const EventService = {
  fetchEvents,
  create,
  orgList,
  follow,
  check,
  approveEvent,
  cancelEvent,
  fetchBySdg,
  comment,
  getEventById,
  checkGame,
  saveWinner,
  winnerSaved,
  getNFT,
};

export default EventService;
