import axios from "axios";

const API_URL = "https://volunteerhub-backend.onrender.com/auth";
class AuthService {
  passwordResetRequest(email) {
    return axios.post(`${API_URL}/password-reset-request`, {
      email,
    });
  }
}

export default new AuthService();
