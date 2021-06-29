import { createSelector } from 'reselect'
import { ReduxSystemState } from '../reducers/systemReducer'

const systemState = (state: any): ReduxSystemState => state.system

export const getIconSize = createSelector(systemState, (testState: ReduxSystemState) => {
  return testState.iconsize
})
