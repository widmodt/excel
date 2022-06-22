export function capitalize(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

export function formatStyle(style) {
  return style.replace( /([A-Z])/g, (g)=> `-${g[0].toLowerCase()}`)
}

export function rangeId(num1, num2) {
  const cols = [num1[0],num2[0]].sort((a,b) => a-b)
  const rows = [num1[1],num2[1]].sort((a,b) => a-b)
  let ids = [];
  for (let i = cols[0]; i <= cols[1]; i++){
    for (let j = rows[0]; j <= rows[1]; j++){
      ids.push(`${i}:${j}`)
    }
  }
  return ids;
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait);
  }
}