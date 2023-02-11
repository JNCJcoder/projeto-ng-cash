import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST || "localhost";
const port = Number(process.env.REACT_APP_PORT) || 3333;

const api = axios.create({
    baseURL: `http://${host}:${port}`,
    validateStatus: () => true
});

export default api;