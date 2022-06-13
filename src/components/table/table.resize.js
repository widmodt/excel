import { $ } from "@core/dom";

export default function resizeTable(e) {
    const $resizer = $(e.target)
    let value
    if (e.target.dataset.resize == 'col') {
      const $col = $resizer.closest('[data-type="column"]')
      const coords = $col.getCoords()
      const index = $col.data.cell
      $resizer.css({opacity: 1})
      document.onmousemove = (event) => {
        const delta = event.pageX - coords.right
        value = coords.width + delta + 2
        $resizer.$el.style.right = -delta + 'px'
        document.onmouseup = () => {
          const newWidth = value + 'px'
          document.querySelectorAll(`[data-cell="${index}"]`)
            .forEach(cell => {
              cell.style.width = newWidth
            }) 
          $resizer.css({opacity: '', right: ''})
          $col.css({width: newWidth})
          document.onmousemove = 0
          document.onmouseup = null
        }
      } 
    } else if (e.target.dataset.resize == 'row') {
      const $row = $resizer.closest('[data-type="row"]')
      const coords = $row.getCoords()
      document.onmousemove = (event) => {
        const delta = event.pageY - coords.bottom
        value = coords.height + delta + 2
        $resizer.css({bottom: -delta - 3 + 'px'})
        document.onmouseup = () => {
          const newHeight = value + 'px'
          $resizer.css({opacity: '', bottom: ''})
          $row.css({height: newHeight})
          document.onmousemove = 0
          document.onmouseup = null
        }
      }
    }
}