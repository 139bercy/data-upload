import axios from 'axios';

export default {
  setupInterceptors: (history) => {

      axios.interceptors.response.use(response => {
        return response;
      }, error => {

      if (error.response.status === 401 || error.response.status === 403) {
        history.push('/login');
      }

      return Promise.reject(error);
    });
  },
};
