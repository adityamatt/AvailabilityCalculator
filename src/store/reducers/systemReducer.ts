import { SystemDesign } from '../../components/types/SystemDesign'
import { ADD_DESIGN_CHILD, RESET_SYSTEM_ERROR, UPDATE_ICON_SIZE, UPDATE_TRAVERSE_PATH } from '../actions/actionTypes'

export interface ReduxSystemState {
  iconsize: number
  system: SystemDesign
  traversePath: Array<string>
  error: string
}

const defaultSystemState: ReduxSystemState = {
  iconsize: 24,
  system: new SystemDesign(),
  traversePath: [new SystemDesign().componentName, 't1'],
  error: '',
}
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t1', 95, false), ['root'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t2', 96, true), ['root'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t3', 97, false), ['root'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t4', 98, true), ['root'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t11', 98, true), ['root'])

defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t5', 93.2, false), ['root', 't1'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t6', 94.2, false), ['root', 't1'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t7', 93.2, true), ['root', 't2'])
defaultSystemState.system = defaultSystemState.system.addChild(new SystemDesign('t8', 93.2, false), ['root', 't2'])

export default function systemReducer(state: ReduxSystemState = defaultSystemState, action: any): ReduxSystemState {
  switch (action.type) {
    case UPDATE_ICON_SIZE:
      return {
        ...state,
        iconsize: action.payload,
      }
    case UPDATE_TRAVERSE_PATH:
      return {
        ...state,
        traversePath: action.payload,
      }
    case RESET_SYSTEM_ERROR:
      return {
        ...state,
        error: '',
      }
    case ADD_DESIGN_CHILD:
      let newSystem = state.system.clone()
      newSystem = newSystem.addChild(action.design, action.path)
      return {
        ...state,
        system: newSystem,
      }
    default:
      return state
  }
}
