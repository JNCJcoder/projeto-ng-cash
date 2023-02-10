import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST || "localhost";

const api = axios.create({
    baseURL: `http://${host}:3333`,
    validateStatus: () => true
});

export default api;