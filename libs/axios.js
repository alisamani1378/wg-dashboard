import axios from "axios";

const client = axios.create({
  baseURL: "http://85.198.10.46:8000",
});

export default client;
