import { useState, useEffect } from 'react'
import './Mouse.css'
import { useToastContext } from '../../hooks/useContexts'
import { DirectionWheelIcon } from '../Icons/Icons'
import { recibeDataFromMain, EVENTS } from '../../utils/electronSocket.js'
const mouseButtons = {
  left: 0,
  middle: 1,
  right: 2,
  x1: 3,
  x2: 4
}

function Mouse() {
  const [clickedButtons, setClickedButtons] = useState([])
  const addToast = useToastContext()
  useEffect(() => {
    recibeDataFromMain(EVENTS.mouse, (data) => {
      const { eventType, data: eventData, name } = data
      if (eventType === 'mouseConnected') {
        addToast(`Mouse detected: ${name}`, 'success')
      }
      if (eventType === 'mouseDisconnected') {
        addToast(`Mouse disconnected: ${name}`)
      }
      if (eventType === 'mouseUnplugged') {
        addToast('Waiting for mouse...')
      }
      if (eventType === 'mouseClicked') {
        setClickedButtons((prevButtons) => [...prevButtons, mouseButtons[eventData]])
      }
      if (eventType === 'mouseReleased') {
        setClickedButtons((prevButtons) =>
          prevButtons.filter((key) => key !== mouseButtons[eventData])
        )
      }
      if (eventType === 'wheelUp' || eventType === 'wheelDown') {
        setTimeout(() => {
          setClickedButtons((prevButtons) =>
            [...prevButtons].filter((b) => b !== 'wheelUp' && b !== 'wheelDown')
          )
        }, 500)
        setClickedButtons((prevButtons) => [...prevButtons, eventType])
      }
    })
  }, [])

  return (
    <section className="mouse">
      <div className="sideButtons">
        <div className={`mouse-button side-forward ${getActiveButtons(clickedButtons, 4)}`}></div>
        <div className={`mouse-button side-back ${getActiveButtons(clickedButtons, 3)}`}></div>
      </div>
      <div className={`mouse-button left ${getActiveButtons(clickedButtons, 0)}`}></div>
      <div className={`mouse-button middle ${getActiveButtons(clickedButtons, 1)}`}>
        <span className={`middle-direction ${getWheelDirection(clickedButtons, 'wheelUp')}`}>
          <DirectionWheelIcon />
        </span>
        <span className={`middle-direction ${getWheelDirection(clickedButtons, 'wheelDown')}`}>
          <DirectionWheelIcon />
        </span>
      </div>
      <div className={`mouse-button right ${getActiveButtons(clickedButtons, 2)}`}></div>
    </section>
  )
}

export default Mouse

const getActiveButtons = (clickedButtons, numButton) =>
  clickedButtons.includes(numButton) ? 'active' : ''

const getWheelDirection = (clickedButtons, direction) =>
  clickedButtons.includes(direction) ? direction : ''
