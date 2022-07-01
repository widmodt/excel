function toHTML() {
  return `
  <li class="db__record">
    <a href="#">Table 1</a>
    <strong>07.06.2022</strong>
  </li>
  `
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
  return `
    <div class="db__list-header">
      <span>Name</span>
      <span>Last opened data</span>
    </div>
    <ul class="db__list">

      ${keys.map(toHTML).join('')}

    </ul>`
  
}