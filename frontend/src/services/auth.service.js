import axios from "axios";

const API_URL = "/api/auth";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "/signin", {
        username: username,
        password: password
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  resetPassword(email) {
    return axios.post(API_URL + "/reset-password", {email: email});
  }

  resetPasswordEnd(password, token) {
    return axios.post(API_URL + "/reset-password/" + token, {password: password});
  }
}

export default new AuthService();
