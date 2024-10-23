import { useState, useEffect } from 'react'
import { useKeyboardContext, useToastContext } from './useContexts.jsx'
import { formatNewKey } from '../data/keyboards.js'
import { ipcRender } from '../utils/electronSocket.js'

const useKeyboard = () => {
  const { keyboard, changeKeyboard } = useKeyboardContext()
  const [pressedKeys, setPressedKeys] = useState([])
  const addToast = useToastContext()

  useEffect(() => {
    try {
      ipcRender.on('keyboard-mouse-event', (event, data) => {
        const keyOrButton = data.split(':')[1] || ' '
        if (data.startsWith('keydown:')) {
          const { display, key } = formatNewKey(keyOrButton)
          if (!pressedKeys.includes(display)) {
            setPressedKeys((prevKeys) => [...prevKeys, display])
          }
          if (key === 'Meta') {
            setTimeout(() => {
              setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== display))
            }, 200)
          }
        }
        if (data.startsWith('keyup:')) {
          const { display } = formatNewKey(keyOrButton)
          setPressedKeys((prevKeys) => prevKeys.filter((key) => key !== display))
        }
      })
    } catch (error) {
      addToast('Ups something went wrong', 'error')
    }
  }, [])

  const deleteKey = (rowIndex, keyIndex) => {
    const newKeyboard = keyboard
      .map((row, indexRow) => {
        if (indexRow === rowIndex) {
          return row.filter((_, indexKey) => indexKey !== keyIndex)
        }
        return row
      })
      .filter((row) => row.length > 0)
    addToast(`Key deleted: "${keyboard[rowIndex][keyIndex].display}"`, 'success')
    changeKeyboard(newKeyboard)
  }
  return { deleteKey, pressedKeys }
}
export default useKeyboard
