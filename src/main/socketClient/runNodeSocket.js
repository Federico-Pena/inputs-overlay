import net from 'node:net'
import { handleData } from './clientNodeFunctions/clientNodeFunctions.js'

const PORT = 65432
const HOST = '127.0.0.1'
const RECONNECT_INTERVAL = 3000
const MAX_RETRIES = 10

export function runNodeSocket(mainWindow) {
  return new Promise((resolve, reject) => {
    const nodeMessage = `Connected to ${HOST}:${PORT}`
    try {
      let retries = 0
      const connectToServer = () => {
        const client = new net.Socket()
        client.on('data', (data) => {
          const pythonMessage = handleData(mainWindow, data)
          resolve({ success: true, node: nodeMessage, python: pythonMessage, client })
        })

        client.on('error', (err) => {
          console.error('TCP socket error:', err.code)
          if (err.code === 'ECONNREFUSED') {
            client.destroy()
            retries++
            if (retries <= MAX_RETRIES) {
              console.log(`Trying to reconnect in ${RECONNECT_INTERVAL}ms`)
              console.log(`Retries: ${retries}/${MAX_RETRIES}`)
              setTimeout(connectToServer, RECONNECT_INTERVAL)
            } else {
              reject(new Error('Max number of retries reached. Exiting.'))
            }
          } else {
            reject(err)
          }
        })

        client.on('close', (code) => {
          if (code === true) {
            const message = 'Conection with python closing'
            console.log(message)
          }
          console.log('client.on(close).')
        })

        client.connect(PORT, HOST, () => {
          retries = 0
        })
      }

      connectToServer()
    } catch (error) {
      reject(error)
    }
  })
}
