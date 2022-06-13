const CHARCODES = {
  A: 65,
  Z: 90,
};

function createInfoColumn(char = "",index) {
  return `
    <div class="column" data-type="column" data-cell="${index}">
    ${char}
    <div class="col-resize" data-resize="col"></div> 
    </div>
    `;
}

function createDataCells(data, index) {
  return `
  <div class="cell" data-type="cell" data-cell="${index}" contenteditable>${data}</div>
  `;
}

function createRow(content, rowIndex) {
  return `
    <div class="row" data-type="row">
        <div class="row_info">
            ${rowIndex ? 
            `${rowIndex} <div class="row-resize" data-resize="row"></div>` 
            : ""}
        </div>
        <div class="row_data" data-type="data-row">
        ${content}
        </div>
    </div>
  `;
}

export function createTable(columnCount, rowCount) {
  let rows = "";

  let infoRow = [];
  for (let j = 0; j <= columnCount; j++) {
    const char = null;
    if (j < 26) {
      char = String.fromCharCode(CHARCODES.A + j);
    } else if (j >= 26) {
      char =
        String.fromCharCode(CHARCODES.A) +
        String.fromCharCode(CHARCODES.A + (CHARCODES.A - j));
    }
    infoRow.push(createInfoColumn(char, j));
  }
  rows += createRow(infoRow.join(``));

  let dataRows = [];
  for (let j = 1; j <= rowCount; j++) {
    for (let i = 0; i <= columnCount; i++) {
      const data = ""; //create posibility to load data from file

      dataRows.push(createDataCells(data, i));
    }
    rows += createRow(dataRows.join(""), j);
    dataRows = [];
  }

  return rows;
}
