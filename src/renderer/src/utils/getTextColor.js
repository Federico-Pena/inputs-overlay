function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map(function (v) {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

export const getTextColor = (hexColor) => {
  const rgb = hexToRgb(hexColor)
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b)
  const contrastColor = luminance > 0.5 ? '#000000' : '#ffffff'
  return contrastColor
}
