import axios from "axios";
import Cookies from 'universal-cookie';

// To Do: Add token into auth header
const cookies = new Cookies();
const token = cookies.get("covid19Project");

export default axios.create({
  baseURL: 'http://localhost:8080/',
  headers: { Authorization: token }
});