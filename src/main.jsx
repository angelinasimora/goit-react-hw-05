import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster position='top-right' toastOptions={{ duration: 1000 }} />
  </>
);