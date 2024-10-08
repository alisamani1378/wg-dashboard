import axios from "axios";

const client = axios.create({
  baseURL: "http://193.151.134.103:8000",
});

export default client;
