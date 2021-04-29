import axios from 'axios';


export default function setupInterceptors(history) {
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response){
            if (error.response.status === 401) {
                var user = localStorage.getItem("user");
                delete user.accessToken;
                localStorage.setItem("user", user);
                history.push('/login');
            }
            if (error.response.status === 403) {
                console.log("Unauthorized");
            }
        }
        return Promise.reject(error);
    })
};
