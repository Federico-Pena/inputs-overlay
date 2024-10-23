import { createContext, useContext, useState } from 'react'
import { ToastContainer } from '../components/ToastContainer/ToastContainer.jsx'

export const ToastContext = createContext()

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 ? <ToastContainer toasts={toasts} /> : null}
    </ToastContext.Provider>
  )
}
