import './Triggers.css'
import { classPressed } from '../../../utils/classPressed.js'
import { gamepadMap } from '../../../data/gamepad.js'
const Triggers = ({ pressedButtons, controllerType }) => {
  const keyDisplay = gamepadMap[controllerType]
  const upLeft = keyDisplay.L1
  const upRight = keyDisplay.R1
  const downLeft = keyDisplay.L2
  const downRight = keyDisplay.R2

  return (
    <>
      <span className={`trigger upLeft ${classPressed(pressedButtons, upLeft)}`}>
        <span>{upLeft}</span>
      </span>
      <span className={`trigger upRight ${classPressed(pressedButtons, upRight)}`}>
        <span>{upRight}</span>
      </span>
      <span className={`trigger downLeft ${classPressed(pressedButtons, downLeft)}`}>
        <span>{downLeft}</span>
      </span>
      <span className={`trigger downRight ${classPressed(pressedButtons, downRight)}`}>
        <span>{downRight}</span>
      </span>
    </>
  )
}

export default Triggers
