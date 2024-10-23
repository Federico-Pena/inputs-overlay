import { handleWinPosition, handleWinSize } from '../utils/electronSocket.js'
import { getTextColor } from '../utils/getTextColor.js'
import { saveSettingsToLocalStorage } from '../utils/useLocalStorage.js'
import { initialStateSettings } from './SettingsContext.jsx'

const settingsReducer = (state, action) => {
  switch (action.type) {
    case SETTINGS_TYPES.CHANGE_WIN_SIZE:
      handleWinSize(action.payload)
      saveSettingsToLocalStorage({ ...state, winSize: action.payload })

      return { ...state, winSize: action.payload }

    case SETTINGS_TYPES.CHANGE_WIN_POSITION:
      handleWinPosition(action.payload)
      saveSettingsToLocalStorage({ ...state, winPosition: action.payload })

      return { ...state, winPosition: action.payload }

    case SETTINGS_TYPES.CHANGE_ACTIVE_MYK:
      saveSettingsToLocalStorage({ ...state, [action.payload.key]: action.payload.value })

      return { ...state, [action.payload.key]: action.payload.value }

    case SETTINGS_TYPES.CHANGE_OPACITY:
      saveSettingsToLocalStorage({ ...state, opacity: action.payload })

      return { ...state, opacity: action.payload }

    case SETTINGS_TYPES.CHANGE_COLOR:
      const textHighlightColor =
        action.payload.type === 'hlColor'
          ? getTextColor(action.payload.color)
          : state.textHighlightColor
      saveSettingsToLocalStorage({
        ...state,
        [action.payload.type]: action.payload.color,
        textHighlightColor
      })

      return {
        ...state,
        [action.payload.type]: action.payload.color,
        textHighlightColor
      }

    case SETTINGS_TYPES.RESTORE_STYLES:
      saveSettingsToLocalStorage({
        ...initialStateSettings,
        winPosition: state.winPosition,
        winSize: state.winSize
      })
      return {
        ...initialStateSettings,
        winPosition: state.winPosition,
        winSize: state.winSize
      }

    case SETTINGS_TYPES.SET_SETTINGS:
      const { winPosition, winSize } = action.payload
      handleWinPosition(winPosition)
      handleWinSize(winSize)
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
  CHANGE_ACTIVE_MYK: 'CHANGE_ACTIVE_MYK',
  CHANGE_OPACITY: 'CHANGE_OPACITY',
  CHANGE_COLOR: 'CHANGE_COLOR',
  RESTORE_STYLES: 'RESTORE_STYLES'
}
export { SETTINGS_TYPES, settingsReducer }
