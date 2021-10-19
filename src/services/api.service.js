import axios from "axios";

const apiURL = "http://localhost:8080";

export const getAvailability = () => {
  const response = axios.get(`${apiURL}/availability`);
  return response;
}