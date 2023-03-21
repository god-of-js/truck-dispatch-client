import axios from 'axios';
import { BACKEND_URL } from 'utils/privateKeys';
import { Toast } from 'utils/toast';

const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 40000,
});

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (!err.response && err.request) {
      Toast.error({
        msg: "we couldn't reach our servers. Kindly check your connection. However, the team is on the issue.",
      });
    }
    Promise.reject(err);
  },
);
export default instance;
