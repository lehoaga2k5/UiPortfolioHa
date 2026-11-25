import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './styles/app.css';

if (typeof window !== 'undefined' && /\/{2,}/.test(window.location.pathname)) {
  const collapsed = window.location.pathname.replace(/\/{2,}/g, '/');
  window.history.replaceState(null, '', `${collapsed}${window.location.search}${window.location.hash}`);
}

const container = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (container.hasChildNodes() && container.innerHTML.trim() !== '<!--app-html-->') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
