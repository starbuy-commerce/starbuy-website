import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { checkBackupHost } from './API';

checkBackupHost();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
