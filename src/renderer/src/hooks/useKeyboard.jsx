import { useState, useEffect } from 'react'
import { useKeyboardContext, useToastContext } from './useContexts.jsx'
import { EVENTS, recibeDataFromMain } from '../utils/electronSocket.js'
import { getOperatingSystem } from '../utils/getOperatingSystem.js'

const useKeyboard = () => {
  const { keyboard, changeKeyboard } = useKeyboardContext()
  const [pressedKeys, setPressedKeys] = useState([])
  const [os] = useState(getOperatingSystem())
  const addToast = useToastContext()

  useEffect(() => {
    try {
      recibeDataFromMain(EVENTS.keyboard, (data) => {
        const { eventType, friendlyName, name } = data
        if (eventType === 'keyboardConnected') {
          addToast(`Keyboard detected: ${name}`, 'success')
        }
        if (eventType === 'keyboardDisconnected') {
          addToast(`Keyboard disconnected: ${name}`)
        }
        if (eventType === 'keyboardUnplugged') {
          addToast('Waiting for keyboard...')
        }
        if (eventType === 'keydown') {
          setPressedKeys((prevKeys) => [...prevKeys, friendlyName])
        }
        if (eventType === 'keyup') {
          setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== friendlyName))
        }
      })
    } catch (error) {
      addToast('Ups something went wrong', 'error')
    }
  }, [])

  const changeKey = (rowIndex, colIndex, keyName) => {
    const newKeyboard = [...keyboard]
    newKeyboard[rowIndex][colIndex] = keyName
    changeKeyboard(newKeyboard)
    addToast(`Key changed to: "${keyName}"`, 'success')
  }

  const deleteKey = (rowIndex, keyIndex) => {
    const newKeyboard = keyboard
      .map((row, indexRow) => {
        if (indexRow === rowIndex) {
          return row.filter((_, indexKey) => indexKey !== keyIndex)
        }
        return row
      })
      .filter((row) => row.length > 0)
    addToast(`Key deleted: "${keyboard[rowIndex][keyIndex]}"`, 'success')
    changeKeyboard(newKeyboard)
  }
  return { changeKey, deleteKey, pressedKeys, os }
}
export default useKeyboard
