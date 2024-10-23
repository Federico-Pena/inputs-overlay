import { useState } from 'react'
import { formatNewKey } from '../../data/keyboards.js'
import './keyboard.css'
import {
  useKeyboardContext,
  useSettingsContext,
  useToastContext
} from '../../hooks/useContexts.jsx'
import { TrasIcon } from '../Icons/Icons.jsx'
import useKeyboard from '../../hooks/useKeyboard.jsx'

const Keyboard = () => {
  const { keyboard, changeKeyboard } = useKeyboardContext()
  const addToast = useToastContext()

  const { textColor, textHighlightColor, bgColor, hlColor, opacity } =
    useSettingsContext()
  const { deleteKey, pressedKeys } = useKeyboard()
  const [editing, setEditing] = useState(null)

  const handleKeyPress = (rowIndex, keyIndex, event) => {
    const newKey = formatNewKey(event.key)
    const newKeyboard = [...keyboard]
    newKeyboard[rowIndex][keyIndex] = newKey
    changeKeyboard(newKeyboard)
    addToast(`Key changed to: "${newKey.display}"`, 'success')
    setEditing(null)
  }

  const toggleEditing = (rowIndex, keyIndex) => {
    if (editing?.row === rowIndex && editing?.key === keyIndex) {
      setEditing(null)
    } else {
      setEditing({ row: rowIndex, key: keyIndex })
    }
  }

  const handleDeleteKey = (rowIndex, keyIndex) => {
    deleteKey(rowIndex, keyIndex)
    setEditing(null)
  }

  return (
    <div
      className="keyboard"
      style={{ '--keyboard-rows': keyboard.length }}
      onMouseLeave={() => setEditing(null)}
    >
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <button
              style={{
                '--font-highlight-color': textHighlightColor,
                '--font-color': textColor,
                '--bg-color': bgColor,
                '--hl-color': hlColor,
                '--opacity': opacity
              }}
              title={key.display}
              key={keyIndex}
              onClick={() => toggleEditing(rowIndex, keyIndex)}
              className={makeClassKey(editing, rowIndex, keyIndex, key, pressedKeys)}
            >
              {editing?.row === rowIndex && editing?.key === keyIndex ? (
                <InputEditKey
                  handleKeyPress={handleKeyPress}
                  keyIndex={keyIndex}
                  rowIndex={rowIndex}
                  handleDeleteKey={handleDeleteKey}
                />
              ) : (
                key.display
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

const InputEditKey = ({ rowIndex, keyIndex, handleKeyPress, handleDeleteKey }) => {
  return (
    <>
      <input
        placeholder="Enter new key"
        type="text"
        autoFocus
        onKeyDown={(e) => handleKeyPress(rowIndex, keyIndex, e)}
      />
      <span title="Delete key" onClick={() => handleDeleteKey(rowIndex, keyIndex)}>
        <TrasIcon />
      </span>
    </>
  )
}

const makeClassKey = (editing, rowIndex, keyIndex, key, pressedKeys) => {
  let classKey = 'key'
  if (key.display === 'Space') {
    classKey += ' space'
  }
  if (pressedKeys.map((k) => k.toLowerCase()).includes(key.display.toLowerCase())) {
    classKey += ' active'
  }
  if (editing?.row === rowIndex && editing?.key === keyIndex) {
    classKey += ' editing'
  }
  if (editing !== null && (editing?.row !== rowIndex || editing?.key !== keyIndex)) {
    classKey += ' noEditing'
  }

  return classKey
}
