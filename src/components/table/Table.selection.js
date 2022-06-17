import { rangeId } from "../../core/utils"

export class TableSelection{
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    $el.focus()
    this.clearSelections()
    this.group.push($el)
    this.current = $el
    $el.addClass(TableSelection.className)
  }

  clearSelections() {
    this.group.forEach(cell => cell.removeClass(TableSelection.className))
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
}