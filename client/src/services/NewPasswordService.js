import axios from "axios";

const API_URL = "https://volunteerhub-backend.onrender.com/";

class NewPassword {
  resetPassword(resetPasswordCode, email, password) {
    return axios.post(`${API_URL}api/auth/reset/${resetPasswordCode}`, {
      email,
      password,
    });
  }
}

export default new NewPassword();
