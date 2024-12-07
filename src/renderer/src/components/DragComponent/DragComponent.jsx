import { useState, useEffect, useRef } from 'react'
import { useSettingsContext, useToastContext } from '../../hooks/useContexts'
import { EVENTS, recibeDataFromMain } from '../../utils/electronSocket.js'
import './DragComponent.css'
import Settings from '../Settings/Settings.jsx'
import Keyboard from '../Keyboard/Keyboard.jsx'
import Mouse from '../Mouse/Mouse.jsx'
import Joystick from '../Joystick/Joystick.jsx'
const DragComponent = () => {
  const {
    bgColor,
    hlColor,
    textHighContrastColor,
    textColor,
    opacity,
    mouseActive,
    keyboardActive,
    joystickActive,
    changeWinSize,
    changeSettingsWinPosition,
    winPosition,
    winSize
  } = useSettingsContext()
  const [isDragging, setIsDragging] = useState(false)
  const [windowPosition, setWindowsPosition] = useState(winPosition)
  const [startMousePosition, setStartMousePosition] = useState(null)
  const addToast = useToastContext()
  const dragRef = useRef(null)

  useEffect(() => {
    try {
      recibeDataFromMain(EVENTS.resizeWindows, (data) => {
        changeWinSize(data)
      })

      recibeDataFromMain(EVENTS.windowPositionReset, (data) => {
        changeSettingsWinPosition(data)
        setWindowsPosition(data)
      })
    } catch (error) {
      addToast('Something went wrong.', 'error')
    }
    try {
      recibeDataFromMain(EVENTS.windowSizeReset, (data) => {
        const { width, height } = data
        changeWinSize({ width, height })
      })
    } catch (error) {
      addToast('Something went wrong.', 'error')
    }
  }, [])

  const handleMouseDown = (event) => {
    if (event.button !== 0) return
    setStartMousePosition({
      x: event.clientX,
      y: event.clientY
    })
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    dragRef.current.classList.remove('focused')
  }
  const handleMouseMove = (event) => {
    dragRef.current.classList.add('focused')
    if (isDragging && startMousePosition) {
      const deltaX = event.clientX - startMousePosition.x
      const deltaY = event.clientY - startMousePosition.y
      const newX = windowPosition.x + deltaX
      const newY = Math.max(windowPosition.y + deltaY, 0)
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      const windowWidth = winSize.width
      const windowHeight = winSize.height
      const position = {
        x: newX < screenWidth - windowWidth ? newX : screenWidth - windowWidth,
        y: newY < screenHeight - windowHeight ? newY : screenHeight - windowHeight
      }

      changeSettingsWinPosition(position)
      setWindowsPosition(position)
    }
  }

  return (
    <div
      ref={dragRef}
      className={createClassNames(mouseActive, keyboardActive, joystickActive)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--font-color': textColor,
        '--bg-color': bgColor,
        '--hl-color': hlColor,
        '--text-high-contrast-color': textHighContrastColor,
        '--opacity': opacity
      }}
    >
      <Settings handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} />
      {keyboardActive && <Keyboard />}
      {mouseActive && <Mouse />}
      {joystickActive && <Joystick />}
    </div>
  )
}
export default DragComponent

const createClassNames = (mouseActive, keyboardActive, joystickActive) => {
  let className = 'dragComponent'
  if (mouseActive) {
    className += ' mouseActive'
  }
  if (keyboardActive) {
    className += ' keyboardActive'
  }
  if (joystickActive) {
    className += ' joystickActive'
  }
  return className
}
