
/**
 * OSIKANI DASHBOARD ENTRY POINT
 * This file handles the React 18+ mounting logic and strictly renders the App within StrictMode.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure the root container exists in the index.html before attempting to mount
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to. Check index.html.");
}

// Create the React root and render the application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
