import { createContext, useState, useEffect } from 'react'
import {
  getKeyboardFromLocalStorage,
  saveKeyboardToLocalStorage
} from '../utils/useLocalStorage.js'
import { keysWindows } from '../data/keyboards.js'

const initialState = {
  keyboard: keysWindows
}
const KeyboardContext = createContext(initialState)

const KeyboardContextProvider = ({ children }) => {
  const [keyboard, setKeyboard] = useState(keysWindows)

  useEffect(() => {
    const firstKeyboard = getKeyboardFromLocalStorage()
    setKeyboard(firstKeyboard)
  }, [])

  const changeKeyboard = (newKeyboard) => {
    setKeyboard(newKeyboard)
    saveKeyboardToLocalStorage(newKeyboard)
  }
  const restoreKeyboard = () => {
    setKeyboard(keysWindows)
    saveKeyboardToLocalStorage(keysWindows)
  }
  return (
    <KeyboardContext.Provider value={{ restoreKeyboard, changeKeyboard, keyboard }}>
      {children}
    </KeyboardContext.Provider>
  )
}
export { KeyboardContextProvider, KeyboardContext }
