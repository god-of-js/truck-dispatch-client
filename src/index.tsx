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
import loadServices from 'utils/loadServices';

// Remove before deploy to demo
import './api/firebase';

// @ts-ignore
window.pxToRem = (px: number, baseSize = 16) => `${px / baseSize}rem`;

window.onload = loadServices;

const root = createRoot(document.getElementById('root')!);
root.render(
    <Provider store={getStore()}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="bottom-right" reverseOrder={true} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(() => {});
