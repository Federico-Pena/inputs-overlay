const { join } = require('node:path')
const { rm, mkdir, writeFile } = require('node:fs/promises')
const { existsSync } = require('node:fs')
const { exec } = require('node:child_process')

const createPasswordFile = async (frontendDestinationDir, password) => {
  const passwordFilePath = join(frontendDestinationDir, 'password.json')
  const content = {
    password: password
  }

  await writeFile(passwordFilePath, JSON.stringify(content, null, 2), 'utf-8')
  console.log(`Archivo de contraseña creado en: ${passwordFilePath}`)
}

const compressAndCopyFile = async (source, destination, password) => {
  return new Promise((resolve, reject) => {
    // const command = `powershell Compress-Archive -Force -Path "${source}" -DestinationPath "${destination}"`
    // const command = `rar a -ep -hp${password} "${destination}" "${source}"`
    const command = `rar a -ep -hp${password} -sfx "${destination}" "${source}"`
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
    const frontendDestinationDir = join(
      process.cwd(),
      'page-for-download',
      'public',
      'downloadable'
    )

    if (!existsSync(source)) {
      throw new Error(`El archivo ${source} no existe.`)
    }

    if (!existsSync(frontendDestinationDir)) {
      await mkdir(frontendDestinationDir, { recursive: true })
      console.log(`Carpeta creada: ${frontendDestinationDir}`)
    }

    const compressedFileName = `${setupName.split('.exe')[0]}`
    const destination = join(frontendDestinationDir, compressedFileName)
    const password = setupName.split('-')[0]

    const result = await compressAndCopyFile(source, destination, password)
    await createPasswordFile(frontendDestinationDir, password)
    console.log(result)

    await rm(context.outDir, { recursive: true, force: true })
    console.log(`Carpeta eliminada: ${context.outDir}`)
  } catch (error) {
    console.error('Error durante el proceso:', error)
  }
}
