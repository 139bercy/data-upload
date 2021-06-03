import axios from 'axios';

const API_URL = '/api/indexes';

class IndexService {

  getAll() {
    return axios.get(API_URL);
  }

  update(index) {
    return axios.put(API_URL + '/' + index.name, index);
  }

  delete(name) {
    return axios.delete(API_URL + '/' + name);
  }

  create(index) {
    return axios.post(API_URL, index);
  }
}

export default new IndexService();
