import axios from "axios";

export const httpServer = axios.create({
    baseURL: 'http://localhost:8000'
});
