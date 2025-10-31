import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://chat-app-mern-3-jhvh.onrender.com/api"; // your backend Render link

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
