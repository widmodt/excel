import { defaultStyles } from "../constants"
import { storage } from "../core/utils"

const defaultState = {
  tableName: 'newTable',
  tableSizeCol: {},
  tableSizeRow: {},
  dataState: {},
  stylesState: {},
  cuurentStyles: defaultStyles,
  currentText: '',
  currentSelectedCell: '0:1',
  
}

export const initialState = storage('excelState') 
  ? storage('excelState')
  : defaultState

export function normalizeInitialState(state) {
  return state ? state : defaultState
}