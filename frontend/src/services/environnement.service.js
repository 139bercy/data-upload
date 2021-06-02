import axios from 'axios';

const API_URL = '/api/environnements';

class EnvService {

  getAllEnvironnements() {
    return axios.get(API_URL);
  }

  update(environment) {
    return axios.put(API_URL + '/' + environment.name, environment);
  }

  deleteEnvironnement(environmentName) {
    return axios.delete(API_URL + '/' + environmentName);
  }

  createEnv(environment) {
    return axios.post(API_URL, environment);
  }
}

export default new EnvService();
