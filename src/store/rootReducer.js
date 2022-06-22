import { formatStyle } from "../core/utils"
import { APPLY_STYLE, 
  CHANGE_NAME, 
  CHANGE_TEXT, 
  CHANGE_STYLES, 
  TABLE_RESIZE } from "./types"

export function rootReducer(state, action) {
  switch (action.type) {
    case CHANGE_TEXT:
      const newCurrentText = {currentText: action.data.value}
      const newState = {[action.data.id]: action.data.value}
      const newDataState = {dataState: {...state.dataState, ...newState}}
      return {...state, ...newDataState, ...newCurrentText, currentSelectedCell: action.data.id}
    case TABLE_RESIZE:
      // const field = action.data.type === 'col' ? 'tableSizeCol' : 'tableSizeRow'
      if (action.data.type === 'col') {
        const newState = {[action.data.id]: action.data.value}
        const newTableSizeCol = 
          {tableSizeCol: {...state.tableSizeCol, ...newState}}
        return {...state, ...newTableSizeCol}
      } else {
        const newState = {[action.data.id]: action.data.value}
        const newTableSizeRow = 
          {tableSizeRow: {...state.tableSizeRow, ...newState}}
        return {...state, ...newTableSizeRow}
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      const field = 'stylesState'
      let val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = Object.keys(action.data.value).map(key => 
          `${formatStyle(key)}: ${action.data.value[key]};`
        ).join('')
      })
      return {...state, 
        ...val,
        currentStyles: {...state.currentStyles, ...action.value}}
      case CHANGE_NAME:
        return {...state, tableName: action.data}
    default:
        return state
    }
}