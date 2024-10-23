import { useState, useEffect } from 'react'
import { useSettingsContext, useToastContext } from '../../hooks/useContexts'
import { ipcRender } from '../../utils/electronSocket.js'

const DragComponent = ({ children }) => {
  const {
    mouseActive,
    keyboardActive,
    changeWinSize,
    changeSettingsWinPosition,
    winPosition,
    winSize
  } = useSettingsContext()
  const [isDragging, setIsDragging] = useState(false)
  const [windowPosition, setWindowsPosition] = useState(winPosition)
  const [startMousePosition, setStartMousePosition] = useState(null)
  const addToast = useToastContext()

  useEffect(() => {
    try {
      ipcRender.on('windowPosition-reset', (event, data) => {
        changeSettingsWinPosition(data)
        setWindowsPosition(data)
      })
    } catch (error) {
      console.log('windowPosition-reset ', error)

      addToast('Something went wrong.', 'error')
    }
    try {
      ipcRender.on('windowSize-reset', (event, data) => {
        const { width, height } = data
        changeWinSize({ width, height })
        console.log('windowSize-reset ', error)
      })
    } catch (error) {
      addToast('Something went wrong.', 'error')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', getEndOfResize)
    return () => {
      window.removeEventListener('resize', getEndOfResize)
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
  }
  const handleMouseMove = (event) => {
    if (isDragging && startMousePosition) {
      const deltaX = event.clientX - startMousePosition.x
      const deltaY = event.clientY - startMousePosition.y
      const newX = Math.max(windowPosition.x + deltaX, 0)
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

  let resizeTimeout
  const getEndOfResize = (event) => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      handleResize(event)
    }, 100)
  }

  const handleResize = (event) => {
    const width = event.target.innerWidth
    const height = event.target.innerHeight
    changeWinSize({ width, height })
  }
  return (
    <div
      className={createClassNames(mouseActive, keyboardActive)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
export default DragComponent

const createClassNames = (mouseActive, keyboardActive) => {
  let className = 'dragComponent'
  if (mouseActive) {
    className += ' mouseActive'
  }
  if (keyboardActive) {
    className += ' keyboardActive'
  }
  return className
}
