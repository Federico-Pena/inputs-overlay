import DragComponent from './components/DragComponent/DragComponent.jsx'
import Keyboard from './components/Keyboard/Keyboard.jsx'
import Mouse from './components/Mouse/Mouse.jsx'
import Settings from './components/Settings/Settings.jsx'
import { ToastContainer } from './components/ToastContainer/ToastContainer.jsx'
import { useSettingsContext } from './hooks/useContexts.jsx'

function App() {
  const { mouseActive, keyboardActive } = useSettingsContext()
  return (
    <div className="app">
      <DragComponent>
        <Settings />
        {keyboardActive && <Keyboard />}
        {mouseActive && <Mouse />}
      </DragComponent>
    </div>
  )
}

export default App
