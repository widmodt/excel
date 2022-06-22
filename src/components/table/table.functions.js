import { defaultStyles } from "../../constants"
import { formatStyle } from "../../core/utils";

export function isCell(e) {
  return e.target.dataset.type === 'cell'
}

export function idNextCell(e, target) {
  let newId = target.id(true)
  switch (e.key) {
    case 'Enter':
      e.preventDefault()
      newId[1] += 1
      break
    case 'Tab':
      e.preventDefault()
      newId[0] += 1
      break
    case 'ArrowRight':
      newId[0] += 1
      break
    case 'ArrowLeft':
      newId[0] = newId[0] - 1 < 0 ? 0 : newId[0] - 1
      break
    case 'ArrowDown':
      newId[1] += 1
      break
    case 'ArrowUp':
      newId[1] = newId[1] - 1 < 0 ? 0 : newId[1] - 1
      break
    default: 
      return
    }
    return newId.join(':')
}

export function getId(i,j) {
  return  i +':'+j
}

export function initStyles() {
  return Object.keys(defaultStyles).map(key => 
    `${formatStyle(key)}: ${defaultStyles[key]}`
  ).join(';')
}