import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import router from './routes/index';
import './index.scss';
import './variables.css';
import reportWebVitals from './reportWebVitals';
import getStore from './modules';
import Loader from 'components/layout/Loader';
import User from 'types/User';
import Api from 'Api';


// @ts-ignore
window.pxToRem = (px: number, baseSize = 16) => `${px / baseSize}rem`;
// @ts-ignore
window.Intercom('update');

const userId = localStorage.getItem('uid');
if (userId) {
  Api.getUser(userId).then((user: User) => {
    // @ts-ignore
    window.Intercom('boot', {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'rglp4uhl',
      name: `${user?.firstName} ${user?.lastName}`,
      email: user.email,
      created_at: user.createdAt,
      userType: user.userType,
    });
  });
}
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={getStore()}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="bottom-right" reverseOrder={true} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(() => {});
