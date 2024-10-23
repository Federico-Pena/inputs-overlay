const keysWindows = [
  // Primera fila (números y símbolos)
  [
    { display: 'Esc', key: 'Escape' },
    { display: 'F1', key: 'F1' },
    { display: 'F2', key: 'F2' },
    { display: 'F3', key: 'F3' },
    { display: 'F4', key: 'F4' },
    { display: 'F5', key: 'F5' },
    { display: 'F6', key: 'F6' },
    { display: 'F7', key: 'F7' },
    { display: 'F8', key: 'F8' },
    { display: 'F9', key: 'F9' },
    { display: 'F10', key: 'F10' },
    { display: 'F11', key: 'F11' },
    { display: 'F12', key: 'F12' }
  ],
  // Segunda fila (función y números)
  [
    { display: '`', key: '`' },
    { display: '1', key: '1' },
    { display: '2', key: '2' },
    { display: '3', key: '3' },
    { display: '4', key: '4' },
    { display: '5', key: '5' },
    { display: '6', key: '6' },
    { display: '7', key: '7' },
    { display: '8', key: '8' },
    { display: '9', key: '9' },
    { display: '0', key: '0' },
    { display: '-', key: '-' },
    { display: '=', key: '=' },
    { display: 'Backspace', key: 'Backspace' }
  ],
  // Tercera fila (letras y tab)
  [
    { display: 'Tab', key: 'Tab' },
    { display: 'Q', key: 'q' },
    { display: 'W', key: 'w' },
    { display: 'E', key: 'e' },
    { display: 'R', key: 'r' },
    { display: 'T', key: 't' },
    { display: 'Y', key: 'y' },
    { display: 'U', key: 'u' },
    { display: 'I', key: 'i' },
    { display: 'O', key: 'o' },
    { display: 'P', key: 'p' },
    { display: '[', key: '[' },
    { display: ']', key: ']' },
    { display: '\\', key: '\\' }
  ],
  // Cuarta fila (mayúsculas y letras)
  [
    { display: 'Caps Lock', key: 'CapsLock' },
    { display: 'A', key: 'a' },
    { display: 'S', key: 's' },
    { display: 'D', key: 'd' },
    { display: 'F', key: 'f' },
    { display: 'G', key: 'g' },
    { display: 'H', key: 'h' },
    { display: 'J', key: 'j' },
    { display: 'K', key: 'k' },
    { display: 'L', key: 'l' },
    { display: ';', key: ';' },
    { display: "'", key: "'" },
    { display: 'Enter', key: 'Enter' }
  ],
  // Quinta fila (modificadores y espacio)
  [
    { display: 'Shift', key: 'Shift' },
    { display: 'Z', key: 'z' },
    { display: 'X', key: 'x' },
    { display: 'C', key: 'c' },
    { display: 'V', key: 'v' },
    { display: 'B', key: 'b' },
    { display: 'N', key: 'n' },
    { display: 'M', key: 'm' },
    { display: ',', key: ',' },
    { display: '.', key: '.' },
    { display: '/', key: '/' },
    { display: 'Shift', key: 'Shift' }
  ],
  // Sexta fila (control y otros)
  [
    { display: 'Ctrl', key: 'Control' },
    { display: 'Win', key: 'Meta' },
    { display: 'Alt', key: 'Alt' },
    { display: 'Space', key: ' ' }
  ]
]
const formatNewKey = (eventKey) => {
  let newKey = {
    display: eventKey.toUpperCase(),
    key: eventKey
  }

  if (eventKey === 'Escape') {
    newKey = {
      display: 'Esc',
      key: eventKey
    }
  } else if (eventKey === 'Tab') {
    newKey = {
      display: 'Tab',
      key: eventKey
    }
  } else if (eventKey === 'Enter') {
    newKey = {
      display: 'Enter',
      key: eventKey
    }
  } else if (eventKey === 'Backspace') {
    newKey = {
      display: 'Backspace',
      key: eventKey
    }
  } else if (eventKey === 'Shift') {
    newKey = {
      display: 'Shift',
      key: eventKey
    }
  } else if (eventKey === 'Control') {
    newKey = {
      display: 'Ctrl',
      key: eventKey
    }
  } else if (eventKey === 'Alt') {
    newKey = {
      display: 'Alt',
      key: eventKey
    }
  } else if (eventKey === ' ') {
    newKey = {
      display: 'Space',
      key: eventKey
    }
  } else if (eventKey === 'Meta') {
    newKey = {
      display: 'Win',
      key: eventKey
    }
  }

  return newKey
}
export { keysWindows, formatNewKey }
