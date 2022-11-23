import { getId, initStyles } from "./table.functions";
import { parse } from "../../core/parse";
import { CHARCODES } from "../../constants";

function createInfoColumn(char = "",index, size) {
  return `
    <div 
    class="column" 
    data-type="column" 
    data-cell="${index}"
    ${size ? `style=width:` + size + `px;` : ''}>
    ${char}
      <div class="col-resize" 
      data-type="resize"
      data-resize="col">
        <div class="col-resize-line">
        </div> 
      </div> 
    </div>
    `;
}

function createDataCells(data, index, id, size, styles) {
  const cellSize = size ? `;width:` + size + `px;` : ''
  return `
  <div 
    class="cell" 
    data-type="cell" 
    data-cell="${index}" 
    data-id="${id}"
    data-value="${data || ' '}"
    style="${styles + cellSize}"
  contenteditable>
  ${parse(data)}
  </div>
  `;
}

function createRow(data, rowIndex, size) {
  return `
    <div 
      class="row" 
      data-type="row" 
      data-row="${rowIndex}"
      ${size ? `style=height:` + size + `px;` : ''}>
        <div class="row_info" ${!rowIndex ? `id="info_cell"` : ``}>
            ${rowIndex ? 
            `${rowIndex} 
            <div 
              class="row-resize"
              data-type="resize" 
              data-resize="row">
              <div class="row-resize-line">
              </div> 
            </div>` 
            : ""}
        </div>
        <div class="row_data"
         data-type="data-row">
        ${data}
        </div>
    </div>
  `;
}

export function createTable(columnCount, rowCount, store) {
  let rows = "";
  let infoRow = [];
  const storeSizeCol = store.state.tableSizeCol,
    storeSizeRow = store.state.tableSizeRow,
    storeCellData = store.state.dataState,
    storeCellStyle = store.state.stylesState
  for (let j = 0; j <= columnCount; j++) {
    let char = null;
    if (j < 26) {
      char = String.fromCharCode(CHARCODES.A + j);
    } else if (j >= 26) {
      char =
        String.fromCharCode(CHARCODES.A) +
        String.fromCharCode(CHARCODES.A + (CHARCODES.A - j));
    }
    infoRow.push(createInfoColumn(char, j, storeSizeCol[j]));
  }
  rows += createRow(infoRow.join(``));

  let dataRows = [];
  const initStyle = initStyles() 
  for (let j = 1; j <= rowCount; j++) {
    for (let i = 0; i <= columnCount; i++) {
      const id = getId(i, j)
      const data = storeCellData[id] || ''; 
      dataRows.push(createDataCells(
          data, 
          i, 
          id, 
          storeSizeCol[i],
          storeCellStyle[id] || initStyle
        ));
    }
    rows += createRow(dataRows.join(""), j, storeSizeRow[j]);
    dataRows = [];
  }
  return rows;
}