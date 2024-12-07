import './Joystick.css'
import useGamepad from '../../hooks/useGamepad.jsx'
import Triggers from './Triggers/Triggers.jsx'
import DPad from './DPad/DPad.jsx'
import Sticks from './Sticks/Sticks.jsx'
import ActionButtons from './ActionButtons/ActionButtons.jsx'
import SpecialButtons from './SpecialButtons/SpecialButtons.jsx'
import { XboxController } from '../Icons/JoystickIcons.jsx'

const Joystick = () => {
  const { gamepad, pressedButtons, controllerType, axex } = useGamepad()

  return gamepad === null ? (
    <section className="joystick-not-connected">
      <p>Please connect a joystick to start</p>
    </section>
  ) : (
    <section className="gamepadContainer">
      {/* <span className="iconControllerType">
        {controllerType === 'xbox' ? <XboxController /> : <XboxController />}
      </span> */}

      <Triggers pressedButtons={pressedButtons} controllerType={controllerType} />
      <DPad pressedButtons={pressedButtons} controllerType={controllerType} />
      <Sticks axex={axex} pressedButtons={pressedButtons} controllerType={controllerType} />
      <ActionButtons pressedButtons={pressedButtons} controllerType={controllerType} />
      <SpecialButtons pressedButtons={pressedButtons} controllerType={controllerType} />
    </section>
  )
}

export default Joystick
