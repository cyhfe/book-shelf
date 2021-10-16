import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import AppProviders from './context/index';

import './bootstrap';

const root = document.getElementById('root');
ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  root
);
