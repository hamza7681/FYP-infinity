import axios from "axios";

export const http = axios.create({
  baseURL: "https://infinity-server.herokuapp.com",
});
