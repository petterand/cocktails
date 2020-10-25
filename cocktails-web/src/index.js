import React from 'react';
import ReactDOM from 'react-dom';
import { config } from 'dotenv';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './app';

config();

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
   });
}

const Render = () => {
   ReactDOM.render(
      <React.StrictMode>
         <App />
      </React.StrictMode>,
      document.getElementById('app')
   );
};

Render();
