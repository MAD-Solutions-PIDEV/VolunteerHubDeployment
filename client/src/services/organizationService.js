import { getUserById } from "BackEnd/Modules/services/userService";
import axios from "axios";
const API_URL = "http://localhost:4000/organizations/";
const createOrganization = async (formData) => {
  axios
    .post(API_URL + "addOrg", formData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getListOfActiveOrganizations = async () => {
  try {
    const response = await axios.get(API_URL + "activeOrgs");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getListOfAllOrganizations = async () => {
  try {
    const response = await axios.get(API_URL + "allOrgs");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrganizationById = async (id) => {
  try {
    const response = await axios.get(API_URL + "org/" + id);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const activateOrganization = async (id) => {
  try {
    const response = await axios.put(API_URL + id + "/activateOrg");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const archiveOrganization = async (id) => {
  try {
    const response = await axios.put(API_URL + id + "/archiveOrg");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deactivateOrganization = async (id) => {
  try {
    const response = await axios.put(API_URL + id + "/deactivateOrg");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const blockOrganization = async (id) => {
  try {
    const response = await axios.put(API_URL + id + "/blockOrg");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrgRole = async (name) => {
  try {
    const response = await axios.get("http://localhost:4000/api/role/" + name);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addMember = async (organizationId, userId) => {
  try {
    const response = await axios.put(`${API_URL}${organizationId}/members`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const removeMember = async (organizationId, userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}${organizationId}/members/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const checkMembership = async (userId, organizationId) => {
  try {
    const response = await axios.get(
      `${API_URL}${organizationId}/checkMembership/${userId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

function getDaysSinceCreation(createdAt) {
  // Convert the createdAt string to a Date object
  const createdDate = new Date(createdAt);

  // Calculate the difference between the createdDate and today's date in milliseconds
  const timeDiff = Date.now() - createdDate.getTime();

  // Convert the time difference to days
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}

const getCampaignsByOrganization = async (id) => {
  try {
    const response = await axios.get(API_URL + "campaigns/" + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const OrganizationService = {
  createOrganization,
  getListOfActiveOrganizations,
  getListOfAllOrganizations,
  activateOrganization,
  deactivateOrganization,
  blockOrganization,
  getOrgRole,
  addMember,
  removeMember,
  checkMembership,
  getOrganizationById,
  getDaysSinceCreation,
  getCampaignsByOrganization,
  archiveOrganization,
};

export default OrganizationService;
