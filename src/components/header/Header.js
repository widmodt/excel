import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { $ } from "../../core/dom";
import { deleteCurrentTable } from "../../core/utils";
import * as action from "../../store/actions"
import { ActiveRoute } from "../../core/routes/ActiveRoute";
export class Header extends ExcelStateComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['keydown', 'focusout','mousedown'],
      ...options
      })
  }

  onFocusout(e) {
    this.dispatchName(e.target.value)
  }

  onKeydown(e) {
    const $target = $()
    if (e.key === "Enter") {
      this.dispatchName(e.target.value)
      e.target.blur()
    }
    
  }
  dispatchName(name) {
    this.$dispatch(action.saveTableName(name))
  }

  onMousedown(e) {
    const target = $(e.target)
    if (target.data.type === 'delete') {
      const decision = confirm("delete table?")
      if (decision) { 
        deleteCurrentTable()
        ActiveRoute.navigate('#dashboard')
        // window.location.replace('#dashboard')
      }
    } else if (target.data.type === 'exit') {
      window.location.replace('#dashboard')
    }
  }

  toHTML() {
    return `<input type="text" class="input" 
    value="${this.store.state.tableName}" />
      <div>
        <div class="button">
          <i class="material-icons" data-type="delete"> delete </i>
        </div>
        <div class="button">
          <i class="material-icons" data-type="exit"> exit_to_app </i>
        </div>
      </div>`
    }
}