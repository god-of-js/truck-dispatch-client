import axios from 'axios';
import { BACKEND_URL } from 'utils/privateKeys';

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `Bearer `,
  },
});

export default instance;
