import { sendDataToMain, EVENTS } from '../utils/electronSocket.js'
import { saveSettingsToLocalStorage } from '../utils/useLocalStorage.js'
import { initialStateSettings } from './SettingsContext.jsx'

const settingsReducer = (state, action) => {
  switch (action.type) {
    case SETTINGS_TYPES.STRECH_KEYS:
      saveSettingsToLocalStorage({ ...state, strechKeys: state.strechKeys ? false : true })
      return { ...state, strechKeys: state.strechKeys ? false : true }

    case SETTINGS_TYPES.CHANGE_WIN_SIZE:
      sendDataToMain(EVENTS.resizeWindows, action.payload)
      saveSettingsToLocalStorage({ ...state, winSize: action.payload })
      return { ...state, winSize: action.payload }

    case SETTINGS_TYPES.CHANGE_WIN_POSITION:
      sendDataToMain(EVENTS.windowPosition, action.payload)
      saveSettingsToLocalStorage({ ...state, winPosition: action.payload })
      return { ...state, winPosition: action.payload }

    case SETTINGS_TYPES.CHANGE_ACTIVE_USER_INPUTS:
      const { key, value } = action.payload
      let updatedData = { [key]: value }
      if (key === 'joystickActive') {
        updatedData = {
          ...updatedData,
          keyboardActive: value ? false : true,
          mouseActive: value ? false : true
        }
      }
      const newState = {
        ...state,
        ...updatedData
      }
      const dataToSend = {
        joystickActive: newState.joystickActive,
        keyboardActive: newState.keyboardActive,
        mouseActive: newState.mouseActive
      }
      saveSettingsToLocalStorage(newState)
      sendDataToMain(EVENTS.inputsActive, dataToSend)
      return newState

    case SETTINGS_TYPES.CHANGE_OPACITY:
      saveSettingsToLocalStorage({ ...state, opacity: action.payload })
      return { ...state, opacity: action.payload }

    case SETTINGS_TYPES.CHANGE_COLOR:
      saveSettingsToLocalStorage({
        ...state,
        [action.payload.type]: action.payload.color
      })

      return {
        ...state,
        [action.payload.type]: action.payload.color
      }

    case SETTINGS_TYPES.RESTORE_STYLES:
      const dataToSave = {
        ...initialStateSettings,
        keyboardActive: state.keyboardActive,
        mouseActive: state.mouseActive,
        joystickActive: state.joystickActive,
        winPosition: state.winPosition,
        winSize: state.winSize
      }
      saveSettingsToLocalStorage(dataToSave)
      return dataToSave

    case SETTINGS_TYPES.SET_SETTINGS:
      const { winPosition, winSize, joystickActive, keyboardActive, mouseActive } = action.payload
      const data = {
        joystickActive,
        keyboardActive,
        mouseActive
      }
      sendDataToMain(EVENTS.resizeWindows, winSize)
      sendDataToMain(EVENTS.windowPosition, winPosition)
      sendDataToMain(EVENTS.inputsActive, data)
      saveSettingsToLocalStorage({
        ...state,
        ...action.payload
      })
      return { ...state, ...action.payload }

    default:
      return state
  }
}

const SETTINGS_TYPES = {
  SET_SETTINGS: 'SET_SETTINGS',
  CHANGE_WIN_SIZE: 'CHANGE_WIN_SIZE',
  CHANGE_WIN_POSITION: 'CHANGE_WIN_POSITION',
  CHANGE_ACTIVE_USER_INPUTS: 'CHANGE_ACTIVE_USER_INPUTS',
  CHANGE_OPACITY: 'CHANGE_OPACITY',
  CHANGE_COLOR: 'CHANGE_COLOR',
  RESTORE_STYLES: 'RESTORE_STYLES',
  STRECH_KEYS: 'STRECH_KEYS'
}
export { SETTINGS_TYPES, settingsReducer }
