import axios from "axios";

const client = axios.create({
  baseURL: "http://193.151.137.190:8000",
});

export default client;
