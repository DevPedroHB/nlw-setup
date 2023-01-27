import axios from "axios";

export const api = axios.create({
  baseURL: "https://habits-server-r78d.onrender.com",
  // baseURL: "http://localhost:3333",
});
