import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Game from './Game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Game/>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  </React.StrictMode>
);

