import axios from 'axios';
import { BACKEND_URL } from 'utils/privateKeys';
import { Toast } from 'utils/toast';
import { getUserSessionId, removeUserSessionId } from 'utils/userSession';

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
    // TODO: remove for deploy
    console.log(err.response.data);
    if (err.response.data.message === 'jwt expired') {
      removeUserSessionId();
      location.reload();
    }
    return Promise.reject(err.response.data);
  },
);

function authorizedInstance(isMultipart?: boolean) {
  if (!instance.defaults.headers.Authorization) {
    const token = getUserSessionId();
    if (token) instance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  if (isMultipart)
    instance.defaults.headers['Content-Type'] = 'multipart/form-data';
  return instance;
}
export default authorizedInstance;
