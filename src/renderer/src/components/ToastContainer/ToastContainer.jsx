import './ToastStyles.css'

export const ToastContainer = ({ toasts }) => {
  return (
    <section className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </section>
  )
}

const Toast = ({ message, type }) => {
  return message.trim() === '' ? null : (
    <article className={`toast toast-${type}`}>
      <p>{message}</p>
    </article>
  )
}
