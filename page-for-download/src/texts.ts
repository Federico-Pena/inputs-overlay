interface Texts {
  [key: string]: {
    title: string;
    download: string;
    platform: string;
    featuresTitle: string;
    features: string[];
    whyTitle: string;
    whyText: string;
    contact: string;
  };
}

export const texts: Texts = {
  en: {
    title: "KyM Overlay: Keyboard & Mouse Visualizer",
    download: "Download KyM Overlay",
    platform: "For Windows 64-bit",
    featuresTitle: "Features of KyM Overlay",
    features: [
      "🎯 Input Highlighting: Clicks and key presses are emphasized visually.",
      "✏️ Customizable: Edit, remove keys, and change text, colors, and highlights.",
      "⚙️ Opacity Control: Adjust visibility of the keyboard and mouse.",
      "👁️ Show/Hide: Toggle the keyboard and mouse as needed.",
    ],
    whyTitle: "Why Choose KyM Overlay?",
    whyText:
      "Whether you're a content creator, streamer, or instructor, KyM Overlay helps visually communicate user actions on the screen. Easily customize the look and behavior of the keyboard and mouse overlay to fit your needs.",
    contact: "Need help? Contact us at",
  },
  es: {
    title: "KyM Overlay: Visualizador de Teclado y Ratón",
    download: "Descargar KyM Overlay",
    platform: "Para Windows 64 bits",
    featuresTitle: "Características de KyM Overlay",
    features: [
      "🎯 Resaltado de entradas: Los clics y las teclas se destacan visualmente.",
      "✏️ Personalizable: Edita, elimina teclas y cambia texto, colores y resaltados.",
      "⚙️ Control de opacidad: Ajusta la visibilidad del teclado y el ratón.",
      "👁️ Mostrar/Ocultar: Alterna la visibilidad del teclado y el ratón según sea necesario.",
    ],
    whyTitle: "¿Por qué elegir KyM Overlay?",
    whyText:
      "Ya seas creador de contenido, streamer o instructor, KyM Overlay te ayuda a comunicar visualmente las acciones del usuario en pantalla. Personaliza fácilmente el aspecto y comportamiento del teclado y ratón según tus necesidades.",
    contact: "¿Necesitas ayuda? Contáctanos en",
  },
};
