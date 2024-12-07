import './DPad.css'
import { classPressed } from '../../../utils/classPressed.js'
import { gamepadMap } from '../../../data/gamepad.js'
import { ArrowJoystick } from '../../Icons/JoystickIcons.jsx'

const DPad = ({ pressedButtons, controllerType }) => {
  const keyDisplay = gamepadMap[controllerType]
  const up = keyDisplay.up
  const down = keyDisplay.down
  const left = keyDisplay.left
  const right = keyDisplay.right

  return (
    <>
      <span className={`arrow arrow-up ${classPressed(pressedButtons, up)}`}>
        <ArrowJoystick />
      </span>
      <span className={`arrow arrow-down ${classPressed(pressedButtons, down)}`}>
        <ArrowJoystick />
      </span>
      <span className={`arrow arrow-left ${classPressed(pressedButtons, left)}`}>
        <ArrowJoystick />
      </span>
      <span className={`arrow arrow-right ${classPressed(pressedButtons, right)}`}>
        <ArrowJoystick />
      </span>
    </>
  )
}

export default DPad
