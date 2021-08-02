import axios from 'axios';

const API_URL = '/api/roles';

class UserService {
  getAll() {
    return axios.get(API_URL);
  }
}

export default new UserService();
