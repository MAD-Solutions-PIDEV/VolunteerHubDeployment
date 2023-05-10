import axios from "axios";

const apiUrl = "https://volunteerhub-backend.onrender.com/";
const token = localStorage.getItem("token");

export async function getAllCompaigns() {
  return await axios.get(`${apiUrl}campaign/`);
}
export async function getCampaignNameById(id) {
  return await axios.get(`${apiUrl}campaign/campaignName/${id}`);
}
export async function getCampaignCauseById(id) {
  return await axios.get(`${apiUrl}campaign/campaignCause/${id}`);
}
export async function getOrganizationsByUser(id) {
  return await axios.get(`${apiUrl}campaign/organization/${id}`);
}
export async function newCompaign(formData) {
  return await axios.post(`${apiUrl}campaign/`, formData);
}
export async function updateCompaign(id, campaignData) {
  return await axios.put(`${apiUrl}campaign/${id}`, campaignData);
}
export async function acceptCompaign(id) {
  return await axios.put(`${apiUrl}campaign/accept/${id}`);
}
export async function refuseCompaign(id) {
  return await axios.put(`${apiUrl}campaign/refuse/${id}`);
}
export async function deleteCompaign(id) {
  return await axios.delete(`${apiUrl}campaign/${id}`);
}

export async function findById(id) {
  return await axios.get(`${apiUrl}campaign/${id}`);
}
