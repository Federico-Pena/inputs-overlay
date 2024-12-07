import { useState } from 'react'
import './assets/base.css'
import DragComponent from './components/DragComponent/DragComponent.jsx'
import { useSettingsContext } from './hooks/useContexts.jsx'
import { recibeDataFromMain, sendDataToMain } from './utils/electronSocket.js'
import Loader from './components/Loader/Loader.jsx'

function App() {
  const { mouseActive, keyboardActive, joystickActive } = useSettingsContext()
  const [loading, setLoading] = useState(true)
  recibeDataFromMain('socket-connected', (data) => {
    if (data.success) {
      setLoading(false)
      sendDataToMain('inputs-active', { mouseActive, keyboardActive, joystickActive })
    }
  })
  return <div className="app">{loading ? <Loader /> : <DragComponent loading={loading} />}</div>
}

export default App
