import axios from "axios";


export const api = axios.create({
    baseURL: 'https://gateway.marvel.com:443',
    timeout: 5000,
  });

