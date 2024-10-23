const { join } = require('node:path')
const { rm, mkdir } = require('node:fs/promises')
const { existsSync } = require('node:fs')
const { exec } = require('node:child_process')

const compressAndCopyFile = async (source, destination) => {
  return new Promise((resolve, reject) => {
    const command = `powershell Compress-Archive -Force -Path "${source}" -DestinationPath "${destination}"`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error durante la compresión: ${error.message}`)
      } else if (stderr) {
        reject(`Error durante la compresión: ${stderr}`)
      } else {
        resolve(`Archivo comprimido exitosamente a: ${destination}`)
      }
    })
  })
}

exports.default = async function (context) {
  try {
    const source = context.artifactPaths[1]
    const setupName = context.artifactPaths[1].split('\\').pop()
    const destinationDir = join(
      process.cwd(),
      'page-for-download',
      'public',
      'downloadable'
    )

    if (!existsSync(source)) {
      throw new Error(`El archivo ${source} no existe.`)
    }

    if (!existsSync(destinationDir)) {
      await mkdir(destinationDir, { recursive: true })
      console.log(`Carpeta creada: ${destinationDir}`)
    }

    const compressedFileName = `${setupName.split('.exe')[0]}.zip`
    const destination = join(destinationDir, compressedFileName)
    const result = await compressAndCopyFile(source, destination)
    console.log(result)

    await rm(context.outDir, { recursive: true, force: true })
    console.log(`Carpeta eliminada: ${context.outDir}`)
  } catch (error) {
    console.error('Error durante el proceso:', error)
  }
}
