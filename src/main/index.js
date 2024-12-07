import { app, ipcMain } from 'electron'
import { createWindow } from './createWindow.js'
import { runPythonSocket } from './socketClient/runPythonSocket.js'
import { runNodeSocket } from './socketClient/runNodeSocket.js'
;(async () => {
  try {
    await app.whenReady()
    const mainWindow = createWindow()
    mainWindow.on('resize', () => handleResize(mainWindow))
    ipcMain.on('windowPosition', (e, windowPosition) =>
      handlePosition(e, windowPosition, mainWindow)
    )

    const { success } = await runPythonSocket()
    if (success) {
      const { node, python, success: success2, client } = await runNodeSocket(mainWindow)
      if (!success2) {
        throw new Error('Socket connection failed.')
      }
      mainWindow.webContents.send('socket-connected', { success: true })
      console.log(`\u001b[1;32mPython socket: ${python}\u001b[0m`)
      console.log(`\u001b[1;32mNode socket: ${node}\u001b[0m`)
      ipcMain.on('inputs-active', (e, dataFront) => {
        const data = {
          eventType: 'inputs-active',
          data: dataFront
        }
        if (dataFront.joystickActive) {
          mainWindow.setAspectRatio(1)
        } else {
          mainWindow.setAspectRatio(20 / 9)
        }
        const jsonData = JSON.stringify(data) + '\n'
        client.write(jsonData, 'utf-8', (err) => {
          if (err) {
            console.error('client.write error:', err)
            // Opcional: enviar un mensaje a la UI sobre el error
            // mainWindow.webContents.send('Failed-change-inputs', err);
          } else {
            // console.log('client.write success.')
          }
        })
      })
    }
  } catch (error) {
    console.log(`\u001b[1;31mMain index.js error: ${error}`)
    console.log('\u001b[0m')
    process.exit(1)
  }
})().catch((error) => {
  console.log(`\u001b[1;31mMain index.js error: ${error}`)
  console.log('\u001b[0m')
  process.exit(1)
})

const handlePosition = (e, newPosition, mainWindow) => {
  const { x, y } = newPosition
  if (typeof x === 'number' && typeof y === 'number') {
    mainWindow.setPosition(x, y, true)
  }
}

let resizeTimeout
const handleResize = (mainWindow) => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    const { width, height } = mainWindow.getBounds()
    mainWindow.webContents.send('resizeWindows', { width, height })
  }, 300)
}
