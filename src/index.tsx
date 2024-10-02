import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StudentNotesApp from './Main'; // Import StudentNotesApp from Main.tsx

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <StudentNotesApp />
  </React.StrictMode>
);
