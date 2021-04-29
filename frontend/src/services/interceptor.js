import axios from 'axios';
import authHeader from './auth-header';

export default function setupInterceptors(history) {
    // Gestion de l'ajout du header d'authentification
    axios.interceptors.request.use(request => {
        if (request.url !== '/login' && request.url !== '/api/auth/signin') {
            const authHeaders = authHeader()
            if (Object.keys(authHeaders).length === 0) {
                history.push('/login');
                return;
            }
            request.headers = {...request.headers, ...authHeaders};
        }
        return request;
    })
    // Gestion des erreurs en lien avec l'authentification
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
      if (error.response) {
        if (error.response.status === 401) {
            localStorage.removeItem("user");
            history.push('/login');
        }
        if (error.response.status === 403) {
            console.log("Unauthorized");
            alert("Vous n'avez pas les droits pour accéder à cette page");
        }
      }
        return Promise.reject(error);
    })
};
