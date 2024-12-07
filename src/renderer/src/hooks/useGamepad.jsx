import { useEffect, useState } from 'react'
import { useToastContext } from './useContexts.jsx'
import { EVENTS, recibeDataFromMain } from '../utils/electronSocket.js'
import { handleStickMovement } from '../utils/handleStickMovement.js'
import { gamepadMap } from '../data/gamepad.js'

function getControllerType(nameController) {
  if (typeof nameController !== 'string') return 'playstation'
  if (nameController.toLowerCase().includes('x-box')) {
    return 'xbox'
  } else {
    return 'playstation'
  }
}

const handleButtonPress = (friendlyName, state, setPressedButtons) => {
  setPressedButtons((prevButtons) => {
    const isAlreadyPressed = prevButtons.includes(friendlyName)
    if ((state >= 1 || state === -1) && !isAlreadyPressed) {
      return [...prevButtons, friendlyName]
    }

    if (friendlyName === 'releasedX') {
      return [...prevButtons].filter((b) => (b !== 'left') & (b !== 'right'))
    } else if (friendlyName === 'releasedY') {
      return [...prevButtons].filter((b) => (b !== 'down') & (b !== 'up'))
    }

    if (state === 0) {
      return prevButtons.filter((key) => key !== friendlyName)
    }

    return prevButtons
  })
}

function useGamepad() {
  const [gamepad, setGamepad] = useState(null)
  const [pressedButtons, setPressedButtons] = useState([])
  const [axex, setAxes] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 })
  const [controllerType, setControllerType] = useState('playstation')
  const addToast = useToastContext()

  useEffect(() => {
    recibeDataFromMain(EVENTS.gamepad, (eventData) => {
      const { data, eventType } = eventData
      console.log(eventData)

      if (eventType === 'gamepadConnected') {
        const { name } = data
        const controllerName = getControllerType(name)
        setControllerType(controllerName)
        setGamepad(data)
        setPressedButtons([])
        setAxes({ lx: 0, ly: 0, rx: 0, ry: 0 })
        addToast(`Gamepad connected: ${name}`, 'success')
      } else if (eventType === 'gamepadDisconnected') {
        const { name } = data
        setControllerType('playstation')
        setGamepad(null)
        setPressedButtons([])
        setAxes({ lx: 0, ly: 0, rx: 0, ry: 0 })
        addToast(`Gamepad removed: ${name}`)
      } else if (eventType === 'gamepadUnplugged') {
        setControllerType('playstation')
        setGamepad(null)
        setPressedButtons([])
        setAxes({ lx: 0, ly: 0, rx: 0, ry: 0 })
        addToast(data)
      }
    })
    gamepad !== null &&
      recibeDataFromMain(EVENTS.gamepad, (data) => {
        const { eventType, state, friendlyName } = data

        const keyDisplay = gamepadMap[controllerType ?? 'playstation'][friendlyName]
        if (eventType === 'GamepadButton') {
          handleButtonPress(keyDisplay, state, setPressedButtons)
        }
        if (eventType === 'GamepadAxis') {
          const updatedAxes = handleStickMovement(friendlyName, state, axex)
          setAxes((prevAxes) => ({ ...prevAxes, ...updatedAxes }))
        }
      })
    gamepad !== null &&
      recibeDataFromMain(EVENTS.keyboard, (data) => {
        const { eventType, friendlyName } = data
        if (friendlyName === '<7>') {
          if (eventType === 'keydown') {
            const nameButton = gamepadMap[controllerType ?? 'playstation'].Logo
            handleButtonPress(nameButton, 1, setPressedButtons)
          }
          if (eventType === 'keyup') {
            handleButtonPress('Logo', 0, setPressedButtons)
          }
        }
      })
  }, [gamepad])

  return { gamepad, pressedButtons, axex, controllerType }
}

export default useGamepad
