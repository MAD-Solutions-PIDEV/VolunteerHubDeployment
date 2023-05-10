import axios from "axios";
import { useParams } from "react-router-dom";
const apiUrl = "https://volunteerhub-backend.onrender.com/";
const token = localStorage.getItem("token");

export async function getUsers() {
  return await axios.get(`${apiUrl}admin/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function validateUser(id) {
  return await axios.put(`${apiUrl}admin/validate/${id}`);
}
export async function blockUser(id) {
  return await axios.put(`${apiUrl}admin/block/${id}`);
}
export async function deleteUser(id) {
  return await axios.put(`${apiUrl}admin/delete/${id}`);
}
export async function updateUser(id, updateUser) {
  return await axios.put(`${apiUrl}user/${id}`, updateUser);
}
export async function updateHost(id, updateHost) {
  return await axios.put(`${apiUrl}user/host/${id}`, updateHost);
}

export async function getListUser() {
  return await axios.get(`${apiUrl}user`);
}
export async function getRoleById(id) {
  return await axios.get(`${apiUrl}user/role/${id}`);
}
export async function getListHost() {
  return await axios.get(`${apiUrl}user/host`);
}

export async function getUserById(id) {
  if (!id) {
    throw new Error("User ID is not defined");
  }

  try {
    const response = await axios.get(`${apiUrl}user/${id}`);
    //console.log("date",response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addFavoriteHost(id, idHost) {
  return await axios.post(`${apiUrl}user/favoriteHost/${id}`, idHost);
}
