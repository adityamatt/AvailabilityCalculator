import { SystemDesign } from '../../components/types/SystemDesign'
import { UPDATE_ICON_SIZE, UPDATE_TRAVERSE_PATH, ADD_DESIGN_CHILD, RESET_SYSTEM_ERROR } from './actionTypes'

export const updateIconSize = (payload: number) => ({
  type: UPDATE_ICON_SIZE,
  payload,
})

export const updateTraversePath = (payload: string[]) => ({
  type: UPDATE_TRAVERSE_PATH,
  payload,
})
export const resetError = () => ({
  type: RESET_SYSTEM_ERROR,
})

export const addDesignChild = (design: SystemDesign, traversePath: string[]) => ({
  type: ADD_DESIGN_CHILD,
  design: design,
  path: traversePath,
})
