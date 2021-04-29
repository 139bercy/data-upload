import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/environnements/';

class EnvService {

  getAllEnv() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new EnvService();
