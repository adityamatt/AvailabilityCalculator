import { createSelector } from 'reselect'
import { SystemDesign } from '../../components/types/SystemDesign'
import { ReduxSystemState } from '../reducers/systemReducer'

const systemState = (state: any): ReduxSystemState => state.system

export const getIconSize = createSelector(systemState, (testState: ReduxSystemState): number => {
  return testState.iconsize
})

export const getSystem = createSelector(systemState, (testState: ReduxSystemState): SystemDesign => {
  return testState.system
})

export const getTraversePath = createSelector(systemState, (testState: ReduxSystemState): string[] => {
  return testState.traversePath
})

export const getSystemError = createSelector(systemState, (testState: ReduxSystemState): string => {
  return testState.error
})
