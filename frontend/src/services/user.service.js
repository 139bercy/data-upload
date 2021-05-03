import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/users';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/all');
  }

  getUserBoard() {
    return axios.get(API_URL + '/user');
  }

  getModeratorBoard() {
    return axios.get(API_URL + '/mod');
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin');
  }

  getUsers() {
    return axios.get(API_URL);
  }

  getUser(user) {
    return axios.get(API_URL + "/" + user.username);
  }

  updateUser(user) {
    return axios.put(API_URL + '/' + user.username, user);
  }

  deleteUser(user) {
    return axios.delete(API_URL + '/' + user.username)
  }

  createUser(user) {
    return axios.post(API_URL + '/new', user);
  }
}

export default new UserService();
