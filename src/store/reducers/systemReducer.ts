import { SystemDesign } from '../../components/types/SystemDesign'
import { UPDATE_ICON_SIZE, UPDATE_TRAVERSE_PATH } from '../actions/actionTypes'

export interface ReduxSystemState {
  iconsize: number
  system: SystemDesign
  traversePath: Array<string>
}

const defaultSystemState: ReduxSystemState = {
  iconsize: 24,
  system: new SystemDesign(),
  traversePath: [new SystemDesign().componentName, 't1'],
}
defaultSystemState.system.addChild(new SystemDesign('t1', 95, false))
defaultSystemState.system.addChild(new SystemDesign('t2', 96, true))
defaultSystemState.system.addChild(new SystemDesign('t3', 97, false))
defaultSystemState.system.addChild(new SystemDesign('t4', 98, true))
defaultSystemState.system.addChild(new SystemDesign('t11', 98, true))

defaultSystemState.system.children[0].addChild(new SystemDesign('t5', 93.2, false))
defaultSystemState.system.children[0].addChild(new SystemDesign('t6', 94.2, false))
defaultSystemState.system.children[1].addChild(new SystemDesign('t7', 93.2, true))
defaultSystemState.system.children[1].addChild(new SystemDesign('t8', 93.2, false))

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
    default:
      return state
  }
}
