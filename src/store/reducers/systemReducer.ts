import { SystemDesign } from '../../components/types/SystemDesign'
import {
  ADD_DESIGN_CHILD,
  EDIT_DESIGN_COMPONENT,
  REMOVE_DESIGN_CHILDREN,
  RESET_SYSTEM_ERROR,
  REST_SYSTEM,
  UPDATE_ICON_SIZE,
  UPDATE_TRAVERSE_PATH,
} from '../actions/actionTypes'

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
      try {
        let addNewSystem = state.system.clone()
        addNewSystem = addNewSystem.addChild(action.design, action.path)
        return {
          ...state,
          system: addNewSystem,
        }
      } catch (err) {
        return {
          ...state,
          error: err.toString(),
        }
      }

    case REST_SYSTEM:
      return {
        ...defaultSystemState,
      }
    case REMOVE_DESIGN_CHILDREN:
      try {
        const removeNewSystem = state.system.clone()
        removeNewSystem.removeChild(action.removeNames, action.path)
        return {
          ...state,
          system: removeNewSystem,
        }
      } catch (err) {
        return {
          ...state,
          error: err.toString(),
        }
      }
    case EDIT_DESIGN_COMPONENT:
      try {
        const editNewSystem = state.system.clone()
        editNewSystem.edit(action.design, action.path)
        const path = [...state.traversePath]
        path.pop()
        path.push(action.design.componentName)
        return {
          ...state,
          system: editNewSystem,
          traversePath: path,
        }
      } catch (err) {
        return {
          ...state,
          error: err.toString(),
        }
      }

    default:
      return state
  }
}
