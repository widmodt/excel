import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import resizeTable from "./table.resize";
import {TableSelection} from "./Table.selection";
import { $ } from "../../core/dom";
import { isCell } from "./table.functions";
import { idNextCell } from "./table.functions"

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root,options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown'],
      ...options
    }),
      this.rowCount = 20,
      this.columnCount = 25
  }

  prepare() {
    super.prepare()
    this.selection = new TableSelection()
    this.selection.root = this.$root
  }

  toHTML() {
    return createTable(this.columnCount, this.rowCount);
  }

  init() {
    super.init()
    const $cell = this.$root.find(`[data-id="0:0"]`)
    this.selection.select($cell)

    this.$emit('table:input', $cell.text()) 
    this.$on('formula:input', text => 
    this.selection.current.text(text)
    )
    this.$on('formula:enter', (e) => {
        const $current = this.selection.current
        $current.focus()
      }
    )
    
  }

  onMousedown(e) {
      resizeTable(e)
      const $target = $(e.target)
      if (isCell(e)) {
        if (!e.shiftKey) {
          this.selection.select($target)
          this.$emit('table:select', $target.text()) 
        } else {
          this.selection.selectGroup($target)
        }
      } 
  }

  onKeydown(e) {
    const moveKeys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp'
    ]
    const $target = $(e.target)
    const $next = this.$root.find(`[data-id="${idNextCell(e, $target)}"]`)
    if (moveKeys.includes(e.key)) {
      this.selection.moveOnKey($next)
      this.$emit('table:input', $next.text()) 
    } else {
      this.$emit('table:input', $target.text()) 
    }
    
  }

}