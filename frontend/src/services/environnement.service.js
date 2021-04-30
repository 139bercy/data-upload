import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/environnements';

class EnvService {

  getAllEnv() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  
  deleteEnv(env) {
    console.log("env.service got : " + env);
    return axios.delete(API_URL + '/' + env);
  }
}

export default new EnvService();