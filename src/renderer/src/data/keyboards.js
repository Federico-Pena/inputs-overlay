const keysWindows = [
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['|', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
  ['Ctrl', 'Win', 'Alt', ' ']
]

const keySimbols = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  AudioVolumeMute: 'Mute',
  AudioVolumeDown: 'Vol-',
  AudioVolumeUp: 'Vol+',
  MediaTrackNext: '>>|',
  MediaTrackPrevious: '|<<',
  MediaPlayPause: '⏵/⏸',
  MediaStop: '⏹'
}

const specialKeys = {
  windows: {
    Meta: 'Win',
    [' ']: 'Space',
    ...keySimbols
  },
  mac: {
    Meta: 'Cmd',
    [' ']: 'Space',
    ...keySimbols
  },
  linux: {
    Meta: 'Super',
    [' ']: 'Space',
    ...keySimbols
  }
}

export { keysWindows, specialKeys }
