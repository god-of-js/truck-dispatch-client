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
// @ts-ignore
window.pxToRem = (px: number, baseSize = 16) => `${px / baseSize}rem`;

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={getStore()}>
      {/* TODO: replace loading with an actual loader and animate page entry */}
      <Suspense fallback={<span>Loading....</span>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="bottom-right" reverseOrder={true} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
