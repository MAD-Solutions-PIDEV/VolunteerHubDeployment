import axios from 'axios';
import { useParams } from "react-router-dom";
const apiUrl = "http://localhost:4000/"

export async function getMissionByCateogry(category) {
    if (!category) {
      throw new Error("Mission is not defined");
    }
  
    try {
      const response = await axios.get(`${apiUrl}missions/category/${category}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
export async function getMission() {
    return await axios.get(`${apiUrl}missions`);
  }

  export async function updateMission(id, updateMission) {
    return await axios.put(`${apiUrl}missions/${id}`, updateMission);
  }

  export async function refuseMission(id){
    return await axios.put(`${apiUrl}missions/refuse/${id}`);
}
export async function acceptMission(id){
  return await axios.put(`${apiUrl}missions/accept/${id}`);
}
  export async function getMissionById(id) {
    if (!id) {
      throw new Error("Mission ID is not defined");
    }
  
    try {
      const response = await axios.get(`${apiUrl}missions/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function sendEmail(data) {
    try {
      const response = await axios.post(`${apiUrl}missions/api/sendMail`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
