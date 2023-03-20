import axios from 'axios';
import { BACKEND_URL } from 'utils/privateKeys';

const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 40000,
  headers: {
    Authorization: `Bearer `,
  },
});

export default instance;
