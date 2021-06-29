import { UPDATE_ICON_SIZE } from '../actions/actionTypes'

export interface ReduxSystemState {
  iconsize: number
}

const defaultSystemState: ReduxSystemState = {
  iconsize: 128,
}

export default function systemReducer(state: ReduxSystemState = defaultSystemState, action: any): ReduxSystemState {
  switch (action.type) {
    case UPDATE_ICON_SIZE:
      return {
        ...state,
        iconsize: action.payload,
      }
    default:
      return state
  }
}
