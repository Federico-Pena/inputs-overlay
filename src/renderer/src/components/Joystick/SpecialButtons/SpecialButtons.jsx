import './SpecialButtons.css'
import { classPressed } from '../../../utils/classPressed.js'
import { MenuXbox, PlaystationIcon, SelectXbox, XboxIcon } from '../../Icons/JoystickIcons.jsx'
import { gamepadMap } from '../../../data/gamepad.js'

const SpecialButtons = ({ pressedButtons, controllerType }) => {
  const logo = gamepadMap[controllerType].Logo
  const select = gamepadMap[controllerType].Select
  const start = gamepadMap[controllerType].Start
  return (
    <>
      <span className={`special-button start ${classPressed(pressedButtons, start)}`}>
        <MenuXbox />
      </span>
      <span className={`special-button select ${classPressed(pressedButtons, select)}`}>
        <SelectXbox />
      </span>
      <span className={`special-button home ${classPressed(pressedButtons, logo)}`}>
        {controllerType === 'xbox' ? (
          <XboxIcon />
        ) : controllerType === 'playstation' ? (
          <PlaystationIcon />
        ) : (
          <PlaystationIcon />
        )}
      </span>
    </>
  )
}

export default SpecialButtons
