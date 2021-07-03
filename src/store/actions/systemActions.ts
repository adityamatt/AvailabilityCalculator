import { SystemDesign } from '../../components/types/SystemDesign'
import {
  UPDATE_ICON_SIZE,
  UPDATE_TRAVERSE_PATH,
  ADD_DESIGN_CHILD,
  RESET_SYSTEM_ERROR,
  REST_SYSTEM,
  REMOVE_DESIGN_CHILDREN,
  EDIT_DESIGN_COMPONENT,
} from './actionTypes'

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

export const resetSystem = () => ({
  type: REST_SYSTEM,
})

export const addDesignChild = (design: SystemDesign, traversePath: string[]) => ({
  type: ADD_DESIGN_CHILD,
  design: design,
  path: traversePath,
})

export const removeDesignChildren = (removeNames: string[], traversePath: string[]) => ({
  type: REMOVE_DESIGN_CHILDREN,
  removeNames: removeNames,
  path: traversePath,
})

export const editDesignComponent = (designToEdit: SystemDesign, traversePath: string[]) => ({
  type: EDIT_DESIGN_COMPONENT,
  design: designToEdit,
  path: traversePath,
})
