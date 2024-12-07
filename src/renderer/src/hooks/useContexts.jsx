import { useContext } from 'react'
import { KeyboardContext } from '../context/KeyboardContext.jsx'
import { SettingsContext } from '../context/SettingsContext.jsx'
import { ToastContext } from '../context/ToastContext.jsx'

const useToastContext = () => {
  const { addToast } = useContext(ToastContext)
  return addToast
}

const useKeyboardContext = () => {
  const { changeKeyboard, keyboard, restoreKeyboard } = useContext(KeyboardContext)
  return { changeKeyboard, keyboard, restoreKeyboard }
}
const useSettingsContext = () => {
  const {
    winSize,
    winPosition,
    bgColor,
    textColor,
    hlColor,
    keyboardActive,
    textHighContrastColor,
    joystickActive,
    mouseActive,
    opacity,
    changeActiveUserInputs,
    changeColors,
    changeOpacity,
    restoreStyles,
    changeWinSize,
    changeSettingsWinPosition,
    strechKeys,
    handleStrechKeys
  } = useContext(SettingsContext)
  return {
    winSize,
    winPosition,
    bgColor,
    hlColor,
    textColor,
    textHighContrastColor,
    keyboardActive,
    mouseActive,
    joystickActive,
    opacity,
    changeActiveUserInputs,
    changeColors,
    changeOpacity,
    restoreStyles,
    changeWinSize,
    changeSettingsWinPosition,
    strechKeys,
    handleStrechKeys
  }
}
export { useKeyboardContext, useSettingsContext, useToastContext }
