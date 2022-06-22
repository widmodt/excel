import {$} from '@core/dom'
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
export class Formula extends ExcelStateComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `<div class="info">fx</div>
      <div 
        id="formula" 
        class="input" 
        contenteditable="" 
        spellcheck="false">
      </div>`;
  }

  init() {
    super.init() 
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', text => {
      this.$formula.text(text)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text())
  }
  
  onKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.$emit('formula:enter', e)
      return
    }
  }
}