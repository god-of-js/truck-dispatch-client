import axios from 'axios';
import { BACKEND_URL } from 'utils/privateKeys';
import { Toast } from 'utils/toast';
import { getUserSessionId, removeUserSessionId } from 'utils/userSession';

let isRedirecting = false;
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
    if (err.response.data.message === 'jwt expired' || err.response.data.message === 'invalid signature') {
      if (!isRedirecting) {
        isRedirecting = true;
        removeUserSessionId();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(err.response.data);
  },
);

function authorizedInstance() {
  if (!instance.defaults.headers.Authorization) {
    const token = getUserSessionId();
    if (token) instance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  return instance;
}
export default authorizedInstance;
