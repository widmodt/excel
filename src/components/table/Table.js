import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeTable } from "./table.resize";
import { TableSelection } from "./Table.selection";
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
    this.selectCell(this.$root.find(`[data-id="0:0"]`))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    }
      
    )
    this.$on('formula:enter', (e) => {
      const $current = this.selection.current
      $current.focus()
    })
    this.$subscribe(state => {
      console.log('tableState', state)
    })
  }

  onMousedown(e) {
    resizeTable(e)
    const $target = $(e.target)
    if (isCell(e)) {
      if (!e.shiftKey) {
        this.selectCell($target)
        this.$emit('table:select', $target.text()) 
      } else {
        this.selection.selectGroup($target)
      }
    } 
  }
  
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:input', $cell.text())
    this.$dispatch({type: 'TEST'})
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
    if (moveKeys.includes(e.key) && !e.shiftKey) {
      const $next = this.$root.find(`[data-id="${idNextCell(e, $target)}"]`)
      this.selectCell($next)
      return
    }
    this.$emit('table:input', $target.text()) 
    
  }

}