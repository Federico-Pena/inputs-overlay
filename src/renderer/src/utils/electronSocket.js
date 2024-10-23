const ipcRender = window.electron.ipcRenderer

const handleWinPosition = (position) => ipcRender.send('windowPosition', position)

const handleWinSize = (size) => ipcRender.send('windowSize', size)

export { handleWinPosition, handleWinSize, ipcRender }
