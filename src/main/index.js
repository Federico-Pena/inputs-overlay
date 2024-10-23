import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { join } from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { windowsSetting } from './windowSetting.js'
import { startPythonScript } from './startPythonScript.js'

const isMac = process.platform === 'darwin'
let mainWindow = null
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit() // Evita la segunda instancia
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}
function createWindow() {
  mainWindow = new BrowserWindow({
    ...windowsSetting,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  try {
    createWindow()
    startPythonScript(mainWindow)

    mainWindow.setAlwaysOnTop(true, 'toolbar')
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
        icon: nativeImage.createFromPath(
          join(__dirname, '../../resources/scaleIcon.png')
        ),
        click() {
          mainWindow.setSize(windowsSetting.width, windowsSetting.height, true)
          mainWindow.webContents.send('windowSize-reset', {
            width: windowsSetting.width,
            height: windowsSetting.height
          })
        }
      }
    ])
    ipcMain.on('windowPosition', (e, windowPosition) => {
      const { x, y } = windowPosition
      mainWindow.setPosition(x, y, true)
    })
    ipcMain.on('windowSize', (e, windowSize) => {
      const { width, height } = windowSize
      mainWindow.setSize(width, height, true)
    })
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  } catch (error) {
    console.log(`\u001b[1;33mError in file: ${__filename.split(process.cwd())[1]}.`)
    console.log(`\u001b[1;31m${error}`)
    console.log('\u001b[0m')
  }
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
