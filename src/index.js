import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router/AppRouter';
import './fonts/Roboto/Roboto-Light.ttf';
import './fonts/Roboto/Roboto-Regular.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
