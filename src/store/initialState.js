import { defaultStyles } from "../constants"
import { storage } from "../core/utils"

export const defaultState = {
  openedData: 0,
  tableName: 'newTable',
  tableSizeCol: {},
  tableSizeRow: {},
  dataState: {},
  stylesState: {},
  cuurentStyles: defaultStyles,
  currentText: '',
  currentSelectedCell: '0:1',
  
}

export function initialState(id) {
  return storage(id) 
  ? storage(id)
  : defaultState
}