export function parse(value = '') {
  if (value.startsWith('=') && value.length > 1) {
    try {
      return `${eval(value.slice(1))}`
    } catch (err) {}
    
  }
  return value
}