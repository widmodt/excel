import { ExcelComponent } from "@core/ExcelComponent";
export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  toHTML() {
    return `<div class="info">fx</div>
      <div id="formula" class="input" contenteditable="" spellcheck="false"></div>`;
  }

  init() {
    super.init() 
    this.$formula = this.$root.find('#formula')
    this.$on('table:input', text => {
      this.$formula.text(text)
    })
    this.$on('table:select', text => {
      this.$formula.text(text)
    })
    this.$s
    this.$subscribe(state => {
      console.log('formulaState', state)
    })
  }

  onInput(e) {
    const text = e.target.textContent
    this.$emit('formula:input', text)
  }

  onKeydown(e) {
    if (e.key == 'Enter') {
      e.preventDefault()
      this.$emit('formula:enter', e)
    }
  }
}