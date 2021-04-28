import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/users';

class UserService {

  getUserBoard() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + '/mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }

  getUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  updateUser(user) {
    return axios.put(API_URL + '/' + user.username, user, { headers: authHeader() });
  }

  deleteUser(user) {
    return axios.delete(API_URL + '/' + user.username, { headers: authHeader() })
  }
}

export default new UserService();
