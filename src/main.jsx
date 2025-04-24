import { StrictMode } from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  

// Créer un root et y rendre l'application avec StrictMode et BrowserRouter
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* On place BrowserRouter autour de l'app pour activer le routing */}
      <App />
    </BrowserRouter>
  </StrictMode>
);

// cfyvgubh
