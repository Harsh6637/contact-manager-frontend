import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for the back-end server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
