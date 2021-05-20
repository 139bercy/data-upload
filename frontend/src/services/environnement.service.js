import axios from 'axios';

const API_URL = '/api/environnements';

class EnvService {

  getAllEnvironnements() {
    return axios.get(API_URL);
  }


  deleteEnvironnement(env) {
    return axios.delete(API_URL + '/' + env);
  }

  createEnv(name) {
    return axios.post(API_URL, { "name": name });
  }
}

export default new EnvService();
