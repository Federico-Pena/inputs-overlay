import './Settings.css'
import { useState } from 'react'
import {
  useKeyboardContext,
  useSettingsContext,
  useToastContext
} from '../../hooks/useContexts.jsx'
import { ExpandIcon, MoveIcon, SettingsIcon, StrechIcon } from '../Icons/Icons.jsx'

const Settings = ({ handleMouseDown, handleMouseUp }) => {
  const { restoreKeyboard } = useKeyboardContext()
  const {
    bgColor,
    hlColor,
    textColor,
    opacity,
    keyboardActive,
    mouseActive,
    changeActiveUserInputs,
    changeColors,
    joystickActive,
    changeOpacity,
    restoreStyles,
    strechKeys,
    handleStrechKeys
  } = useSettingsContext()
  const addToast = useToastContext()

  const [open, setOpen] = useState(false)
  const handleChangeHigh = () => {
    setOpen(!open)
  }
  const resetKeyboard = () => {
    restoreKeyboard()
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
      changeColors('textHighContrastColor', getContrastColor(newColor))
      return
    }
    if (event.target.id === 'input-color-text') {
      changeColors('textColor', newColor)
      return
    }
  }
  const handleChangeCheckbox = (event) => {
    const checked = event.target.checked
    if (event.target.id === 'keyboard-select') {
      changeActiveUserInputs('keyboardActive', checked)
      return
    }
    if (event.target.id === 'mouse-select') {
      changeActiveUserInputs('mouseActive', checked)
      return
    }
    if (event.target.id === 'joystick-select') {
      changeActiveUserInputs('joystickActive', checked)
      return
    }
  }
  const handleChangeRange = (event) => {
    const value = event.target.value
    changeOpacity(value)
  }

  return (
    <section className={`section-settings ${open ? 'open' : ''}`}>
      <header>
        {open && (
          <>
            <span
              role="button"
              className="btnMove"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              title={'Move'}
            >
              <MoveIcon />
            </span>
            <span
              role="button"
              className="btnStrech"
              onClick={handleStrechKeys}
              title={strechKeys ? 'Expand' : 'Strech'}
            >
              {strechKeys ? <ExpandIcon /> : <StrechIcon />}
            </span>
          </>
        )}
        <span role="button" className="btnSettings" onClick={handleChangeHigh} title={'Settings'}>
          <SettingsIcon />
        </span>
      </header>

      <div className="hiddenContainer">
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
            Background
            <input id="input-color-key" type="color" value={bgColor} onChange={handleChangeColor} />
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
          <label htmlFor="joystick-select">
            Joystick
            <input
              id="joystick-select"
              type="checkbox"
              className="inputCheck"
              onChange={handleChangeCheckbox}
              checked={joystickActive}
            />
            <span className="checkmark"></span>
          </label>
          {joystickActive ? null : (
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
          )}
          {joystickActive ? null : (
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
          )}
        </div>

        <div className="settings-group">
          <label htmlFor="opacity-select">
            Opacity
            <input
              id="opacity-select"
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
          <button className="settings-group-btn" title={'Reset keys'} onClick={resetKeyboard}>
            Default keys
          </button>
          <button className="settings-group-btn" title={'Reset styles'} onClick={resetStyles}>
            Default styles
          </button>
        </div>
      </div>
    </section>
  )
}
export default Settings

function getContrastColor(hlColor) {
  const r = parseInt(hlColor.slice(1, 3), 16)
  const g = parseInt(hlColor.slice(3, 5), 16)
  const b = parseInt(hlColor.slice(5, 7), 16)

  const brightness = r * 0.299 + g * 0.587 + b * 0.114

  const contrastColor = brightness > 128 ? '#000000' : '#FFFFFF'
  return contrastColor
}
