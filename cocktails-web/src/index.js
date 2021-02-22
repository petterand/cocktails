import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './App';

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
