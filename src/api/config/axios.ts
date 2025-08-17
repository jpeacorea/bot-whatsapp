import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.EXTERNAL_API_URL)

export const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});