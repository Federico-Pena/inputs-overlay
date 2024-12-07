export const handleStickMovement = (friendlyName, state, updatedAxes) => {
  switch (friendlyName) {
    case 'Stick-Left-Horizontal':
      updatedAxes.lx = state
      break
    case 'Stick-Left-Vertical':
      updatedAxes.ly = state
      break
    case 'Stick-Right-Horizontal':
      updatedAxes.rx = state
      break
    case 'Stick-Right-Vertical':
      updatedAxes.ry = state
      break
    default:
      return updatedAxes
  }
  return updatedAxes
}
