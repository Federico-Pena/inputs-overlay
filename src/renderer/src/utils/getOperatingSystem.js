export const getOperatingSystem = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes('win')) {
    return 'windows'
  } else if (userAgent.includes('mac')) {
    return 'mac'
  } else if (userAgent.includes('linux')) {
    return 'linux'
  } else {
    return 'unknown'
  }
}
