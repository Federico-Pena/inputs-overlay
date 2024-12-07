import './ActionButtons.css'
import { classPressed } from '../../../utils/classPressed.js'
import {
  AXbox,
  BXbox,
  CirclePLaystation,
  TrianglePLaystation,
  XPLaystation,
  XXbox,
  YXbox
} from '../../Icons/JoystickIcons.jsx'
import { gamepadMap } from '../../../data/gamepad.js'

const ActionButtons = ({ pressedButtons, controllerType }) => {
  const gamepad = gamepadMap[controllerType]
  const Cross = gamepad.Cross
  const Circle = gamepad.Circle
  const Triangle = gamepad.Triangle
  const Square = gamepad.Square
  return (
    <>
      <span className={`action-button A ${classPressed(pressedButtons, Cross)}`}>
        {controllerType === 'xbox' ? <AXbox /> : <XPLaystation />}
      </span>

      <span className={`action-button B ${classPressed(pressedButtons, Circle)}`}>
        {controllerType === 'xbox' ? <BXbox /> : <CirclePLaystation />}
      </span>
      <span className={`action-button X ${classPressed(pressedButtons, Square)}`}>
        {controllerType === 'xbox' ? <XXbox /> : <XPLaystation />}
      </span>
      <span className={`action-button Y ${classPressed(pressedButtons, Triangle)}`}>
        {controllerType === 'xbox' ? <YXbox /> : <TrianglePLaystation />}
      </span>
    </>
  )
}

export default ActionButtons
