import { createContext, useState } from 'react'
import { ToastContainer } from '../components/ToastContainer/ToastContainer.jsx'

export const ToastContext = createContext()

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  /**
   *
   * @param {string} message
   * @param {string} type | info, success, error, warning
   */
  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => {
      const messageExist = prev.some((t) => t.message.toLowerCase() === message.toLowerCase())
      if (messageExist) {
        return prev
      }
      return [...prev, { id, message, type }]
    })
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
