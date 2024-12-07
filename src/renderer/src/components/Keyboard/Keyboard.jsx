import { useState } from 'react'
import { specialKeys } from '../../data/keyboards.js'
import './keyboard.css'
import { useKeyboardContext, useSettingsContext } from '../../hooks/useContexts.jsx'
import { TrasIcon } from '../Icons/Icons.jsx'
import useKeyboard from '../../hooks/useKeyboard.jsx'

const Keyboard = () => {
  const { keyboard } = useKeyboardContext()
  const { strechKeys } = useSettingsContext()

  const { changeKey, deleteKey, pressedKeys, os } = useKeyboard()
  const [editing, setEditing] = useState(false)
  const [posKey, setPosKey] = useState(null)

  const handleKeyPress = (e, rowIndex, colIndex) => {
    const keyName = specialKeys[os][e.key] ?? e.key
    changeKey(rowIndex, colIndex, keyName)
    setPosKey(null)
    setEditing(false)
  }

  const handleDeleteKey = (rowIndex, colIndex) => {
    console.log(rowIndex, colIndex)
    deleteKey(rowIndex, colIndex)
    setEditing(false)
    setPosKey(null)
  }
  const handleEditing = (rowIndex, colIndex) => {
    if (editing === false) {
      setEditing(true)
      setPosKey({ rowIndex, colIndex })
    } else {
      setEditing(false)
      setPosKey(null)
    }
  }
  return (
    <section
      className={`keyboard ${strechKeys ? 'strech' : 'expand'}`}
      onMouseLeave={() => {
        setEditing(false)
        setPosKey(null)
      }}
    >
      {keyboard.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, keyIndex) => {
              return (
                <button
                  key={keyIndex}
                  onClick={() => handleEditing(rowIndex, keyIndex)}
                  className={makeClassKey(posKey, rowIndex, keyIndex, key, pressedKeys)}
                >
                  {posKey?.rowIndex === rowIndex && posKey?.colIndex === keyIndex ? (
                    <InputEditKey
                      keyContent={specialKeys[os][key] ?? key}
                      handleKeyPress={(e) => handleKeyPress(e, rowIndex, keyIndex)}
                      handleDeleteKey={() => handleDeleteKey(rowIndex, keyIndex)}
                    />
                  ) : (
                    (specialKeys[os][key] ?? key)
                  )}
                </button>
              )
            })}
          </div>
        )
      })}
    </section>
  )
}

export default Keyboard

const InputEditKey = ({ keyContent, handleKeyPress, handleDeleteKey }) => {
  return (
    <>
      <input
        placeholder={`Old key: ${keyContent}`}
        type="text"
        autoFocus
        onKeyDown={handleKeyPress}
      />
      <span title="Delete key" onClick={handleDeleteKey}>
        <TrasIcon />
      </span>
    </>
  )
}

const makeClassKey = (posKey, rowIndex, keyIndex, key, pressedKeys) => {
  let classKey = 'key'
  if (key === ' ') {
    classKey += ' large'
  }
  if (
    key === 'Backspace' ||
    key === 'Shift' ||
    key === 'CapsLock' ||
    key === 'Enter' ||
    key === 'Tab'
  ) {
    classKey += ' medium'
  }
  if (key === 'Ctrl' || key === 'Alt' || key === 'Win') {
    classKey += ' tiny'
  }
  if (pressedKeys.map((k) => k.toLowerCase()).includes(key.toLowerCase())) {
    classKey += ' active'
  }
  if (posKey?.rowIndex === rowIndex && posKey?.colIndex === keyIndex) {
    classKey += ' editing'
  }
  if (posKey !== null && (posKey?.rowIndex !== rowIndex || posKey?.colIndex !== keyIndex)) {
    classKey += ' noEditing'
  }
  return classKey
}
