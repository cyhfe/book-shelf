import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import AppProviders from './context/index';
import { ReactQueryDevtools } from 'react-query/devtools';
import './bootstrap';

const root = document.getElementById('root');
ReactDOM.render(
  <AppProviders>
    <App />
    <ReactQueryDevtools />
  </AppProviders>,
  root
);
