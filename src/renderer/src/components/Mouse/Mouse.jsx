import React, { useState, useEffect } from 'react'
import './Mouse.css'
import { useSettingsContext, useToastContext } from '../../hooks/useContexts'
import { DirectionWheelIcon } from '../Icons/Icons'
import { ipcRender } from '../../utils/electronSocket.js'
const mouseButtons = {
  left: 0,
  middle: 1,
  right: 2,
  x1: 3,
  x2: 4
}

function Mouse() {
  const [clickedButtons, setClickedButtons] = useState([])
  const { bgColor, hlColor, opacity } = useSettingsContext()
  const addToast = useToastContext()

  useEffect(() => {
    ipcRender.on('keyboard-mouse-event', (event, data) => {
      const keyOrButton = data.split('.')[1]
      if (data.startsWith('MouseClicked:')) {
        setClickedButtons((prevButtons) => [...prevButtons, mouseButtons[keyOrButton]])
      }
      if (data.startsWith('MouseReleased:')) {
        setClickedButtons((prevButtons) =>
          prevButtons.filter((key) => key !== mouseButtons[keyOrButton])
        )
      }
      if (data === 'wheelUp' || data === 'wheelDown') {
        setTimeout(() => {
          setClickedButtons((prevButtons) =>
            [...prevButtons].filter((b) => b !== 'wheelUp' && b !== 'wheelDown')
          )
        }, 500)
        setClickedButtons((prevButtons) => [...prevButtons, data])
      }
      return keyOrButton
    })
  }, [])

  return (
    <div
      className="mouse"
      style={{ '--opacity': opacity, '--bg-color': bgColor, '--hl-color': hlColor }}
    >
      <div
        className={`mouse-button side-forward ${getActiveButtons(clickedButtons, 4)}`}
      ></div>
      <div
        className={`mouse-button side-back ${getActiveButtons(clickedButtons, 3)}`}
      ></div>
      <div className={`mouse-button left ${getActiveButtons(clickedButtons, 0)}`}></div>
      <div className={`mouse-button middle ${getActiveButtons(clickedButtons, 1)}`}>
        <span
          className={`middle-direction ${getWheelDirection(clickedButtons, 'wheelUp')}`}
        >
          <DirectionWheelIcon />
        </span>
        <span
          className={`middle-direction ${getWheelDirection(clickedButtons, 'wheelDown')}`}
        >
          <DirectionWheelIcon />
        </span>
      </div>
      <div className={`mouse-button right ${getActiveButtons(clickedButtons, 2)}`}></div>
    </div>
  )
}

export default Mouse

const getActiveButtons = (clickedButtons, numButton) =>
  clickedButtons.includes(numButton) ? 'active' : ''

const getWheelDirection = (clickedButtons, direction) =>
  clickedButtons.includes(direction) ? direction : ''
