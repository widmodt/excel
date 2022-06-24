import { formatStyle } from "../core/utils"
import { APPLY_STYLE, 
  CHANGE_NAME, 
  CHANGE_TEXT, 
  CHANGE_STYLES, 
  TABLE_RESIZE } from "./types"

export function rootReducer(state, action) {
  switch (action.type) {
    case CHANGE_TEXT:
      const newDataState = {dataState: {
        ...state.dataState, 
        [action.data.id]: action.data.value}
      }
      return {...state, 
        ...newDataState, 
        currentText: action.data.value, 
        currentSelectedCell: action.data.id
      }
    case TABLE_RESIZE:
      const sizeField = action.data.type === 'col' ? 'tableSizeCol' : 'tableSizeRow'
      return {...state, 
        [sizeField]: {...state[sizeField], 
        [action.data.id]: action.data.value}
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