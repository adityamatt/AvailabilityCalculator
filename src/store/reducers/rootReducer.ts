import { combineReducers } from 'redux'
import test from './testReducer'
import system from './systemReducer'

const rootReducer = combineReducers({
  test,
  system,
})

export default rootReducer
