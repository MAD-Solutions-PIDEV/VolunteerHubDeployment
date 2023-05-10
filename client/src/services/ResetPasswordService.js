import axios from "axios";

const API_URL = "http://localhost:4000/auth"; 
class AuthService {
  
  passwordResetRequest(email) {
    return axios.post(`${API_URL}/password-reset-request`, {
      email,
    });
  }
}



export default new AuthService();
