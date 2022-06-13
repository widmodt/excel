import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import resizeTable from "./table.resize";
export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'mouseup'],
    }),
      (this.rowCount = 20),
      (this.columnCount = 25)
  }

  toHTML() {
    return createTable(this.columnCount, this.rowCount);
  }

  onMousedown(e) {
    resizeTable(e)
  }

}