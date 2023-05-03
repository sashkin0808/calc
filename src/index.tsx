import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { ModeProvider } from './components/context/modeContext';
import './style/index.css';

const rootElement = document.getElementById("root")
const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <ModeProvider>
      <App />
    </ModeProvider>
  </React.StrictMode>
);