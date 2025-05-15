import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MerchantNotFoundPage from './components/MerchantNotFoundPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cosmic-gaming" element={<App merchant="cosmic_gaming" />} />
        <Route path="/skiee-gaming" element={<App merchant="skiee_gaming" />} />
        <Route path="*" element={<MerchantNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)