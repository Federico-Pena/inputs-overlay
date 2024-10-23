import './Settings.css'
import { useState } from 'react'
import { keysWindows } from '../../data/keyboards.js'
import {
  useKeyboardContext,
  useSettingsContext,
  useToastContext
} from '../../hooks/useContexts.jsx'
import { SettingsIcon } from '../Icons/Icons.jsx'

const Settings = () => {
  const { changeKeyboard } = useKeyboardContext()
  const {
    bgColor,
    hlColor,
    textColor,
    opacity,
    keyboardActive,
    mouseActive,
    changeActiveMyK,
    changeColors,
    changeOpacity,
    restoreStyles
  } = useSettingsContext()
  const addToast = useToastContext()

  const [open, setOpen] = useState(false)
  const handleChangeHigh = () => {
    setOpen(!open)
  }
  const resetKeyboard = () => {
    changeKeyboard(keysWindows)
    addToast('Keyboard reset', 'success')
  }
  const resetStyles = () => {
    restoreStyles()
    addToast('Styles reset', 'success')
  }
  const handleChangeColor = (event) => {
    const newColor = event.target.value
    if (event.target.id === 'input-color-key') {
      changeColors('bgColor', newColor)
      return
    }
    if (event.target.id === 'input-color-highLigth') {
      changeColors('hlColor', newColor)
      return
    }
    if (event.target.id === 'input-color-text') {
      changeColors('textColor', newColor)
      return
    }
  }
  const handleChangeCheckbox = (event) => {
    const checked = event.target.checked
    const visibility = checked ? 'visible' : 'hidden'
    if (event.target.id === 'keyboard-select') {
      addToast(`Keyboard visibility: ${visibility}`, 'success')
      changeActiveMyK('keyboardActive', checked)
      return
    }
    if (event.target.id === 'mouse-select') {
      addToast(`Mouse visibility: ${visibility}`, 'success')
      changeActiveMyK('mouseActive', checked)
      return
    }
  }
  const handleChangeRange = (event) => {
    const value = event.target.value
    changeOpacity(value)
  }
  return (
    <section className={`section-settings ${open ? 'open' : ''}`}>
      <div className="btnSettings" onClick={handleChangeHigh}>
        <SettingsIcon />
      </div>
      <div className="settings-group">
        <label htmlFor="input-color-highLigth">
          HighLigth
          <input
            id="input-color-highLigth"
            type="color"
            value={hlColor}
            onChange={handleChangeColor}
          />
        </label>
        <label htmlFor="input-color-key">
          Buttons
          <input
            id="input-color-key"
            type="color"
            value={bgColor}
            onChange={handleChangeColor}
          />
        </label>
        <label htmlFor="input-color-text">
          Text
          <input
            id="input-color-text"
            type="color"
            value={textColor}
            onChange={handleChangeColor}
          />
        </label>
      </div>
      <div className="settings-group">
        <label htmlFor="keyboard-select">
          Keyboard
          <input
            id="keyboard-select"
            type="checkbox"
            className="inputCheck"
            onChange={handleChangeCheckbox}
            checked={keyboardActive}
          />
          <span className="checkmark"></span>
        </label>
        <label htmlFor="mouse-select">
          Mouse
          <input
            id="mouse-select"
            type="checkbox"
            className="inputCheck"
            onChange={handleChangeCheckbox}
            checked={mouseActive}
          />
          <span className="checkmark"></span>
        </label>
        <label htmlFor="opacity-select">
          Opacity
          <input
            id="mouse-select"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={opacity}
            onChange={handleChangeRange}
          />
        </label>
      </div>
      <div className="settings-group">
        <button
          className="settings-group-btn"
          title={'Reset keys'}
          onClick={resetKeyboard}
        >
          Default keys
        </button>
        <button
          className="settings-group-btn"
          title={'Reset styles'}
          onClick={resetStyles}
        >
          Default styles
        </button>
      </div>
    </section>
  )
}
export default Settings
