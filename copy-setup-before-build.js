const { mkdir, copyFile, rm } = require('node:fs/promises')
const { existsSync } = require('node:fs')
const { join } = require('node:path')

const compressAndCopyFile = async (source, destination) => {
  try {
    if (!existsSync(destination)) {
      await mkdir(destination, { recursive: true })
      consoleColor(`Directory created: ${destination}`, 'green')
    }
    const destinationFile = join(destination, 'Inputs_Overlay.txt')
    await copyFile(source, destinationFile)
    return `File successfully compressed to: ${destination}`
  } catch (error) {
    throw new Error(`${error.message}`)
  }
  /*  return new Promise((resolve, reject) => {
    const command = `rar a "${newFilePath}" "${source}"`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (error.message.includes('"rar"')) {
          reject(
            'Compression error: The "rar" command is not found. Please install WinRAR and add it to your PATH.'
          )
        } else {
          reject(`Compression error: ${error.message}`)
        }
      } else if (stderr) {
        reject(`Compression error: ${stderr}`)
      } else {
        resolve(`File successfully compressed to: ${destination}`)
      }
    })
  }) */
}
/**
 *
 * @param {string} text
 * @param {string} color white, red, green, yellow
 */
const consoleColor = (text, color = 'white') => {
  const colors = {
    white: 37,
    red: 31,
    green: 32,
    yellow: 33,
    black: 30
  }
  console.log(`\x1b[${colors[color]}m${text}\x1b[0m`)
}
exports.default = async function (context) {
  try {
    const consoleWidth = process.stdout.columns
    const frontendDestinationDir = join(
      process.cwd(),
      'page-for-download',
      'public',
      'downloadable'
    )
    consoleColor('-'.repeat(consoleWidth), 'black')
    const source = context.artifactPaths[1]
    consoleColor(`Copy file ${source} to ${frontendDestinationDir}`, 'green')

    if (!existsSync(source)) {
      throw new Error(`The file ${source} does not exist.`)
    }

    const resultCopy = await compressAndCopyFile(source, frontendDestinationDir)
    consoleColor(resultCopy, 'green')

    await rm(context.outDir, { recursive: true, force: true })
    consoleColor(`Directory deleted: ${context.outDir}`, 'green')
    consoleColor('-'.repeat(consoleWidth), 'black')
    consoleColor('Finish copy-setup-before-build', 'green')
  } catch (error) {
    consoleColor(`Copy-setup-before-build Error: ${error}`, 'red')
  }
}
