import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChatContextProvider } from './Context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

root.render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>
);