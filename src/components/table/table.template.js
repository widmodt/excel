const CHARCODES = {
  A: 65,
  Z: 90,
};

function createInfoColumn(char = "") {
  return `
    <div class="column">${char}</div>
    `;
}

function createDataCells(data) {
  return `
  <div class="cell" contenteditable>${data}</div>
  `;
}

function createRow(content, rowIndex) {
  return `
    <div class="row">
        <div class="row_info">${rowIndex ? rowIndex : ""}</div>
        <div class="row_data">
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
    infoRow.push(createInfoColumn(char));
  }
  rows += createRow(infoRow.join(``));

  let dataRows = [];
  for (let j = 1; j <= rowCount; j++) {
    for (let i = 0; i <= columnCount; i++) {
      const data = ""; //create posibility to load data from file

      dataRows.push(createDataCells(data));
    }
    rows += createRow(dataRows.join(""), j);
    dataRows = [];
  }

  return rows;
}
