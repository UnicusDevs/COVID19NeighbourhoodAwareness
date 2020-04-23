import axios from "axios";
import Cookies from 'universal-cookie';

// To Do: Add token into auth header
const cookies = new Cookies();
const token = cookies.get("covid19Project");

let config; 

console.log(process.env.NODE_ENV);
const prod = (
  axios.create ({
    baseURL: 'https://home2home-covid.herokuapp.com/',
    headers: { Authorization: token }
  })
);

const local = (
  axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { Authorization: token }
  })
);

export default config = process.env.NODE_ENV === 'local' ? local : prod;