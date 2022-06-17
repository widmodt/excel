import { $ } from "@core/dom";

export function resizeTable(e) {
  const 
    $resizer = $(e.target),
    resizeType = $resizer.data.resize,
    $resizable = $resizer.closest(`[data-type="${
      resizeType == "col" ? "column" :  "row"
    }"]`),
    coords = $resizable.getCoords()
  let 
    value, newSize, delta
    document.onmousemove = (event) => {
      if (resizeType == "col") {
        delta = event.pageX - coords.right
        value = coords.width + delta
        newSize = value + "px"
        $resizer.css({right: -delta + "px"})
      } else if (resizeType == "row") {
        delta = event.pageY - coords.bottom
        value = coords.height + delta
        newSize = value + "px"
        $resizer.css({bottom: -delta + "px"})
      }
    }
  document.onmouseup = () => {
    if (resizeType == "col") {
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
    document.onmousemove = 0
    document.onmouseup = null
  }
}