import { parseId, rangeId } from "../../core/utils"
import { parse } from "../../core/parse"
import { $ } from "../../core/dom"

export class TableSelection{
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
    
  }

  get groupIds() {
    return this.group.map($el => $el.id())
  }

  select($el) {
    $el.focus()
    this.clearSelections()
    this.group.push($el)
    this.current = $el
    $el.addClass(TableSelection.className)
    this.setIdToInfoCell()
  }

  clearSelections() {
    this.group.forEach(cell => {
      cell.removeClass(TableSelection.className)
      cell.text(parse(cell.text()))
    })
    this.group = []
  }

  selectGroup($el) {
    this.clearSelections()
    let ids = rangeId(this.current.id(true), $el.id(true));
    for (let i = 0; i < ids.length; i++) {
      const cell = this.root.find(`[data-id="${ids[i]}"]`)
      this.group.push(cell)
      cell.addClass(TableSelection.className)
    }
  }
  
  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }

  setIdToInfoCell() {
    this.$infoCell = this.$infoCell || $('#info_cell')
    this.$infoCell.text(parseId(this.current.id()))
  }
}