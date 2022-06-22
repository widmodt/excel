import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { $ } from "../../core/dom";
import * as action from "../../store/actions"
export class Header extends ExcelStateComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['keydown', 'focusout'],
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

  toHTML() {
    return `<input type="text" class="input" 
    value="${this.store.state.tableName}" />
      <div>
        <div class="button">
          <i class="material-icons"> delete </i>
        </div>
        <div class="button">
          <i class="material-icons"> exit_to_app </i>
        </div>
      </div>`
    }
}