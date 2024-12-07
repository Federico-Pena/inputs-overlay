const ipcRender = window.electron.ipcRenderer
const apiState = window.api

const sendDataToMain = (nameOfEvent, data) => {
  ipcRender.send(nameOfEvent, data)
}

const recibeDataFromMain = (nameOfEvent, callback) => {
  if (typeof callback === 'function') {
    ipcRender.on(nameOfEvent, (event, data) => {
      callback(data)
    })
  }
}

const EVENTS = {
  windowPosition: 'windowPosition',
  resizeWindows: 'resizeWindows',
  windowPositionReset: 'windowPosition-reset',
  windowSizeReset: 'windowSize-reset',
  inputsActive: 'inputs-active',
  keyboard: 'Keyboard',
  mouse: 'Mouse',
  gamepad: 'Gamepad'
}

export { sendDataToMain, recibeDataFromMain, EVENTS, apiState }
