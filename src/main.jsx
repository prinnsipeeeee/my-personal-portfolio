import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Local fonts via @fontsource
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/instrument-serif/400-italic.css'

import './style.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
