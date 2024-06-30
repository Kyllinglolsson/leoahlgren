// index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Sökväg: leoahlgrense/src/App.js
import './styles/index.css'; // Sökväg: leoahlgrense/src/index.css
import { Buffer } from 'buffer';

// Polyfill Buffer för att stödja gray-matter i webbläsaren
window.Buffer = Buffer;

const root = createRoot(document.getElementById('root'));
root.render(
  <div id="canvas">
    <App />
  </div>
);
