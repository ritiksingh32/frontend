import axios from "axios";
import { API_URL } from "../utils/config";

export const api = axios.create({
  baseURL: API_URL,
});
