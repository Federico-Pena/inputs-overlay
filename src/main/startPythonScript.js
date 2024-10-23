import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { is } from '@electron-toolkit/utils'

export async function startPythonScript(mainWindow) {
  const scriptPath = join(process.cwd(), 'python', 'keyboard_mouse_listener.py')
  const venvPath = join(process.cwd(), 'venv', 'Scripts', 'python.exe')
  console.log(venvPath)

  try {
    const python = spawn(venvPath, [scriptPath], {
      cwd: process.cwd()
    })

    const data = python.stdout.on('data', (data) => {
      const key = data.toString().trim()
      mainWindow.webContents.send('keyboard-mouse-event', key)
    })

    python.stderr.on('data', (data) => {
      console.error(`python.stderr.on: ${data.toString()}`)
    })

    python.on('close', (code) => {
      console.log(`python.on('close') exited with code ${code}`)
    })

    python.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.error(`No se encontró el intérprete de Python en: ${venvPath}`)
      } else {
        console.error(`Error al ejecutar el proceso de Python: ${err.message}`)
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
