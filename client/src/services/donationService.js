import axios from "axios";

const apiUrl = "http://localhost:4000/";
const token = localStorage.getItem("token");

export async function getAlldonations() {
  return await axios.get(`${apiUrl}donation/`);
}
export async function newdonation(donationData) {
  console.log(donationData);
  return await axios.post(`${apiUrl}donation/`, donationData);
}
export async function newdonationPaypal(donationData) {
  console.log(donationData);
  return await axios.post(`${apiUrl}donation/paypal/`, donationData);
}
export async function donationPrediction(donationData) {
  console.log(donationData);
  return await axios.post(
    "https://volunteerhub-ml-flask.onrender.com/predict/donation/",
    donationData
  );
}
export async function getDonationsByCampaign(id) {
  console.log(id);
  return await axios.get(`${apiUrl}donation/campaign/${id}`);
}

export async function getDonationsByUser(id) {
  return await axios.get(`${apiUrl}donation/user/${id}`);
}

export async function getDonation(id) {
  return await axios.get(`${apiUrl}donation/${id}`);
}
