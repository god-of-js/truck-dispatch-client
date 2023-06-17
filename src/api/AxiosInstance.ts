import axios from 'axios';
import { BACKEND_URL } from 'utils/privateKeys';
import { Toast } from 'utils/toast';
import {
  getAuthSessionId,
  getUserSessionId,
  removeUserSessionId,
} from 'utils/localStorageMethods';

let isRedirecting = false;
const instance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 240000,
});

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (!err.response && err.request) {
      Toast.error({
        msg: 'Something went wrong. Kindly check your connection. and inform the team if the issue persists.',
      });
    }

    if (
      err.response.data.message === 'jwt expired' ||
      err.response.data.message === 'invalid signature' ||
      err.response.data.message === 'No JWT was provided' ||
      err.response.data.message === 'Invalid JWT'
    ) {
      if (!isRedirecting) {
        isRedirecting = true;
        removeUserSessionId();
        window.location.href = '/auth/login';
        window.location.reload();
      }
    }
    return Promise.reject(err.response.data);
  },
);

function authorizedInstance() {
  if (!instance.defaults.headers.Authorization) {
    // Auth session ID is in case of authentications.
    const token = getUserSessionId() || getAuthSessionId();
    if (token) instance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  return instance;
}
export default authorizedInstance;
