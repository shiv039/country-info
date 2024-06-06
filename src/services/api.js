import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sampleapis.com/countries",
});

export const fetchCountries = async () => {
  const response = await api.get("/countries");
  return response.data;
};
