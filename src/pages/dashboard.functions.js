function toHTML(key) {
  const storageState = localStorage.getItem(key)
  const name = JSON.parse(storageState).tableName
  const date = new Date(JSON.parse(storageState).openedData)
  return `
  <li class="db__record">
    <a href="#${key}">${name}</a>
    <strong>
      ${date.toLocaleDateString()}
      ${date.toLocaleTimeString()}
    </strong>
  </li>`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (keys.length == 0) {
    return `
    <p>Not created any table</p>`
  }
  return `
    <div class="db__list-header">
      <span>Name</span>
      <span>Opened date</span>
    </div>
    <ul class="db__list">

      ${keys.map(key => toHTML(key)).join('')}

    </ul>`
  
}