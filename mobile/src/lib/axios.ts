import axios from "axios";

export const api = axios.create({
  baseURL: "https://habits-server-r78d.onrender.com",
  // baseURL: "http://192.168.15.171:3333",
});
