import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';
import { AppProvider } from './contexts/AppContext';

import './style.css';

const rootElement = document.createElement('div');
rootElement.id = 'container';

document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
