import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: [],
    }),
      (this.rowCount = 20),
      (this.columnCount = 5);
  }

  toHTML() {
    return createTable(this.columnCount, this.rowCount);
  }
}
