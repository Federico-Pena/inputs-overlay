interface Texts {
  [key: string]: {
    title: string
    download: string
    downloadWarning: string
    souceCode: string
    platform: string
    featuresTitle: string
    features: string[]
    whyTitle: string
    whyText: string
    contact: string
  }
}

export const texts: Texts = {
  en: {
    title: 'Inputs Overlay: Keyboard & Mouse Visualizer',
    download: 'Download Inputs Overlay',
    platform: 'For Windows 64-bit',
    featuresTitle: 'Features of Inputs Overlay',
    features: [
      '✅ Works on OBS.',
      '🎯 Input Highlighting: Clicks and key presses are emphasized visually.',
      '✏️ Customizable: Edit, remove keys, and change text, colors, and highlights.',
      '⚙️ Opacity Control: Adjust visibility of the keyboard and mouse.',
      '👁️ Show/Hide: Toggle the keyboard and mouse as needed.'
    ],
    whyTitle: 'Why Choose Inputs Overlay?',
    downloadWarning:
      'The browser may flag the download as unsafe. If it does, please click "Keep anyway".',
    souceCode: 'You can find the source code at:',
    whyText:
      "Whether you're a content creator, streamer, or instructor, Inputs Overlay helps visually communicate user actions on the screen. Easily customize the look and behavior of the keyboard and mouse overlay to fit your needs.",
    contact: 'Need help? Contact us at'
  },
  es: {
    title: 'Inputs Overlay: Visualizador de Teclado y Ratón',
    download: 'Descargar Inputs Overlay',
    platform: 'Para Windows 64 bits',
    featuresTitle: 'Características de Inputs Overlay',
    features: [
      '✅ Funciona en OBS.',
      '🎯 Resaltado de entradas: Los clics y las teclas se destacan visualmente.',
      '✏️ Personalizable: Edita, elimina teclas y cambia texto, colores y resaltados.',
      '⚙️ Control de opacidad: Ajusta la visibilidad del teclado y el ratón.',
      '👁️ Mostrar/Ocultar: Alterna la visibilidad del teclado y el ratón según sea necesario.'
    ],
    whyTitle: '¿Por qué elegir Inputs Overlay?',
    downloadWarning:
      'El navegador puede marcar la descarga como no segura. Si esto sucede, haz clic en "Conservar de todos modos".',
    souceCode: 'Puedes encontrar el código fuente en:',
    whyText:
      'Ya seas creador de contenido, streamer o instructor, Inputs Overlay te ayuda a comunicar visualmente las acciones del usuario en pantalla. Personaliza fácilmente el aspecto y comportamiento del teclado y ratón según tus necesidades.',
    contact: '¿Necesitas ayuda? Contáctanos en'
  }
}
