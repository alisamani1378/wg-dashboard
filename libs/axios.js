import axios from "axios";

const client = axios.create({
  baseURL: "http://188.245.125.107:8000/",
});

export default client;
