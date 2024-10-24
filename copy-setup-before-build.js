const { join } = require('node:path')
const { rm, mkdir, writeFile } = require('node:fs/promises')
const { existsSync } = require('node:fs')
const { exec } = require('node:child_process')

const createPasswordFile = async (frontendDestinationDir, password) => {
  try {
    const passwordFilePath = join(frontendDestinationDir, 'password.json')
    const content = {
      password: password
    }
    await writeFile(passwordFilePath, JSON.stringify(content, null, 2), 'utf-8')
    return `Password file created at: ${passwordFilePath}`
  } catch (err) {
    const error = new Error(err.message)
    error.name = 'Error creating password file'
    throw error
  }
}

const compressAndCopyFile = async (source, destination, password) => {
  return new Promise((resolve, reject) => {
    const command = `rar a -ep -hp${password} -sfx "${destination}" "${source}"`
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
  })
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
    consoleColor('-'.repeat(consoleWidth), 'black')
    consoleColor('Init copy-setup-before-build')
    const source = context.artifactPaths[1]
    const setupName = context.artifactPaths[1].split('\\').pop()
    const frontendDestinationDir = join(
      process.cwd(),
      'page-for-download',
      'public',
      'downloadable'
    )

    if (!existsSync(source)) {
      throw new Error(`The file ${source} does not exist.`)
    }

    if (!existsSync(frontendDestinationDir)) {
      await mkdir(frontendDestinationDir, { recursive: true })
      consoleColor(`Directory created: ${frontendDestinationDir}`, 'green')
    }

    const compressedFileName = `${setupName.split('.exe')[0]}`
    const destination = join(frontendDestinationDir, compressedFileName)
    const password = setupName.split('-')[0]

    const resultCompress = await compressAndCopyFile(source, destination, password)
    const resultcreatePassword = await createPasswordFile(
      frontendDestinationDir,
      password
    )
    consoleColor(resultCompress, 'green')
    consoleColor(resultcreatePassword, 'green')

    await rm(context.outDir, { recursive: true, force: true })
    consoleColor(`Directory deleted: ${context.outDir}`, 'green')
    consoleColor('-'.repeat(consoleWidth), 'black')
    consoleColor('Finish copy-setup-before-build', 'green')
  } catch (error) {
    consoleColor(`Copy-setup-before-build Error: ${error}`, 'red')
  }
}
