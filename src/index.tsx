import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const queryParameters = new URLSearchParams(window.location.search)
const password = queryParameters.get("password")

if (password !== "kocmi") {
  window.location.href = "https://duckduckgo.com/"
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);