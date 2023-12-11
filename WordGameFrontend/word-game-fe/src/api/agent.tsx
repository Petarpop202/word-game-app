import axios from 'axios';

const apiAgent = axios.create({
  baseURL: 'http://localhost:3000',
});

export default apiAgent;
