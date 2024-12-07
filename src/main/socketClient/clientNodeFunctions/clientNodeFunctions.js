let buffer = ''

export const handleData = (mainWindow, data) => {
  buffer += data.toString()
  const lines = buffer.split('\n')
  let message = null

  for (let i = 0; i < lines.length - 1; i++) {
    let line = lines[i].trim()
    if (!line) continue
    if (line.startsWith("{'") && line.endsWith("'}")) {
      line = line.replace(/'/g, '"')
    }

    try {
      message = JSON.parse(line)
      console.log('Node socket JsonData: ', message)
      handleEvents(mainWindow, message)
    } catch (err) {
      console.error(`Socket error parsing line: ${line}`, err)
    }
  }

  buffer = lines[lines.length - 1].trim() ? lines[lines.length - 1] : ''

  return message
}

const handleEvents = (mainWindow, message) => {
  const { eventType } = message
  const eventName = isEvent(eventType)
  /*  if (eventType === 'gamepadConnected' || eventType === 'gamepadUnplugged') {
    mainWindow.setAspectRatio(1)
  }
  if (eventType === 'keyboardConnected' || eventType === 'mouseConnected') {
    mainWindow.setAspectRatio(20 / 9)
  } */
  if (eventName !== 'Unknown') {
    mainWindow.webContents.send(eventName, message)
  }
}

const isEvent = (eventType) => {
  const { gamepad, keyboard, mouse } = EVENTS_INPUTS
  switch (eventType) {
    case keyboard.keydown:
    case keyboard.keyup:
    case keyboard.keyboardConnected:
    case keyboard.keyboardDisconnected:
      return 'Keyboard'
    case mouse.wheelUp:
    case mouse.wheelDown:
    case mouse.mouseClicked:
    case mouse.mouseReleased:
    case mouse.mouseConnected:
    case mouse.mouseDisconnected:
      return 'Mouse'
    case gamepad.gamepadConnected:
    case gamepad.gamepadDisconnected:
    case gamepad.gamepadUnplugged:
    case gamepad.gamepadButton:
    case gamepad.gamepadAxis:
      return 'Gamepad'
    default:
      return 'Unknown'
  }
}

const EVENTS_INPUTS = {
  keyboard: {
    keydown: 'keydown',
    keyup: 'keyup',
    keyboardConnected: 'keyboardConnected',
    keyboardDisconnected: 'keyboardDisconnected'
  },
  mouse: {
    wheelUp: 'wheelUp',
    wheelDown: 'wheelDown',
    mouseClicked: 'mouseClicked',
    mouseReleased: 'mouseReleased',
    mouseConnected: 'mouseConnected',
    mouseDisconnected: 'mouseDisconnected'
  },
  gamepad: {
    gamepadConnected: 'gamepadConnected',
    gamepadDisconnected: 'gamepadDisconnected',
    gamepadUnplugged: 'gamepadUnplugged',
    gamepadButton: 'GamepadButton',
    gamepadAxis: 'GamepadAxis'
  }
}
