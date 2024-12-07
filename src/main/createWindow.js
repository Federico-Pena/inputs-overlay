import { join } from 'node:path'
import { app, shell, BrowserWindow, nativeImage } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico'

let mainWindow = null

function createWindow() {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  mainWindow = new BrowserWindow({
    ...windowsSetting,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.setAlwaysOnTop(true, 'toolbar')
  mainWindow.setIcon(nativeImage.createFromPath(join(__dirname, '../../resources/icon.ico')))
  mainWindow.setThumbarButtons([
    {
      tooltip: 'Reset window position',
      icon: nativeImage.createFromPath(join(__dirname, '../../resources/iconMove.png')),
      click() {
        mainWindow.setPosition(0, 0, true)
        mainWindow.webContents.send('windowPosition-reset', { x: 0, y: 0 })
      }
    },
    {
      tooltip: 'Reset window scale',
      icon: nativeImage.createFromPath(join(__dirname, '../../resources/scaleIcon.png')),
      click() {
        mainWindow.setSize(windowsSetting.width, windowsSetting.height, true)
        mainWindow.webContents.send('windowSize-reset', {
          width: windowsSetting.width,
          height: windowsSetting.width
        })
      }
    }
  ])

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  if (is.dev && process.env?.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env?.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }
  return mainWindow
}

const isMac = process.platform === 'darwin'
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

const windowsSetting = {
  maxWidth: 1000,
  minWidth: 150,
  minHeight: 150,
  width: 400,
  height: 400,
  transparent: true,
  frame: false,
  ...(process.platform === 'linux' ? { icon } : {})
}

export { createWindow }
