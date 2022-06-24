import { createTable } from "./table.template";
import { resizeTable } from "./table.resize";
import { TableSelection } from "./Table.selection";
import { $ } from "../../core/dom";
import { isCell } from "./table.functions";
import { idNextCell } from "./table.functions"
import * as actions from "../../store/actions"
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

export class Table extends ExcelStateComponent {
  static className = "excel__table";

  constructor($root,options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    }),
    this.rowCount = 10,
    this.columnCount = 10
  }

  prepare() {
    super.prepare()
    this.selection = new TableSelection()
    this.selection.root = this.$root
  }

  toHTML() {
    return createTable(this.columnCount, this.rowCount, this.store);
  }

  init() {
    super.init()
    this.selectCell(
      this.$root.find(`[data-id="${this.store.state['currentSelectedCell']}"]`)
    )
    this.selection.current.text(this.store['currentText'])
    this.$on('formula:input', text => {
      this.selection.current
        .attr('data-value', text)
      this.selection.current.text(parse(text))
      this.dataStateSet(text)
    }
      
    )
    this.$on('formula:enter', () => {
      const $current = this.selection.current
      $current.focus()
    })
    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.groupIds
      }))
    })
  }

  dataStateSet(text) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value: text 
      })
    )
  }

  onMousedown(e) {
    const $target = $(e.target)
    if ($target.data.type === "resize"){
      this.resizeHandler(e)
      return
    }
    if (isCell(e)) {
      if (!e.shiftKey) {
        this.selectCell($target)
        if ($target === this.selection.current) {
          $target.text($target.data.value)
        }
        this.$emit('table:select', $target.data.value)
      } else {
        this.selection.selectGroup($target)
      }
    } 
  }
  
  selectCell($cell) {
    this.selection.select($cell)
    const styles = $cell.css(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeHandler(e) {
    const data = await resizeTable(e)
    this.$dispatch(actions.tableResize(data()))
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
  }
  
  onInput(e) {
    const $target = $(e.target)
    this.selection.current
        .attr('data-value', $target.text())
    this.$emit('table:input', $target.text()) 
    this.dataStateSet($target.data.value)
  }
}