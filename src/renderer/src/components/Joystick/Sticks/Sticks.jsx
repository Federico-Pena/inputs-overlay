import './Sticks.css'
import { gamepadMap } from '../../../data/gamepad.js'
import { classPressed } from '../../../utils/classPressed.js'

const Sticks = ({ axex, pressedButtons, controllerType }) => {
  const { lx, ly, rx, ry } = axex
  const THRESHOLD = 0.01

  const normalize = (value) => ((value / 50000) * 100).toFixed(0)

  const lxNormalized = normalize(lx)
  const lyNormalized = normalize(ly * -1)
  const rxNormalized = normalize(rx)
  const ryNormalized = normalize(ry * -1)

  const isActive = (x, y) => Math.abs(x) > THRESHOLD || Math.abs(y) > THRESHOLD

  const L3 = gamepadMap[controllerType].L3
  const R3 = gamepadMap[controllerType].R3

  return (
    <>
      <span
        className={`stick-container leftStick ${isActive(lxNormalized, lyNormalized) ? 'active' : ''} ${classPressed(pressedButtons, L3)}`}
      >
        L3
        <span
          style={{
            transform: `translate(${lxNormalized}%, ${lyNormalized}%)`
          }}
        />
      </span>
      <span
        className={`stick-container rightStick ${isActive(rxNormalized, ryNormalized) ? 'active' : ''} ${classPressed(pressedButtons, R3)}`}
      >
        R3
        <span
          style={{
            transform: `translate(${rxNormalized}%, ${ryNormalized}%)`
          }}
        />
      </span>
    </>
  )
}

export default Sticks
