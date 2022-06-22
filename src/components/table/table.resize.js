import { $ } from "@core/dom";

export function resizeTable(e) {
  return new Promise(resolve =>{ 
    const 
      $resizer = $(e.target),
      resizeType = $resizer.data.resize,
      $resizable = $resizer.closest(`[data-type="${
        resizeType === "col" ? "column" :  "row"
      }"]`),
      coords = $resizable.getCoords()
    let 
      value, newSize, delta
    document.onmousemove = (event) => {
      if (resizeType === "col") {
        delta = event.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + "px"})
      } else if (resizeType == "row") {
        delta = event.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + "px"})
      }
    }
    document.onmouseup = () => {
      newSize = value + "px"
      if (resizeType === "col") {
        document.querySelectorAll(`[data-cell="${$resizable.data.cell}"]`)
            .forEach(cell => {
              cell.style.width = newSize
            })
        $resizable.css({width: newSize})
        $resizer.css({ right: 0})
      } else if (resizeType == "row") {
        $resizable.css({height: newSize})
        $resizer.css({ bottom: 0})
      }
      resolve(() => {
        if (resizeType === 'col') {
          return {
            type: 'col', 
            id: $resizable.data.cell, 
            value: value
          }
        } else {
          return {
            type: 'row', 
            id: $resizable.data.row, 
            value: value
          }
        }
      })
      document.onmousemove = 0
      document.onmouseup = null
    }
  })
}