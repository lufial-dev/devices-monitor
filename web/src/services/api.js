import axios from 'axios';

const api = axios.create({
    baseURL : "http://45.230.154.154:3020"
});

export default api;