import { initialStateSettings } from '../context/SettingsContext.jsx'
import { keysWindows } from '../data/keyboards.js'

const getKeyboardFromLocalStorage = () => {
  const storedKeyboard = localStorage.getItem('keyboard')
  if (storedKeyboard !== null) {
    return JSON.parse(storedKeyboard)
  }
  return keysWindows
}

const saveKeyboardToLocalStorage = (keyboard) => {
  localStorage.setItem('keyboard', JSON.stringify(keyboard))
}

const saveSettingsToLocalStorage = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings))
}

const getSettingsFromLocalStorage = () => {
  const storedSettings = localStorage.getItem('settings')

  if (storedSettings !== null) {
    return JSON.parse(storedSettings)
  }
  return initialStateSettings
}

export {
  getKeyboardFromLocalStorage,
  saveKeyboardToLocalStorage,
  saveSettingsToLocalStorage,
  getSettingsFromLocalStorage
}
