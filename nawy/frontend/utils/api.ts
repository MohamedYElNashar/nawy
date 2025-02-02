import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7007/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;


