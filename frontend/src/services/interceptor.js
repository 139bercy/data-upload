import axios from 'axios';
import authHeader from './auth-header';

function completeUrl(url) {
  return process.env.PUBLIC_URL + url;
}

function shouldBeLoggedIn(request) {
  const url = request.url
  console.log(request)
  return url !== completeUrl('/login') && url !== completeUrl('/api/auth/signin')
  &&
  url !== completeUrl('/reset-password') && url !== completeUrl('/api/auth/reset-password')
  &&
  !url.startsWith(completeUrl('/reset-password/')) && !url.startsWith(completeUrl('/api/auth/reset-password/'))
}

export default function setupInterceptors(history) {
  // Gestion de l'ajout du header d'authentification
  axios.interceptors.request.use(request => {
    if (shouldBeLoggedIn(request)) {
      const authHeaders = authHeader()
      if (!authHeader || Object.keys(authHeaders).length === 0) {
        history.push('/login');
        return;
      }
      request.headers = { ...request.headers, ...authHeaders };
    }
    return request;
  })
  // Gestion des erreurs en lien avec l'authentification
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    // console.log(error, error.config)
    if (error.response && shouldBeLoggedIn(error.config.url)) {
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        history.push('/login');
      }
      if (error.response.status === 403) {
        console.log("Unauthorized");
        alert("Vous n'avez pas les droits pour accéder à cette page");
        history.push('/');
      }
    }
    return Promise.reject(error);
  })
};
