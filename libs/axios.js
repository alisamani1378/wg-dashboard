import axios from "axios";

const client = axios.create({
  baseURL: "http://193.151.154.87:8001/",
});

export default client;
