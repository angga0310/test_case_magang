import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../css/app.css'; // Import Tailwind!

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
