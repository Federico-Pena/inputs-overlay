import { createContext, useState, useEffect, useReducer } from 'react'
import { getTextColor } from '../utils/getTextColor'
import { getSettingsFromLocalStorage } from '../utils/useLocalStorage'
import { SETTINGS_TYPES, settingsReducer } from './settingsReducer.js'
const initialStateSettings = {
  winSize: {
    width: 400,
    height: 250
  },
  winPosition: {
    x: window.screenLeft,
    y: window.screenTop
  },
  bgColor: '#202020',
  hlColor: '#ffffff',
  textColor: '#ffffff',
  textHighlightColor: '#000000',
  keyboardActive: true,
  mouseActive: true,
  opacity: 1
}
const SettingsContext = createContext(initialStateSettings)

const SettingsContextProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialStateSettings)

  useEffect(() => {
    const savedSettings = getSettingsFromLocalStorage()
    dispatch({ type: SETTINGS_TYPES.SET_SETTINGS, payload: savedSettings })
  }, [])

  const changeWinSize = (value) => {
    dispatch({ type: SETTINGS_TYPES.CHANGE_WIN_SIZE, payload: value })
  }

  const changeSettingsWinPosition = (value) => {
    dispatch({ type: SETTINGS_TYPES.CHANGE_WIN_POSITION, payload: value })
  }

  const changeActiveMyK = (key, value) => {
    dispatch({ type: SETTINGS_TYPES.CHANGE_ACTIVE_MYK, payload: { key, value } })
  }

  const changeOpacity = (value) => {
    dispatch({ type: SETTINGS_TYPES.CHANGE_OPACITY, payload: value })
  }

  const changeColors = (type, color) => {
    dispatch({ type: SETTINGS_TYPES.CHANGE_COLOR, payload: { type, color } })
  }

  const restoreStyles = () => {
    dispatch({ type: SETTINGS_TYPES.RESTORE_STYLES })
  }

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        changeActiveMyK,
        changeColors,
        changeOpacity,
        restoreStyles,
        changeWinSize,
        changeSettingsWinPosition
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider, initialStateSettings }
