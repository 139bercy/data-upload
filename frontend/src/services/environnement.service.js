import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/environnements';

class EnvService {

  getAllEnv() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  deleteEnv(env) {
    return axios.delete(API_URL + '/' + env, { headers: authHeader() });
  }
  
  createEnv(name) {
    return axios.post(API_URL, {"name":name}, {headers: authHeader()});
  }
}

export default new EnvService();