import axios from "axios";

const client = axios.create({
  baseURL: "http://135.181.152.173:8000",
});

export default client;
