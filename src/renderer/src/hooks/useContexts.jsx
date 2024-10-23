import { useContext } from 'react'
import { KeyboardContext } from '../context/KeyboardContext.jsx'
import { SettingsContext } from '../context/SettingsContext.jsx'
import { ToastContext } from '../context/ToastContext.jsx'

const useToastContext = () => {
  const { addToast } = useContext(ToastContext)
  return addToast
}

const useKeyboardContext = () => {
  const { changeKeyboard, keyboard } = useContext(KeyboardContext)
  return { changeKeyboard, keyboard }
}
const useSettingsContext = () => {
  const {
    winSize,
    winPosition,
    bgColor,
    textColor,
    hlColor,
    textHighlightColor,
    keyboardActive,
    mouseActive,
    opacity,
    changeActiveMyK,
    changeColors,
    changeOpacity,
    restoreStyles,
    changeWinSize,
    changeSettingsWinPosition
  } = useContext(SettingsContext)
  return {
    winSize,
    winPosition,
    bgColor,
    hlColor,
    textHighlightColor,
    textColor,
    keyboardActive,
    mouseActive,
    opacity,
    changeActiveMyK,
    changeColors,
    changeOpacity,
    restoreStyles,
    changeWinSize,
    changeSettingsWinPosition
  }
}
export { useKeyboardContext, useSettingsContext, useToastContext }
