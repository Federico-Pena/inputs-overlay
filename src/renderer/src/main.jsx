import './assets/base.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { KeyboardContextProvider } from './context/KeyboardContext.jsx'
import { SettingsContextProvider } from './context/SettingsContext.jsx'
import { ToastContextProvider } from './context/ToastContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContextProvider>
      <SettingsContextProvider>
        <KeyboardContextProvider>
          <App />
        </KeyboardContextProvider>
      </SettingsContextProvider>
    </ToastContextProvider>
  </React.StrictMode>
)
