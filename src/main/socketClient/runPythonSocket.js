import { join } from 'node:path'
import { spawn } from 'node:child_process'

const scriptPath = join(process.cwd(), 'src', 'main', 'python', 'main.py')
const venvPath = join(process.cwd(), 'venv', 'Scripts', 'python.exe')

export const runPythonSocket = () => {
  return new Promise((resolve, reject) => {
    const python = spawn(venvPath, [scriptPath], { cwd: process.cwd() })

    let stderrData = ''

    python.stdout.on('data', (data) => {
      let response
      try {
        response = JSON.parse(data.toString())
        console.log('Python Json log:', response)
      } catch (error) {
        console.log('Python string log:', data.toString())
      }
    })

    python.stderr.on('data', (data) => {
      const error = data.toString()
      stderrData += error
    })

    python.on('close', (code) => {
      const message = `Script exited with code ${code}. Error: ${stderrData.trim() ?? 'Unknown error'}`
      reject(new Error(message))
    })

    python.on('error', (err) => {
      reject(new Error(`Failed to start python script: ${err.message}`))
    })
    resolve({ success: true })
  })
}
