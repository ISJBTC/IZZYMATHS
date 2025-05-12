
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { applyScreenshotPrevention } from './utils/screenshotPrevention'

// Apply screenshot prevention measures
applyScreenshotPrevention();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
